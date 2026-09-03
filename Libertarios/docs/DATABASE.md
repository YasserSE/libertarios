# Base de datos — Libertarios.eu

Cómo organizar la persistencia para que el registro de simpatizantes y los mapas
funcionen con datos reales. Hoy la app lee de mocks; este documento describe el
destino y el camino para llegar.

**Stack recomendado:** PostgreSQL (Supabase o Neon). Encaja con Vercel, tiene
PostGIS si algún día hace falta geometría real, y `MATERIALIZED VIEW` resuelve
los agregados del mapa sin capa de caché adicional.

## Estado actual

El esquema **ya está aplicado** en el proyecto Supabase `Libertarios EU`
(`necppbotpfkrbqqtmbcp`, eu-west-1):

| | |
|---|---|
| Migraciones | `supabase/migrations/0001` … `0004` |
| Catálogo cargado | 44 países, 52 provincias, 69 alias de nomenclátor |
| Simpatizantes | 23.087 — **todos sintéticos**, lote `mock-2026-09-01`. Altas reales: 0 |
| Vistas | `country_stats` y `region_stats` creadas y refrescadas |
| RLS | activo en las 6 tablas; verificado que la clave `anon` lee los agregados y recibe `42501` en `affiliates`, `affiliate_profiles`, `eligible_profiles` y `quadrant_responses` |

La aplicación **sigue leyendo de los mocks en TypeScript**; la base contiene las
mismas cifras para poder validar el esquema antes de conectarla. Ver «Cómo se
conecta con el código actual».

### Datos sintéticos y cómo borrarlos

Toda fila de ejemplo lleva `affiliates.seed_batch`. Las altas reales lo tienen a
`NULL`, así que las dos poblaciones nunca se confunden.

```sql
select * from public.seed_batches;                   -- qué lotes hay vivos
select public.purge_seed_batch('mock-2026-09-01');   -- borra el lote, devuelve nº de filas
```

`purge_seed_batch` borra en cascada perfiles y respuestas, refresca las vistas y
**rechaza un lote nulo o vacío**, para que nunca pueda convertirse en un borrado
indiscriminado. Está revocada para `anon` y `authenticated`: solo la ejecuta el
rol de servicio.

Comprobado en el proyecto: un lote de prueba de 7 filas se purgó por completo
mientras un alta con `seed_batch IS NULL` y el lote `mock-2026-09-01` quedaron
intactos.

### Regenerar los seeds

Ambos salen del código, que es la fuente de verdad — no los edites a mano:

```bash
npm run seed:gen    # 0002: catálogo, desde src/data/geo/*
npm run seed:mock   # 0004: simpatizantes sintéticos, desde el repositorio
```

`0004` empieza borrando su propio lote, así que reaplicarlo reemplaza en lugar
de duplicar.

---

## 1. Principio rector: el dato individual nunca sale de la base

La web solo publica agregados. Ninguna respuesta de API debe permitir
reconstruir una persona. Esto no es una decisión de producto opcional: la web ya
promete anonimato al usuario en `/registro` y en `/datos`, y el RGPD trata la
posición ideológica como **categoría especial de datos** (art. 9).

Tres reglas que se implementan en el esquema, no en el código de la UI:

1. **Separación**: identidad (email) y posición ideológica viven en tablas
   distintas, unidas por un id opaco.
2. **k-anonimato**: ningún agregado se publica con menos de `k` personas
   (arrancar con `k = 5`). Territorios por debajo del umbral se agrupan en
   «resto» o se muestran como «sin datos suficientes», nunca como `0`.
3. **Solo lectura agregada**: la app usa un rol de base de datos que únicamente
   puede leer las vistas materializadas, jamás las tablas base.

---

## 2. Esquema

### Tablas de referencia (catálogo, cambian casi nunca)

