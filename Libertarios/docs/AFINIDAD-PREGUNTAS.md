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
