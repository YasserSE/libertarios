# Afinidad — revisión de discriminación del cuestionario (2026-10-06)

Decisión del dueño: se mantienen **15 preguntas** y se sustituyen las 4–5 que menos distinguen a los partidos en la lente de **hechos** (votaciones) por otras cuya votación ancla divide a partidos del mismo bloque. Este documento explica qué se quitó, qué entró y con qué cifras. Reglas de fondo: `docs/AFINIDAD-PLAN.md` (vinculante) y `docs/AFINIDAD-DATOS.md` §3 (codificación de votos).

## 1. El problema

Con el cuestionario anterior, en la lente de hechos:

- **PP y VOX** coincidían en 14 de 15 preguntas (solo los separaba la abstención de VOX en «castellano-vehicular»). UPN coincidía con los dos donde tenía dato.
- **Sumar, ERC, EH Bildu, Compromís y Frente Amplio** tenían exactamente las mismas 15 posiciones; Podemos solo se separaba en una pregunta y el BNG en dos.
- Consecuencia en la simulación de dominancia (10 000 usuarios aleatorios uniformes y 10 000 moderados): esos cinco partidos se repartían las mismas victorias y cada uno ganaba al **1,4 %** (uniformes) o **1,0 %** (moderados), por debajo del mínimo del 2 %.
- «castellano-vehicular» incumplía además el equilibrio por ítem (solo el PP a favor; VOX se abstuvo).

## 2. Cómo se midió la discriminación

Sobre las celdas de hechos (`stances/record/*.ts`) de los 14 partidos con historial (13 con escaño + Frente Amplio), para cada pregunta: número de **pares de partidos que la pregunta separa** (posiciones de signo distinto; con estos datos coincide con «diferencia ≥ 2»). Máximo teórico: 91 pares. Se miró aparte qué pares *dentro de un bloque* separa cada una.

| Pregunta (antes) | A favor / en contra | Pares separados |
|---|---|---|
| eutanasia | 11 / 2 | **22** |
| autodeterminacion-sexo-registral | 11 / 2 | **22** |
| castellano-vehicular | 1 / 11 | **23** |
| arraigo | 2 / 11 | **35** |
| menores-migrantes-reparto | 11 / 2 | **35** |
| impuesto-grandes-fortunas | 7 / 4 | 39 |
| tauromaquia-patrimonio | 3 / 9 | 39 |
| jornada-37-5 | 10 / 4 | 40 |
| amnistia | 10 / 4 | 40 |
| inmigracion-competencias-cataluna | 4 / 10 | 40 |
| nuclear | 3 / 10 | 43 |
| vivienda-tope-alquiler | 7 / 5 | 47 |
| gasto-defensa | 7 / 7 | 49 |
| okupacion-desalojo | 4 / 8 | 56 |
| irpf-inflacion | 3 / 8 | 57 |

Media: 39,1 pares por pregunta.

## 3. Qué se quitó y por qué

Las cinco con menos pares separados. Las cinco dividían igual: PP y VOX (y UPN cuando tenía dato) frente a todos los demás, así que no separaban **ningún** par dentro de un bloque. Quedan en `rejectedCandidates` (`src/data/afinidad/questions.ts`) con su motivo.

- **eutanasia** y **autodeterminacion-sexo-registral**: posiciones idénticas entre sí (11 a favor, PP y VOX en contra). 22 pares cada una.
- **castellano-vehicular**: 23 pares y fallaba el equilibrio por ítem. Existe una segunda ancla con VOX a favor (moción del GVOX sobre la enseñanza del castellano, XIV, sesión 141, 16-12-2021, votación 2: PP y VOX sí, el resto no), que arreglaría el equilibrio (PP +2, VOX +1), pero la pregunta seguiría siendo PP+VOX frente a todos y además desaparecería la única diferencia PP/VOX. Por eso se sustituye en lugar de reforzarla.
- **arraigo** y **menores-migrantes-reparto**: 35 pares cada una, la misma división con el signo cambiado.

**Contrapartida conocida**: el cuestionario se queda sin una pregunta específica de inmigración («inmigracion-competencias-cataluna» sigue, pero mide el modelo territorial). Se buscó un sustituto de inmigración que dividiera bloques: la PNL del PP sobre el Pacto Europeo de Migración y Asilo (XV, sesión 202, 30-9-2026, votación 1: PP y UPN sí, VOX y CC abstención, el resto no) separa PP de VOX, pero pide genéricamente «la correcta implementación» del pacto (ya en aplicación desde junio de 2026) y no se localizó su texto en el BOCG para redactar una medida concreta; queda como candidata para una ronda posterior.

## 4. Qué entró y por qué

Criterios: una medida concreta y votable; redacción neutra contestable en 4 puntos; al menos 2 partidos a cada lado en hechos; tema no cubierto ya; ancla verificada en el JSON de datos abiertos (`informacion.sesion`, `fecha`, `numeroVotacion`, `textoExpediente`), recontada con `npm run afinidad:vote -- <url> --json` y después con `npm run afinidad:verify` (221 votaciones recontadas, 0 errores). Se rastrearon las 8 645 votaciones nominales de la XIV y la XV (ficheros ZIP diarios de datos abiertos) buscando votaciones de conjunto, tomas en consideración, convalidaciones y PNL que separasen los pares bloqueados; se descartaron las enmiendas sueltas y las votaciones de procedimiento (avocaciones).

