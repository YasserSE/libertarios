# Afinidad — revisión ciega (2026-10-06)

Revisión ciega de las celdas de **programa** de PSOE, PP, Vox, Sumar y Podemos, y de todas las entradas de **«Dijeron vs. hicieron»** (`src/data/afinidad/dichos-hechos/*.ts`), según `docs/AFINIDAD-DATOS.md` §4 y el comentario de `SaidVsDid.verdict` en `src/data/afinidad/types.ts`.

## Procedimiento

1. Un script fuera del repo extrajo, por cada celda `verificado`/`contested`, solo `{celda, enunciado, cita, título y página de la fuente}`, sin posición, confianza ni nota. Con ese fichero se codificó cada celda (−2..+2 respecto al enunciado) y los códigos se guardaron en un fichero aparte **antes** de abrir las posiciones originales. Un segundo script comparó los dos ficheros.
2. Lo mismo para «Dijeron vs. hicieron»: se extrajo `{id, said.text, said.date, did.summary, títulos de las pruebas}` sin el veredicto ni la nota, se asignó un veredicto propio y después se comparó.
3. Validación de todos los ficheros tocados con `programmeStanceSchema`, `saidVsDidSchema` y `validateDataset` (dataset del índice y dataset con las 13 listas de «Dijeron vs. hicieron», también las que aún no están registradas en el índice), y `npx tsc --noEmit -p .`: todo en verde. Los tests `afinidad-dataset`, `afinidad-dvh` y `afinidad-score` pasan.

## Parte A — programa

**Acuerdo: 40 de 40 celdas con |codificador − revisor| ≤ 1 (100 %); 31 de 40 idénticas (77,5 %).** Cada celda que puntúa lleva ahora `reviewer: { position, agrees: true }`. Compromís hereda las celdas de `sumar.ts` (con su `reviewer`) sin editarse.

**Celdas `contested`: ninguna.** No hay ningún desacuerdo de más de un punto.

**Bajadas a `pendiente`: ninguna.** Todas las citas tratan el asunto del enunciado.

Diferencias de un punto (se queda la posición del codificador):

| Celda | Codificador | Revisor | Motivo del revisor |
|---|---|---|---|
| psoe · vivienda-tope-alquiler | +2 | +1 | «Desarrollaremos las medidas… de contención de precios»: genérico; no nombra las zonas tensionadas ni los contratos nuevos |
| psoe · prostitucion-abolicion | +2 | +1 | La cita no habla de castigar a quien paga |
| psoe · registro-lobbies | +2 | +1 | Registro público, pero sin decir que sea obligatorio ni prever multas |
| pp · nuclear | +1 | +2 | «Propondremos… la extensión de la vida útil»: compromiso explícito (la condición del CSN es la que ya pone la ley) |
| vox · tauromaquia-patrimonio | +2 | +1 | Habla de «protección de… festejos taurinos», no de protegerlos por ley como patrimonio |
| sumar · registro-lobbies | +1 | +2 | «Difusión pública obligatoria de sus actividades» |
| podemos · gasto-defensa | −1 | −2 | «Frenar la deriva… a disparar su gasto militar» |
| podemos · registro-lobbies | +1 | +2 | Obligatoriedad explícita y más exigencia que el registro actual |

### Comprobación de las celdas `sin-posicion`

Se volvió a buscar en el texto de los PDF (scratchpad `programas/`; Sumar y Podemos extraídos de nuevo de su PDF) en 19 de las 29 celdas `sin-posicion` (66 %): PSOE (tauromaquia, competencias de inmigración), PP (tauromaquia, jornada, impuesto a la banca, prostitución), Vox (IRPF/inflación, banca, lobbies, prostitución, jornada), Sumar (prostitución, gasto en defensa, okupación, IRPF, prisiones), Podemos (prostitución, prisiones, amnistía/IRPF).

