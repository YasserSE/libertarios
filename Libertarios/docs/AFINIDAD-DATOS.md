# Afinidad — reglas de codificación de datos

Cómo se convierte un programa, una votación o una cita en una celda del dataset de «¿A quién votar? Objetivamente». Es de obligado cumplimiento para quien escriba en `src/data/afinidad/` (WP2, WP3, WP4) y es lo que publica la metodología. El contrato de tipos está en `src/data/afinidad/types.ts`; lo que se comprueba por máquina, en `src/lib/afinidad/schema.ts` y `src/lib/afinidad/checks.ts`. El plan y su actualización del 2026-10-06 están en `docs/AFINIDAD-PLAN.md`.

## 0. La regla que está por encima de todas

> **Si no encuentras la fuente, escribe `status: "pendiente"` y en `note` qué buscaste. No completes huecos por coherencia ideológica. Una celda vacía es correcta; una celda inventada rompe el proyecto.**

- «Este partido seguro que está a favor» no es una fuente. Tampoco lo es lo que vota su socio, lo que dijo en otra legislatura sobre otra cosa ni lo que «se deduce» de su ideología.
- Solo puntúan las celdas `verificado` y `contested`. `pendiente` y `sin-posicion` no puntúan nunca; la UI enseña el hueco («sin posición» / «datos insuficientes»), no un 0.
- Si una celda se codificó y después no se encuentra la fuente, se baja a `pendiente`. Nunca al revés sin fuente.

## 1. La escala

Toda posición de partido va de −2 a +2 **respecto al enunciado de la pregunta** (no respecto a izquierda/derecha):

| Valor | Significado |
|---|---|
| +2 | A favor sin reservas de lo que dice el enunciado. |
| +1 | A favor con condiciones, matices o de forma parcial. |
| 0 | Posición explícita intermedia: abstención en la votación, o el texto se declara ambivalente (p. ej. «estudiaremos», «ni sí ni no» dicho expresamente). **No** es «no lo menciona». |
| −1 | En contra con condiciones, matices o de forma parcial. |
| −2 | En contra sin reservas. |

La persona usuaria responde en 4 puntos (−2, −1, +1, +2) más «No sé». El 0 solo existe para partidos, y el motor lo trata como medio acuerdo (0,5) con cualquier respuesta.

## 2. Programa (`ProgrammeStance`, WP3)

**Fuente válida**: solo el programa electoral oficial del partido para las generales (PDF o web oficial del partido). Mientras no existan los de 2026 se usan los de 2023, con `source.year: 2023` y la UI lo indica («programa 2023 — se actualizará con el de 2026»). Prohibido como fuente de posición: prensa, declaraciones, entrevistas, Wikipedia, webs de terceros (esas, si acaso, van a la hemeroteca; ver §5).

**Excepción (decisión del dueño): partidos sin programa propio de generales.** Los extraparlamentarios y Podemos que no tienen programa propio para las generales (no concurrieron, lo hicieron dentro de una coalición con programa común, o no se ha localizado publicado) se codifican con el **último programa oficial del partido para cualquier elección** (autonómicas, europeas, insulares…), con las mismas exigencias de cita literal, página y archivo. `source.title` dice siempre la elección y el año (p. ej. «Programa elecciones autonómicas de Castilla y León 2026») y `source.year`/`date` es el de ese programa; `note` explica por qué no se usa uno de generales («no concurrió a las generales de 2023», «concurrió dentro de Sumar sin programa propio», «no se ha localizado…»). Si para un asunto el último programa calla y otro programa oficial reciente del mismo partido sí lo trata, puede usarse ese otro con su propia fuente y diciéndolo en `note`. Un partido que sí tiene programa propio de generales usa ese, como el resto; la regla anterior («si el último programa calla…») vale también para él: Aragón Existe usa el de autonómicas de Aragón 2026 solo en vivienda, porque su programa de generales de 2023 no trata el asunto (decisión del 2026-10-06). Adelante Andalucía sí tiene programa propio de generales 2023 (concurrió por Cádiz) y está pendiente de recodificar con él.

Por celda:

- `quote`: cita **literal**, ≤ 60 palabras, copiada del documento. Sin parafrasear, sin unir frases de páginas distintas. Si hacen falta dos fragmentos, se elige el más explícito y el otro va en `note`.
- `source`: `url` del PDF o página oficial, `title`, `page` (página del PDF, no la impresa si difieren; indicarlo en `note`), `date` o `year` (obligatorio si puntúa), `archiveUrl` de Wayback Machine siempre que sea posible.
- `confidence`: `alta` si la cita trata exactamente el asunto del enunciado; `media` si lo trata de forma algo más general; `baja` si hace falta interpretar. Con `baja`, valorar si no es mejor `sin-posicion`.

Qué valor dar:

- **+2 / −2**: compromiso concreto y sin condiciones con (o contra) la medida del enunciado. «Derogaremos X», «Aprobaremos X».
- **+1 / −1**: compromiso parcial, condicionado («cuando la situación lo permita»), limitado a una parte de la medida, o dirección clara sin medida concreta.
- **0**: el texto se declara ambivalente o propone expresamente una vía intermedia sobre ese mismo asunto.
- **`sin-posicion`**: el programa no trata el asunto. Se pone `position: 0` (el campo es obligatorio) y `note` explicando qué se buscó (palabras clave, secciones leídas). Ese 0 no puntúa.
- **`pendiente`**: no se ha podido leer o localizar el programa, o la página está caída sin copia. `note` obligatoria.

### Reglas de consistencia por pregunta (2026-10-06)

Fijadas tras la revisión ciega 2 (`docs/AFINIDAD-REVISION.md`), para que el mismo tipo de frase reciba el mismo valor en todos los partidos:

- **`impuesto-grandes-fortunas`** («Debe existir un impuesto estatal específico sobre los patrimonios de más de 10 millones de euros»):
  - **+2** solo si el texto se compromete con un impuesto **estatal** específico sobre grandes patrimonios **y** fija un umbral (o cita expresamente el impuesto estatal vigente para mantenerlo).
  - **+1** si propone crear, mantener o hacer permanente un impuesto a las grandes fortunas (o a la riqueza) **sin** decir que sea estatal o **sin** umbral; también si es autonómico o europeo.
  - **−2** si propone suprimir el Impuesto sobre el Patrimonio o el de Grandes Fortunas, o **neutralizarlo** (bonificación del 99–100 %, deducción íntegra de lo pagado en otro impuesto).
  - **−1** si solo propone rebajarlo o limitarlo sin suprimirlo ni neutralizarlo.
- **`irpf-inflacion`** («Los tramos del IRPF deben actualizarse cada año con la inflación»):
  - **+2** solo si se compromete a la actualización **automática o anual** de la tarifa.
  - **+1** si pide «deflactar» la tarifa (o corregir el efecto de la inflación) **sin** decir que sea cada año, o solo el tramo autonómico.

## 3. Hechos (`RecordStance`, WP4)

Cada pregunta tiene una o varias **votaciones ancla** (`Question.anchors`) con `agreeMeans`: qué voto equivale a estar de acuerdo con el enunciado (`"si"` si votar sí es estar de acuerdo; `"no"` si el enunciado está redactado al revés que la iniciativa).

**Fuente válida**: datos abiertos del Congreso, `https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion{N}/{AAAAMMDD}/Votacion{NNN}/` (JSON/XML). El esquema exige este patrón y que legislatura, sesión, fecha y número de la URL coincidan con los campos. Acciones de gobierno: referencia BOE (`BOE-A-AAAA-NNNNN`).

### Mapeo del voto del grupo

Voto mayoritario del grupo (o de los diputados atribuidos al partido, ver abajo) en la votación ancla:

| Voto del grupo | `agreeMeans: "si"` | `agreeMeans: "no"` |
|---|---|---|
| Sí | +2 | −2 |
| No | −2 | +2 |
| Abstención | 0 | 0 |
| Ausente / no vota | **sin dato** | **sin dato** |

- **Abstención = 0**, y puntúa (es una posición expresada en el pleno).
- **Ausencia ≠ posición.** Si el grupo entero no votó, la celda no puntúa por esa votación (`pendiente` si no hay otra ancla, con `note`). El esquema rechaza una celda que puntúa y solo tiene evidencias `ausente`.
- **±1** solo cuando hay varias anclas y el partido no votó igual en todas (p. ej. sí en la toma en consideración y abstención en la votación final → +1), o cuando el voto de los diputados del partido estuvo dividido (ver disidencia). La regla aplicada se escribe en `note`.
- Si hay varias anclas, todas van en `evidence`, la más relevante primero (`evidence[0]` debe tener URL: el esquema lo exige).

