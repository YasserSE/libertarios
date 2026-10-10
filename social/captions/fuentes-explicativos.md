# Fuentes de los vídeos explicativos (comprobadas el 10-10-2026)

Cada cifra que sale en pantalla o en la voz, con su fuente original. Las del Banco de España e IGAE se han leído en el PDF original, no en prensa.

## Vivienda: el problema real

| Cifra | Fuente |
|---|---|
| 240.000 hogares nuevos en 2025 | BdE, Informe Anual 2025, cap. 2 (p. 135 y 157) |
| 92.000 viviendas terminadas en 2025 (−9 %) | BdE, Informe Anual 2025 (p. 133 y 157) |
| Déficit de unas 750.000 viviendas, 2021-2025 | BdE, Informe Anual 2025 (p. 155 y 157) |
| 52,5 % del déficit en Madrid, Barcelona, Alicante, València, Murcia y Málaga | BdE, Informe Anual 2025 (p. 155) |
| +12,9 % el precio de la vivienda en 2025 | INE, IPV 4T 2025 (nota de prensa) |
| 7,1 años de renta para un joven (esfuerzo potencial de compra) | BdE, Informe Anual 2025 (p. 145) |
| «Escasez de suelo edificable, lentitud en la ejecución y limitaciones de gestión de la planificación urbanística» | BdE, Informe Anual 2025 (p. 17 y 128) |
| Más del 90 % de la vivienda habitual en alquiler es de personas físicas; 8,1 % de sociedades (datos de 2021). Alemania 34 %, Francia 23 % | BdE, Documento Ocasional 2432 (2024), p. 30-31 |
| San Francisco: los propietarios retiraron un 15 % de los pisos del alquiler | Diamond, McQuade y Qian, American Economic Review (2019), vía `Libertarios/src/data/measures.ts` |
| Estocolmo: más de nueve años de cola para un piso regulado | Bostadsförmedlingen, datos anuales de la cola, vía `measures.ts` |
| Buenos Aires: la oferta de pisos en alquiler en CABA subió un 62 % en enero de 2024 frente a diciembre, tras derogar la ley de alquileres | Zonaprop, citado por La Nación (7-8-2026). Fuente secundaria; son anuncios publicados, no contratos. Otras cifras que circulan (178 %, 212 %, 218 %) no coinciden entre sí y no se usan |
| «1 de cada 10» viviendas vacías en una gran ciudad | 400.000 / 3,8 millones = 10,5 % |
| Más de 3,8 millones de viviendas vacías; 400.000 en municipios de más de 250.000 habitantes | BdE, Informe Anual 2025, nota 36 (con datos del INE, 2021) |
| Densificar: entre 1 y 1,2 millones de viviendas más en las seis grandes áreas | BdE, Informe Anual 2025 (p. 159) |

## ¿De derecha sin ser conservador?

| Cifra | Fuente |
|---|---|
| Posición de los partidos en el mapa | `Libertarios/src/data/quadrantReferences.ts`: la web las llama «orientativas», por política fiscal ejercida, y se dice en pantalla |
| Ningún partido con escaño arriba a la derecha; P-LIB, sin escaño | Partidos con escaño del conjunto de datos del test (datos abiertos del Congreso). `npm run check` lo comprueba |
| 0 de 22 partidos europeos con las dos libertades | Calculado como en `AboutSection.tsx` (≥ +50 en los dos ejes). `npm run check` lo comprueba |

## El ticket de tus impuestos (30.000 € brutos, soltero, Madrid, 2026)