**No hay correcciones.** Los pasajes que salen con las palabras clave ya están citados y descartados en la `note` del codificador (PP medida 205, trata y no prostitución consentida; Vox 148.4, actualización para el ahorro y no para los tramos; Sumar p. 133, «el fenómeno de la ocupación» como ejemplo de inseguridad percibida; Sumar p. 139, auditoría de los programas de armamento sin hablar del nivel de gasto) o no tratan el asunto del enunciado (las menciones a «lobbies» de Vox son retóricas; las de Sumar y Podemos sobre prostitución se refieren a planes de inserción para víctimas de trata).

## Parte B — «Dijeron vs. hicieron»

Había 68 entradas en 13 ficheros.

### Regla 1: compromiso real (la versión original pedía «al menos 30 días de margen»; corregida)

> **Corrección (2026-10-06, regla del dueño).** El plazo de 30 días no es la regla y se retira. La regla es: «lo que dijeron» tiene que ser un compromiso real (programa, campaña, discurso de investidura, acuerdo de coalición o de investidura, o promesa explícita sobre lo que harán) y **nunca** una intervención en el mismo debate de la votación con la que se compara; **no hay plazo mínimo**. Con esa regla, seis de las siete retiradas se mantienen (las seis son intervenciones en el mismo debate de la votación) y **`pp-irpf-2011` vuelve** al dataset: es una promesa del discurso de investidura de Rajoy (19-12-2011) incumplida por el RDL 20/2011 once días después. Las entradas mantenidas de la lista de abajo se mantienen por ser compromisos reales, no por el margen de días. Lo descartado se publica por partido en `src/data/afinidad/dichos-hechos/busqueda.ts` («Qué buscamos y por qué no entró»).

Se han **quitado 7 entradas**. En todas, lo «dicho» es una intervención en el mismo debate (o con menos de 30 días de diferencia) que el «hecho»; no es un compromiso de programa, campaña, investidura o acuerdo, ni una promesa explícita hecha antes:

| Entrada | Días | Motivo |
|---|---|---|
| `compromis-inmigracion-cataluna-2025` | 0 | Anuncio de voto en el mismo debate de la toma en consideración |
| `compromis-tauromaquia-2025` | 0 | Anuncio de voto en el mismo debate de la ILP |
| `eh-bildu-concierto-economico-2025` | 2 | Anuncio de voto en el debate de lectura única de esa misma ley |
| `podemos-impuesto-energeticas-2024` | 0 | La condición («si quieren los votos…») y el voto son del mismo pleno |
| `pp-irpf-2011` | 11 | Investidura del 19-12-2011 y RDL 20/2011 del 30-12-2011: menos de 30 días |
| `upn-jornada-37-5-2025` | 0 | Intervención y voto en el mismo debate de totalidad |
| `upn-competencias-inmigracion-2025` | 0 | Intervención y voto en el mismo debate de la toma en consideración |

Se han revisado y se mantienen las que no vienen de un programa o un acuerdo, porque son promesas explícitas sobre lo que harían, con más de 30 días de margen: `cc-amnistia-2023`, `upn-amnistia-2023`, `pp-amnistia-2023` y `vox-amnistia-2023` (las cuatro en debates de investidura), `psoe-amnistia-2022` («este gobierno no va a aceptar»), `psoe-indultos-proces-2019` («su íntegro cumplimiento»), `compromis-gasto-militar-2025` («no vamos a dar apoyo»), `pp-extremadura-vox-2023`, `junts-pensiones-si-okupaciones-no-2026` («votarem que sí… quan les presentin», en otro debate y 30 días antes), `pnv-tribunal-constitucional-competencias` («presentaremos»), `vox-mocion-censura-2020` («presentaremos en septiembre») y `sumar-embargo-armas-israel-2025`. El hecho de esta última es un RDL del Gobierno de cuatro meses después, no el voto de ese debate.

### Regla 2: «no-hecho» solo si el partido podía hacerlo

