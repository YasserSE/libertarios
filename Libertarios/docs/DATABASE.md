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
  result_token  uuid NOT NULL UNIQUE         -- capacidad para volver a ver el propio resultado
                DEFAULT gen_random_uuid(),
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

#### Volver a ver el propio resultado

`result_token` es lo que permite que alguien recupere su posición desde otro
dispositivo. Es una **capacidad**, no una credencial: quien tiene el token ve un
resultado, y nada más — `result_by_token(uuid)` devuelve la posición y no el
correo, ni su hash, ni el `id`.

Lo que no se hace, y conviene que siga sin hacerse mientras no haya envío de
correo: un formulario de «recupera tu resultado escribiendo tu email». La
posición política es categoría especial del art. 9, y una consulta por dirección
sin verificar convierte el sitio en un buscador donde cualquiera teclea el correo
de un conocido y lee su ideología. Cuando haya proveedor de correo, la vía buena
es un enlace mágico: se envía el token a la dirección en vez de devolverlo a
quien lo pida.

El token es aleatorio —no derivado del correo, así que no se puede ir de uno al
otro—, único y revocable con un `update`. Y se conserva entre altas repetidas:
un enlace guardado hace meses sigue funcionando después de repetir el test.

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
que inserta y devuelve una sola cosa: el `result_token` de quien acaba de
registrarse. Así el cliente puede escribir sin poder leer nada de nadie más.
La otra excepción de lectura es `result_by_token(uuid)`, que devuelve una
posición a cambio de un token que solo tiene su dueño.

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
| Derecho de acceso (art. 15) | Consulta por `email_hash`, devuelve el perfil; la persona ve lo suyo con `result_by_token` |
| Derecho de supresión (art. 17) | `deleted_at`; el borrado físico va en un job nocturno |
| Minimización | Año de nacimiento en lugar de fecha; nunca dirección ni IP junto al perfil |
| Limitación del plazo | Cuentas sin confirmar se purgan a los 30 días |

---

## 8. «¿A quién votar?» — respuestas anónimas y avisos (`0008_afinidad.sql`)

Módulo aparte del registro de simpatizantes, y así debe seguir: quien hace el
test no se registra como nada, y el módulo promete no afiliación. **No usar
`register_affiliate` ni las tablas `affiliates*` para nada de esto.**

> Migración escrita, **no aplicada** en ningún proyecto remoto.

### Tablas

| Tabla | Qué guarda | Qué **no** guarda |
|---|---|---|
| `afinidad_responses` | `dataset_version`, `answers smallint[]` (−2, −1, 1, 2 o `NULL` = saltada, por posición de `Question.order`), `important boolean[]`, `region` (INE 01–19, opcional), `usual_vote` (id de partido, opcional), `created_day` (fecha truncada a día, hora de Madrid) | correo, IP, user agent, hora, ningún id de sesión |
| `afinidad_notify` | `email` (en minúsculas, único), `consent_at`, `locale` (es/ca/gl/eu), `dataset_version`, `unsubscribe_token`, `unsubscribed_at` | ninguna respuesta del test ni enlace a ellas |

Las respuestas van por posición y con versión del dataset: un cambio de
cuestionario cambia la versión, así que nunca se mezclan respuestas cuyo
significado ha cambiado. La server action descarta además los enlaces de una
versión distinta de la actual.

### Acceso

- RLS activo y **sin políticas** en las dos tablas; `revoke all` a `anon` y
  `authenticated`.
- Escritura pública solo por dos funciones `SECURITY DEFINER` concedidas a
  `anon`, que validan la entrada aunque la server action ya lo haga (cualquiera
  con la clave pública puede llamarlas sin pasar por la web):
  - `record_afinidad_response(p_dataset_version, p_answers, p_important, p_region, p_usual_vote)`
    → `void`. Exige escala válida, misma longitud, ninguna «importante» saltada
    y al menos 8 respondidas (`MIN_ANSWERS`). No devuelve el id.
  - `subscribe_afinidad(p_email, p_consent, p_locale, p_dataset_version)` →
    `void`, igual si el correo era nuevo o ya estaba (no permite averiguar
    quién está suscrito). Resuscribirse renueva `consent_at` y anula la baja.