### Grupo Mixto y coaliciones

- Podemos, BNG, CC, UPN, Compromís y otros sin código de grupo propio: **voto atribuido por diputado** según la tabla `deputies` (`DeputyAttribution`: diputado, partido, grupo, intervalo de fechas y fuente). La fecha de la votación debe caer dentro del intervalo (cambios de grupo, como Podemos desde diciembre de 2023).
- Recuento por partido (`tallyByParty` en `scripts/lib/congreso-vote.ts`, el mismo para `afinidad:vote` y `afinidad:verify`): (a) un partido con grupo propio recibe el voto de su grupo menos los diputados que `deputies` atribuye a otro partido en esa fecha; (b) un partido del Mixto/Plural (o sin grupo) recibe **solo** el de sus diputados atribuidos, estén en el grupo que estén (Micó cuenta para Compromís también mientras se sentaba en GSUMAR); (c) un diputado del Mixto/Plural sin atribuir no cuenta para nadie y se lista aparte («Mixto sin atribuir»).
- Si un partido votaba en otra legislatura en un grupo distinto, se declara en `Party.congressGroupByLegislature` (p. ej. Podemos, Sumar y Frente Amplio: `{ XIV: "GCUP-EC-GC" }`), y su `recordNote` lo explica.
- Coaliciones nuevas (p. ej. una coalición que integre a Sumar): el historial es el del grupo del que proceden y `Party.recordNote` lo dice tal cual («votaciones del grupo GSUMAR»). Mientras no estén registradas, `Party.status: "por-confirmar"`.

### Disidencia

- Si el partido (o sus diputados atribuidos) votó dividido, cuenta la mayoría. Si la mayoría es de menos de dos tercios, la posición se rebaja un punto hacia 0 (+2 → +1) y se anota la división en `note`.
- Empate exacto entre sí y no: 0 con `note`.
- Un diputado que rompe la disciplina no cambia la celda si la mayoría es clara; se puede mencionar en `note`.

### Gobierno (BOE)

Una medida aprobada por real decreto o acuerdo del Consejo de Ministros cuenta como +2 / −2 (según el sentido del enunciado) para los partidos en el Gobierno en esa fecha (`role: "gobierno"`, ver `Party.inGovernment`). El apoyo parlamentario externo a la convalidación se codifica con la votación de convalidación, no con el BOE.

## 4. `contested` y revisión ciega

1. El codificador pone posición, cita y fuente.
2. Un segundo agente o persona (**revisor ciego**) recibe la pregunta y la cita/votación, **sin ver la posición del codificador**, y codifica su propia posición en `reviewer.position`, con `agrees` = si coincide.
3. Si `|codificador − revisor| ≤ 1`: se queda `verificado` con la posición del codificador.
4. Si `|codificador − revisor| > 1`: `status: "contested"`. **Puntúa con la media** de ambos y la UI lo marca. El esquema exige `reviewer` y desacuerdo > 1 en `contested`, y rechaza un `verificado` con desacuerdo > 1.
5. En hechos no hay campo de revisor: el mapeo del voto es mecánico. Si una celda de hechos se marca `contested`, su `position` debe ser ya la media acordada y la discrepancia se explica en `note`.

## 5. Hemeroteca (`Quote`)

Lo que dijo el partido o su portavoz, con fecha y fuente. **No puntúa nunca**; se enseña en «Promesa vs. hechos» y en el detalle de cada pregunta («Lo que dijeron» → «Lo que votaron»).

- Fuente, por orden de preferencia: Diario de Sesiones del debate de la votación ancla (`diario-sesiones`, con PDF y página) y su vídeo en congreso.es (`videoUrl`, `videoStart`); notas de prensa oficiales del partido (`partido`); prensa (`prensa`) solo con enlace y como último recurso.
- `text` literal, ≤ 50 palabras. `contrastsWithRecord: true` solo si la cita y el voto de la misma iniciativa van en sentidos opuestos.

## 5 bis. «Dijeron vs. hicieron» (`SaidVsDid`)

Un compromiso público y lo que el partido hizo después. **No puntúa nunca.** Esquema en `saidVsDidSchema` (`schema.ts`); registro de búsqueda en `src/data/afinidad/dichos-hechos/busqueda.ts`.