| Orden | Id | Ancla (XV) | Agree | A favor / en contra | Pares | Qué separa dentro de los bloques |
|---|---|---|---|---|---|---|
| 4 | prisiones-agentes-autoridad | ses. 185, 11-6-2026, nº 39 — votación de conjunto de la PLO que da a los funcionarios de prisiones la condición de agentes de la autoridad (aprobada 323/21) | sí | 9 / 4 (Compromís abst.) | 49 | **Sumar (sí) frente a Podemos, ERC, EH Bildu, BNG (no)**; Compromís (abst.) de Sumar y ERC; PNV/EH Bildu; ERC/Junts |
| 7 | prostitucion-abolicion | ses. 38, 21-5-2024, nº 2 — toma en consideración de la PLO del PSOE «para prohibir el proxenetismo en todas sus formas» (BOCG-15-B-89-1; rechazada 122/184) | sí | 4 / 8 (VOX y Podemos abst.) | 56 | **PP (no) / VOX (abst.)**; **PSOE (sí) / Sumar (no)**; **Sumar (no) / Podemos (abst.)**; BNG (sí) frente a ERC, EH Bildu, Compromís; PP (no) / UPN (sí) |
| 11 | seguro-ingresos-agrarios | ses. 167, 24-3-2026, nº 2 — toma en consideración de la PL del GPP de seguros agrarios sobre ingresos y rentas (BOCG-15-B-299-1; aprobada 192/154) | sí | 8 / 5 (CC abst.) | 53 | **ERC (sí) / EH Bildu (no)**; **Compromís (sí) / Sumar (no)**; BNG (sí) / Sumar, EH Bildu; PNV (sí) / EH Bildu (no) |
| 12 | impuesto-banca | ses. 34, 9-4-2024, nº 2 — toma en consideración de la PL de Podemos (Mixto) «para una correcta imposición de los beneficios caídos del cielo de la gran banca» (BOCG-15-B-65-1; rechazada 41/294) | sí | 7 / 6 (Junts abst.) | 55 | **PSOE (no) / Sumar (sí)**; **ERC (sí) / Junts (abst.)**; **PNV (no) / EH Bildu (sí)** |
| 13 | registro-lobbies | ses. 198, 16-9-2026, nº 16 — convalidación del Real Decreto-ley 21/2026 de transparencia e integridad de los grupos de interés (BOE-A-2026-18148; derogado 155/179) | sí | 8 / 4 (PNV y Podemos abst.) | 56 | **Sumar (sí) / Podemos (abst.)**; **ERC (sí) / Junts (no)**; **PNV (abst.) / EH Bildu (sí)** |

URLs completas del JSON (`VOT_*.json`):

- prisiones-agentes-autoridad: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion039/VOT_20260611145750.json>
- prostitucion-abolicion: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion038/20240521/Votacion002/VOT_20240521203902.json>
- seguro-ingresos-agrarios: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion167/20260324/Votacion002/VOT_20260324205013.json>
- impuesto-banca: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion002/VOT_20240409210632.json>
- registro-lobbies: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion198/20260916/Votacion016/VOT_20260916195406.json>

Notas por pregunta:

- **prostitucion-abolicion**: el enunciado resume los tres artículos de la proposición (proxenetismo con consentimiento, art. 187.2; tercería locativa, art. 187 bis; multa a quien paga, art. 187 ter, que excluye sancionar a la persona en prostitución), comprobados en el BOCG. Hay otra toma en consideración de la misma ley en la XIV (7-6-2022, sesión 184, votación 2), con otros votos (PP sí); no se usa porque la de la XV es la vigente para los partidos actuales.
- **registro-lobbies**: es un decreto-ley; el voto en contra puede reflejar también el rechazo a regularlo por esa vía. La `rationale` lo advierte. El decreto incluía además la prohibición a los ex altos cargos de hacer de lobby en su materia durante dos años (disposición final primera); va en la `rationale`.
- **impuesto-banca**: solapa en parte con «impuesto-grandes-fortunas» (ambas son impuestos), pero mide otra cosa (un gravamen sectorial sobre beneficios extraordinarios) y es la única que separa PSOE de Sumar en materia fiscal.
- **seguro-ingresos-agrarios**: tema de menor relieve público, pero es una medida concreta y la única encontrada que separa ERC de EH Bildu y Compromís de Sumar sin ser una enmienda suelta.

Candidatas estudiadas y no usadas (motivo): RDL 11/2024 de compatibilidad pensión-trabajo (separa PP/VOX y Sumar/Podemos, pero mezcla jubilación parcial, activa y demorada y no consta por qué votó cada uno en contra); multirreincidencia (la votación final del 26-3-2026 incluía cambios en la Ley de Extranjería añadidos en el Senado y VOX cambió el voto respecto a la de febrero); ley del lobo del GPP (útil para ERC/Junts y PNV/EH Bildu, pero no separa PP/VOX y deja a UPN sin dato); autorización del Congreso para enviar material militar (GPP; separa Sumar de Podemos, pero solapa con defensa); propiedad horizontal del GPP (solo juntas telemáticas: medida técnica); reforma del CGPJ de 2024 (varias medidas a la vez y ERC/EH Bildu no votaron).

## 5. Equilibrio de redacción

