# «¿A quién votar? Objetivamente» — plan de diseño

Diseño cerrado el 2026-10-06. Nombre interno del módulo en código: `afinidad`. Slug público: `/a-quien-votar` (ruta nueva en el sitio, con layout propio y neutro; **no** subdominio ni dominio aparte).

Promesa en una frase: *«15 afirmaciones, 3 minutos: qué partido dice lo que tú piensas y cuál lo ha votado»*.

## ⚠️ Actualización 2026-10-06 (prevalece sobre lo que contradiga más abajo)

1. **Elección: generales del 29-N-2026.** Real Decreto 806/2026 (BOE 6-oct); campaña 13–27 nov. Lanzamiento objetivo: **27-oct**. Los programas de 2026 aún no existen (listas hasta 26-oct): se usan los **programas de 2023 con etiqueta visible «programa 2023 — se actualizará con el de 2026»**, y se rehace por diff cuando salgan. `Source.date`/`year` obligatorio en cada cita.
2. **Partidos**: con escaño en el Congreso XV (incluye Compromís, en el Mixto) + **coaliciones registradas para el 29-N que los integren** (p. ej. «Frente Amplio» = Sumar+IU+Más Madrid+Comuns; `status: "por-confirmar"` hasta su registro; historial atribuido al grupo GSUMAR y dicho así) + extraparlamentarios que cumplan el criterio del dueño (escaño en PE o parlamento autonómico, o ≥ 1 % en 2023). Podemos, BNG, CC, UPN y Compromís no tienen código de grupo propio: **voto atribuido por diputado** (tabla diputado→partido con fuente).
3. **Escala: 4 puntos + «paso»** (Muy en contra / En contra / A favor / Muy a favor / No sé). Sin punto medio. Valores de usuario ∈ {−2, −1, 1, 2}.
4. **Métrica: acuerdo direccional** (sustituye a `1 − |a−s|/4`, que en simulación da al centro el 72 % de victorias y castiga sistemáticamente a los extremos de ambos lados):
   - ~~mismo signo → `1 − |u − p| / 8`; signo opuesto → `0`; partido con `0` explícito → `0.5`~~ → desde 2026.10.2 (queja: la intensidad casi no contaba), **`acuerdo = (1 − |u − p| / 4) × lado`**, lado = 1 mismo signo, ½ partido en `0` explícito (abstención/ambivalencia textual), 0 signo opuesto. +1 frente a +2 = 0,75 (antes 0,875); partido en 0 = 0,375 frente a ±1 y 0,25 frente a ±2 (antes 0,5 siempre). Se mantiene lo que justificó la métrica direccional: sin sesgo de centro (un partido ficticio «todo 0» gana al 0 % de los usuarios sintéticos; antes al 3–4 %), votante perfecto 1.º, simetría y dominancia por comunidad en 2–35 %. Simulación de las candidatas descartadas (desacuerdo graduado, peso por intensidad) en `AFINIDAD-CAMBIOS.md`, versión 2026.10.2.
   - afinidad = Σ w·acuerdo / Σ w, w ∈ {1, 2} (importancia).
   - ~~Cobertura mínima 70 %~~ → desde el 2026-10-07, **al menos `MIN_LENS_ITEMS` = 5 respuestas con dato por lente**, con «basado en X de Y respuestas» junto a cada barra y la cifra encogida hacia el neutro (`SHRINK_K` = 3); **mínimo 8 respuestas** para dar resultado.
   - Test adicional: **dominancia** — 10 000 usuarios aleatorios uniformes + 10 000 moderados sintéticos sobre el dataset; ningún partido gana > 35 % ni < 2 % (avisa en local, falla con `STRICT=1`). Test: partido con 3 posiciones coincidentes no supera a uno con 15 al 90 %.
   - Ranking por defecto: media de programa y hechos si ambas existen, solo programa si no hay historial (la UI lo dice). Titular siempre con las dos cifras por separado.
5. **Hemeroteca (petición del dueño)**: además de programa y votación, cada celda puede llevar **citas tipo hemeroteca**: lo que dijo el partido/portavoz, con fecha y fuente. Fuente preferida: **Diario de Sesiones del Congreso** (intervención en el debate de la votación ancla, con enlace al PDF y, si existe, al vídeo de la intervención en congreso.es); después notas de prensa oficiales del partido; prensa solo con enlace y como último recurso. **No puntúan**; se muestran en «Promesa vs. hechos» y en el detalle por pregunta («Lo que dijeron» → «Lo que votaron»). Tipo nuevo:
   ```ts
   export interface Quote { partyId: string; questionId: string; speaker: string; role?: string; date: string;
     text: string /* literal ≤ 50 palabras */; source: Source & { kind: "diario-sesiones"|"video-congreso"|"partido"|"prensa" };
     videoUrl?: string; videoStart?: string; contrastsWithRecord?: boolean; }
   ```
   Ficheros: `src/data/afinidad/hemeroteca/<party>.ts`.