- Lectura **interna**: `afinidad_aggregates(p_question, p_usual_vote, p_dataset_version)`
  devuelve recuentos por valor e importancia y omite toda celda con menos de
  **20** personas (k = 20, más estricto que el k = 5 del mapa porque aquí el
  dato es opinión sobre un asunto concreto). Revocada para `anon` y
  `authenticated`: solo `service_role`.

### Publicar agregados

Antes de publicar o difundir cualquier cifra (página, imagen OG, JSON abierto,
redes):

1. `isPublicationEmbargoed()` (`src/lib/afinidad/aggregate-rules.ts`) debe ser
   `false`. Devuelve `true` del 24-nov-2026 00:00 al 29-nov-2026 20:00 (hora de
   Madrid), veda de sondeos del art. 69.7 LOREG.
2. Solo celdas con k ≥ 20 (`K_ANONYMITY`), y avisando de que quien hace el test
   no es una muestra representativa.

### Código

```
src/app/[locale]/a-quien-votar/actions.ts   recordAfinidadResponse, subscribeAfinidad
src/lib/afinidad/aggregate.ts               fetch a las RPC con la clave anónima (server-only)
src/lib/afinidad/aggregate-rules.ts         validación pura, veda, k
```

La petición a Supabase sale del servidor: Supabase ve la IP de Vercel, nunca la
de la persona.

### Cambios de la revisión de seguridad (2026-10-06)

Aplicados en `0008` (que no está aplicada en ningún proyecto remoto, así que se
editó en el sitio). Detalle y razones en `docs/AFINIDAD-SEGURIDAD.md`.

- Techo global de escrituras por minuto (`afinidad_rate_buckets` +
  `afinidad_rate_take`, internos): 600 respuestas/min y 60 suscripciones/min.
  Por encima se descarta en silencio.
- `revoke all` también en las secuencias de las columnas identity.
- `search_path` de las funciones SECURITY DEFINER fijado a `public, pg_temp`.
- `afinidad_notify.confirmed_at` (doble opt-in) y re-suscribirse tras una baja
  exige reconfirmar: `subscribe_afinidad` es pública y cualquiera puede
  escribir un correo ajeno.

### Pendiente

- ~~Envío de correos y página de baja~~ **Sustituido por el boletín (§10,
  `0011_newsletter.sql`).** `afinidad_notify` queda congelada: la app ya no la
  escribe y `0011` retira a `anon` el permiso sobre `subscribe_afinidad`. Sus
  filas (si las hubiera) **no** se copian al boletín: su casilla decía «solo
  para este aviso». **No enviar nada a filas con `confirmed_at IS NULL`.**
- Antes de publicar titulares, revisar `rate_peaks` en el panel y filtrar días
  con picos anómalos.

---

## 9. «¿A quién votar?» — registro de uso y panel interno (`0009_afinidad_events.sql`)

> Migración escrita y probada en local (PGlite, Postgres 17 en WASM, con los
> roles de Supabase simulados), **no aplicada** en ningún proyecto remoto.

### Eventos de uso: `afinidad_events`

Decisión del dueño: en vez de un proveedor externo de analítica, los eventos se
guardan en la propia base y se miran en `/admin/afinidad`.

| Columna | Qué |
|---|---|
| `event` | uno de 13 nombres fijos (CHECK): `afinidad_start`, `_complete`, `_open_shared`, `_context_declared`, `_source_open`, `_share_{whatsapp,x,telegram,copy,native}`, `_explore_{cuadrante,aprende,medidas}` |
| `props` | `jsonb` ≤ 64 bytes, solo `anon` (bool, en compartir), `from` (`resultado`/`pie`/`portada`, en explorar) o `step` (`region`/`vote`, en contexto declarado: **que** se declaró, no **qué**) |
| `locale`, `dataset_version` | idioma de la página y versión de los datos |
| `created_at` | **hora en punto** (UTC), con CHECK |