Siete afirmaciones en el sentido que defiende la izquierda (vivienda-tope-alquiler, jornada-37-5, amnistia, impuesto-grandes-fortunas, prostitucion-abolicion —iniciativa del PSOE—, impuesto-banca, registro-lobbies) y ocho en el de la derecha (irpf-inflacion, prisiones-agentes-autoridad, nuclear, gasto-defensa, okupacion-desalojo, seguro-ingresos-agrarios, inmigracion-competencias-cataluna, tauromaquia-patrimonio). Se quitaron 3 de izquierda + 2 de derecha y entraron 3 + 2. Ojo: «prostitucion-abolicion», «prisiones-agentes-autoridad» y «seguro-ingresos-agrarios» dividen a ambos bloques; la etiqueta solo dice de qué lado vino la iniciativa.

Prueba «de acuerdo con todo» (respuesta +2 a todo; distancia del 1.º a la mediana, en puntos, cálculo en hechos con la métrica direccional): antes 6,7 (PP y Podemos empatados arriba); después 20,9 con UPN primero. La subida se debe a que **UPN pasa a ser usable** (antes tenía cobertura 10/15 < 70 % y no entraba en el ranking; ahora 13/15) y vota casi siempre en el sentido de la afirmación. Sin UPN la distancia es 10,0 (VOX primero). «Todo en contra»: 8,3 (EH Bildu primero; antes 0,5).

## 6. Antes y después (lente de hechos)

**Pares con posiciones idénticas** en todas las preguntas que comparten:

- Antes (10): sumar~erc, sumar~eh-bildu, sumar~compromis, sumar~frente-amplio, erc~eh-bildu, erc~compromis, erc~frente-amplio, eh-bildu~compromis, eh-bildu~frente-amplio, compromis~frente-amplio. A 1 pregunta de distancia: pp~vox, y Podemos con todo el grupo anterior.
- Después (1): **sumar~frente-amplio**, que es estructural: Frente Amplio no tiene historial propio y usa el del grupo GSUMAR (su `recordNote`), igual que Sumar. Ninguna pregunta puede separarlos en hechos.
- A 1 pregunta de distancia después: pp~vox, pp~upn, vox~upn (prostitucion-abolicion), sumar~eh-bildu, eh-bildu~frente-amplio, erc~compromis (prisiones-agentes-autoridad), erc~eh-bildu (seguro-ingresos-agrarios).

**Comprobación «votante perfecto» de `checks.ts`** (más estricta: el votante perfecto se salta las preguntas en las que el partido tiene 0, así que una abstención no basta para distinguir):

- Antes, 18 pares indistinguibles: pp~vox, pp~upn, vox~upn y los 15 pares entre Sumar, ERC, EH Bildu, BNG, Compromís y Frente Amplio.
- Después, 4: **vox~pp**, **vox~upn**, **compromis~erc** y sumar~frente-amplio (estructural). Los tres primeros se separan solo por una abstención (VOX en prostitucion-abolicion, Compromís en prisiones-agentes-autoridad). Para separar VOX de PP con un voto en sentido contrario haría falta una ancla donde VOX vote sí/no y el PP lo contrario o se abstenga; las encontradas son decretos ómnibus o la PNL de Sumar de 22-2-2024 sobre reducir la jornada máxima (XV, sesión 23, votación 2: PP abstención, VOX y UPN no), que podría añadirse como **segunda ancla de «jornada-37-5»** (PP pasaría a −1). No se ha hecho porque cambia una pregunta que se mantiene; queda propuesto.

**Pares separados por pregunta**: media 39,1 → 47,9. Mínimo 22 → 39.

**Dominancia** (10 000 usuarios por perfil, ranking por hechos, 14 partidos con historial; reparto de empates):

| Partido | Uniforme antes | Uniforme después | Moderado antes | Moderado después |
|---|---|---|---|---|
| upn | 0,0 (no usable) | 13,6 | 0,0 (no usable) | 13,2 |
| cc | 14,6 | 11,6 | 13,7 | 11,4 |
| pp | 20,8 | 11,2 | 21,0 | 11,6 |
| podemos | 14,2 | 10,3 | 14,4 | 11,1 |
| psoe | 9,5 | 8,9 | 9,5 | 8,5 |
| junts | 9,5 | 7,6 | 10,6 | 8,1 |
| bng | 5,7 | 7,6 | 7,5 | 9,4 |
| pnv | 5,2 | 6,2 | 5,1 | 5,2 |
| eh-bildu | 1,4 | 5,8 | 1,0 | 4,5 |
| erc | 1,4 | 4,7 | 1,0 | 4,6 |
| compromis | 1,4 | 3,3 | 1,0 | 3,2 |
| vox | 13,6 | 3,1 | 13,3 | 3,3 |
| sumar | 1,4 | 2,9 | 1,0 | 3,0 |
| frente-amplio | 1,4 | 2,9 | 1,0 | 3,0 |

Problemas de dominancia en hechos (fuera de 2–35 %): antes 12, después **0**. VOX baja porque antes repartía con el PP los usuarios de derecha con el mismo perfil y ahora PP, UPN y VOX compiten con perfiles distintos; queda por encima del 2 %. Sumar y Frente Amplio siguen repartiéndose sus victorias por ser idénticos en hechos (5,8 % entre los dos).

## 7. Pendiente