Hay tres entradas «no-hecho»: `psoe-ley-mordaza-2019`, `podemos-ley-mordaza-2019` y `sumar-ley-mordaza-2023`. En las tres se cumple la condición de poder: el partido firmó el compromiso en un acuerdo de coalición y estaba en el Gobierno, y hay prueba primaria de que no se hizo (ficha de iniciativa rechazada o en ponencia y real decreto de disolución). No cambia nada.

### `questionId` fuera de las preguntas activas

Se ha quitado `questionId: "arraigo"` de `vox-arraigo-2025` (`arraigo` está en `rejectedCandidates`). La entrada se queda, sin pregunta asociada.

### Veredictos

**Acuerdo: 56 de 61 entradas restantes (91,8 %). No se ha cambiado ningún veredicto.** En los 5 desacuerdos, la nota del codificador da un criterio defendible y las pruebas no respaldan con claridad el veredicto del revisor:

| Entrada | Codificador | Revisor | Por qué se mantiene el del codificador |
|---|---|---|---|
| `bng-jornada-35-horas` | parcial | cumple | Criterio explícito y aplicado a todos: apoyar una reducción menor que la prometida (37,5 h frente a 35 h) es «parcial» |
| `eh-bildu-jornada-32-horas` | parcial | cumple | El mismo criterio (32 h) |
| `erc-jornada-cuatro-dias` | parcial | cumple | El mismo criterio (semana de cuatro días) |
| `pp-pensiones-2012` | parcial | contradice | Hubo subida del 1 % desde el 1-1-2012 y después se suprimió la actualización; las dos lecturas caben |
| `sumar-jornada-37-5-2023` | parcial | no-hecho | Sumar llevó el proyecto desde el Gobierno y el Congreso lo devolvió; «parcial» con nota es defendible |

## Fuera del encargo, para decidir

- `src/data/afinidad/dichos-hechos/index.ts` no registra `bng`, `cc`, `pnv`, `pp`, `upn` ni `vox`: esas entradas no llegan hoy al dataset. Pasan el esquema y `validateDataset`. No se ha tocado el índice. **Resuelto (integración del 2026-10-06):** registrados los 13 ficheros; un test exige que todo fichero de la carpeta esté registrado.
- `podemos.ts` (programa) usa el programa de las **europeas de 2024**, y `AFINIDAD-DATOS.md` §2 solo admite el de las generales. El codificador lo explica en la nota de contexto de cada celda. La revisión ciega ha codificado las citas tal como están, pero la fuente misma conviene confirmarla.

## Revisión 2 — nacionalistas, regionalistas y extraparlamentarios (2026-10-06)

**Alcance**: celdas de programa de ERC, Junts, EH Bildu, PNV, BNG, CC, UPN y de los 18 extraparlamentarios (SALF, Adelante Andalucía, CHA, Aragón Existe, Foro, Més per Mallorca, Més per Menorca, NC-BC, ASG, AHI, PRC, UPL, Por Ávila, Soria ¡Ya!, CUP, Aliança Catalana, Democracia Ourensana, Geroa Bai). Excluida `seguro-ingresos-agrarios` (se sustituye). Total: 350 celdas — 79 verificadas, 228 sin posición, 43 pendientes (ASG, AHI y Democracia Ourensana no tienen ninguna verificada).

**Procedimiento**: un script fuera del repo extrajo de cada celda verificada/contested solo `{celda, enunciado, cita, «Traducción» de la nota, título y página de la fuente}`, sin posición, confianza ni resto de la nota. Las 79 se codificaron en un fichero aparte antes de ver las originales y se compararon por script. Las traducciones al castellano de las citas en catalán y gallego se cotejaron con el original al codificar.

### Resultado

