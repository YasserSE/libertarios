# «¿A quién votar? Objetivamente» — registro de cambios

Registro público de cambios de datos, de método y de correcciones recibidas. La metodología (`/a-quien-votar/metodologia`) y la página de datos abiertos enlazan aquí. Cada entrada lleva fecha, versión del dataset (`Dataset.version`) y motivo.

Reglas del registro:

- Cualquier cambio de una celda que puntúa (posición, estado o fuente) se anota con partido, pregunta, valor anterior, valor nuevo y fuente.
- Las correcciones recibidas se anotan tanto si se aceptan como si se rechazan; si se rechazan, con el motivo.
- Los cambios de método (fórmula, umbrales, criterio de inclusión) se anotan aunque no cambien ninguna celda.
- Las correcciones se reciben en contacto@libertarios.es (asunto «Corrección — ¿A quién votar? Objetivamente»).

## Versiones

### 2026.10.2 — 2026-10-07: la intensidad de la respuesta cuenta

Queja recibida: «muy en desacuerdo / muy a favor no se toma en cuenta correctamente». Era cierto. Con la fórmula de 2026.10.0–1 (mismo signo `1 − |u − p| / 8`; signo contrario 0; partido en 0 → 0,5 siempre), «a favor» frente a «muy a favor» costaba solo 12,5 puntos y una abstención valía lo mismo para quien está «muy a favor» que para quien está «a favor». No cambia ninguna celda; cambia el cálculo, y por eso sube la versión: un enlace compartido con 2026.10.1 enseña el aviso de recálculo.

Método nuevo (`agreement` en `src/lib/afinidad/score.ts`):

- `acuerdo = (1 − |u − p| / 4) × lado`, con lado = 1 si respuesta y posición tienen el mismo signo (`SAME_SIDE_FACTOR`), ½ si el partido está en 0 (`NEUTRAL_PARTY_FACTOR`) y 0 si están en lados contrarios (`OPPOSITE_SIDE_FACTOR`).
- Tabla (filas: tu respuesta; columnas: partido):

| | −2 | −1 | 0 | +1 | +2 |
|---|---|---|---|---|---|
| −2 | 1 | 0,75 | 0,25 | 0 | 0 |
| −1 | 0,75 | 1 | 0,375 | 0 | 0 |
| +1 | 0 | 0 | 0,375 | 1 | 0,75 |
| +2 | 0 | 0 | 0,25 | 0,75 | 1 |

- Antes: +1/+2 frente a +2/+1 = 0,875; partido en 0 = 0,5 con cualquier respuesta. Sin cambios: «Esto me importa» ×2, `SHRINK_K` = 3, `MIN_LENS_ITEMS` = 5, mínimo de 8 respuestas.
- La metodología genera la tabla con la misma función (cuatro lenguas) y el punto del detalle por pregunta pasa a «coincide» desde 0,6 (mismo lado ≥ 0,625; partido en 0 ≤ 0,375).

Candidatas simuladas sobre el dataset real (2.000 usuarios por perfil y comunidad, 10.000 en la vista estatal; mismos generadores que `checks.ts`). «Ficticio 0»: un partido inventado con todo a 0 añadido a la vista estatal (prueba de sesgo de centro). «±1 → ±2»: 2.000 personas con los mismos lados que responden todo a ±1 y luego todo a ±2.

| Candidata | Comunidades (máx / mín) | Ficticio 0 (unif. / mod.) | Votante perfecto / opuesto | ±1 → ±2: cambia el 1.º / Δ cifra media |
|---|---|---|---|---|
| Anterior (`/8`, 0 → 0,5) | 23,4 / 3,4 % | 3,0 / 3,9 % | pasa / pasa | 24 % / 2,8 pts |
| A: mismo lado `/4`; contrario graduado (0,25 para ±1 frente a ∓1); 0 → 0,5 − 0,125·(\|u\| − 1) | 30,4 / 2,6 % | 0,0 / 0,2 % | pasa / **falla** (PP, Podemos, Més) | 45 % / 3,4 pts |
| B: A + peso por intensidad (±2 × 1,5) | 27,6 / 3,6 % | 0,0 / 0,1 % | pasa / **falla** (4) | 45 % / 4,0 pts |
| C: distancia + 1 punto si no es tu lado, sobre 4 | 32,2 / **2,0 %** | 0,0 / 0,3 % | pasa / **falla** (11) | 48 % / 4,3 pts |
| E: mismo lado `/4`; contrario 0; 0 → 0,5 / 0,375 | 25,0 / 2,9 % | 1,4 / **7,7 %** | pasa / pasa | 43 % / 5,2 pts |
| E con 0 → 0,5 fijo | 24,7 / 2,8 % | **9,6 / 15,1 %** | pasa / pasa | 43 % / 5,5 pts |
| **Elegida**: mismo lado `/4`; contrario 0; 0 → ½ de la cercanía (0,375 / 0,25) | 26,2 / 2,9 % | **0,0 / 0,0 %** | pasa / pasa | 44 % / 5,2 pts |