```sql
CREATE TABLE countries (
  code          char(2)  PRIMARY KEY,        -- ISO 3166-1 alpha-2: 'ES'
  alpha3        char(3)  NOT NULL UNIQUE,    -- 'ESP'
  numeric_code  char(3)  NOT NULL UNIQUE,    -- '724', el id del TopoJSON
  name_es       text     NOT NULL,
  geo_name      text     NOT NULL,           -- nombre en el TopoJSON
  slug          text     NOT NULL UNIQUE,    -- '/pais/<slug>'
  flag          text     NOT NULL,
  population    integer  NOT NULL,
  has_region_map boolean NOT NULL DEFAULT false
);

CREATE TABLE regions (
  code          text     NOT NULL,           -- España: código INE de 2 dígitos
  country_code  char(2)  NOT NULL REFERENCES countries(code),
  name          text     NOT NULL,
  parent_name   text     NOT NULL,           -- comunidad autónoma
  PRIMARY KEY (country_code, code)
);

-- Grafías alternativas de cada territorio en los distintos TopoJSON.
CREATE TABLE region_aliases (
  country_code  char(2) NOT NULL,
  region_code   text    NOT NULL,
  alias         text    NOT NULL,
  PRIMARY KEY (country_code, alias),
  FOREIGN KEY (country_code, region_code) REFERENCES regions(country_code, code)
);
```

> Estas tres tablas son exactamente lo que hoy vive en
> `src/data/geo/europe-countries.ts` y `src/data/geo/spain-provinces.ts`. Al
> migrar, esos ficheros pasan a ser un *seed* de SQL.

### Identidad — acceso restringido

```sql
CREATE TABLE affiliates (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_hash    bytea NOT NULL UNIQUE,       -- SHA-256(email + pepper); clave de deduplicación
  email         text,                        -- dirección en claro, para comunicaciones
  created_at    timestamptz NOT NULL DEFAULT now(),
  confirmed_at  timestamptz,                 -- doble opt-in; sin esto no cuenta
  deleted_at    timestamptz                  -- borrado lógico para el art. 17
);
```

El hash es lo que detecta duplicados; la dirección se guarda porque el proyecto
necesita poder escribir a quien se registra.

Eso cambia la naturaleza de esta tabla: deja de ser un recuento anónimo y pasa a
ser un fichero de datos personales. Va con dos obligaciones que no son
opcionales. El formulario y la política de privacidad tienen que declararlo —
recoger direcciones bajo una promesa de anonimato sería un incumplimiento del
RGPD, no un desliz de redacción. Y la columna queda fuera de todo lo que se
publica: las vistas agregadas no la tocan, y las tablas base siguen sin
políticas RLS, así que la clave anónima devuelve 42501 al intentar leerla.

### Posición y territorio — la tabla que alimenta los mapas

```sql
CREATE TABLE affiliate_profiles (
  affiliate_id  uuid PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
  country_code  char(2) NOT NULL REFERENCES countries(code),
  region_code   text,                        -- NULL si el país no tiene mapa regional
  economic      smallint NOT NULL CHECK (economic BETWEEN -100 AND 100),
  social        smallint NOT NULL CHECK (social   BETWEEN -100 AND 100),
  method        text NOT NULL CHECK (method IN ('test', 'manual')),
  birth_year    smallint,                    -- año, no fecha: menos identificable
  gender        text,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (country_code, region_code) REFERENCES regions(country_code, code)
);

CREATE INDEX ON affiliate_profiles (country_code);
CREATE INDEX ON affiliate_profiles (country_code, region_code);
```

### Respuestas del test — opcional, y separadas

```sql
CREATE TABLE quadrant_responses (
  id            bigserial PRIMARY KEY,
  affiliate_id  uuid REFERENCES affiliates(id) ON DELETE CASCADE,
  question_id   smallint NOT NULL,
  answer        smallint NOT NULL CHECK (answer BETWEEN -2 AND 2),
  answered_at   timestamptz NOT NULL DEFAULT now()
);
```

Sirve para recalcular posiciones si cambia el baremo y para analizar qué
preguntas discriminan. `affiliate_id` es anulable: quien hace el test sin
registrarse también aporta datos agregados útiles.

---

## 3. Los agregados que consume la web

Una vista materializada por nivel del mapa. Son la **única** superficie que la
aplicación lee.