- Celdas de **programa** de las 5 preguntas nuevas: sin investigar (ronda siguiente).
- Programas de ERC, Junts, EH Bildu, PNV, BNG, CC y UPN: aún contienen celdas de las 5 preguntas retiradas (otro agente los estaba escribiendo); quitarlas al cerrar esos ficheros. `assemblyProblems` y el esquema no se quejan mientras tanto, pero esas celdas apuntan a preguntas que ya no existen.
- «Dijeron vs. hicieron» (otro agente, aún no registrado en `dichos-hechos/index.ts`): `psoe.ts` tiene una entrada con `questionId: "eutanasia"` y `podemos.ts` otra con `"autodeterminacion-sexo-registral"`; revisar al integrarlos.
- Traducciones ca/gl/eu de los 5 enunciados nuevos: pendientes de revisión humana (`docs/AFINIDAD-CAMBIOS.md`).
- Inmigración sin pregunta específica (ver §3).

## 8. Segunda revisión (2026-10-06): relieve público

Criterio añadido por el dueño: el test tiene que ser **viral**, así que cada pregunta debe tratar un asunto que cualquier votante reconozca. «seguro-ingresos-agrarios» discriminaba bien (53 pares) pero es de poco relieve. Se buscó un sustituto de relieve alto que siguiera separando partidos del mismo bloque y con ≥ 2 partidos a cada lado en hechos, con preferencia por **inmigración**. Misma métrica que en §2 (pares separados por signo, 14 partidos con historial), más la simulación de dominancia de `checks.ts` (10 000 usuarios uniformes y 10 000 moderados, lente de hechos) con cada candidata puesta en el lugar de la retirada.

### Candidatas evaluadas

Todas verificadas con `npm run afinidad:vote -- <url> --json`. «Problemas» = partidos fuera del 2–35 % en la simulación; «idénticos» = pares con las 15 posiciones iguales (además de sumar~frente-amplio, que es estructural).

| Candidata (ancla XV) | Relieve | A favor / en contra / abst. | Pares | Pares de bloque que separa | Simulación |
|---|---|---|---|---|---|
| **Regularización extraordinaria**: PNL de Podemos votada en los términos de la enmienda de Podemos, BNG, EH Bildu, ERC y Sumar (ses. 95, 26-2-2025, nº 7; BOCG-15-D-296) | muy alto | 7 / 6 / 1 (PSOE) | 55 | PSOE/Sumar, ERC/Junts, PNV/EH Bildu | **Compromís 0 %**; erc~eh-bildu idénticos |
| Expulsiones: PNL del GPP «ejecución efectiva de las órdenes de expulsión», punto 1 (ses. 164, 26-2-2026, nº 2; BOCG-15-D-489) | alto | 4 / 8 / 2 (PNV, CC) | 56 | ERC/Junts, PNV/EH Bildu | Compromís 0 %; erc~eh-bildu |
| Pacto Europeo de Migración y Asilo: PNL del GPP (ses. 202, 30-9-2026, nº 1) | medio (pide «la correcta implementación», genérico) | 2 / 10 / 2 (VOX, CC) | 44 | PP/VOX, VOX/UPN | Compromís 0 %; erc~eh-bildu |
| Reparto de menores migrantes: toma en consideración de la PL de PSOE, Sumar y Mixto (ses. 56, 23-7-2024, nº 63) | alto | 10 / 3 / 1 (UPN) | 43 | ERC/Junts, PP/UPN | Compromís 0 %; erc~eh-bildu |
| Moción del GPP sobre la crisis migratoria (ses. 60, 18-9-2024, nº 7) | alto, pero moción de varios puntos | 3 / 11 / 0 | 33 | PP/VOX | Compromís 0 %; erc~eh-bildu |
| Subsidio de desempleo: RDL 7/2023, derogado (ses. 15, 10-1-2024, nº 3) | alto | 9 / 4 / 0 (Junts no votó) | 36 | Sumar/Podemos | Compromís 0 %; erc~eh-bildu |
| Estatuto Marco del personal sanitario: moción de CC (ses. 200, 23-9-2026, nº 3) | alto (huelga de médicos) | 6 / 2 / 6 | 60 | PP/VOX, Sumar/Podemos, ERC/Junts, ERC/EH Bildu, Compromís/Sumar | Compromís 1,4 % |
| **IVA de la primera vivienda**: moción del GPP sobre vivienda, punto 1.d (ses. 196, 10-9-2026, nº 10; BOCG-15-D-585) | **muy alto** (la vivienda es el primer problema en el CIS) | 7 / 4 / 3 (PSOE, Junts, CC) | **61** | **ERC/EH Bildu**, **Compromís/Sumar**, BNG/Sumar, PSOE/Sumar, ERC/Junts, PNV/EH Bildu | **0 problemas** |

Además se rastrearon de forma automática las 495 votaciones de la XIV y la XV (sin enmiendas sueltas, convenios ni trámites) en las que Compromís o ERC/EH Bildu se separan del resto de su bloque, simulando cada una en lugar de la retirada (3 000 usuarios por perfil): solo 31 dejan 0 problemas y ningún par idéntico nuevo. Ninguna es de inmigración; las de más relieve son la del IVA de la vivienda y una PNL del GPP sobre la calidad del tren (poco discutible en sí: «recuperar la calidad y la confianza»).

### Por qué no entra inmigración

Todas las votaciones de inmigración con dos lados reparten a la izquierda en bloque (Sumar, Podemos, ERC, EH Bildu, BNG y Compromís votan igual). La pregunta retirada era la única que separaba a **ERC de EH Bildu** y a **Compromís de Sumar**; sin ella, ERC y EH Bildu quedan idénticos en hechos y Compromís, que solo se distingue por una abstención (prisiones), no gana a ningún usuario simulado (0 %, mínimo vinculante del 2 % en `AFINIDAD-PLAN.md`; falla con `STRICT=1`). Es un problema del ítem que sale, no de la regularización: la regularización sería buena si otra pregunta separase a esos partidos. Queda en `rejectedCandidates` con este motivo; su recuento ya está verificado en el JSON (arriba) por si se recupera.