Por qué esta:

- Es la más simple que pasa todo: una sola fórmula (cercanía × lado), sin pesos nuevos.
- Sin sesgo de centro, y mejor que antes: el partido ficticio «todo 0» pasa de ganar al 3–4 % de los usuarios sintéticos a ninguno. Quitar 25 puntos al mismo lado sin rebajar el 0 (fila «E con 0 → 0,5 fijo») le daba el 15 % de los moderados: por eso el 0 tiene que depender de la intensidad.
- Graduar el desacuerdo (A, B, C) suena intuitivo (−1 frente a +1 «menos malo» que −2 frente a +2), pero rompía el votante opuesto (test 2) y casi triplicaba las victorias de un partido ficticio «±1 del lado mayoritario en todo» entre los moderados (19 % → 52 % con A). Con la elegida sube a 29 %, y es lo esperado: si la intensidad cuenta, quien responde casi siempre ±1 se parece más a un partido que dice ±1; sigue lejos del 35 %. Lo que separa a dos personas en lados contrarios es el lado.
- Peso por intensidad (B y D = C + peso): no aporta más que la tabla y añade una regla que explicar. Descartado.
- La intensidad se nota: con las mismas respuestas en lado, pasar de ±1 a ±2 cambia el primer partido al 44 % de las personas (antes, 24 %), el trío de cabeza al 81 % (antes, 59 %) y mueve la cifra 5,2 puntos de media (antes, 2,8).

Comprobaciones (`STRICT=1 npx vitest run src/test/afinidad-dataset.test.ts`): dominancia por comunidad, votante perfecto (1.º y ≥ 75 %), votante opuesto, simetría y exclusión de pendientes pasan, igual que antes. Siguen fallando, igual que antes y por los datos (no por la fórmula): partidos indistinguibles en test 1 (Sumar = Compromís en programa; Sumar = Frente Amplio y ERC = Compromís en hechos), tests 5–7, y la vista con los 32 partidos juntos (que no existe en la UI): antes ERC, Compromís, Vox y Sumar por debajo del 2 %; ahora ERC, Compromís, Vox, EH Bildu y PNV (1,6–1,9 %). Vista estatal de 10.000 usuarios, antes → ahora (uniforme): SALF 24,6 → 26,9; Podemos 14,7 → 14,4; Frente Amplio 13,8 → 14,1; PP 12,3 → 13,0; PSOE 16,1 → 12,0; Sumar 10,1 → 11,6; Vox 8,4 → 8,1. Test nuevo: el partido ficticio «todo 0» gana a menos del 2 % (falla siempre, no solo con `STRICT=1`).

JSON abierto: `public/afinidad/datos-2026.10.2.json` (mismo contenido que 2026.10.1 salvo la versión); se conservan los anteriores.

### 2026.10.0 — 2026-10-06 (sin publicar)

Método:

- Elección de referencia: generales del 29-N-2026 (Real Decreto 806/2026, BOE del 6 de octubre).
- Escala de respuesta de 4 puntos más «No sé» (sin punto medio). Los partidos conservan el 0 para abstención o ambivalencia expresa.
- Métrica de **acuerdo direccional** (mismo signo → `1 − |u − p| / 8`; signo contrario → 0; partido en 0 → 0,5). Sustituye a `1 − |u − p| / 4`, que en simulación daba al centro el 72 % de las victorias. (Sustituida en 2026.10.2 por `(1 − |u − p| / 4) × lado`; ver arriba.)
- Cobertura mínima del 70 % de las respuestas (sustituida el 2026-10-07 por un mínimo de 5 respuestas con dato por lente; ver abajo) y mínimo de 8 respuestas para dar resultado; «Esto me importa» pesa ×2.
- Criterio de inclusión de partidos publicado: escaño en el Congreso XV, coaliciones registradas para el 29-N que los integren, y extraparlamentarios con escaño en el Parlamento Europeo o en un parlamento autonómico o ≥ 1 % en las generales de 2023. El P-LIB se somete a la misma regla.
- Programas de 2023 como fuente provisional hasta que se publiquen los de 2026, con etiqueta visible.
- Hemeroteca (citas con fecha y fuente) añadida como capa informativa; no puntúa.
- «Dijeron vs. hicieron» (petición del dueño): compromisos públicos y lo que el partido hizo después, con etiqueta cumple / contradice / parcial / no lo hicieron (solo si podía hacerlo), recuento de las cuatro siempre visible y el mismo criterio para todos los partidos (incluye lo cumplido). No puntúa. Tarjeta en el resultado, página `/a-quien-votar/dijeron-vs-hicieron`, sección en cada ficha y criterios en la metodología. Eventos nuevos `afinidad_dvh_open` y `afinidad_share_dvh` (migración 0010).

Datos:

- Cuestionario, revisión de discriminación (2026-10-06, `docs/AFINIDAD-PREGUNTAS.md`): se retiran «eutanasia», «autodeterminacion-sexo-registral», «castellano-vehicular», «arraigo» y «menores-migrantes-reparto» (en hechos casi todos los partidos votaban en dos bloques: PP y VOX salían idénticos, y Sumar, ERC, EH Bildu, Compromís y Frente Amplio también) y entran «prisiones-agentes-autoridad», «prostitucion-abolicion», «seguro-ingresos-agrarios», «impuesto-banca» y «registro-lobbies», con votación ancla verificada en el JSON de congreso.es. Las celdas de programa y las citas de hemeroteca de las preguntas retiradas se han quitado (salvo en los programas de ERC, Junts, EH Bildu, PNV, BNG, CC y UPN, que se estaban redactando a la vez). Las celdas de programa de las preguntas nuevas están por investigar.
- Cuestionario, segunda revisión (2026-10-06, `docs/AFINIDAD-PREGUNTAS.md` §8): «seguro-ingresos-agrarios» (poco relieve público) se sustituye por «iva-primera-vivienda» (punto 1.d de la moción del GPP sobre vivienda, XV, sesión 196, 10-9-2026, votación 10). «jornada-37-5» gana una segunda ancla (PNL del GSUMAR, XV, sesión 23, 22-2-2024, votación 2): PP y Junts pasan de −2 a −1 en hechos. Se estudió una pregunta de inmigración (regularización extraordinaria) y se descartó por dejar a Compromís sin usuarios ganados; queda en `rejectedCandidates`.
- Páginas de metodología, datos abiertos, fichas de partido y `/api/afinidad/datos.json` (CC BY 4.0) preparadas. El dataset está **vacío**: las páginas muestran «datos en preparación» hasta que se carguen celdas con fuente.