- **Acuerdo (|diferencia| ≤ 1): 79/79 (100 %).** Coincidencia exacta: 63/79 (80 %).
- **Contested: ninguna.** Ninguna celda pasa a `contested`.
- **Citas fuera de tema: ninguna.** Ninguna celda baja a `pendiente`.
- **Traducciones**: todas fieles al original (ca/gl); sin correcciones.
- A las 79 celdas se les ha puesto `reviewer: { position, agrees: true }`. En los ficheros que generan las celdas con una función auxiliar (CHA, Foro, Més per Mallorca, Més per Menorca, Geroa Bai) la posición del revisor va en una tabla `REVISOR` por pregunta al principio del fichero; en el resto, en línea.

Diferencias de un punto (se queda la posición del codificador; puntúa con la media, `score.ts`):

| Celda | Codificador | Revisor | Motivo del revisor |
|---|---|---|---|
| erc/impuesto-grandes-fortunas | +2 | +1 | «crear impuestos sobre las grandes fortunas», sin umbral ni ámbito estatal |
| eh-bildu/impuesto-grandes-fortunas | +2 | +1 | hacerlo permanente, con gestión de las haciendas forales |
| bng/impuesto-grandes-fortunas | +2 | +1 | permanencia y traspaso de la gestión a Galicia |
| adelante-andalucia/impuesto-grandes-fortunas | +2 | +1 | reconvertir Patrimonio en impuesto a la riqueza, sin ámbito |
| salf/impuesto-grandes-fortunas | −1 | −2 | la deducción íntegra en la cuota autonómica neutraliza el impuesto |
| foro/impuesto-grandes-fortunas | −1 | −2 | bonificación del 99 % = suprimir Patrimonio |
| junts/irpf-inflacion | +1 | +2 | «deflactar las escalas de todos los impuestos a la inflación» |
| bng/irpf-inflacion | +1 | +2 | deflactar «en función de la tasa de inflación» |
| alianca-catalana/irpf-inflacion | +2 | +1 | deflactar, sin decir que sea cada año |
| junts/prisiones-agentes-autoridad | +2 | +1 | limitado a los funcionarios de prisiones catalanes |
| junts/inmigracion-competencias-cataluna | −2 | −1 | «que Cataluña pueda decidir sobre los flujos migratorios»: dirección sin medida |
| alianca-catalana/okupacion-desalojo | +2 | +1 | 48 h, no 24 h |
| aragon-existe/vivienda-tope-alquiler | +1 | +2 | «aplicaremos los topes al alquiler» |
| nc-bc/tauromaquia-patrimonio | −2 | −1 | rechaza la práctica, no habla de la ley |
| cup/nuclear | −2 | −1 | «modelo sin centrales nucleares» en 2050, sin calendario |
| cup/gasto-defensa | −1 | −2 | enumera el aumento del presupuesto militar como política que rechaza |

Dos patrones que conviene unificar en la próxima pasada (no cambian ninguna celda porque la diferencia es de un punto): (1) **grandes fortunas**: el codificador da +2 a «crear / hacer permanente un impuesto a las grandes fortunas» aunque no diga que sea estatal ni el umbral, y −1 a suprimir o neutralizar Patrimonio; el revisor, +1 y −2. (2) **deflactar el IRPF**: el mismo tipo de frase recibe +1 en unos partidos y +2 en otros según el codificador (Junts, BNG y UPN +1, Aliança Catalana +2; el revisor dio +2 a Junts y BNG y +1 a UPN y Aliança). Conviene fijar en `AFINIDAD-DATOS.md` si «deflactar» sin «cada año» es +1 o +2.

### Muestreo de `sin-posicion`

67 de 228 celdas (29 %): 50 al azar (semilla 20261006) y 17 elegidas donde era más probable un fallo (CUP y tauromaquia, prostitución, grandes fortunas, vivienda; BNG, EH Bildu y UPN en nuclear y defensa; PNV y BNG en amnistía…). Para cada una se buscaron las palabras clave del asunto en el texto extraído del programa (`scratchpad/programas/<id>/`) y se leyeron los fragmentos. **No se encontró ningún pasaje claro que se hubiera pasado por alto**; no se añade ninguna celda. Los resultados que parecían relevantes eran falsos positivos ya descritos en la nota de la celda (p. ej. Junts y vivienda: incentivos fiscales por debajo del índice de referencia, no limitar la renta; PNV y banca: solo pide que, si se mantiene, se tramite como impuesto concertable; «Amnistía» de 1977 en PNV y BNG).