**No** guarda: respuestas, importancia, comunidad, voto habitual, partidos,
resultado, URL, referer, IP, user agent, correo, cookies ni ningún id de
persona o de sesión. Son registros de uso, no de opinión: meter cualquier dato
de opinión los convertiría en categoría especial (art. 9 RGPD) y, al ir con
hora e idioma, en algo más fácil de reidentificar que `afinidad_responses`.

**Sin id de sesión, a propósito.** Un id aleatorio por pestaña daría el embudo
por persona, pero encadenaría todos los eventos de una visita (secuencia +
hora + idioma ≈ huella). El embudo agregado (terminados / empezados) basta.

**Sin consentimiento previo**, porque no se guarda ni se lee nada en el
dispositivo (no hay cookies ni `localStorage` para esto: art. 5.3 ePrivacy no
aplica) y los datos no identifican a nadie. Aun así, con Global Privacy
Control o Do Not Track activos, `track()` no envía nada. La metodología lo
explica («Qué registramos del uso»).

Escritura: `record_afinidad_event(p_event, p_props, p_locale, p_dataset_version)`
y `record_afinidad_events(p_locale, p_dataset_version, p_events jsonb)` (lote
≤ 20, ≤ 4 KB, todo o nada), SECURITY DEFINER, concedidas a `anon`. Validan
nombre, propiedades por evento, tipos y valores, y aplican un techo global de
3000 eventos/min.

Cadena: `track()` (`src/lib/afinidad/track.ts`, cola + `sendBeacon`/`fetch
keepalive`, nunca bloquea) → `POST /api/afinidad/event` (mismo origen, 30
envíos/min por IP en memoria, ≤ 4 KB, zod) → `record_afinidad_events` con la
clave anónima. En desarrollo la ruta no escribe salvo `AFINIDAD_EVENTS_DEV=1`.

**Por qué Postgres no limita por IP:** a través de PostgREST la base ve la IP
del servidor de Vercel; `x-forwarded-for` llega como cabecera que cualquiera
que llame directamente a la API puede inventarse. El límite por cliente vive en
la ruta (con la IP que fija el borde de Vercel, solo en memoria y un minuto) y
la base solo pone un techo global que acota el crecimiento.

### Panel interno: `/admin/afinidad`

Sin clave de servicio en la app. La autorización vive en la base:

| Objeto | Para qué | Quién |
|---|---|---|
| `afinidad_admin_tokens` | tokens largos (`afa_` + 64 hex, 244 bits), guardados como SHA-256, con `expires_at` (≤ 366 días), `revoked_at`, `last_used_at` | nadie con la clave pública |
| `afinidad_admin_sessions` | sesiones de 30 min (`afs_…`), también como hash | nadie con la clave pública |
| `afinidad_admin_login(p_token)` → `text` | canjea token por sesión; `NULL` si no vale | `anon` |
| `afinidad_admin_stats(p_session, p_from, p_to)` → `jsonb` | todas las cifras del panel; `NULL` sin sesión válida | `anon` |
| `afinidad_admin_logout(p_session)` | cierra la sesión | `anon` |
| `afinidad_admin_issue_token(p_label, p_valid_for)` | emite un token y lo devuelve en claro **una vez** | solo rol de servicio |
| `afinidad_admin_revoke_token(p_label)` | revoca y borra sus sesiones | solo rol de servicio |

Bloqueo: más de 20 intentos fallidos (login o sesión) en 15 minutos cierran el
acceso **a todo el mundo** hasta que baja el contador (ámbito `admin_fail` de
`afinidad_rate_buckets`). Con 244 bits la fuerza bruta es inviable; el bloqueo
corta el ruido y deja rastro. Contrapartida: alguien con la clave anónima
podría mantener al dueño fuera; se arregla vaciando el contador (abajo).

Qué devuelve `afinidad_admin_stats`: eventos por día, idioma, versión y
propiedad dentro del rango (≤ 366 días); respuestas totales, por día y por
versión; voto habitual, comunidad y su cruce **solo con k ≥ 20 y siempre sobre
todo el histórico** (no sobre el rango, para que restar dos rangos no aísle a
nadie; los «no declara» no salen como celda); y el máximo por minuto de cada
techo global por día.