- Integración final (2026-10-06):
  - Registrados todos los ficheros de datos: programa de ERC, Junts, EH Bildu, PNV, BNG, CC y UPN; «Dijeron vs. hicieron» de BNG, CC, PNV, PP, UPN y Vox. Un test exige que todo fichero de las carpetas de datos esté registrado.
  - **Reglas de consistencia** (`AFINIDAD-DATOS.md` §2) aplicadas a programa. `impuesto-grandes-fortunas`: ERC +2 → +1, EH Bildu +2 → +1, BNG +2 → +1, Adelante Andalucía +2 → +1, Sumar +2 → +1 (y Compromís, que hereda la celda de Sumar), Foro −1 → −2, SALF −1 → −2. `irpf-inflacion`: Aliança Catalana +2 → +1. Misma cita y fuente; se conserva la posición del revisor ciego (todas a ≤ 1 punto).
  - «Dijeron vs. hicieron»: el criterio es «compromiso real, nunca una intervención en el mismo debate de la votación, sin plazo mínimo». Se retira la regla de 30 días de la revisión ciega y vuelve `pp-irpf-2011`. Se publica el registro de búsqueda por partido y el contexto de gobierno de cada partido junto a su recuento.
  - Método (decisión del dueño, 2026-10-07): **se retira el umbral de cobertura del 70 %**. Una lente enseña cifra cuando el partido tiene dato en al menos `MIN_LENS_ITEMS` = 5 de las preguntas respondidas, sea cual sea el porcentaje; por debajo, «datos insuficientes». Junto a cada barra (programa y votos) se dice siempre «basado en X de Y respuestas». Motivo: el 70 % escondía a partidos cuyo programa de 2023 calla en muchas preguntas (el PSOE salía «datos insuficientes» en programa). Se mantiene el orden (usables primero; cifra, cobertura, nombre) y la protección «3 coincidencias no ganan a 15 al 90 %».
  - Método (decisión del dueño, 2026-10-07): **encogimiento hacia el neutro**. La afinidad de cada lente es `(Σ peso × acuerdo + K × 0,5) / (Σ peso + K)` con `SHRINK_K` = 3: 5 de 5 coincidencias dan un 81 %, no un 100 %; 15 de 15, un 92 %. Motivo: con el mínimo de 5 respuestas, los partidos con pocas celdas (SALF, Més per Menorca) ganaban a más usuarios sintéticos solo por varianza. Se probó K = 2, 3, 4 y 5: con todos, la dominancia por comunidad pasa y el votante perfecto sale 1.º; con los 32 partidos juntos (vista que no existe en la UI) Compromís y ERC siguen por debajo del 2 % con cualquier K, porque Compromís copia el programa de Sumar y vota como ERC. Se elige K = 3. El votante perfecto se exige 1.º y con al menos un 75 %.
  - Método: la dominancia y el votante perfecto se aplican solo a partidos comparables (≥ 5 preguntas con dato en alguna lente, la misma regla del motor); los demás no compiten y su hueco lo mide la cobertura. Umbrales exportados como constantes y citados desde la metodología.

### «Dijeron vs. hicieron» — independencia de la fuente (2026-10-07)

Petición del dueño: ser más críticos con quien gobierna «en base a datos reales, no publicidad del Gobierno». Se aplica como regla neutral a todos los partidos que han gobernado (PSOE, PP 2011–2018, Unidas Podemos y Sumar por lo que firmaron). No puntúa: no cambia ningún resultado del test.

Método:

- Todo `dato-oficial` lleva ahora `sourceType` (obligatorio): `independiente` (AIReF, Tribunal de Cuentas, Banco de España, Eurostat, OCDE, Comisión o Consejo de la UE, FMI, tribunales), `estadistica-oficial` (INE, IGAE, Seguridad Social, series estadísticas de ministerios, BOE consolidado, créditos de una ley de presupuestos) o `gobierno` (notas de prensa, webs de ministerios, preámbulos, La Moncloa, autoevaluaciones). La UI lo enseña con una insignia por dato («Fuente independiente», «Estadística oficial», «Dato del propio Gobierno»).
- Regla (esquema + test): un «cumple» no puede apoyarse solo en datos `gobierno`; si solo hay cifras del propio Gobierno, la etiqueta máxima es «parcial» y la nota dice «solo hay datos del propio Gobierno». Texto en `AFINIDAD-DATOS.md` §5 bis y en la metodología (cuatro lenguas).
- Los 21 datos oficiales que había se clasificaron: 6 `gobierno`, 12 `estadistica-oficial`, 3 `independiente`.

Etiquetas que cambian:

| Entrada | Antes | Ahora | Motivo y fuente independiente |
|---|---|---|---|
| `psoe-smi-60-2020` | cumple | parcial | El «60 %» solo lo daba el preámbulo del RD 99/2023 (medida neta del propio Gobierno). Eurostat (earn_mw_avgr2): 49,1 % del salario bruto medio en 2023; OCDE: 44,0 %; INE (EAES 2023): 53,9 % con cálculo propio. |