7. **Enlaces con el resto del sitio (petición del dueño, sustituye a «ningún enlace al cuadrante»)**: el test y su resultado se enlazan con el sitio en los dos sentidos. Al final del resultado (después del detalle, nunca antes del ranking), bloque «Sigue explorando», etiquetado como «Otros tests de Libertarios.eu»: test del cuadrante (posición política), «Desafía tus creencias» / Aprende, y comparativas de medidas. Desde el sitio: portada y resultado del cuadrante invitan a «¿A quién votar? Objetivamente». El flujo del test (intro → preguntas → ranking) sigue sin cabecera libertaria.
6. **Agregados y LOREG art. 69.7**: se guardan (decisión del dueño), pero **ningún agregado «qué partido gana» se publica entre el 24 y el 29-nov** (veda de sondeos). El código bloquea la publicación en esa ventana. Titulares tipo «el N % de votantes de X coincide con Y en vivienda» solo fuera de la veda y con k ≥ 20, avisando de que no es muestra representativa.

## Decisiones del dueño (vinculantes)

| # | Decisión |
|---|---|
| Elección | **Generales 2027** (como tarde 22-8-2027). Modelo preparado (`scope`, `regions`) para añadir autonómicas después. |
| Partidos | **Todos con escaño en el Congreso (XV)**: PSOE, PP, Vox, Sumar, Podemos, ERC, Junts, EH Bildu, PNV, BNG, CC, UPN. **Más extraparlamentarios que cumplan un criterio objetivo y publicado**: escaño en el Parlamento Europeo o en algún parlamento autonómico, **o** ≥ 1 % del voto en las generales de 2023. El P-LIB entra **solo si cumple el criterio** (no por ser el sitio matriz); la metodología lo dice explícitamente. Extraparlamentarios sin historial en el Congreso se evalúan solo por programa (y por votaciones en PE/parlamentos autonómicos si las hay y son verificables); la UI lo indica. |
| Marca | Ruta `/[locale]/a-quien-votar` con layout propio, paleta neutra y sin la cabecera/nav libertaria. Pie: «Un proyecto de Libertarios.eu · No afiliado a ningún partido · Metodología · Datos abiertos · Corregir un dato». Ningún enlace al cuadrante ni al registro de simpatizantes desde el flujo. |
| Muro | **Sin muro.** Resultado visible sin correo. Al final, opcional: «Avísame cuando cambien los programas», en lista/tabla **separada** de la de simpatizantes (no usar `register_affiliate`). |
| Preguntas | **15** en escala de 5 + «No sé / saltar» + toggle «Esto me importa» (peso ×2). |
| Rigor | **Solo puntúa lo verificado con fuente abierta.** Huecos visibles («datos insuficientes») antes que datos inventados. Regla dura del repo: no inventar datos. |
| Idiomas | **castellano, catalán, gallego y euskera** al lanzar. Las traducciones de enunciados son sensibles: se marcan como «pendiente de revisión humana» en `docs/AFINIDAD-CAMBIOS.md` hasta que una persona las revise. |
| Agregados | **Sí**: respuestas anónimas + «¿a quién sueles votar?» opcional. Sin correo, sin IP, fecha truncada a día, publicación solo con k ≥ 20. Texto de consentimiento claro. |

## 1. Producto

**Cuestionario**
- Dos pasos de contexto opcionales y saltables al inicio: comunidad autónoma (activa partidos regionales) y «¿A quién sueles votar?» (anónimo). Ambos con «Prefiero no decirlo».
- 15 afirmaciones; reutilizar el patrón de `QuadrantTest.tsx` (teclas 1-5, 6 = saltar, foco al enunciado, progreso, autoavance 180 ms, fase de revisión).
- Redacción: un asunto por ítem, sin argumentar, sin marcos cargados; en cada ítem ≥ 2 partidos a cada lado; ningún partido es «el +2 de todo». **Cada ítem corresponde a una votación ancla real del Congreso** (o acción de gobierno en BOE); si no, no entra.
- Temas candidatos (la lista final la fija WP2 según existan votaciones): vivienda/topes al alquiler, impuesto a grandes fortunas, IRPF, SMI, regularización de inmigrantes, amnistía/modelo territorial, nuclear, eutanasia, ley trans, gasto en defensa/OTAN, jornada 37,5 h, pensiones, concertada, lengua vehicular, financiación autonómica.