Flujo en la app: formulario → server action (`src/app/admin/afinidad/actions.ts`)
→ `afinidad_admin_login` → cookie `__Host-afinidad_admin` (httpOnly, Secure,
SameSite=Strict, Path=/, 30 min) con la **sesión**, no el token → la página
(Server Component, sin componentes cliente) llama a `afinidad_admin_stats`.
`/admin` queda fuera de la redirección de idioma y lleva `X-Robots-Tag:
noindex`, `Cache-Control: no-store`, `Referrer-Policy: no-referrer` y
`X-Frame-Options: DENY` (`src/middleware.ts`).

#### Crear, revocar y desbloquear (editor SQL de Supabase)

```sql
-- Crear un token para un dispositivo (válido 30 días; máx. 366). Se muestra
-- UNA vez: cópialo a un gestor de contraseñas. La base guarda solo su hash.
select public.afinidad_admin_issue_token('yasser-portatil', interval '30 days');

-- Ver qué tokens hay (sin secretos).
select label, created_at, expires_at, revoked_at, last_used_at
from public.afinidad_admin_tokens order by created_at desc;

-- Revocar (corta también las sesiones abiertas con él).
select public.afinidad_admin_revoke_token('yasser-portatil');

-- Rotar: revocar y emitir otro con una etiqueta nueva.
select public.afinidad_admin_revoke_token('yasser-portatil');
select public.afinidad_admin_issue_token('yasser-portatil-2', interval '30 days');

-- Desbloquear tras un bloqueo por intentos fallidos.
delete from public.afinidad_rate_buckets where scope = 'admin_fail';
```

### Retención

`afinidad_purge(p_event_days default 180, p_response_days default 730)`, solo
rol de servicio, programada con pg_cron cada noche (`afinidad-purge`, 03:17
UTC):

| Datos | Plazo |
|---|---|
| `afinidad_events` | 180 días |
| `afinidad_responses` | 730 días — **propuesta pendiente de confirmar por el dueño**; `select public.afinidad_purge(180, null)` la desactiva |
| `afinidad_rate_buckets` | 2 días |
| sesiones de admin caducadas | al momento |
| tokens de admin caducados o revocados | 30 días después |
| `afinidad_notify` dadas de baja | 30 días después de la baja (tabla congelada desde `0011`) |

```sql
select public.afinidad_purge();            -- a mano, con los plazos por defecto
select * from cron.job where jobname = 'afinidad-purge';
```

### Código

```
src/lib/afinidad/events.ts          lista blanca y limpieza de propiedades (cliente y servidor)
src/lib/afinidad/event-schema.ts    zod del lote (servidor)
src/lib/afinidad/track.ts           cola, beacon, GPC/DNT
src/lib/afinidad/rate-limit.ts      límite por cliente en memoria
src/lib/afinidad/events-server.ts   escritura (server-only)
src/lib/afinidad/rpc.ts             fetch a las RPC con la clave anónima (server-only)
src/lib/afinidad/admin.ts           login / stats / logout (server-only)
src/lib/afinidad/admin-rules.ts     cookie, formatos, lectura del JSON, resumen
src/app/api/afinidad/event/route.ts
src/app/admin/afinidad/{page,actions}.ts(x)
```

---

## 10. «Novedades de Libertarios.eu» — boletín (`0011_newsletter.sql`)

> Migración escrita y probada en local (PGlite, Postgres 17 en WASM, con los
> roles y privilegios por defecto de Supabase simulados: 61 comprobaciones),
> **no aplicada** en ningún proyecto remoto.

Decisión del dueño (2026-10-07): un único boletín, enviado con **Brevo**, que se
ofrece *después* del resultado del test, en el formulario de registro y en el
pie. Se reaprovechan los correos de los simpatizantes ya registrados, siempre
con un correo de re-permiso primero.

### Tabla `newsletter_subscribers`