### Regla de fuente

`AFINIDAD-DATOS.md` §2 solo admitía programas de generales. Se ha añadido la excepción por decisión del dueño: los partidos sin programa propio de generales usan el último programa oficial de cualquier elección, con elección y año en `source.title` y el motivo en `note`. Todos los ficheros revisados cumplen la parte de etiquetado. Dos casos quedan **fuera de la letra de la excepción** y se dejan como están, pendientes de decisión del dueño:

- **aragon-existe/vivienda-tope-alquiler**: Teruel Existe sí tiene programa propio de generales 2023 (que no trata el asunto); la celda sale del de autonómicas de Aragón 2026. Si la excepción no lo cubre, la celda pasa a `sin-posicion`.
- **adelante-andalucia** (fichero entero): en las generales de 2023 concurrió por Cádiz; se usó el programa andaluz de 2026 «porque es posterior», sin comprobar si había programa propio de 2023. Hay que localizar ese programa: si existe, la regla pide usarlo.

Además, en Adelante Andalucía algunas citas llevan los acentos «normalizados» porque el PDF los extrae mal (lo dice su `note`); no cambia palabras, pero conviene cotejarlas contra el PDF.

### Validación

`programmeStanceSchema` en las 350 celdas (0 errores; 79 con revisor), `validateDataset` sobre el dataset actual más los ficheros revisados que aún no están en el índice (ERC, Junts, EH Bildu, PNV, BNG, CC, UPN) — válido, sin problemas de ensamblaje — y `npx tsc --noEmit -p .` sin errores. No se ha tocado ningún índice.

## Revisión 3 — independencia de la fuente en «Dijeron vs. hicieron» (2026-10-07)

Encargo del dueño: «más críticos con el PSOE en base a datos reales, no publicidad del Gobierno», aplicado como regla neutral a todo partido que haya gobernado (PSOE, PP 2011–2018, Unidas Podemos y Sumar). Regla en `AFINIDAD-DATOS.md` §5 bis; detalle de cambios en `AFINIDAD-CAMBIOS.md`.

### Auditoría de los datos oficiales existentes (21)

| Entrada | Datos (antes) | Clasificación | Fuente independiente añadida | Etiqueta |
|---|---|---|---|---|
| `psoe-smi-60-2020` | preámbulo del RD 99/2023 (BOE) | gobierno (afirmación del preámbulo) | Eurostat earn_mw_avgr2, OCDE MIN2AVE, INE EAES 2023 | **cumple → parcial** |
| `psoe-vivienda-183000-2023` | web y nota del Ministerio | gobierno ×2 | serie VDP007 del Ministerio (estadística), Tribunal de Cuentas informe 1.640 | parcial (sin cambio) |
| `psoe-avales-ico-50000-2023` | adenda del convenio (BOE) | gobierno | serie de actividad del ICO (estadística) | parcial (sin cambio) |
| `psoe-presupuesto-vivienda-2019` | PGE, tomo VII ×4 | estadística oficial | liquidación IGAE 2019 y 2023; Tribunal de Cuentas informe 1.673 | cumple (sin cambio) |
| `psoe-financiacion-autonomica-2020`, `psoe-estatuto-trabajadores-2023` | BOE consolidado | estadística oficial | — (no-hecho; no aplica) | sin cambio |
| `psoe-fondo-reserva-5000-2023` | informe del FRSS a las Cortes | estadística oficial | — (cifras confirmadas en el informe) | parcial (sin cambio) |
| `psoe-deficit-2023` | IGAE ×2 | estadística oficial | Eurostat gov_10dd_edpt1, Consejo de la UE (ST 11121/26) | cumple (sin cambio) |
| `pp-deficit-2012` | nota de Hacienda + Eurostat | gobierno + independiente | tabla suplementaria de Eurostat de ayudas al sector financiero | parcial (sin cambio; ahora apoyada en Eurostat) |
| `pp-rescate-bancario-coste` | Banco de España | independiente | — | no-hecho (sin cambio) |
| `pp-senda-deficit-2017` | Eurostat | independiente | — | cumple (sin cambio) |
| `podemos-presupuesto-vivienda-2019` | PGE ×4 | estadística oficial | igual que el PSOE (mismo compromiso firmado) | cumple (sin cambio) |
| `sumar-avales-ico-50000-2023` | adenda (BOE) | gobierno | serie del ICO | parcial (sin cambio) |