**Resultado** (tarjetas en este orden)
1. Ranking con **dos barras por partido: Programa y Hechos**. Cobertura < 60 % de tus respuestas → atenuado con «datos insuficientes», nunca 0.
2. **Tu sorpresa**: el partido fuera de tu bloque (bloque del voto habitual declarado o, si no, del 1.º del ranking) con mayor afinidad en un tema concreto. «En vivienda coincides más con X que con tu partido habitual».
3. **Donde tu partido te contradice** (si declaró voto habitual): las 3 preguntas de mayor distancia, con la fuente a un clic.
4. **Promesa vs. hechos**: para los 3 primeros, brecha media |programa − hechos| y los ítems donde prometen una cosa y votaron otra, citando la votación.
5. **Compartir**: respuestas codificadas en la URL (sin base de datos, patrón `PolicyQuiz`), WhatsApp/X/Telegram/copiar (extraer de `QuadrantResults` a `ShareButtons`).
6. **Revisión**: las 15 preguntas con «ver fuentes» por partido.
7. Opcional: «Avísame cuando cambien los programas».

**OG**: `src/app/api/og/afinidad/route.tsx` (`ImageResponse`, lee `?r=`): top-3 con barras programa/hechos + «mi sorpresa». Sin logos de partidos (marcas): color + siglas.

**Credibilidad**: datos abiertos (`/a-quien-votar/datos` + `/api/afinidad/datos.json`, CC BY), fuente por celda, metodología con el algoritmo y los tests, simetría verificable por máquina, buzón de correcciones con registro público (`docs/AFINIDAD-CAMBIOS.md`), criterio de inclusión de partidos publicado.

Textos de resultado sin adjetivos valorativos: cada partido se describe por lo que dice y vota, no por lo que «es».

## 2. Modelo de datos

Estático y versionado en git, `src/data/afinidad/`. Supabase solo para agregados anónimos.

```ts
// src/data/afinidad/types.ts
export type Scope = "estatal" | "autonomica";
export type Lang = "es" | "ca" | "gl" | "eu";
export interface Party {
  id: string; name: string; short: string; color: string; initials: string;
  scope: Scope; regions?: string[];      // códigos INE de CCAA donde se presentan (regionales)
  bloc: "izquierda" | "derecha" | "nacionalista" | "otro"; // solo para «tu sorpresa»; criterio en metodología
  parliamentary: boolean;                 // escaño en Congreso XV
  inclusionReason: string;                // qué rama del criterio cumple, con fuente
  inclusionSource: Source;
  congressGroup?: string;                 // nombre del grupo en el JSON de congreso.es
  inGovernment?: { from: string; to?: string; level: "estatal" }[];
}
export interface Question {
  id: string; order: number; topic: string;
  text: Record<"es", string> & Partial<Record<Exclude<Lang,"es">, string>>;
  rationale: string;                       // qué mide; se muestra en revisión
  anchors: Array<{ legislature: "XIV"|"XV"; session: number; date: string; number: number; title: string; url: string; agreeMeans: "si" | "no" }>;
}
export type Position = -2 | -1 | 0 | 1 | 2;
export type Confidence = "alta" | "media" | "baja";
export type Status = "verificado" | "pendiente" | "sin-posicion" | "contested";
export interface Source { url: string; title: string; date?: string; page?: string; archiveUrl?: string; }
export interface ProgrammeStance {
  position: Position; status: Status; confidence: Confidence;
  quote: string;          // literal, ≤ 60 palabras; obligatoria si verificado
  source: Source;         // programa oficial, con página
  note?: string;          // si pendiente: qué se buscó
  reviewer?: { position: Position; agrees: boolean };
}
export interface RecordStance {
  position: Position; status: Status; confidence: Confidence;
  evidence: Array<
    | { kind: "votacion"; legislature: "XIV"|"XV"; session: number; date: string; number: number;
        title: string; groupVote: "si"|"no"|"abstencion"|"ausente"; url: string; }
    | { kind: "boe"; reference: string; title: string; url: string; date: string; role: "gobierno"|"apoyo" }
    | { kind: "otro-parlamento"; chamber: string; title: string; date: string; vote: "si"|"no"|"abstencion"; url: string }
  >;
  note?: string;
}
export interface Stance { partyId: string; questionId: string; programme: ProgrammeStance | null; record: RecordStance | null; }
export const DATASET_VERSION = "2026.10.0";
```