| Columna | Qué es |
|---|---|
| `email` | en minúsculas, único |
| `consent_at` | cuándo marcó la casilla (importados: cuándo se registraron) |
| `consent_text_version` | versión del texto aceptado: `NEWSLETTER_CONSENT_VERSION` (`nl-2026-10-07`) o, en importados, `LEGACY_CONSENT_VERSION` (`registro-2026-10`) — `src/lib/newsletter/schema.ts` |
| `source` | `test` \| `registro` \| `footer` \| `legacy_affiliate` |
| `locale` | idioma de la página (es, ca, gl, eu, pt, fr, it, de); plantilla en es/ca/gl/eu, el resto cae a es |
| `confirmed_at` | doble opt-in. **Solo se escribe a filas con `confirmed_at` y sin `unsubscribed_at`** |
| `unsubscribe_token` | UUID del enlace de baja; solo viaja en los correos |
| `unsubscribed_at` | baja; la fila se conserva como lista de supresión |
| `confirm_token_hash`, `confirm_sent_at`, `confirm_expires_at` | operativas del doble opt-in: SHA-256 del token del enlace (el token en claro solo está en el correo), cuándo se envió y hasta cuándo vale (7 días; importados 30) |

**Qué no guarda, a propósito:** respuestas, resultado, voto habitual,
comunidad/provincia, posición, ni ningún id que la cruce con `affiliates*` o
`afinidad_*` (no hay ninguna clave ajena). No se segmenta por ideología.

### Clave de servidor (`newsletter_config`)

La función de alta devuelve el token de confirmación al servidor para meterlo
en el correo. La clave anónima es pública: si bastara con ella, cualquiera
podría pedir el token de una dirección ajena y confirmarla, y el doble opt-in
no valdría nada. Por eso las tres funciones públicas exigen además
`p_server_key`, que la app lee de `NEWSLETTER_SERVER_KEY` y de la que la base
guarda solo el SHA-256 (una fila en `newsletter_config`).

```sql
-- Rol de servicio (editor SQL de Supabase). Devuelve la clave UNA vez.
select public.newsletter_issue_server_key();   -- → nlk_… a Vercel: NEWSLETTER_SERVER_KEY
-- Volver a ejecutarla rota la clave (la anterior deja de valer al momento).
```

### Funciones

| Función | Quién | Devuelve | Notas |
|---|---|---|---|
| `subscribe_newsletter(p_server_key, p_email, p_consent, p_source, p_locale, p_consent_text_version)` | `anon` + clave de servidor | `(confirm_token, unsubscribe_token)` o ninguna fila | solo `test`/`registro`/`footer`; fila confirmada → nada (no se altera); ≤ 1 correo de confirmación cada 10 min por dirección; techo 60/min (`afinidad_rate_take('newsletter')`) |
| `confirm_newsletter(p_server_key, p_token)` | `anon` + clave | `(email, locale)` o nada | token de un solo uso; caduca; techo 300/min |
| `unsubscribe_newsletter(p_server_key, p_token uuid)` | `anon` + clave | correo o `NULL` | idempotente; anula también un token de confirmación pendiente |
| `newsletter_export()` | **solo servicio** | `(email, locale, source, confirmed_at)` confirmados y sin baja | para volcar o resincronizar la lista de Brevo |
| `newsletter_legacy_counts()` | **solo servicio** | JSON de recuentos | modo prueba de la importación |
| `newsletter_import_legacy_affiliates(p_consent_text_version)` | **solo servicio** | nº importados | correos de `affiliates` no borrados y no sintéticos (`seed_batch is null`); `on conflict do nothing` |
| `newsletter_issue_legacy_tokens(p_limit)` | **solo servicio** | lote de tokens en claro | para el script; 1–200 |
| `newsletter_release_legacy_token(p_email)` | **solo servicio** | — | devuelve a pendiente si el envío falló |
| `newsletter_purge()` | **solo servicio** / pg_cron (`newsletter-purge`, 03:27 UTC) | recuentos | ver retención |
| `newsletter_issue_server_key()` | **solo servicio** | clave en claro | |
| `newsletter_key_ok`, `newsletter_new_confirm_token` | nadie (internas) | | |

Todas `SECURITY DEFINER` con `search_path = public, pg_temp` (o
`pg_catalog, pg_temp`). RLS activo sin políticas y `revoke all` a `anon` y
`authenticated` en las dos tablas y en la secuencia.

### Retención