```sql
CREATE MATERIALIZED VIEW country_stats AS
SELECT
  c.code,
  count(p.affiliate_id)                                      AS affiliates,
  count(*) FILTER (WHERE a.created_at > now() - interval '30 days') AS growth_30d,
  round(avg(p.economic))::smallint                           AS economic,
  round(avg(p.social))::smallint                             AS social,
  round(count(p.affiliate_id) * 1e6 / c.population)          AS per_million
FROM countries c
LEFT JOIN affiliate_profiles p ON p.country_code = c.code
LEFT JOIN affiliates a
       ON a.id = p.affiliate_id
      AND a.confirmed_at IS NOT NULL
      AND a.deleted_at IS NULL
GROUP BY c.code, c.population
HAVING count(p.affiliate_id) = 0 OR count(p.affiliate_id) >= 5;  -- k-anonimato

CREATE UNIQUE INDEX ON country_stats (code);
```

`region_stats` es la misma consulta agrupando por `(country_code, region_code)`.

**Refresco:** `REFRESH MATERIALIZED VIEW CONCURRENTLY country_stats;` cada 15
minutos vía cron de Supabase o Vercel Cron. Los mapas no necesitan tiempo real
y el refresco concurrente no bloquea lecturas.

**Umbral k:** el `HAVING` deja fuera los territorios con 1–4 personas. La UI ya
distingue «sin registros» de «sin datos suficientes» a través del color
`--choro-empty` y del texto de la leyenda; conviene mantener esa distinción.

---

## 4. Seguridad de acceso (Row Level Security)

```sql
ALTER TABLE affiliates          ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE quadrant_responses  ENABLE ROW LEVEL SECURITY;
-- Sin políticas: nadie lee estas tablas con la clave pública.

GRANT SELECT ON country_stats, region_stats, countries, regions TO anon;
```

El alta se hace con una función `SECURITY DEFINER` (`register_affiliate(...)`)
que inserta y no devuelve nada consultable. Así el cliente puede escribir sin
poder leer jamás lo escrito.

---

## 5. Cómo se conecta con el código actual

Toda la lectura pasa por un único módulo:

```
src/lib/affiliates/repository.ts   ← el punto de cambio
├── getEuropeSnapshot()
├── getCountrySnapshot(code)
├── getCountrySnapshotBySlug(slug)
└── getRankedCountries()
```

Los tipos de `src/lib/affiliates/types.ts` ya reproducen las columnas de
`country_stats` y `region_stats`, así que la migración es:

1. Sembrar `countries` y `regions` desde `src/data/geo/*`.
2. Crear las tablas, las vistas y el cron de refresco.
3. Reescribir el cuerpo de las cuatro funciones del repositorio como consultas,
   y marcarlas `async`.
4. En los componentes de página (`HomePage`, `/datos`, `/pais/[slug]`) añadir
   `await`. Son Server Components: no hace falta tocar nada más.
5. Borrar `src/data/mock/affiliate-counts.ts`.
6. Sustituir el `console.log` de `src/app/registro/page.tsx:28` por la llamada a
   `register_affiliate`.

Las funciones son síncronas hoy y devuelven objetos idénticos en cada llamada
(hay un test que lo comprueba), precisamente para que el paso a `async` no
cambie nada más que la firma.

### Revalidación en Next.js

Las páginas son estáticas. Con datos reales:

```ts
export const revalidate = 900; // 15 min, alineado con el refresco de la vista
```

O `revalidateTag('affiliates')` desde el webhook que dispara el refresco, si se
prefiere invalidación por evento.

---

## 6. Cuando se añada un segundo país con mapa regional

1. Insertar sus subdivisiones en `regions` con sus alias.
2. Poner `has_region_map = true` en `countries`.
3. Añadir la URL de su TopoJSON y su proyección a un registro de mapas.
4. Enrutar su slug a la home filtrada, igual que hace `/spain`.

El componente `SpainProvinceMap` está escrito contra `RegionStats[]`, no contra
España: generalizarlo es parametrizar la URL del TopoJSON, la proyección y el
`resolve*` — no reescribirlo.

---

## 7. Retención y derechos

| Obligación | Implementación |
|---|---|
| Consentimiento explícito (art. 9) | `confirmed_at` — sin doble opt-in la fila no entra en ningún agregado |
| Derecho de acceso (art. 15) | Consulta por `email_hash`, devuelve el perfil |
| Derecho de supresión (art. 17) | `deleted_at`; el borrado físico va en un job nocturno |
| Minimización | Año de nacimiento en lugar de fecha; nunca dirección ni IP junto al perfil |
| Limitación del plazo | Cuentas sin confirmar se purgan a los 30 días |