- `sin-posicion`/`null` excluye la celda; se muestra «sin posición», no 0.
- `pendiente` nunca puntúa. El esquema zod falla si una celda `verificado` no tiene cita+URL (programa) o `evidence[0].url` (hechos).
- Regionales: siempre en el JSON abierto; se muestran si la CCAA declarada coincide o con «ver todos».
- `contested` (desacuerdo > 1 entre codificador y revisor ciego): puntúa con la media, se marca en la UI.
- Ficheros: `src/data/afinidad/{types,parties,questions,index}.ts`, `stances/programme/<party>.ts`, `stances/record/<question>.ts`; `index.ts` los une.
- Docs: `docs/AFINIDAD-DATOS.md` (reglas de codificación: qué es +2, qué es 0, cómo se mapea un voto), `docs/AFINIDAD-CAMBIOS.md`.
- Los enlaces compartidos llevan `?v=` con la versión del dataset; si cambió, se recalcula avisando.

## 3. Algoritmo (`src/lib/afinidad/score.ts`, puro)

```
answers: Record<qid, {value: -2..2, important: boolean} | "skip">; lens: "programme" | "record"
para cada partido p:
  items = respondidas donde p tiene stance[lens] verificado o contested
  agreement_q = 1 − |a_q − s_pq| / 4
  w_q = important ? 2 : 1
  score_p = Σ w·agreement / Σ w
  coverage_p = |items| / |respondidas|;  usable_p = coverage_p ≥ 0.6
ranking: score desc → coverage desc → alfabético; empates exactos marcados tie.
```
- Programa y Hechos se muestran por separado, nunca mezclados. Orden por defecto: Hechos si cobertura ≥ 60 %, si no Programa; el usuario alterna.
- Coherencia del partido: `1 − media|programme − record|/4` sobre celdas con ambos.
- Neutral (0) es respuesta; skip no cuenta.
- URL (`encode.ts`): 15 caracteres (`0-4` valor, `s` skip) + bitmask de importancia en base36 + `v=` + contexto opcional; decodificar validando rango.

**Tests** (`src/test/afinidad-score.test.ts`, `src/test/afinidad-dataset.test.ts`):
1. Votante perfecto de P (por lente) → P 1.º con 100 %. Partidos indistinguibles → el test lo señala.
2. Votante opuesto de P → P último entre usables.
3. Simetría: negar respuestas y posiciones no cambia el ranking.
4. «De acuerdo con todo» / «todo neutral»: 1.º − mediana ≤ 15 puntos.
5. Equilibrio por ítem: ≥ 2 partidos > 0 y ≥ 2 < 0.
6. Equilibrio por partido: ningún partido con todas sus posiciones del mismo signo.
7. Cobertura por bloque dentro de ±20 %.
8. Esquema: `verificado` con cita+URL; URLs de votación con patrón congreso.es; `pendiente` fuera del cálculo.
9. Skip no finge moderación; cobertura < 60 % → no usable; empates deterministas.
10. Encode/decode ida y vuelta; entradas corruptas rechazadas.

## 4. Investigación (sin inventar)

La unidad es la celda partido×pregunta y solo existe con fuente que un humano pueda abrir.

1. **Cuestionario (WP2)**: ~20 candidatos → 15, cada uno con votación ancla del Congreso (ley de vivienda 2023, impuesto grandes fortunas 2022, amnistía 2024, eutanasia 2021, ley trans 2023, jornada 37,5 h, etc.). Verificar en congreso.es open data: `https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion{N}/{AAAAMMDD}/Votacion{NNN}/` (JSON/XML).
2. **Programas (WP3)**: programa oficial de generales 2023 (y 2027 cuando se publique). Por celda: posición, cita literal, página, URL del PDF, URL Wayback. Prohibido: prensa, declaraciones, Wikipedia como fuente de posición. Si no trata el asunto: `sin-posicion`.
3. **Hechos (WP4)**: por votación ancla, descargar el JSON, voto por grupo, mapeo grupo→partido (Podemos en Mixto desde dic-2023; UPN, CC, BNG en Mixto; Sumar plurinacional), regla de `AFINIDAD-DATOS.md` (sí a favor del sentido del ítem = +2, abstención = 0, no = −2, ausencia = sin dato). Gobierno: referencia BOE.
4. **Validador (WP5)**: `scripts/verify-afinidad-sources.ts` comprueba URLs vivas, patrón de votaciones, cita presente en el PDF cuando sea extraíble; informe de pendientes/contested.
5. **Revisión ciega**: segundo agente codifica sin ver la posición; desacuerdo > 1 → `contested`.
6. **Publicación**: `datos.json` generado desde TS.

Instrucción literal para agentes de datos: *«Si no encuentras la fuente, escribe `status: "pendiente"` y en `note` qué buscaste. No completes huecos por coherencia ideológica. Una celda vacía es correcta; una celda inventada rompe el proyecto.»*