| Datos | Plazo |
|---|---|
| altas web sin confirmar | se borran 30 días después del último intento |
| importados que no confirman (token de 30 días caducado) | pasan a baja (`unsubscribed_at`), no se borran: así una reimportación no les vuelve a escribir |
| bajas | se conservan (correo y fecha) como lista de supresión, mientras exista el boletín |
| confirmados | mientras no se den de baja |

### Simpatizantes ya registrados

Su casilla de registro decía «se guarde mi correo con el fin de que
Libertarios.eu pueda escribirme… Escribimos poco y solo sobre esto, y te das de
baja cuando quieras». El primer contacto es **siempre** un correo de re-permiso
y quedan sin confirmar hasta que pulsen. Nada se envía solo:

```bash
# Prueba (por defecto): solo recuentos, no escribe ni envía.
SUPABASE_SERVICE_ROLE_KEY=… npm run newsletter:import-affiliates
# Copia los correos como legacy_affiliate, sin confirmar. No envía.
SUPABASE_SERVICE_ROLE_KEY=… npm run newsletter:import-affiliates -- --import
# Copia y envía el re-permiso por lotes (por defecto 25 por lote, 400 ms entre
# correos y 300 por ejecución; --batch= --delay-ms= --limit=).
SUPABASE_SERVICE_ROLE_KEY=… BREVO_API_KEY=… BREVO_SENDER_EMAIL=… \
  npm run newsletter:import-affiliates -- --send
```

`SUPABASE_URL` (y `NEXT_PUBLIC_SITE_URL` para los enlaces) se leen de
`.env.local` si existe. La clave de servicio solo se pasa en la orden: no va a
Vercel ni a `.env.local`. El script no imprime ninguna dirección. Si fallan 5
envíos seguidos se para y devuelve esos correos a pendiente. Solo admite la
clave de servicio vía PostgREST (no `SUPABASE_DB_URL`: no hay cliente `pg` en
el proyecto).

### Brevo

`src/lib/newsletter/brevo-core.ts` (fetch a `https://api.brevo.com/v3`, sin
estado) y `brevo.ts` (`server-only`, lee el entorno). Correo transaccional para
la confirmación (`POST /smtp/email`, con `List-Unsubscribe` y
`List-Unsubscribe-Post: List-Unsubscribe=One-Click`), y al confirmar se añade el
contacto a la lista `BREVO_LIST_ID` (`POST /contacts`, solo el correo, ningún
atributo); al darse de baja se quita (`/contacts/lists/{id}/contacts/remove`).
Sin `BREVO_API_KEY`/`BREVO_SENDER_EMAIL`: aviso en el log, la fila queda sin
confirmar, no se envía nada y no se lanza ningún error.

Las bajas hechas desde un enlace de baja *de Brevo* (en campañas) quedan en
Brevo, no en la base: antes de cada exportación o envío, cruzar con la lista
de bajas de Brevo.

### Código

```
supabase/migrations/0011_newsletter.sql
src/lib/newsletter/schema.ts           zod, versiones del texto, formato de tokens (puro)
src/lib/newsletter/subscribers.ts      RPC con la clave anónima + NEWSLETTER_SERVER_KEY (server-only)
src/lib/newsletter/brevo-core.ts       cliente Brevo sin estado
src/lib/newsletter/brevo.ts            Brevo desde Next (server-only)
src/lib/newsletter/email.ts            correo de confirmación / re-permiso (es, ca, gl, eu)
src/lib/newsletter/legacy-import.ts    lógica de la importación (pura)
scripts/newsletter-import-affiliates.ts
src/i18n/newsletter.ts                 textos (es, ca, gl, eu; el resto cae a es)
src/app/[locale]/novedades/actions.ts  subscribeNewsletter, confirmNewsletter, unsubscribeNewsletter
src/app/[locale]/novedades/{confirmar,baja}/page.tsx   noindex, no-referrer; confirmar/baja con botón (POST)
src/app/api/newsletter/unsubscribe/route.ts            baja de un clic (RFC 8058)
src/components/newsletter/NewsletterForm.tsx           resultado del test, pie (FooterNewsletter)
src/components/RegistrationForm.tsx                    casilla aparte en el paso 4
```