| Cifra | Fuente o cálculo |
|---|---|
| Empresa ≈ 9.200 € (30,65 %) | Orden PJC/297/2026: contingencias comunes 23,60 + desempleo 5,50 + FP 0,60 + MEI 0,75 + FOGASA 0,20. Sin accidentes de trabajo |
| Trabajador 1.950 € (6,50 %) | Orden PJC/297/2026: 4,70 + 1,55 + 0,10 + 0,15 |
| IRPF ≈ 4.600 € | Escala estatal y de Madrid 2026; gastos de 2.000 €; mínimo personal de 5.550 € (estatal) y 5.777,55 € (Madrid). Contrastado con guiafiscal.es (diferencia menor del 1 %) |
| Total ≈ 15.800 € (40 % del coste laboral de ≈ 39.200 €) | Suma de las tres |
| ≈ 1.300 € al mes | 15.758 / 12 |
| «De enero a finales de mayo» | 40,2 % × 365 = día 147 (27 de mayo). `npm run check` lo comprueba |
| ≈ 70 € al mes en intereses | 843 € / 12 |
| Reparto por funciones | IGAE, Resumen COFOG 2020-2024 (P): 725.001 M€ en total (pensiones = 10.2 + 10.3; sanidad 102.942; educación 65.862; asuntos económicos 80.908; servicios generales 92.551; defensa 14.233; vivienda 7.613…) |
| Intereses de la deuda: 38.793 M€ (2,4 % del PIB) | Eurostat, gov_10a_main, D41 pagados, España 2024 |
| Pensiones + sanidad + educación + seguridad = 57 % | (200.475 + 102.942 + 65.862 + 28.628 orden público + 14.233 defensa) / 725.001 = 56,8 %. `npm run check` lo comprueba |
| «El otro 43 %» ≈ 6.800 € de tu ticket | 15.758 × 43,2 %: paro y otras ayudas 2.110, administración 2.010 (intereses 840), asuntos económicos 1.760, ocio 420, medio ambiente 340, vivienda 170 |
| «+280 € al mes, un 14 % más de sueldo» | Supuesto ilustrativo: ese 43 % a la mitad (3.400 €/año = 283 €/mes) y todo el ahorro te llega, incluida la cotización de la empresa; sueldo neto ≈ 1.953 €/mes → 14,5 %, se dice «14 %». `npm run check` lo comprueba |
| Caveat «como si se repartiera como el gasto total» | Las cotizaciones van a la Seguridad Social: el reparto es ilustrativo, y se dice en pantalla y en la voz |

## Vivienda: lo que dicen y lo que hacen

Todo sale del conjunto de datos del test (`Libertarios/public/afinidad/datos-2026.10.2.json`): programas con página y votaciones del Congreso. Son tres votaciones, más dos entradas «dijo / hizo» de los partidos que han gobernado:

- ley de vivienda, 27-abr-2023;
- moción sobre el IVA (no vinculante), 10-sep-2026;
- ley del PP contra la ocupación, 19-may-2026;
- PP: `pp-deduccion-vivienda-2011` (parcial): deducción recuperada por el RDL 20/2011 y suprimida desde 2013 por la Ley 16/2012;
- PSOE: `psoe-vivienda-183000-2023` (parcial): meta de 183.000; 32.444 viviendas protegidas terminadas de 2024 al 1T 2026 (Ministerio, VDP007_01), de todas las administraciones.

`npm run check` falla si la voz y los datos dejan de coincidir.

## Vídeos por temas: lo que prometen y lo que votan (impuestos, pensiones, seguridad, inmigración, sanidad y educación)

- **Impuestos:** solo datos del test (`irpf-inflacion`, `impuesto-grandes-fortunas`, `impuesto-banca`; «dijo / hizo» `pp-irpf-2011` y `psoe-presupuestos-2026`).
- **Los otros cuatro:** usan `social/src/explainers/extra-votes.ts`, buscado el 10-10-2026:
  - **Votos:** datos abiertos del Congreso (XV), recontados por partido con `npm run afinidad:vote`. El recuento está guardado en `social/data/votes/<id>.json` y `npm run check` lo compara con el vídeo. Podemos se cuenta por sus diputados del Grupo Mixto.
  - **Promesas:** cita literal con página del PDF. Programas del 23-J 2023 (Podemos: europeas 2024, el mismo que usa el test). Sin cita clara → «sin posición».