### Elegida: «iva-primera-vivienda»

- Enunciado: «El IVA de la compra de la primera vivienda nueva debe bajar del 10 % al 4 %.» Medida concreta, fácil de entender y de opinar, del asunto que más preocupa.
- Ancla: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion196/20260910/Votacion010/VOT_20260910180642.json> (`informacion.sesion` 196, `numeroVotacion` 10, `fecha` 10/9/2026, subgrupo «Votación separada por puntos. Punto 1.d»). Texto del punto en BOCG-15-D-585 (aprobada sin modificaciones): «Bajar el IVA de adquisición de la primera vivienda nueva del 10 % al 4 % […] y permitir el fraccionamiento del IVA y del ITP al ritmo del pago de la hipoteca». El fraccionamiento no está en el enunciado; va en la `rationale`.
- Recuento: sí PP (137), VOX (31), ERC (6), PNV (5), BNG, Compromís, UPN; no Sumar (26), Podemos (4), EH Bildu (6); abstención PSOE (119), Junts (7), CC. Ortega Smith (Mixto, sin atribuir) no cuenta.
- Contrapartidas: es una moción (no vinculante) y la vivienda pasa a tener tres preguntas (tope del alquiler, okupación e IVA), aunque miden cosas distintas (regulación, propiedad, fiscalidad). Afirmación en el sentido de la derecha, como la retirada: el reparto sigue en 7 izquierda / 8 derecha.

### Segunda ancla de «jornada-37-5»

PNL del GSUMAR «relativa a la reducción de la jornada máxima legal de trabajo ordinario» (XV, ses. 23, 22-2-2024, nº 2; <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json>), aprobada 169/33/142. Texto (BOCG-15-D-96): diálogo social para reducir la jornada «de aplicación progresiva, empezando por la fijación, para este año 2024, de una jornada máxima ordinaria de trabajo efectivo de 38 horas y media». Misma dirección que el enunciado; `agreeMeans: "si"`.

Comprobación pedida (que no contradiga a la primera ancla): ningún partido cambia de signo. Coinciden PSOE, Sumar, Podemos, ERC, EH Bildu, PNV, BNG, CC, Compromís, Frente Amplio (sí/+2), VOX y UPN (no/−2). PP y Junts votaron contra la ley (primera ancla) y se abstuvieron en la PNL: por la regla de varias anclas (`AFINIDAD-DATOS.md` §3) pasan de −2 a **−1**. Se añade. Efecto: PP y VOX dejan de ser indistinguibles con un voto en sentido distinto, no solo con una abstención.

### Antes y después (lente de hechos)

| | Antes (con «seguro-ingresos-agrarios», jornada con 1 ancla) | Después |
|---|---|---|
| Pares separados, media por pregunta | 47,9 | 48,5 |
| Pares idénticos | sumar~frente-amplio | sumar~frente-amplio |
| Indistinguibles para el votante perfecto (`checks.ts`) | vox~pp, vox~upn, compromis~erc, sumar~frente-amplio | vox~upn, compromis~erc, sumar~frente-amplio |
| Problemas de dominancia (2–35 %) | 0 | 0 |

Dominancia, después (% de victorias; uniforme / moderado): upn 13,7 / 12,9; cc 11,7 / 11,2; pp 11,2 / 10,8; podemos 10,6 / 11,1; psoe 8,0 / 8,0; junts 8,0 / 9,7; bng 7,6 / 9,1; pnv 6,4 / 5,9; eh-bildu 5,8 / 4,2; erc 4,7 / 4,6; compromis 3,3 / 3,4; vox 3,1 / 3,4; sumar 3,0 / 2,8; frente-amplio 3,0 / 2,8. Antes: ver §6.

A una pregunta de distancia quedan: vox~upn (prostitución), sumar~eh-bildu, eh-bildu~frente-amplio, erc~compromis (prisiones) y erc~eh-bildu (ahora por el IVA). `npm run afinidad:verify`: 0 rotas, 0 errores de esquema.

### Pendiente de esta revisión

- Traducciones ca/gl/eu del enunciado nuevo: pendientes de revisión humana (`AFINIDAD-CAMBIOS.md`).
- Celdas de programa de «iva-primera-vivienda»: sin investigar.
- Inmigración sigue sin pregunta específica. Para recuperar la regularización haría falta antes otra pregunta que separe a Compromís y a ERC de EH Bildu.

## 9. Tercera revisión (2026-10-07): corrupción y Ceuta / Marruecos / Sáhara Occidental

Petición del dueño: añadir una pregunta de **corrupción** y otra de **Ceuta / Marruecos / Sáhara Occidental**, preferiblemente **sustituyendo** las de menos relieve («prisiones-agentes-autoridad» y «registro-lobbies») para quedarse en 15, y pasar a 16–17 solo si la sustitución rompe equilibrio, dominancia o discriminación. Misma métrica que §2 y §8 (pares separados por signo entre los 14 partidos con historial; simulación de `checks.ts`), más el STRICT completo de `afinidad-dataset.test.ts`.

### Búsqueda