- **Qué cuenta como «lo que dijeron»** (regla del dueño, 2026-10-06): solo un **compromiso real**: programa electoral, campaña, discurso de investidura, acuerdo de coalición o de investidura, o una promesa explícita sobre lo que el partido hará («presentaremos», «no apoyaremos», «votaremos sí cuando…»).
- **Nunca** una intervención en el **mismo debate** de la votación con la que se compara: eso es anunciar el voto, no comprometerse.
- **No hay plazo mínimo** entre lo dicho y lo hecho. Una promesa de investidura incumplida once días después cuenta (`pp-irpf-2011`). La regla de «al menos 30 días» que aplicó la revisión ciega era un error y se ha corregido (ver `docs/AFINIDAD-REVISION.md`).
- Lo que se hizo tiene que ser posterior (o del mismo día) a lo que se dijo y tener al menos una prueba enlazada: votación del Congreso (mismo patrón de URL que Hechos, comprobado por el esquema), BOE, otra cámara, la ficha de una iniciativa o un **dato estadístico oficial** (`kind: "dato-oficial"`: organismo —INE, ministerios, Tribunal de Cuentas, AIReF…—, fecha, valor, enlace y `sourceType`, ver el punto siguiente). Este último solo existe en «Dijeron vs. hicieron» (`DidEvidence`, no `Evidence`) y nunca puntúa.
- **Independencia de la fuente** (regla del dueño, 2026-10-07: «en base a datos reales, no publicidad del Gobierno»; se aplica igual a todos los partidos que han gobernado —PSOE, PP 2011–2018, Unidas Podemos y Sumar por lo que firmaron—). Todo `dato-oficial` lleva `sourceType` (obligatorio en el esquema):
  - `independiente`: organismo que no depende del Gobierno evaluado — AIReF, Tribunal de Cuentas, Banco de España, Eurostat, OCDE, Comisión Europea o Consejo de la UE, FMI, tribunales (Tribunal Supremo, Audiencia Nacional…), evaluaciones oficiales de universidades.
  - `estadistica-oficial`: serie estadística o registro oficial con metodología publicada — INE, series de la IGAE o del Banco de España, estadísticas de la Seguridad Social o de un ministerio (no sus notas de prensa), texto consolidado del BOE, créditos iniciales de una ley de presupuestos.
  - `gobierno`: lo que el Gobierno dice de sí mismo — notas de prensa, páginas web de un ministerio, preámbulos de decretos, informes de La Moncloa, autoevaluaciones, expositivos de convenios del propio ministerio.
  - **Regla**: un `cumple` no puede apoyarse solo en datos `gobierno`; necesita al menos un dato `independiente` o `estadistica-oficial`. Si solo hay cifras del propio Gobierno, la etiqueta máxima es `parcial` y la nota dice literalmente «solo hay datos del propio Gobierno» (`ONLY_GOVERNMENT_DATA_NOTE`; el esquema lo comprueba). Los datos del Gobierno siguen visibles, con su etiqueta («Dato del propio Gobierno»).
  - Lo mismo vale para las afirmaciones del Gobierno que llegan dentro de un BOE (el preámbulo de un real decreto que declara cumplido un objetivo): el BOE prueba que la norma existe, no que el objetivo se alcanzó. Si la etiqueta depende de una cifra, esa cifra tiene que venir de una fuente independiente o de estadística oficial.
  - Los hechos judiciales (autos, sentencias, notas de la Oficina de Comunicación del Poder Judicial) son `independiente`, y se describen con la situación procesal exacta que dice el documento (investigado, procesado, prisión provisional, condenado con sentencia firme…): presunción de inocencia estricta.