Etiquetas que se mantienen con fuente nueva:

- `psoe-deficit-2023` (cumple): Eurostat gov_10dd_edpt1 (3,3 → 3,2 → 2,4 % del PIB) y Consejo de la UE (gasto neto de 2025 por encima del máximo recomendado, dentro de la flexibilidad por defensa); la nota añade que el déficit de 2024 en euros y la deuda en euros subieron.
- `psoe-vivienda-183000-2023` (parcial): serie de viviendas protegidas terminadas del Ministerio (32.444 en España desde 2024) e informe 1.640 del Tribunal de Cuentas (ninguna actuación del Plan fiscalizada estaba terminada).
- `psoe-avales-ico-50000-2023` y `sumar-avales-ico-50000-2023` (parcial): serie de actividad del ICO (10.454 operaciones a diciembre de 2025).
- `psoe-presupuesto-vivienda-2019` y `podemos-presupuesto-vivienda-2019` (cumple): liquidación de la IGAE (gasto ejecutado de 411,5 a 2.487,9 millones entre 2019 y 2023, con ejecución que cae al 49,4 % en 2023) e informe 1.673 del Tribunal de Cuentas.
- `pp-deficit-2012` (parcial): se apoya ahora en Eurostat (déficit y tabla de ayudas al sector financiero), no en la nota de Hacienda, que queda etiquetada como dato del propio Gobierno.

Entradas nuevas (PSOE 7, PP 2):

| Entrada | Etiqueta | Fuente del hecho |
|---|---|---|
| `psoe-imv-850000-hogares-2020` | parcial | AIReF, opiniones sobre el IMV (484.792 hogares a 31-12-2025 frente a 850.000 anunciados; 52 % de no solicitud) |
| `psoe-corrupcion-mocion-censura-2018` | parcial | Tribunal Supremo, STS 418/2026 (condena de Ábalos y Koldo García; firmeza no indicada), BOCG, suplicatorio |
| `psoe-comision-investigacion-koldo-2025` | parcial | Ficha 156/000011 del Congreso (sin llegar al Pleno), votación XV-33-14, Senado |
| `psoe-sahara-autodeterminacion-2019` | contradice | Diario de Sesiones (carta), declaración conjunta de 7-4-2022, votación XIV-171-1 (GS 118 no) |
| `psoe-aduanas-ceuta-melilla-2022` | parcial | BOE-A-2023-7502 y declaraciones del Gobierno: solo hay datos del propio Gobierno |
| `pp-verdad-barcenas-kitchen-2013` | contradice | Votaciones XIV-47-11 y XIV-149-26 (GP no), Audiencia Nacional (juicio oral de Kitchen) |
| `pp-plan-regeneracion-democratica-2013` | cumple | BOE: LO 3/2015, Ley 3/2015, LO 1/2015, Ley 41/2015, Ley 9/2017 |

`psoe-ingreso-minimo-vital-2019` se queda en «cumple» (contrasta la creación de la prestación, con BOE) y remite a la entrada nueva para la cobertura. Lo descartado (Plan de Recuperación, Ceuta 2021, Gürtel, pistas solo de prensa) está en `busqueda.ts`.

## Correcciones recibidas

| Fecha | Partido | Pregunta | Qué se pedía | Decisión | Motivo / fuente |
|---|---|---|---|---|---|
| — | — | — | — | — | Ninguna todavía. |

## Traducciones pendientes de revisión humana (ca, gl, eu)

Las traducciones de un test electoral son sensibles: un matiz («en contra» frente a «contrario») puede cambiar lo que se entiende. **Todo el catalán, gallego y euskera del módulo está traducido automáticamente (por agentes) el 2026-10-07** y no debe darse por bueno hasta que una persona nativa lo revise y firme aquí. Criterio pedido: catalán estándar central (IEC), gallego normativo RAG, euskera batua (Euskaltzaindia); registro neutro; nombres de partidos, siglas, títulos oficiales y citas literales sin traducir.

Desde el 2026-10-07 el módulo está completo en las cuatro lenguas: ninguna clave cae al castellano. Lo comprueba `src/test/afinidad-i18n.test.ts` (claves que faltan o idénticas al castellano, con lista explícita `SAME_OK` para las coincidencias legítimas; datos traducidos entrada a entrada; forma del registro de búsqueda).