Se rastrearon de nuevo las **8 758 votaciones nominales** de la XIV y la XV (ZIP diarios de datos abiertos, 1 731 días hábiles) buscando en `textoExpediente`/`textoSubGrupo` «Sáhara», «Marruecos», «Ceuta», «Melilla», «corrupción», «comisión de investigación», «Koldo», «denunciantes/informantes», «aforamiento», «integridad», «transparencia»… Para cada candidata: recuento con `npm run afinidad:vote -- <url> --json` y texto en el BOCG (ficha de la iniciativa en congreso.es).

### Sáhara Occidental: por qué no tiene pregunta propia

| Votación | Resultado | Reparto |
|---|---|---|
| PNL de GCUP-EC-GC, ERC y EH Bildu sobre la posición del Gobierno en el Sáhara (XIV, ses. 171, 7-4-2022, nº 1) | 168/118/61 | **PSOE no**; VOX abst.; todos los demás sí |
| PNL del GPP, punto 2: «Recuperar la posición histórica de neutralidad activa de España respecto al contencioso del Sáhara Occidental» (XV, ses. 49, 20-6-2024, nº 2; BOCG-15-D-170) | 228/121/0 | **PSOE no** (y Ábalos, sin atribuir); los 13 partidos restantes sí |

Con el enunciado propuesto («España debe apoyar el plan de autonomía de Marruecos como base para resolver el conflicto del Sáhara Occidental», `agreeMeans: "no"`) solo el PSOE queda a favor: **incumple el mínimo de 2 partidos por lado** (`ITEM_MIN_PER_SIDE`, test 5 en hechos) y separa **13 pares**, el mínimo posible (la media del cuestionario es 48,5). Es una división «Gobierno contra todos» que no distingue a ningún par dentro de un bloque. Se valoró meterla como **segunda ancla** de la pregunta de Ceuta, como pedía el coordinador si discriminaba bien: no se hace porque (1) no discrimina (ver arriba) y (2) mezclaría dos medidas distintas (el plan de autonomía y la respuesta a la crisis de Ceuta) en una sola afirmación, y la regla de varias anclas (`AFINIDAD-DATOS.md` §3) bajaría a ±1 o 0 a ERC, EH Bildu, Podemos, BNG y Compromís (no en Ceuta, sí en el Sáhara) sin que eso dijera nada de ninguna de las dos medidas. Queda en `rejectedCandidates` («sahara-plan-autonomia») con el recuento verificado.

### Ceuta y Marruecos: candidatas

La crisis de Ceuta de los días 30 y 31 de julio de 2026 (entrada masiva por la frontera; declaración de situación de interés para la seguridad nacional) generó en septiembre de 2026 varias votaciones. En la de mayo de 2021 no hubo votaciones nominales sobre Ceuta en el Pleno (ningún título lo menciona).

| Candidata | Resultado | Sí / No / Abst. (14 partidos) | Pares | Pares de bloque que separa | Simulación (en lugar de prisiones, con la de corrupción en lugar de lobbies) |
|---|---|---|---|---|---|
| **Moción del GPP sobre la crisis de Ceuta, punto 3 del 2.º apartado**: convocar a la embajadora de Marruecos, exigir explicaciones por la actuación marroquí del 30–31 de julio y llamar a consultas al embajador de España (XV, ses. 198, 16-9-2026, nº 14; BOCG-15-D-590) | 195/139/13 | PP, VOX, Sumar, Frente Amplio, UPN / PSOE, Podemos, ERC, EH Bildu, BNG, Compromís / Junts, PNV, CC | **63** | **PSOE/Sumar**, **Sumar/Podemos**, **Sumar/ERC, EH Bildu, BNG, Compromís**, PP/Junts, PNV/EH Bildu, CC/UPN | **0 problemas en hechos y por comunidad** |
| PNL del GPP de 20-6-2024, punto 4: reabrir la aduana de Melilla y abrir la de Ceuta en 90 días | 181/146/21 | PP, VOX, PNV, Podemos, CC, UPN / PSOE, Sumar, FA, Compromís / ERC, EH Bildu, Junts, BNG | 64 | Sumar/Podemos, **Compromís/ERC**, PNV/EH Bildu | 0 en hechos; en el ranking combinado de 32 partidos, un problema más que la elegida |
| Misma moción de 2026, punto 2: devolución de quienes entraron irregularmente; menores, a su familia o a los servicios de su país | 183/163/1 | PP, VOX, Junts, PNV, UPN / toda la izquierda / CC | 53 | Junts/ERC, PNV/EH Bildu | Sumar, EH Bildu y FA indistinguibles en hechos; 3 partidos al 2,0 % (moderado) |
| PNL del GPP «respuesta de Estado ante la crisis de seguridad nacional en Ceuta» (10-9-2026, nº 4) | 170/175/1 | PP, VOX, UPN / resto | 33 | ninguno | descartada |
| Mociones de VOX sobre Ceuta (16-9 y 30-9-2026) | 33/174/137 y 33/176/138 | solo VOX a favor | — | — | incumple el mínimo por lado |
| RDL 22/2026 de apoyo a Ceuta (convalidación) | 304/33/7 | casi unanimidad | — | — | no discrimina |

**Elegida: «ceuta-embajador-marruecos»** — «Tras la entrada masiva de personas en Ceuta en julio de 2026, España debe llamar a consultas a su embajador en Marruecos y exigir explicaciones al Gobierno marroquí.» `agreeMeans: "si"`. Es el asunto de política exterior de más relieve del momento, la medida es concreta (un paso diplomático, no un juicio sobre culpas), y es la candidata que más separa dentro de los bloques. El enunciado no dice «invasión» (palabra de la moción) sino «entrada masiva de personas», y no presume ninguna responsabilidad marroquí: pide explicaciones, como el texto aprobado. URL: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion198/20260916/Votacion014/VOT_20260916195402.json>.