## 5. Arquitectura

```
src/app/[locale]/a-quien-votar/
  layout.tsx            # cabecera/pie propios, .theme-afinidad, metadata y OG propios
  page.tsx              # intro: promesa, 3 minutos, no afiliación, CTA
  test/page.tsx         # contexto opcional → 15 preguntas → revisión
  resultado/page.tsx    # lee ?r=&v=, calcula en cliente, tarjetas
  metodologia/page.tsx  # algoritmo, criterios, criterio de inclusión de partidos, tests, cambios
  datos/page.tsx        # tabla partido×pregunta con fuentes; enlace al JSON
  partidos/[id]/page.tsx
  actions.ts            # server actions: agregado anónimo, «avísame»
src/app/api/afinidad/datos.json/route.ts
src/app/api/og/afinidad/route.tsx
src/data/afinidad/...
src/lib/afinidad/{score,encode,schema,storage,select,aggregate}.ts
src/components/afinidad/*.tsx
src/components/ShareButtons.tsx   # extraído de QuadrantResults
supabase/migrations/00NN_afinidad.sql   # respuestas anónimas + vista k≥20 + RPC SECURITY DEFINER para anon + tabla de avisos separada
scripts/verify-afinidad-sources.ts, scripts/gen-afinidad-json.ts
```
- Estado: URL + `localStorage` (`libertarios:afinidad`, patrón de `src/lib/results/storage.ts`).
- Analítica: sin cookies (Plausible/Umami), eventos `afinidad_start|complete|share_{canal}|source_open|context_declared`. Si no hay proveedor configurado, dejar un `track()` no-op con los eventos cableados.
- i18n: interfaz en `dictionaries/*.ts` bajo clave `afinidad`; enunciados en el dataset (`text.es/ca/gl/eu`) con caída a `es`. Añadir `gl` y `eu` como locales: el resto del sitio puede caer a castellano, pero el módulo debe estar completo en los cuatro.

## 6. Paquetes de trabajo

| WP | Alcance | Ficheros que posee |
|---|---|---|
| WP0 Contratos | tipos, esquema zod, fixture (3 partidos × 5 preguntas), `AFINIDAD-DATOS.md` | `src/data/afinidad/types.ts`, `src/lib/afinidad/schema.ts`, `src/test/fixtures/afinidad-sample.ts`, `docs/AFINIDAD-DATOS.md` |
| WP1 Motor | score, encode, select, tests 1-10 | `src/lib/afinidad/{score,encode,select}.ts`, `src/test/afinidad-score.test.ts` |
| WP2 Cuestionario + partidos | 15 ítems con votación ancla verificada; lista de partidos con criterio de inclusión verificado | `src/data/afinidad/{questions,parties}.ts` |
| WP3 Programas | celdas `programme` por partido | `src/data/afinidad/stances/programme/<party>.ts` |
| WP4 Hechos | celdas `record` por votación | `src/data/afinidad/stances/record/<question>.ts` |
| WP5 Validador | verificación de fuentes, JSON abierto, scripts en package.json | `scripts/verify-afinidad-sources.ts`, `scripts/gen-afinidad-json.ts`, `src/test/afinidad-dataset.test.ts` |
| WP6 UI flujo | intro, contexto, preguntas, importancia, revisión, storage, layout y tema | `src/app/[locale]/a-quien-votar/{layout,page,test/page}.tsx`, componentes de flujo, `src/lib/afinidad/storage.ts`, `.theme-afinidad` |
| WP7 UI resultado | ranking, sorpresa, contradicciones, promesa vs hechos, fuentes, compartir, OG | `resultado/page.tsx`, componentes de resultado, `ShareButtons.tsx`, `api/og/afinidad` |
| WP8 Transparencia | metodología, datos, fichas, correcciones | `metodologia`, `datos`, `partidos/[id]`, `api/afinidad/datos.json`, `docs/AFINIDAD-CAMBIOS.md` |
| WP9 Infra + i18n | locales gl/eu, diccionarios `afinidad` ×4, analítica, migración + actions | `src/i18n/*`, `src/middleware.ts`, migración, `actions.ts`, `aggregate.ts` |

Orden: WP0+WP1 → {WP2, WP5, WP6, WP7, WP8, WP9} → {WP3, WP4} → validación → integración (fixture → dataset real, tests de equilibrio) → revisión de neutralidad del copy.

Regla: nadie toca ficheros fuera de su columna; interfaces solo vía `types.ts`; tests propios; comentarios que explican el porqué; textos en castellano como el resto del repo.