Las demás entradas de gobierno se apoyan en votaciones, BOE o fichas de iniciativa (hechos jurídicos, no cifras del Gobierno) y no cambian. La única que apoyaba la etiqueta en una cifra declarada por el propio Gobierno dentro de un BOE era la del salario mínimo.

### Entradas nuevas

PSOE: `psoe-imv-850000-hogares-2020` (AIReF), `psoe-corrupcion-mocion-censura-2018` y `psoe-comision-investigacion-koldo-2025` (Tribunal Supremo, Congreso, Senado), `psoe-sahara-autodeterminacion-2019`, `psoe-aduanas-ceuta-melilla-2022`. PP: `pp-verdad-barcenas-kitchen-2013`, `pp-plan-regeneracion-democratica-2013`. Presunción de inocencia: la situación procesal se copia del documento judicial (condenado por STS 418/2026 sin constancia de firmeza; investigado en libertad provisional; acusados en Kitchen).

### Validación

`npx vitest run`, `npx tsc --noEmit -p .`, eslint de los ficheros tocados, `npx next build` y `npm run afinidad:json`.

## Revisión 3 — preguntas nuevas del 2026-10-07 (corrupción y Ceuta)

**Alcance**: las celdas de programa de «oficina-anticorrupcion» y «ceuta-embajador-marruecos» de los 32 partidos (`docs/AFINIDAD-PREGUNTAS.md` §9; reglas en `docs/AFINIDAD-DATOS.md` §7). Codificaron cuatro agentes, cada uno con su grupo de ficheros y la misma fuente que ya cita cada fichero.

**Procedimiento**: un script fuera del repo extrajo de cada celda verificada solo `{celda, enunciado, cita, traducción, título y página de la fuente}` (10 celdas; Compromís hereda la de Sumar). Un agente distinto, que solo pudo abrir ese extracto y las reglas, codificó cada una antes de comparar.

**Resultado**: 8 de 10 idénticas (100 % de acuerdo en las que el revisor consideró en tema). En 2 el revisor dijo **«fuera de tema»**, y las dos pasan a `sin-posicion` con la cita y el motivo en `note`, aplicando a todos el mismo criterio:

| Celda | Codificador | Revisor | Decisión |
|---|---|---|---|
| pp · oficina-anticorrupcion | +1 (medida 248: reformar la Ley 2/2023 «para asegurar la independencia de las actuaciones») | fuera de tema: la cita no nombra ningún organismo | `sin-posicion` |
| vox · ceuta-embajador-marruecos | +2 (medida 193: «Ni un euro de los españoles debe financiar a países que violentan nuestras fronteras») | fuera de tema: no nombra a Marruecos ni a Ceuta o Melilla | `sin-posicion` (mismo trato que el condicionamiento genérico de ayudas de SALF) |

Las 8 restantes llevan `reviewer: { position, agrees: true }` (en CHA y Més per Menorca, en su tabla `REVISOR`): PSOE, VOX, Sumar/Compromís, Podemos, Adelante Andalucía, CHA y Més per Menorca +1 en la oficina; PSOE −1 en Ceuta. **Contested: ninguna.**