### Corrupción: candidatas

| Candidata | Resultado | Reparto | Motivo |
|---|---|---|---|
| **PL del GSUMAR de creación de la Oficina de prevención de la corrupción**, toma en consideración (XV, ses. 131, 16-9-2025, nº 2; BOCG-15-B-99-1) | 170/176/1 | sí PSOE, Sumar, FA, Podemos, ERC, EH Bildu, PNV, BNG, CC, Compromís / no PP, VOX, Junts / abst. UPN | **Elegida.** Medida de política, no sobre personas; separa **Junts/ERC**, **Junts/PNV** y **UPN/PP-VOX**; 43 pares |
| Comisión de investigación del caso Koldo / Ábalos / Cerdán | — | — | **No hay ninguna votación del Pleno del Congreso** que la cree o la rechace (la del PP se constituyó en el Senado). Lo más cercano es la siguiente |
| Solicitud del PSOE de comisión de investigación sobre la contratación de material sanitario en la pandemia (XV, 21-3-2024, nº 14) | 175/33/136 | solo VOX no; PP abst. | Incumple el mínimo por lado |
| Ley 2/2023 de protección de informantes, dictamen (XIV, 22-12-2022, nº 373) | 200/142/4 | PP y VOX no; resto sí | División de bloques ya retirada en §3; además, ley en vigor |
| PL de VOX de protección de denunciantes de corrupción (XIV, 22-6-2021) y PL de Cs de lucha contra la corrupción (XIV, 17-6-2020) | 149/192; 159/178 | derecha frente a izquierda | XIV, partido extinto (Cs) y misma división |
| Mociones del GPP sobre «tramas de corrupción» (2024–2026) y reprobaciones | varias | PP+VOX frente al resto | Tratan de personas concretas y presumen hechos investigados: incompatibles con la presunción de inocencia del enunciado |
| PNL del PSOE «sobre la necesidad de transparencia» (10-9-2026, nº 5; BOCG-15-D-573) | 163/174/8 | — | Dirigida a declaraciones del jefe de la oposición: de parte |
| Aforamientos | — | — | Solo reformas de estatutos (Cantabria, Baleares) votadas por unanimidad |

**Elegida: «oficina-anticorrupcion»** — «Debe crearse una oficina estatal independiente contra la corrupción, con dirección elegida por el Congreso, que pueda investigar el uso de fondos públicos e imponer sanciones.» `agreeMeans: "si"`. El enunciado resume los artículos 1, 9, 34 y el título VI de la proposición (independencia orgánica y funcional, investigación de fondos públicos, contratos y subvenciones, dirección elegida por el Congreso por tres quintos, potestad sancionadora). URL: <https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion131/20250916/Votacion002/VOT_20250916211206.json>.

### Qué sale

- **prisiones-agentes-autoridad** (49 pares): la candidata del dueño de menos relieve. Su función (separar a Sumar del resto de la izquierda) la cumple mejor la de Ceuta.
- **registro-lobbies** (56 pares): mismo ámbito (integridad pública) que la oficina anticorrupción, de menos relieve y con un ancla (convalidación de un decreto-ley) que mezclaba la medida con la vía.

Se simularon también las variantes que **mantienen prisiones** y quitan registro-lobbies y otra pregunta (cada una de las 14 restantes) y la de **16 preguntas** (solo quitar registro-lobbies): ninguna mejora de forma clara a la elegida (todas siguen con Compromís por debajo del 2 % en el ranking combinado de 32 partidos, que es estructural; quitar jornada, prostitución, IVA o competencias de inmigración crea nuevos pares indistinguibles). Por eso se queda en **15**.

**Equilibrio de redacción**: sale una afirmación de iniciativa de la izquierda (lobbies, decreto del Gobierno) y entra otra (oficina, PL de Sumar); sale una de la derecha (prisiones) y entra otra (Ceuta, moción del PP). El reparto sigue en **7 izquierda / 8 derecha**. Ninguna de las dos nuevas tiene a un bloque entero de un lado: la de Ceuta pone a Sumar con PP y VOX, y la de la oficina a Junts con PP y VOX.

### Recuento por partido (hechos)

| Partido | ceuta-embajador-marruecos (16-9-2026) | oficina-anticorrupcion (16-9-2025) |
|---|---|---|
| PSOE | no (120) → −2 | sí (118) → +2 |
| PP | sí (137) → +2 | no (136) → −2 |
| VOX | sí (32) → +2 | no (33) → −2 |
| Sumar (GSUMAR sin atribuidos) | sí (24) → +2 | sí (26) → +2 |
| Frente Amplio (historial de GSUMAR) | sí → +2 | sí → +2 |
| Podemos (4 diputados del Mixto) | no (4) → −2 | sí (4) → +2 |
| ERC | no (7) → −2 | sí (7) → +2 |
| Junts | abst. (7) → 0 | no (7) → −2 |
| EH Bildu | no (6) → −2 | sí (6) → +2 |
| PNV | abst. (5) → 0 | sí (5) → +2 |
| BNG (Rego) | no → −2 | sí → +2 |
| CC (Valido) | abst. → 0 | sí → +2 |
| UPN (Catalán) | sí → +2 | abst. → 0 |
| Compromís (Micó) | no → −2 | sí → +2 |
| Mixto sin atribuir | Ortega Smith: sí | Ábalos: sí |