### Prioridad de revisión

1. **Los 15 enunciados** (`Question.text.ca/gl/eu`) y sus `i18n.label` / `i18n.rationale` en `src/data/afinidad/questions.ts`. Comprobar la polaridad (a favor / en contra) frase a frase; en las cuatro preguntas con `agreeMeans: "no"` la explicación del voto «sí» debe seguir diciendo «en contra de la afirmación». Términos a revisar: «agents de l'autoritat / axentes da autoridade / agintaritzaren agente», «gravamen / gravame / karga», «lobbies», «IVA / IVE / BEZ», «tercería locativa» (parafraseada en eu), «okupatutako etxea 24 orduan hustea».
2. **Etiquetas de veredicto y de lente** (`src/i18n/afinidad/dvh.ts`, `transparency.ts`, `result.ts`): compleix / contradiu / parcial / no ho van fer; cumpre / contradí / parcial / non o fixeron; betetzen du / kontraesaten du / partziala / ez zuten egin; Programa / Fets / Feitos / Egitateak. Etiquetas de posición en eu («Aurka, ñabardurekin»…) y «Honela puntuatzen du:».
3. **Metodología** (`src/i18n/afinidad/methodology.ts`, antes solo en castellano): prosa completa traducida. En eu se evitan sufijos pegados a `{marcadores}` y queda algo rígido («gutxienez {score} lortuta», «{n}. galdera»); cifras con formato es-ES («90 %») en las cuatro lenguas.

### Resto (todo traducción automática, pendiente)

| Fichero | Contenido | Estado | Revisado por |
|---|---|---|---|
| `src/i18n/afinidad/flow.ts` | Flujo del test (portada, contexto, preguntas, revisión, cabecera). | Pendiente | — |
| `src/i18n/afinidad/result.ts` | Resultado, compartir, avisos, imagen OG. eu: sufijos tras el nombre del partido resueltos con `{party}(r)ekin` y similares; gl «dabondo». | Pendiente | — |
| `src/i18n/afinidad/seo.ts` | Títulos y descripciones para buscadores y vistas previas. | Pendiente | — |
| `src/i18n/afinidad/transparency.ts` | Datos abiertos y fichas de partido; abreviaturas «leg./ses./núm.», «lex./ses./n.º», «leg./bilk./zk.». Las notas técnicas de cada celda (`programme.note`, `record.note`, 362) se dejan en castellano a propósito y se rotulan «Nota tècnica (en castellà)» / «Nota técnica (en castelán)» / «Ohar teknikoa (gaztelaniaz)». | Pendiente | — |
| `src/i18n/afinidad/dvh.ts` | «Dijeron vs. hicieron»: criterios, filtros, recuentos; rótulo corto de la franja (`modulePill`, eu «Esanak eta eginak»). | Pendiente | — |
| `src/data/afinidad/parties.ts` (`i18n`) | `inclusionReason` y `recordNote` de los 32 partidos. eu: nombres de grupo («Euskal Taldea (EAJ-PNV)», «SUMAR Talde Plurinazionala», «Talde Popularra»). | Pendiente | — |
| `src/data/afinidad/dichos-hechos/*.ts` (`i18n`) | Tema, resumen del hecho, nota y cargo de las 93 entradas. **Las citas (`said.text`) no se traducen.** Términos: «per crida / por chamamento / deialdi bidezko bozketa», «arrelament / arraigamento / errotzea», «txostengintza» (ponencia), «23-J» sin adaptar en gl/eu. | Pendiente | — |
| `src/data/afinidad/dichos-hechos/busqueda-i18n/{ca,gl,eu}.ts` | Registro «Qué buscamos y por qué no entró». Las frases citadas entre «» siguen en su lengua original. eu: «aingura-bozketa», «ez-betetzeak» (método de búsqueda, no veredicto). | Pendiente | — |
| `src/data/afinidad/hemeroteca/*.ts` (`i18n.role`) | Cargo de quien habla en las 127 citas (no la cita). gl «voceiro/voceira» según la persona; eu sufijos sobre siglas («SUMARreko»). | Pendiente | — |