- Etiquetas: `cumple`, `contradice`, `parcial` (nota obligatoria con el matiz) y `no-hecho` (solo si el partido podía hacerlo —gobernaba, o lo firmó en un acuerdo de coalición o investidura— y hay prueba primaria de que no ocurrió; nota obligatoria con el porqué).
- El mismo criterio para todos, incluidos los compromisos cumplidos. Lo que se buscó y se descartó se anota en `busqueda.ts` y se publica en la página.
- **Profundidad proporcional al tiempo de gobierno** (regla de método, 2026-10-07): el escrutinio se ajusta a los años de gobierno del Estado, con un objetivo de **≈ 2 entradas por año gobernado (mínimo 4)**. Objetivos: PP 2011–2018 (≈ 7 años → ≈ 14), PSOE desde junio de 2018 (≈ 8 años → ≈ 16), Unidas Podemos 2020–2023 (≈ 4 años → ≈ 8) y Sumar 2023–2026 (≈ 3 años → ≈ 6). Se priorizan los compromisos **más visibles y medibles** de ese tiempo de gobierno (investiduras, acuerdos de coalición, objetivos con cifra o plazo) con el resultado en **datos oficiales** (IGAE, INE, Banco de España, Eurostat, AIReF, Seguridad Social, ministerios, BOE, datos abiertos del Congreso), cumplidos e incumplidos. Superar el objetivo no obliga a recortar; quedarse por debajo exige anotar en `busqueda.ts` qué se buscó. La regla no hace comparables los recuentos (ver el punto siguiente): solo evita que quien gobernó más tiempo quede menos examinado.
- Para un «no-hecho» por ausencia de proyecto de ley vale como prueba primaria la relación de proyectos de ley de la legislatura de los datos abiertos del Congreso (`kind: "iniciativa"`, con la fecha de consulta), junto con la disolución en el BOE y, si existe, el texto consolidado del BOE de la norma que sigue vigente (`dato-oficial`).
- **Los recuentos no son comparables entre partidos**: quien gobierna tiene más ocasiones de cumplir o incumplir. La UI enseña junto a cada recuento si el partido ha gobernado en el Estado (`Party.inGovernment`).
- **Hueco conocido**: los compromisos de los gobiernos autonómicos (Generalitat, Gobierno Vasco, Xunta, Canarias, Navarra…) aún no se han investigado, salvo las dos entradas de Coalición Canaria.

## 6. Lo que se comprueba por máquina

`src/lib/afinidad/schema.ts` (zod) y `src/lib/afinidad/checks.ts`:

- Celdas que puntúan: cita + URL + fecha/año (programa); `evidence[0].url` y no solo ausencias (hechos).
- URLs de votación con el patrón de congreso.es y coherentes con sus campos.
- `pendiente` con `note`; `pendiente` y `sin-posicion` no influyen en el resultado.
- Ids únicos, referencias existentes, una sola celda por partido×pregunta.
- Equilibrio: en cada pregunta ≥ 2 partidos a cada lado; ningún partido con todas sus posiciones del mismo signo; cobertura por bloque a ±20 % de la media.
- Cálculo (2026-10-07): una lente enseña cifra con al menos `MIN_LENS_ITEMS` (5) respuestas con dato, y la cifra se **encoge hacia el neutro**: `(Σ w·acuerdo + K·0,5) / (Σ w + K)` con `SHRINK_K` = 3 (5 de 5 coincidencias = 81 %, 15 de 15 = 92 %). Por eso el votante perfecto ya no da el 100 %: se exige que salga 1.º con al menos `PERFECT_VOTER_MIN_SCORE` (75 %).
- Neutralidad del motor: votante perfecto, votante opuesto, simetría al invertir signos, estilo de respuesta, y dominancia (ningún partido **comparable** gana a más del 35 % ni a menos del 2 % de 10 000 usuarios aleatorios y 10 000 moderados), con los 32 partidos juntos y, sobre todo, **por comunidad** (estatales + los de cada comunidad, que es lo que enseña la UI). «Comparable» = con dato en al menos `MIN_LENS_ITEMS` (5) preguntas en alguna lente, la misma regla con la que el motor enseña una cifra; los que no llegan salen «datos insuficientes» para todo el mundo y no compiten: su hueco lo mide la cobertura por bloque. Los umbrales son constantes exportadas de `checks.ts` (`DOMINANCE_MAX_SHARE`, `DOMINANCE_MIN_SHARE`, `DOMINANCE_USERS`, `BLOC_COVERAGE_TOLERANCE`, `RESPONSE_STYLE_MAX_GAP`, `ITEM_MIN_PER_SIDE`) y la metodología las importa.
- Todos los ficheros de `stances/programme`, `stances/record`, `hemeroteca` y `dichos-hechos` están registrados en su `index.ts` (un fichero sin registrar no se validaría).

Si una comprobación de equilibrio falla con datos reales, **no se corrige tocando posiciones**: se revisa la redacción del cuestionario (WP2) o se busca la fuente que falta.