### Antes y después

Hechos (14 partidos con historial, 10 000 usuarios por perfil):

| | Antes | Después |
|---|---|---|
| Pares separados, media / mínimo | 48,5 / 39 | 48,5 / 39 (Ceuta 63, oficina 43) |
| Indistinguibles para el votante perfecto (hechos) | sumar~frente-amplio, compromis~erc | sumar~frente-amplio, compromis~erc (iguales) |
| Problemas de dominancia en hechos (2–35 %) | 0 | **0** |
| Problemas de dominancia por comunidad (STRICT, lo que ve la UI) | 0 | **0** |

Dominancia en hechos, después (% de victorias, uniforme / moderado): upn 13,4 / 12,8; pp 12,0 / 12,5; cc 10,9 / 11,4; podemos 9,7 / 9,1; psoe 8,5 / 8,7; junts 8,5 / 10,2; bng 6,9 / 8,3; pnv 6,8 / 6,4; sumar 4,5 / 4,5; frente-amplio 4,5 / 4,5; eh-bildu 4,4 / 3,1; vox 4,1 / 3,0; erc 2,8 / 2,8; compromis 2,8 / 2,8. Antes (misma simulación): upn 13,8 / 12,8; pp 11,2 / 11,1; cc 11,9 / 10,0; podemos 9,8 / 12,0; psoe 7,8 / 7,9; junts 7,8 / 9,4; bng 7,5 / 9,2; pnv 6,5 / 5,4; eh-bildu 6,2 / 4,6; erc 4,3 / 4,7; vox 3,5 / 3,6; sumar 3,2 / 3,0; frente-amplio 3,2 / 3,0; compromis 3,3 / 3,1.

Ranking combinado con los **32 partidos juntos** (vista que no existe en la UI; STRICT la marca): antes 6 problemas (pp 1,8 %, sumar 2,0 %, erc 1,5 %, compromis 0,1 % uniforme; erc 1,4 %, compromis 0 % moderado); después 7 (vox 2,0 % y 1,6 %, erc 1,5 % y 1,2 %, compromis 0,3 % y 0,2 %, sumar 1,9 % moderado). El PP sale del aviso y entra VOX, que pierde su celda de programa de prisiones (+2, coincidía con casi todo usuario de derecha) y, tras la revisión ciega, no puntúa en la de Ceuta; gana la de la oficina (+1). Compromís sigue casi a cero por motivos estructurales: su programa es el de Sumar y en hechos sigue a una abstención de ERC.

Programa (STRICT, test 5): «oficina-anticorrupcion» 8 a favor y 0 en contra (ningún programa se opone a un órgano así; VOX y PSOE lo proponen) y «ceuta-embajador-marruecos» 0 / 1 (solo el PSOE, −1, «nueva etapa» con Marruecos; los programas son anteriores a la crisis). Es el mismo tipo de aviso que ya tenían 9 preguntas en programa; no se corrige tocando posiciones (`AFINIDAD-DATOS.md` §6). Test 7 (cobertura por bloque en programa): el bloque izquierda pasa de estar dentro del margen a 48,9 % frente a 28,1 % de media, porque las celdas nuevas que puntúan son sobre todo de partidos de izquierda (Sumar, Compromís, Podemos, CHA, Adelante Andalucía, Més per Menorca) y salen dos que puntuaban en Junts y Aliança Catalana (prisiones).

### Programa y hemeroteca

- **Programa** (32 partidos, misma fuente que cita cada fichero): «oficina-anticorrupcion» puntúa en PSOE, VOX, Sumar (y Compromís), Podemos, Adelante Andalucía, CHA y Més per Menorca, todos **+1** (refuerzan un órgano existente, no le dan funciones de investigación o sanción, o son de ámbito autonómico o europeo); «ceuta-embajador-marruecos» solo en el PSOE (−1). El resto, `sin-posicion` con palabras buscadas (ASG, AHI y Democracia Ourensana, `pendiente`; Frente Amplio, `pendiente` por no tener programa). Revisión ciega con extracto solo de cita: ver `AFINIDAD-REVISION.md`, revisión 3.
- **Hemeroteca**: 15 citas nuevas de los Diarios de Sesiones de los dos debates (DSCD-15-PL-136, pp. 19–32; DSCD-15-PL-205, pp. 133–142), con vídeo de congreso.es; se quitaron las 21 citas de las dos preguntas retiradas. Sin cita (no hablaron o no trataron la medida): en la oficina, BNG y Compromís; en Ceuta, PSOE, Podemos, ERC, Junts, EH Bildu, BNG, CC, UPN y Compromís (motivo por partido en el informe de la ronda).

### Compatibilidad

`DATASET_VERSION` pasa a **2026.10.1**: las respuestas se codifican por posición (`order`), y las preguntas 4 y 13 cambian, así que un enlace compartido con la versión anterior muestra el aviso de «versión anterior». JSON abierto: `public/afinidad/datos-2026.10.1.json` (`npm run afinidad:json`); el de 2026.10.0 se conserva.

### Pendiente

- Traducciones ca/gl/eu de los dos enunciados y etiquetas nuevos: pendientes de revisión humana.
- Programas de 2026: la pregunta de Ceuta es posterior a todos los programas de 2023; se rehará con los de 2026.
- Sáhara Occidental: si una votación futura deja a otro partido junto al PSOE, se puede recuperar «sahara-plan-autonomia».