| Vídeo | Votación | Fecha | Resultado |
|---|---|---|---|
| Pensiones | Convalidación del RDL 16/2025 (ómnibus: pensiones +2,7 % y otras medidas) | 27-1-2026 | 171-178, derogado |
| Pensiones | Convalidación del RDL 3/2026 (revalorización de pensiones) | 26-2-2026 | 317-33 |
| Pensiones | Convalidación del RDL 11/2024 (compatibilidad pensión y trabajo) | 22-1-2025 | 298-51 |
| Inmigración | Toma en consideración de la ILP de regularización extraordinaria | 9-4-2024 | 310-33 |
| Inmigración | Toma en consideración de la ley de Vox sobre el arraigo | 16-9-2025 | 169-177 |
| Inmigración | Toma en consideración del reparto de menores no acompañados | 23-7-2024 | 171-177 |
| Sanidad | Dictamen de la ley de la Agencia Estatal de Salud Pública | 20-3-2025 | 167-176 |
| Sanidad | Toma en consideración de la ley de Vox de tarjeta sanitaria | 26-11-2024 | 32-174 (134 abst.) |
| Educación | Moción sobre educación 0-3 (texto transaccional) | 20-5-2026 | 169-170 |
| Seguridad | Ley de multirreincidencia, votación de conjunto | 26-3-2026 | 272-71 |
| Seguridad | (Vox «sí al empezar») toma en consideración de la multirreincidencia | 17-9-2024 | 304-38 |
| Seguridad | PNL del PP de equiparación salarial, punto 1 | 16-10-2024 | 171-174 |
| Seguridad | Toma en consideración de la ley de Vox sobre el «petaqueo» | 17-6-2025 | 171-172 |
| Corrupción | Convalidación del RDL 21/2026 de grupos de interés (lobbies) | 16-9-2026 | 155-179, derogado |

Corrupción también usa `oficina-anticorrupcion` del test.

«Cuando gobiernan»: `pp-verdad-barcenas-kitchen-2013`, `psoe-comision-investigacion-koldo-2025`, `pp-pensiones-2012`, `psoe-fondo-reserva-5000-2023`, `psoe-ley-mordaza-2019` y `podemos-ley-mordaza-2019`, del conjunto de datos del test.

### Equilibrio: contradicciones del Gobierno añadidas (10-10-2026)

| Vídeo | Hecho | Fuente primaria |
|---|---|---|
| Corrupción | Sánchez (2018): «asumir las responsabilidades políticas»; el TS condenó a Ábalos a 24 años en 2026 | `psoe-corrupcion-mocion-censura-2018` (test) |
| Seguridad | Ceuta: llamar a consultas al embajador (16-9-2026). PP, Vox y Sumar sí; PSOE y Podemos no | `ceuta-embajador-marruecos` (test) |
| Seguridad | Sáhara: el programa de 2019 prometía autodeterminación; en 2022, apoyo al plan marroquí | `psoe-sahara-autodeterminacion-2019` (test) |
| Inmigración | Sumar prometió cerrar los CIE (programa, p. 105); nuevo CIE en Algeciras | BOE-A-2026-2827 (Orden INT/63/2026) |
| Inmigración | Sumar prometió una regularización permanente (p. 104); regularización única por decreto | BOE-A-2026-8284 (RD 316/2026); Congreso 120/000004 |
| Sanidad | PSOE prometió por ley un máximo de 120 días para operarse (p. 201); sin ley, espera media de 122 días | Congreso (proyectos de la XV); SISLE dic-2025 rectificado, p. 6 |
| Sanidad | Sumar prometió integrar MUFACE (p. 92); concierto con Adeslas y Asisa hasta 2027 | Nota de prensa de Función Pública, 30-4-2025 |

**Corrupción:** no se dice «9 casos». A 10-10-2026 hay 8 causas que afectan a exdirigentes del PSOE, al entorno del presidente y al exfiscal general: 3 con sentencia (2 firmes) y 5 abiertas. El PSOE como partido no está imputado. La fuente es prensa secundaria, así que la cifra no sale en pantalla hasta comprobarla en poderjudicial.es.

