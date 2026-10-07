# Afinidad — verificación de fuentes

> GENERADO por `npm run afinidad:verify` (scripts/verify-afinidad-sources.ts) el 2026-10-07. No editar a mano.
> Dataset 2026.10.0: 32 partidos, 15 preguntas, 480 celdas, 127 citas de hemeroteca.

## Resumen

- Modo: 662 URLs y 236 votaciones comprobadas.
- Esquema: válido.
- **Rotas en celdas que puntúan o anclas: 6** (hacen fallar el script).
- Rotas en hemeroteca (no puntúa): 4.
- Avisos (comprobar a mano): 13.
- Comprobaciones omitidas: 120.
- Celdas pendientes: 65 · contested: 0 · sin posición: 280.

## Rotas — celdas que puntúan y votaciones ancla

| Partido | Pregunta | Qué | Estado | Problema | URL |
|---|---|---|---|---|---|
| junts | irpf-inflacion | programa | verificado | programa: sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | prisiones-agentes-autoridad | programa | verificado | programa: sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | amnistia | programa | verificado | programa: sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | okupacion-desalojo | programa | verificado | programa: sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | inmigracion-competencias-cataluna | programa | verificado | programa: sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | tauromaquia-patrimonio | programa | verificado | programa: sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |

## Rotas — hemeroteca

| Partido | Pregunta | Qué | Estado | Problema | URL |
|---|---|---|---|---|---|
| junts | dvh:junts-deflactar-impuestos | hemeroteca | — | dijeron: Junts per Catalunya (programa electoral) (2023-07-19): sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | dvh:junts-desalojo-48-horas | hemeroteca | — | dijeron: Junts per Catalunya (programa electoral) (2023-07-19): sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | dvh:junts-funcionarios-prisiones-agentes-autoridad | hemeroteca | — | dijeron: Junts per Catalunya (programa electoral) (2023-07-19): sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |
| junts | dvh:junts-multirreincidencia | hemeroteca | — | dijeron: Junts per Catalunya (programa electoral) (2023-07-19): sin respuesta (fetch failed) | <https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf> |

## Avisos

| Partido | Pregunta | Qué | Estado | Problema | URL |
|---|---|---|---|---|---|
| alianca-catalana | vivienda-tope-alquiler | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| alianca-catalana | irpf-inflacion | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| alianca-catalana | prisiones-agentes-autoridad | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| alianca-catalana | nuclear | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| alianca-catalana | impuesto-grandes-fortunas | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| alianca-catalana | okupacion-desalojo | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| alianca-catalana | iva-primera-vivienda | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| alianca-catalana | inmigracion-competencias-cataluna | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf> |
| salf | vivienda-tope-alquiler | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://www.seacabolafiesta.com/programa-andalucia> |
| salf | nuclear | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://www.seacabolafiesta.com/images/Contrato_Electoral_SALF_CyL_2026.pdf> |
| salf | impuesto-grandes-fortunas | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://www.seacabolafiesta.com/programa-andalucia> |
| salf | okupacion-desalojo | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://www.seacabolafiesta.com/programa-andalucia> |
| salf | iva-primera-vivienda | programa | verificado | programa: el servidor no deja comprobarlo (HTTP 403); ábrelo a mano | <https://www.seacabolafiesta.com/programa-andalucia> |

## Omitidas

La cita literal de programas en PDF no se comprueba: no hay extractor de texto de PDF instalado y no se añaden dependencias. TODO: con un extractor, buscar la cita en la página indicada (`scripts/verify-afinidad-sources.ts`, `checkQuoteInDocument`).

| Partido | Pregunta | Qué | Estado | Problema | URL |
|---|---|---|---|---|---|
| adelante-andalucia | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | prostitucion-abolicion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | registro-lobbies | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| adelante-andalucia | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf> |
| aragon-existe | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://teruelexiste.info/wp-content/uploads/2026/01/Programa-elecciones-autonomicas-8F-2026.-Teruel-Existe.pdf> |
| aragon-existe | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://teruelexiste.info/wp-content/uploads/2023/07/Programa_23J-2023-_Teruel_Existe_-elecciones-generales.pdf> |
| bng | irpf-inflacion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf> |
| bng | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf> |
| bng | prostitucion-abolicion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf> |
| bng | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf> |
| bng | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf> |
| bng | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf> |
| cc | prostitucion-abolicion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://coalicioncanaria.org/wp-content/uploads/cc-pdf/programas-electorales/00_COALICION%20POR%20CANARIAS.pdf> |
| cha | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf> |
| cha | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf> |
| cha | prostitucion-abolicion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf> |
| cha | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf> |
| cha | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf> |
| cha | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf> |
| cha | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf> |
| compromis | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| compromis | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| compromis | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| compromis | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| compromis | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| compromis | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| compromis | registro-lobbies | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| compromis | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| cup | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://cup.cat/wp-content/uploads/2023/07/AF_Programa-electoral_Congres-2023.pdf> |
| cup | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://cup.cat/wp-content/uploads/2023/07/AF_Programa-electoral_Congres-2023.pdf> |
| eh-bildu | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf> |
| eh-bildu | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf> |
| eh-bildu | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf> |
| eh-bildu | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf> |
| erc | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| erc | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| erc | amnistia | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| erc | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| erc | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| erc | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| erc | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| erc | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf> |
| foro | irpf-inflacion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://foroasturias.es/wp-content/uploads/2023/05/Programa-electoral-FORO-Asturias-20232027.pdf> |
| foro | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://foroasturias.es/wp-content/uploads/2023/05/Programa-electoral-FORO-Asturias-20232027.pdf> |
| geroa-bai | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://parlamentodenavarra.es/sites/default/files/contenido-estatico-archivos/Geroa%20Bai.pdf> |
| geroa-bai | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://parlamentodenavarra.es/sites/default/files/contenido-estatico-archivos/Geroa%20Bai.pdf> |
| mes-mallorca | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf> |
| mes-mallorca | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf> |
| mes-mallorca | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf> |
| mes-mallorca | prostitucion-abolicion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf> |
| mes-mallorca | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf> |
| mes-mallorca | registro-lobbies | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf> |
| mes-mallorca | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf> |
| mes-menorca | vivienda-tope-alquiler | programa | verificado | cita no comprobada: el servidor devuelve PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.mespermenorca.cat/ca/download/538/> |
| mes-menorca | jornada-37-5 | programa | verificado | cita no comprobada: el servidor devuelve PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.mespermenorca.cat/ca/download/538/> |
| mes-menorca | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: el servidor devuelve PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.mespermenorca.cat/ca/download/538/> |
| mes-menorca | iva-primera-vivienda | programa | verificado | cita no comprobada: el servidor devuelve PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.mespermenorca.cat/ca/download/538/> |
| mes-menorca | registro-lobbies | programa | verificado | cita no comprobada: el servidor devuelve PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.mespermenorca.cat/ca/download/538/> |
| nc-bc | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://nuevacanarias.org/wp-content/uploads/2023/04/Programa_Electoral_2023.pdf> |
| nc-bc | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://nuevacanarias.org/wp-content/uploads/2023/04/Programa_Electoral_2023.pdf> |
| nc-bc | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://nuevacanarias.org/wp-content/uploads/2023/04/Programa_Electoral_2023.pdf> |
| nc-bc | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://nuevacanarias.org/wp-content/uploads/2023/04/Programa_Electoral_2023.pdf> |
| pnv | registro-lobbies | programa | verificado | cita no comprobada: el servidor devuelve PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j> |
| podemos | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | okupacion-desalojo | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | registro-lobbies | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| podemos | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf> |
| pp | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | irpf-inflacion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | prisiones-agentes-autoridad | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | okupacion-desalojo | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| pp | registro-lobbies | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf> |
| prc | prostitucion-abolicion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://web.archive.org/web/20230513223924/https://prc.es/programa_electoral_prc.pdf> |
| prc | okupacion-desalojo | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://web.archive.org/web/20230513223924/https://prc.es/programa_electoral_prc.pdf> |
| prc | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://web.archive.org/web/20230513223924/https://prc.es/programa_electoral_prc.pdf> |
| psoe | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | prostitucion-abolicion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | okupacion-desalojo | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| psoe | registro-lobbies | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf> |
| soria-ya | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://soriaya.org/wp-content/uploads/2026/03/Programa-Soria-Ya-2026.pdf> |
| sumar | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| sumar | jornada-37-5 | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| sumar | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| sumar | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| sumar | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| sumar | impuesto-banca | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| sumar | registro-lobbies | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| sumar | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf> |
| upl | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.upl.es/wp-content/uploads/2026/02/Programa-2026-UPL-autonomicas.pdf> |
| upn | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf> |
| upn | irpf-inflacion | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf> |
| upn | okupacion-desalojo | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf> |
| upn | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf> |
| vox | vivienda-tope-alquiler | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |
| vox | prisiones-agentes-autoridad | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |
| vox | nuclear | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |
| vox | gasto-defensa | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |
| vox | impuesto-grandes-fortunas | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |
| vox | okupacion-desalojo | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |
| vox | iva-primera-vivienda | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |
| vox | tauromaquia-patrimonio | programa | verificado | cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO) | <https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf> |

## Contested — por partido

Ninguna.

## Pendientes — por partido

### ahi (15)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| irpf-inflacion | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| jornada-37-5 | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| prisiones-agentes-autoridad | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| amnistia | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| nuclear | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| prostitucion-abolicion | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| gasto-defensa | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| impuesto-grandes-fortunas | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| okupacion-desalojo | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| iva-primera-vivienda | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| impuesto-banca | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| registro-lobbies | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| inmigracion-competencias-cataluna | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |
| tauromaquia-patrimonio | programa | Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común. |

### asg (15)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| irpf-inflacion | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| jornada-37-5 | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| prisiones-agentes-autoridad | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| amnistia | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| nuclear | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| prostitucion-abolicion | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| gasto-defensa | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| impuesto-grandes-fortunas | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| okupacion-desalojo | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| iva-primera-vivienda | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| impuesto-banca | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| registro-lobbies | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| inmigracion-competencias-cataluna | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |
| tauromaquia-patrimonio | programa | Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa. |

### cc (2)

| Pregunta | Lente | Nota |
|---|---|---|
| impuesto-grandes-fortunas | hechos | no votó: Ana Oramas (GMx, XIV), única diputada atribuida a CC, figura como «No vota» en el JSON. La ausencia no es posición (docs/AFINIDAD-DATOS.md §3): sin otra ancla, la celda queda pendiente y no puntúa. |
| tauromaquia-patrimonio | hechos | no votó: Cristina Valido García (GMx), única diputada atribuida a CC, figura como «No vota» en el JSON. La ausencia no es posición (docs/AFINIDAD-DATOS.md §3): sin otra ancla, la celda queda pendiente y no puntúa. |

### democracia-ourensana (15)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| irpf-inflacion | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| jornada-37-5 | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| prisiones-agentes-autoridad | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| amnistia | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| nuclear | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| prostitucion-abolicion | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| gasto-defensa | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| impuesto-grandes-fortunas | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| okupacion-desalojo | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| iva-primera-vivienda | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| impuesto-banca | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| registro-lobbies | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| inmigracion-competencias-cataluna | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |
| tauromaquia-patrimonio | programa | Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición. |

### frente-amplio (15)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| irpf-inflacion | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| jornada-37-5 | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| prisiones-agentes-autoridad | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| amnistia | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| nuclear | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| prostitucion-abolicion | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| gasto-defensa | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| impuesto-grandes-fortunas | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| okupacion-desalojo | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| iva-primera-vivienda | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| impuesto-banca | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| registro-lobbies | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| inmigracion-competencias-cataluna | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |
| tauromaquia-patrimonio | programa | Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026) |

### junts (1)

| Pregunta | Lente | Nota |
|---|---|---|
| nuclear | programa | Dudoso. En la p. 90 hay un epígrafe «Mix elèctric i al tancament de les nuclears» («Mix eléctrico y cierre de las nucleares») seguido solo de medidas para potenciar las renovables, y en la p. 91 propone «Treure la nuclear i la gran hidràulica de la subhasta elèctrica». El epígrafe parece dar por hecho el cierre, pero no hay ninguna frase que diga si las centrales deben cerrar en el calendario previsto o seguir funcionando. Necesita revisión humana; mientras tanto no puntúa. |

### upn (2)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | hechos | XIV: UPN no tiene diputados atribuidos en deputies.ts. Sergio Sayas y Carlos García Adanero se eligieron por Navarra Suma (NA+, coalición UPN-PP-Cs) y UPN los expulsó en 2022; su voto no se atribuye a UPN sin fuente con fechas. Para constancia, en el JSON: Sayas López, Sergio (GMx): No; García Adanero, Carlos (GMx): No. |
| impuesto-grandes-fortunas | hechos | Sin dato atribuible a UPN en la XIV: los dos diputados de Navarra Suma (Sergio Sayas y Carlos García Adanero, GMx) fueron elegidos en la coalición NA+ (UPN-PP-Cs) y UPN los expulsó en 2022; deputies.ts no los atribuye a UPN. Se revisará si aparece fuente con fechas. |

## Sin posición — por partido

### adelante-andalucia (6)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Sin mención a deflactar o indexar los tramos del IRPF a la inflación. Buscado: «IRPF», «deflact», «inflación», «tramos», «tarifa»; leídas las secciones 2.1.3–2.1.5 (pp. 144-149), que piden más progresividad (Propuestas 779, 787, 797) pero no tratan la actualización con la inflación. Programa de las elecciones andaluzas de 2026; en las generales de 2023 Adelante Andalucía solo concurrió por Cádiz. |
| prisiones-agentes-autoridad | programa | No trata la condición de agentes de la autoridad de los funcionarios de prisiones. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad»; leído el apartado 10.2 «Derechos civiles y prisiones» (pp. 279-280: malos tratos, salud mental en prisión, asumir la competencia de ejecución penitenciaria, transporte a las prisiones). Programa de las elecciones andaluzas de 2026; en las generales de 2023 Adelante Andalucía solo concurrió por Cádiz. |
| amnistia | programa | No trata la Ley de amnistía de 2024. Buscado: «amnistía» (única mención, p. 263: derogación de la Ley de Amnistía de 1977 para juzgar crímenes del franquismo, asunto distinto), «procés», «Cataluña». Programa de las elecciones andaluzas de 2026; en las generales de 2023 Adelante Andalucía solo concurrió por Cádiz. |
| okupacion-desalojo | programa | No trata la ocupación ilegal ni el desalojo exprés. Buscado: «okupa», «ocupación», «usurpación», «desalojo», «desahucio» (solo aparece en el sentido de desahucios de inquilinos/hipotecados, pp. 72, 82, 222). Programa de las elecciones andaluzas de 2026; en las generales de 2023 Adelante Andalucía solo concurrió por Cádiz. |
| iva-primera-vivienda | programa | No trata los impuestos de la compra de vivienda. Buscado: «IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «Actos Jurídicos» y «fiscal» junto a «vivienda». El IVA solo aparece para el reparto autonómico de impuestos (Propuestas 760 y 767) y para tipos reducidos de productos de primera necesidad, cultura e instrumentos musicales (Propuestas 780 y 1397, pp. 305-306); en vivienda, solo la exención del IBI de las viviendas públicas en alquiler (Propuesta 346). Programa de las elecciones andaluzas de 2026; en las generales de 2023 Adelante Andalucía solo concurrió por Cádiz. |
| inmigracion-competencias-cataluna | programa | No trata la delegación de competencias de inmigración a Cataluña. Buscado: «inmigración», «competencias», «Cataluña», «Generalitat»; leído el apartado 10.1.2 «Migraciones» (pp. 275-276). Programa de las elecciones andaluzas de 2026; en las generales de 2023 Adelante Andalucía solo concurrió por Cádiz. |

### alianca-catalana (7)

| Pregunta | Lente | Nota |
|---|---|---|
| jornada-37-5 | programa | Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023. No trata el asunto. Leído el programa completo (32 páginas) y buscado: jornada, hores setmanals, 37,5 (solo menciona la conciliación en la Generalitat, p. 8). |
| amnistia | programa | Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023. No trata el asunto. Leído el programa completo (32 páginas) y buscado: amnistia, repressió, encausats (el programa defiende una declaración unilateral de independencia, p. 1, pero no habla de la amnistía). |
| prostitucion-abolicion | programa | Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023. No trata el asunto. Leído el programa completo (32 páginas) y buscado: prostitució, proxenetisme, tràfic, tracta, explotació sexual. |
| gasto-defensa | programa | Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023. No trata el asunto. Leído el programa completo (32 páginas) y buscado: despesa militar, defensa, OTAN (solo propone «un exèrcit» para la Cataluña independiente, p. 30). |
| impuesto-banca | programa | Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023. No trata el asunto. Leído el programa completo (32 páginas) y buscado: banca, bancs, entitats financeres, impost, gravamen (solo «bancs d'aliments», p. 2). |
| registro-lobbies | programa | Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023. No trata el asunto. Leído el programa completo (32 páginas) y buscado: lobbies, grups d'interès, grups de pressió, registre de transparència. |
| tauromaquia-patrimonio | programa | Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023. No trata el asunto. Leído el programa completo (32 páginas) y buscado: toros, tauromàquia, correbous, bous. |

### aragon-existe (13)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: IRPF, deflactar, inflación, tramos, impuesto, fiscalidad (solo «Tributación justa, general, equitativa y progresiva», pág. 5 de 2023, y fiscalidad rural). |
| jornada-37-5 | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: jornada, 37,5, horas semanales, tiempo de trabajo (solo «jornada continuada por cuidado de hijas/hijos», pág. 18 de 2023). |
| prisiones-agentes-autoridad | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: prisiones, penitenciario, funcionarios de prisiones, agentes de la autoridad, cárcel. |
| amnistia | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: amnistía, procés, Cataluña. |
| nuclear | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: nuclear, centrales, cierre (solo renovables y autoconsumo). |
| prostitucion-abolicion | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: prostitución, proxenetismo, trata, explotación sexual. |
| gasto-defensa | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: defensa, militar, OTAN, ejército. |
| impuesto-grandes-fortunas | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: grandes fortunas, patrimonio, riqueza (solo «Tributación justa, general, equitativa y progresiva», sin impuesto concreto). |
| okupacion-desalojo | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: okupación, ocupación ilegal, desalojo, desahucio. |
| impuesto-banca | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: banca, bancos, entidades financieras, gravamen, beneficios extraordinarios. |
| registro-lobbies | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: lobbies, grupos de interés, grupos de presión, registro de transparencia, huella normativa. |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: competencias de inmigración, Generalitat, Cataluña, delegación. |
| tauromaquia-patrimonio | programa | No trata el asunto. Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.). Buscado: tauromaquia, toros, festejos taurinos, bous. |

### bng (9)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «aluguer», «renda», «tensionad», «prezo». El apartado de vivienda (p. 15) pide más inversión, vivienda pública, contratos más largos y movilizar vivienda vacía, pero no limitar la renta de los contratos. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «prisión», «penitenciari», «cárcere», «funcionariado», «axentes da autoridade». Solo pide derogar la prisión permanente revisable (p. 27), el traslado a Galicia de los presos gallegos (p. 28) y transferir la «saúde penal» (p. 37); nada sobre los funcionarios de prisiones. |
| amnistia | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «amnist», «Catalunya», «represaliad». «Amnistía» solo aparece para pedir la derogación de la Ley de Amnistía de 1977 (p. 28). |
| nuclear | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «nuclear», «centrais». Solo aparece el «peche das centrais» (de carbón, en el contexto de la transición justa gallega, p. 50) y los residuos nucleares de la Fosa Atlántica (p. 58); nada sobre el calendario de cierre nuclear. |
| okupacion-desalojo | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «ocupación», «okupa», «desaloxo», «desafiuzamento». |
| iva-primera-vivienda | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «IVE», «superreducido», «primeira vivenda», «compra», «adquisición», «transmisións patrimoniais», «fiscalidade» junto a «vivenda». Solo «Reformular a fiscalidade sobre a vivenda con criterios redistributivos» (p. 15), sin decir en qué sentido ni hablar de la compra, y bajar al tramo superreducido el IVE de «bens e servizos esenciais» y culturales (p. 40), sin nombrar la vivenda. |
| registro-lobbies | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «lobby», «grupos de interese», «rexistro», «portas xiratorias», «transparencia». Pide una «Regulación estrita das portas xiratorias e das incompatibilidades» (p. 29) y transparencia en la contratación pública (p. 30), pero nada sobre un registro de grupos de interés. |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «Catalunya», «inmigración», «competencias». Las transferencias que pide son para Galicia. |
| tauromaquia-patrimonio | programa | No trata el asunto. Buscado en el texto completo (68 páginas): «tauromaquia», «touros», «corridas». |

### cc (14)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «alquiler», «vivienda», «tensionad». |
| irpf-inflacion | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «IRPF», «deflact», «inflación». Solo propone ampliar diez años la bonificación del 60 % del IRPF para residentes en La Palma (compromiso 14, p. 5). |
| jornada-37-5 | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «jornada», «horas semanales». El apartado de empleo (compromisos 15-17) no trata la jornada. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «prisión», «penitenciari», «funcionarios», «agentes de la autoridad». |
| amnistia | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «amnist», «Cataluña», «indult». |
| nuclear | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «nuclear». Solo trata renovables y transición energética en Canarias (compromisos 44-45). |
| gasto-defensa | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «militar», «defensa», «OTAN». |
| impuesto-grandes-fortunas | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «patrimonio», «fortunas», «riqueza». |
| okupacion-desalojo | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «ocupación», «okupa», «desalojo». |
| iva-primera-vivienda | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «IVA», «IGIC», «vivienda», «primera vivienda», «compra», «Transmisiones». El IVA solo aparece por el cobro de IVA en vez de IGIC en compras digitales (p. 11). |
| impuesto-banca | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «banca», «bancos», «impuesto», «beneficios», «gravamen». |
| registro-lobbies | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «lobby», «grupos de interés», «registro», «puertas giratorias», «transparencia», «corrupción». |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «Cataluña», «competencias». Pide presencia de Canarias en las negociaciones con Marruecos sobre «el control de los movimientos migratorios» (compromiso 13, p. 5), nada sobre Cataluña. |
| tauromaquia-patrimonio | programa | No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: «tauromaquia», «toros». |

### cha (8)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: alquiler, precio, renta, tope, limitar, zonas tensionadas (págs. 52-53: ley de vivienda aragonesa, parque público de alquiler, ayudas; nada sobre limitar la renta de contratos privados). |
| irpf-inflacion | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: IRPF, deflactar, inflación, tramos (pág. 110 pide «Incrementar la tributación en el IRPF para las rentas más altas», no la actualización con la inflación). |
| prisiones-agentes-autoridad | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: prisiones, penitenciario, funcionarios de prisiones, agentes de la autoridad (pág. 15 solo pide «Reclamar las competencias en materia de gestión penitenciaria» y la sanidad penitenciaria). |
| amnistia | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: amnistía, procés, Cataluña, represión. |
| okupacion-desalojo | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: okupación, ocupación ilegal, usurpación, desalojo (págs. 145-146 solo hablan de informar a personas vulnerables para evitar el desalojo o desahucio de su vivienda familiar). |
| iva-primera-vivienda | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: IVA, superreducido, primera vivienda, compra de vivienda, adquisición, Transmisiones Patrimoniales, Actos Jurídicos Documentados, fiscalidad de la vivienda (págs. 52-53: solo pide «medidas fiscales» que eximan de tributar las ayudas al alquiler y la rehabilitación y explorar reducciones del IRPF por alquiler; nada sobre los impuestos de la compra). |
| registro-lobbies | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: lobbies, grupos de interés, grupos de presión, registro de transparencia, huella normativa, puertas giratorias. |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback). Leído completo (154 págs.). Buscado: competencias de inmigración, Generalitat, Cataluña, delegación. |

### compromis (7)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales. El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «deflact», «indexa», «tramos», «IRPF», «inflación». El IRPF aparece solo para subir tipos marginales y ampliar tramos desde 120.000 € (p. 17) y en medidas de vivienda; nada sobre actualizar la tarifa con la inflación. |
| prisiones-agentes-autoridad | programa | Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales. El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «penitenci», «prisiones», «prisión», «cárcel», «agente(s) de (la) autoridad», «funcionarios de prisiones». Habla de sanidad penitenciaria (pp. 92 y 133), de suprimir la prisión permanente revisable (p. 133) y de que en la policía haya funciones «que no requieran ser agente de autoridad» (p. 131); nada sobre la condición de los funcionarios de prisiones. |
| amnistia | programa | Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales. El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «amnist», «indult», «procés», «independentis», «desjudicializ». Solo elogia «la desjudicialización» en el marco de la mesa de diálogo (p. 121); el programa es anterior a la ley de amnistía. |
| prostitucion-abolicion | programa | Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales. El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «prostitu», «proxenet», «abolic», «tercería», «cliente», «trabajo sexual». Solo una ley integral contra la trata y «consolidar el Plan de Inserción sociolaboral dirigido a mujeres víctimas de trata y de explotación sexual y a mujeres en situación de prostitución» (p. 110); nada sobre castigar a quien paga ni el proxenetismo consentido. |
| gasto-defensa | programa | Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales. El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «gasto militar», «gasto en defensa», «presupuesto», «OTAN», «armamento», «2 %». Solo propone revisar y auditar los Programas Especiales de Armamento «con el fin de dotarlos de mayor transparencia» (p. 139) y desplazar las garantías de la OTAN a una autonomía estratégica europea; nada sobre el nivel del gasto. |
| okupacion-desalojo | programa | Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales. El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «ocupación», «okupa», «desalojo», «usurpación», «allanamiento». Solo menciona «el fenómeno de la ocupación» como ejemplo de inseguridad exagerada por la publicidad de la seguridad privada (p. 133); nada sobre el procedimiento de desalojo. |
| inmigracion-competencias-cataluna | programa | Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales. El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «Generalitat», «Mossos», «competencias», «puertos y aeropuertos», «inmigración». Solo traspasar la gestión de puertos y aeropuertos para gestionarla con las ciudades (p. 82, en movilidad) y reforzar el autogobierno catalán en general (p. 121); nada sobre delegar la inmigración. |

### cup (13)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: lloguer, preu, habitatge, zones tensionades. Solo dice que la ley de vivienda trae «petites millores» pero es «un instrument incapaç ni tan sols de frenar l'especulació» (p. 2) y «aturem l'especulació en els preus de [...] l'habitatge» (p. 8); ninguna de las dos se pronuncia sobre limitar la renta de los nuevos contratos. |
| irpf-inflacion | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: IRPF, inflació, deflactar, trams. |
| jornada-37-5 | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: jornada, hores, 37,5. Solo aparece el lema «Treballem totes, treballem menys» (p. 10) en el apartado feminista, sin medida sobre la jornada legal. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: presons, penitenciari, funcionaris de presons, agents de l'autoritat. Solo dice que combatirá «un sistema penitenciari classista, masclista i racista» (p. 7), sin hablar de la condición de los funcionarios. |
| amnistia | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: amnistia. El programa es anterior a la ley (2024) y pide el «lliure retorn a casa d'exiliats i empresonats polítics» (p. 7), sin mencionar una amnistía. |
| prostitucion-abolicion | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: prostitució, proxenetisme, tràfic, tracta, explotació sexual. |
| impuesto-grandes-fortunas | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: fortunes, patrimoni, impost. Solo dice «Cal avançar en la redistribució de la riquesa per mitjà de mesures impositives» (p. 10), sin mencionar un impuesto sobre grandes patrimonios. |
| okupacion-desalojo | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: ocupació, desnonament, desallotjament. |
| iva-primera-vivienda | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: IVA, habitatge, primer habitatge, compra, adquisició, transmissions patrimonials, fiscalitat. No hay ninguna medida fiscal sobre la compra de vivienda. |
| impuesto-banca | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: banca, bancs, impost, gravamen, beneficis extraordinaris. Critica el rescate bancario y pide que «els bancs retornin els milers de milions d'euros que l'Estat els va regalar» (p. 8), sin proponer un impuesto a la banca. |
| registro-lobbies | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: lobbies, grups d'interès, registre, portes giratòries. Solo «combatem els lobbies» y denuncia las «portes giratòries» (p. 11), sin proponer un registro. |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: competències d'immigració, Generalitat, delegació. Defiende la independencia, no la delegación de competencias. |
| tauromaquia-patrimonio | programa | No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: toros, tauromàquia, correbous. Solo una mención genérica a los «drets dels animals no humans» (p. 10). |

### eh-bildu (11)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «IRPF», «deflact», «tramos». Solo propone actualizar el IPREM con el IPC (p. 7), no la tarifa del IRPF. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «prisión», «penitenciari», «cárcel», «presos», «agentes de la autoridad». |
| amnistia | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «amnist», «Cataluña», «represión». |
| nuclear | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «nuclear», «centrales». El apartado de emergencia climática (p. 9) solo habla de renovables. |
| prostitucion-abolicion | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «prostitución», «proxenet», «trata», «explotación sexual», «abolición». El apartado feminista (p. 10) habla de la violencia machista y del «derecho a decidir sobre nuestros cuerpos», sin mencionar la prostitución. |
| gasto-defensa | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «militar», «defensa», «OTAN», «armamento». |
| okupacion-desalojo | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «ocupación», «okupa», «desalojo», «desahucio». |
| iva-primera-vivienda | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «IVA», «superreducido», «primera vivienda», «compra», «adquisición», «Transmisiones», «fiscal» junto a «vivienda». El IVA superreducido solo se pide para productos de higiene menstrual (p. 6). |
| registro-lobbies | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «lobby», «grupos de interés», «registro», «puertas giratorias», «transparencia», «corrupción». |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «Cataluña», «inmigración». Pide para Euskadi y Navarra la transferencia de «Migración» y de «Puertos y aeropuertos» (pp. 15-16), pero nada sobre Cataluña; no se extrapola. |
| tauromaquia-patrimonio | programa | No trata el asunto. Leído íntegro el documento (16 páginas); buscado: «tauromaquia», «toros», «corridas». |

### erc (7)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | No trata el asunto. Buscado en el texto completo (132 páginas): «IRPF», «deflact», «inflació», «trams». El apartado fiscal (p. 70) pide más progresividad y nuevos tramos para las rentas altas, nada sobre deflactar. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Buscado en el texto completo (132 páginas): «presons», «penitenciari», «funcionaris de presons», «agents de l’autoritat». Solo pide la «jubilació anticipada del cos de funcionaris de presons» de Cataluña, el País Valenciano y las Baleares (p. 21); nada sobre su condición de agentes de la autoridad. |
| nuclear | programa | No trata el asunto. Buscado en el texto completo (132 páginas): «nuclear», «tancament», «centrals». Solo pide que el Estado contribuya al «Fons de Transició Nuclear» de la Generalitat (p. 103) y el Tratado de Prohibición de las Armas Nucleares (p. 14); nada sobre alargar o mantener el calendario de cierre. |
| prostitucion-abolicion | programa | No trata el asunto. Buscado en el texto completo (132 páginas): «prostitució», «proxenet», «abolició», «explotació sexual». Solo medidas contra el tráfico de personas y la explotación sexual (ley orgánica contra la trata, p. 43; fondo de indemnización para las víctimas, p. 48), sin pronunciarse sobre castigar a quien paga ni el proxenetismo consentido. |
| okupacion-desalojo | programa | No trata el asunto. Buscado en el texto completo (132 páginas): «ocupació», «okupa», «desallotjament». Solo pide juicios de proporcionalidad antes de autorizar desahucios en domicilios con menores (p. 60), no sobre ocupaciones ilegales. |
| registro-lobbies | programa | No trata el asunto. Buscado en el texto completo (132 páginas): «lobby», «grups d’interès», «registre», «portes giratòries», «transparència». Solo denuncia las «portes giratòries» como «corrupció institucionalitzada» (p. 23) y pide reformar la Ley 19/2013 de transparencia (p. 30); nada sobre un registro de grupos de interés. |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Buscado en el texto completo (132 páginas): «competències», «immigració», «Generalitat», «Mossos», «ports i aeroports». Pide traspasar la titularidad de puertos y aeropuertos como infraestructuras (p. 111) y, para la futura república, la «Regulació dels fluxos migratoris» (p. 37), pero no la delegación en la Generalitat de permisos, expulsiones o control fronterizo. |

### foro (13)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «alquiler», «tensionada», «precio» (solo deducciones y vivienda protegida en alquiler). |
| jornada-37-5 | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «jornada», «37,5», «horas semanales». |
| prisiones-agentes-autoridad | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad» (solo el Juzgado de Vigilancia Penitenciaria, p. 10). |
| amnistia | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «amnistía». |
| nuclear | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «nuclear» (solo vertidos de residuos nucleares en el Cantábrico). |
| prostitucion-abolicion | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «prostitución», «proxenetismo», «trata», «explotación sexual». Solo propone vetar la publicidad institucional en medios «que realicen publicidad de la prostitución» (p. 81) y «un Plan contra la Explotación Sexual en el Principado de Asturias, encaminado a rescatar y ofrecer alternativas a las mujeres víctimas» (p. 82); nada sobre castigar al cliente o al proxeneta. |
| gasto-defensa | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «militar», «defensa», «OTAN». |
| okupacion-desalojo | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «ocupación», «okupa», «desalojo». |
| iva-primera-vivienda | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «IVA», «superreducido», «primera vivienda», «Transmisiones», «Actos Jurídicos», «compra de una vivienda». No trata los impuestos de la compraventa; solo propone, para los concejos en riesgo de despoblación, una deducción autonómica en el IRPF del 5 % por adquisición, construcción o rehabilitación de vivienda habitual (p. 123), que es un impuesto sobre la renta y no se extrapola al IVA de la compra. |
| impuesto-banca | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «banca», «bancos», «entidades financieras», «gravamen», «beneficios extraordinarios». |
| registro-lobbies | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «lobby», «grupos de interés», «grupos de presión», «registro de transparencia», «huella normativa». |
| inmigracion-competencias-cataluna | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «inmigración», «Cataluña», «competencias». |
| tauromaquia-patrimonio | programa | Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023. El programa no trata el asunto. Buscado: «tauromaquia», «toros», «corrida». |

### geroa-bai (13)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «IRPF», «deflact», «inflación» (solo incentivos y exenciones puntuales en el IRPF navarro). |
| prisiones-agentes-autoridad | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad» (solo la transferencia de instituciones penitenciarias a Navarra, pp. 47 y 156, y servicios del Centro Penitenciario de Pamplona, p. 159). |
| amnistia | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «amnistía». |
| nuclear | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «nuclear». |
| prostitucion-abolicion | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «prostitución», «proxenetismo», «trata», «explotación sexual». Solo «Rechazo de la trata de personas y la explotación sexual» y «una alternativa laboral real a la prostitución, para quienes deseen salir de ella» (p. 115); nada sobre castigar al cliente o al proxeneta. |
| gasto-defensa | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «militar», «defensa», «OTAN», «armamento». |
| impuesto-grandes-fortunas | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «patrimonio», «grandes fortunas», «riqueza» (solo fiscalidad «progresiva» genérica). |
| okupacion-desalojo | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «ocupación», «okupa», «desalojo». |
| iva-primera-vivienda | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «IVA», «primera vivienda», «compra», «adquisición», «Transmisiones», «fiscalidad» junto a «vivienda» (solo pide «un IVA reducido en promoción de vivienda protegida de alquiler o proyectos de rehabilitación», p. 105, que no es la compra). |
| impuesto-banca | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «banca», «bancos», «entidades financieras», «gravamen» (solo colaboración con entidades financieras para el crédito, p. 22). |
| registro-lobbies | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «lobby», «grupos de interés», «grupos de presión», «registro de transparencia», «huella normativa». |
| inmigracion-competencias-cataluna | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «inmigración», «Cataluña», «competencias» (solo competencias de Navarra). |
| tauromaquia-patrimonio | programa | Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023. El programa no trata el asunto. Buscado: «tauromaquia», «toros», «corrida». |

### junts (8)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «lloguer», «preu», «tensiona», «índex de referència». El apartado de vivienda (pp. 96-99) propone incentivos fiscales para quien alquile por debajo del índice de referencia, reformar la LAU con «contractes indefinits voluntaris» y, si no, transferir a Cataluña la legislación de arrendamientos; no se pronuncia sobre limitar por ley la renta de los nuevos contratos. |
| jornada-37-5 | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «jornada», «hores setmanals», «setmana laboral». Solo aparecen las reducciones de jornada por cuidado de hijos (p. 115). |
| prostitucion-abolicion | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «prostitució», «proxenet», «abolició», «explotació sexual». Solo una estrategia europea para los menores no acompañados y las «víctimes de les xarxes del tràfic de persones» (p. 111). |
| gasto-defensa | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «despesa militar», «defensa», «OTAN», «armament». Señales en ambos sentidos y ninguna sobre el nivel de gasto: pide que España cumpla «els seus compromisos com a membre de l’OTAN» con Ucrania (p. 31) y, a la vez, «Revisar, en profunditat, el model de defensa i els seus programes especials d’armament» y avanzar hacia un ejército europeo (p. 135). No se codifica. |
| impuesto-grandes-fortunas | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «fortunes», «patrimoni», «riquesa», «impost». El apartado fiscal (pp. 58-61) pide bajar la presión sobre rentas del trabajo y pymes y una tasa digital, nada sobre un impuesto a las grandes fortunas. |
| iva-primera-vivienda | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «IVA», «primer habitatge», «compra d’habitatge», «adquisició», «transmissions patrimonials», «actes jurídics», «fiscalitat» junto a «habitatge». El IVA de vivienda solo aparece para la promoción de viviendas de alquiler en suelo cedido en derecho de superficie (p. 98); para el primer habitatge propone avales del ICO a la entrada hipotecaria de los jóvenes (p. 101), no rebajas de impuestos de la compra. |
| impuesto-banca | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «banca», «bancs», «impost», «beneficis extraordinaris», «gravamen». El apartado fiscal (pp. 58-61) no menciona el gravamen a la banca; sobre el sector solo pide estimular la competencia bancaria y la licencia bancaria del Institut Català de Finances (p. 62). |
| registro-lobbies | programa | No trata el asunto. Buscado en el texto completo (151 páginas): «lobby», «grups d’interès», «registre», «portes giratòries», «transparència». Solo principios generales de «govern obert» (p. 123) y una nueva ley de secretos oficiales (p. 24); «lobby» aparece solo como «lobby jurídic espanyol» (p. 23). |

### mes-mallorca (8)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «IRPF», «deflactar», «inflació» (solo deducciones autonómicas y pacto de rentas). |
| prisiones-agentes-autoridad | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «presons», «penitenciari», «funcionaris de presons», «agents de l’autoritat». |
| amnistia | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «amnistia». |
| gasto-defensa | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «militar», «exèrcit», «defensa», «OTAN», «armament». |
| impuesto-grandes-fortunas | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «grans fortunes», «impost sobre el patrimoni», «riquesa» (solo progresividad genérica). |
| okupacion-desalojo | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «okupació», «ocupació il·legal», «desallotjament». |
| impuesto-banca | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «banca», «bancs», «entitats financeres», «gravamen», «beneficis extraordinaris» (p. 36: «Demanarem a l’Estat l’exercici d’un control sobre els beneficis extraordinaris empresarials que resultin de la inflació», sin mencionar la banca ni un impuesto). |
| inmigracion-competencias-cataluna | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado. Ninguno de los dos programas trata el asunto. Buscado: «immigració», «Catalunya», «ports i aeroports» (pide competencias exclusivas en puertos y aeropuertos para Baleares, sin tratar inmigración ni Cataluña). |

### mes-menorca (10)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «IRPF», «deflactar», «inflació» (solo actualización de prestaciones con la inflación). |
| prisiones-agentes-autoridad | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «presons», «penitenciari», «funcionaris de presons», «agents de l’autoritat» (solo «agents de l’autoritat ambiental», p. 32, y el centro penitenciario en el hospital, p. 53). |
| amnistia | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «amnistia». |
| nuclear | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «nuclear». |
| prostitucion-abolicion | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «prostitució», «proxenetisme», «tràfic», «tracta», «explotació sexual». |
| gasto-defensa | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «militar», «exèrcit», «defensa», «OTAN». |
| okupacion-desalojo | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «okupació», «ocupació il·legal», «desallotjament». |
| impuesto-banca | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «banca», «bancs», «entitats financeres», «gravamen», «beneficis extraordinaris» (solo expropiación del uso de viviendas de entidades financieras, p. 43). |
| inmigracion-competencias-cataluna | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «immigració», «Catalunya», «competències» (p. 51 pide para Baleares «les competències exclusives en immigració»; no trata Cataluña, no se extrapola). |
| tauromaquia-patrimonio | programa | Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023. El programa no trata el asunto. Buscado: «tauromàquia», «toros», «bous», «corrida». |

### nc-bc (11)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | No trata la deflactación de la tarifa del IRPF. Buscado: «IRPF», «deflact», «inflación», «tramos»; el apartado fiscal (p. 51) habla de usar los tramos autonómicos del IRPF con carácter progresivo, no de actualizarlos con la inflación. Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| prisiones-agentes-autoridad | programa | No trata la condición de agentes de la autoridad de los funcionarios de prisiones. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad», «cárcel». Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| amnistia | programa | No trata la amnistía. Buscado: «amnistía», «procés», «Cataluña». Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| nuclear | programa | No menciona la energía nuclear. Buscado: «nuclear»; el capítulo de energía (5.2) trata solo de renovables en Canarias. Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| prostitucion-abolicion | programa | No trata la prostitución. Buscado: «prostitución», «proxenetismo», «trata», «explotación sexual». Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| gasto-defensa | programa | No trata el gasto militar. Buscado: «gasto militar», «defensa» (solo en otros sentidos), «militar» (solo invasión de Ucrania, p. 89), «OTAN», «armamento». Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| impuesto-grandes-fortunas | programa | No trata un impuesto a las grandes fortunas. Buscado: «grandes fortunas», «patrimonio» (solo patrimonio natural/cultural), «riqueza»; el apartado fiscal (p. 51) pide progresividad sin medida concreta sobre el patrimonio. Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| okupacion-desalojo | programa | No trata la ocupación ilegal ni el desalojo. Buscado: «okupa», «ocupación» (solo ocupación turística/territorial), «desalojo», «usurpación». Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| iva-primera-vivienda | programa | No trata los impuestos de la compra de vivienda. Buscado: «IVA», «IGIC», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «Actos Jurídicos» y «fiscal» junto a «vivienda». Solo «Bonificaciones específicas en el acceso a la vivienda para favorecer la emancipación juvenil» (p. 43), sin decir si son fiscales ni referidas a la compra, y un balance de las deducciones del IRPF canario ya aprobadas (p. 50). Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| registro-lobbies | programa | No trata la regulación de los lobbies. Buscado: «lobby», «grupos de interés», «grupos de presión», «registro de transparencia», «huella normativa», «puertas giratorias». Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |
| inmigracion-competencias-cataluna | programa | No trata la delegación de competencias de inmigración a Cataluña. Buscado: «inmigración», «competencias», «Cataluña»; las referencias a migración (pp. 88-89) piden cogestión para Canarias, asunto distinto. Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023. |

### pnv (14)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «alquiler», «tensionad», «precio», «arrendamiento». El apartado de vivienda (p. 45) aboga por «políticas que fomenten el alquiler y la promoción de vivienda pública» y rechaza «las propuestas que erosionen nuestro autogobierno», sin pronunciarse sobre limitar la renta. |
| irpf-inflacion | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «IRPF», «deflact», «tramos»; el IPC solo aparece referido a las pensiones (pp. 32-33). |
| jornada-37-5 | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «jornada», «horas semanales», «tiempo de trabajo». El capítulo de empleo (pp. 28-31) no trata la jornada máxima. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «prisión», «penitenciari», «funcionarios», «agentes de la autoridad». Solo habla de los derechos de las personas presas y de humanizar el sistema penitenciario (p. 7) y rechaza la prisión permanente revisable (p. 10); nada sobre los funcionarios de prisiones. |
| amnistia | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «amnist», «Cataluña», «indult». «Amnistía» solo aparece referida a la ley de 1977 (p. 9). |
| nuclear | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «nuclear», «centrales». El capítulo de energía (pp. 19-23) solo trata renovables, redes e hidrógeno. |
| prostitucion-abolicion | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «prostitución», «proxenet», «abolición», «explotación sexual». Solo pide una «Ley integral contra la trata de personas» (p. 11) y una ley integral de trata con perspectiva de género (p. 47). |
| gasto-defensa | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «gasto militar», «defensa», «OTAN», «armamento». Solo apoya la Política Exterior y de Seguridad Común de la UE y la «Brújula Estratégica» (p. 35), sin hablar del gasto militar español. |
| impuesto-grandes-fortunas | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «fortunas», «patrimonio», «riqueza». El apartado fiscal (pp. 16-17) pide progresividad y que los nuevos impuestos estatales se concierten con las haciendas forales, sin pronunciarse sobre un impuesto a las grandes fortunas. |
| okupacion-desalojo | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «ocupación», «okupa», «desalojo», «desahucio». |
| iva-primera-vivienda | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «fiscal» junto a «vivienda». Solo propone «una revisión del listado de bienes y servicios como de los tipos general, reducido y superreducido» del IVA (p. 17), sin mencionar la vivienda. |
| impuesto-banca | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «banca», «gravamen», «beneficios extraordinarios», «tipos de interés». Sobre los gravámenes temporales a la banca y a las energéticas solo dice que, «en caso de querer mantenerlas», deberían tramitarse como impuestos y no como prestaciones patrimoniales no tributarias, para poder concertarlos con las haciendas forales (pp. 16-17); no se pronuncia sobre subirlos. |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «Cataluña», «competencias», «inmigración». Pide la «Transferencia a la CAV de las políticas migratorias» (p. 11), pero nada sobre Cataluña; no se extrapola. |
| tauromaquia-patrimonio | programa | No trata el asunto. Buscado en el texto completo (52 páginas): «tauromaquia», «toros», «taurin». |

### podemos (6)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Programa de las europeas de 2024 (en las generales de 2023 Podemos concurrió en la coalición SUMAR, sin programa propio). No trata el asunto. Texto completo (130 págs.) extraído y buscado: «IRPF», «deflact», «tramos», «inflación»; «tramos» solo aparece en la factura eléctrica progresiva. |
| prisiones-agentes-autoridad | programa | Programa de las europeas de 2024 (en las generales de 2023 Podemos concurrió en la coalición SUMAR, sin programa propio). No trata el asunto. Texto completo (130 págs.) extraído y buscado: «penitenci», «prisiones», «prisión», «cárcel», «presos», «agente(s) de (la) autoridad», «funcionarios de prisiones». «Prisión» solo aparece en política exterior (pp. 114 y 119). |
| amnistia | programa | Programa de las europeas de 2024 (en las generales de 2023 Podemos concurrió en la coalición SUMAR, sin programa propio). No trata el asunto. Texto completo (130 págs.) extraído y buscado: «amnist», «Cataluña», «Generalitat», «procés». |
| prostitucion-abolicion | programa | Programa de las europeas de 2024 (en las generales de 2023 Podemos concurrió en la coalición SUMAR, sin programa propio). No trata el asunto. Texto completo (130 págs.) extraído y buscado: «prostitu», «proxenet», «abolic», «tercería», «cliente», «trabajo sexual». Solo «Aumentar los fondos destinados a la lucha contra la trata, trata con fines de explotaciones sexual y mujeres en contextos de prostitución» y planes de inserción sociolaboral (p. 22); nada sobre castigar a quien paga ni el proxenetismo consentido. |
| iva-primera-vivienda | programa | Programa de las europeas de 2024 (en las generales de 2023 Podemos concurrió en la coalición SUMAR, sin programa propio). No trata el asunto. Texto completo (130 págs.) extraído y buscado: «IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones» y «fiscal» junto a «vivienda». Solo aparecen la supresión de los privilegios fiscales de las SOCIMI y un impuesto al «flipping» (pp. 37 y 58) y la prohibición europea de comprar vivienda para no residir en ella (p. 38); nada sobre el IVA ni los impuestos de la compra de la primera vivienda. |
| inmigracion-competencias-cataluna | programa | Programa de las europeas de 2024 (en las generales de 2023 Podemos concurrió en la coalición SUMAR, sin programa propio). No trata el asunto. Texto completo (130 págs.) extraído y buscado: «Cataluña», «Generalitat», «competencias», «Mossos», «puertos». |

### por-avila (15)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «alquiler», «vivienda», «tensionada». |
| irpf-inflacion | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «IRPF», «deflactar», «inflación» (solo rebaja del IRPF en municipios de menos de 10.000 habitantes). |
| jornada-37-5 | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «jornada», «horas». |
| prisiones-agentes-autoridad | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad». |
| amnistia | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «amnistía», «independentismo» (solo «Defendemos la unidad territorial de España», sin mención a la amnistía). |
| nuclear | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «nuclear», «energía». |
| prostitucion-abolicion | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «prostitución», «proxenetismo», «trata», «explotación sexual». |
| gasto-defensa | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «defensa», «militar», «OTAN» (solo pide una Unidad Militar de Emergencias en Ávila). |
| impuesto-grandes-fortunas | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «patrimonio», «fortunas», «impuesto». |
| okupacion-desalojo | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «ocupación», «okupa», «desalojo». |
| iva-primera-vivienda | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «IVA», «vivienda», «primera vivienda», «compra», «Transmisiones», «impuestos». |
| impuesto-banca | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «banca», «bancos», «entidades financieras», «gravamen». |
| registro-lobbies | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «lobby», «grupos de interés», «grupos de presión», «registro de transparencia». |
| inmigracion-competencias-cataluna | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «inmigración», «Cataluña», «competencias». |
| tauromaquia-patrimonio | programa | Programa de las generales de 2023. El programa no trata el asunto. Buscado: «tauromaquia», «toros», «corrida». |

### pp (6)

| Pregunta | Lente | Nota |
|---|---|---|
| jornada-37-5 | programa | Buscado «37,5», «jornada», «horas semanales», «cuatro días», «horario». Solo aparece la medida 163 (p. 53) sobre flexibilidad horaria y bolsa de horas «sin afectar ni a las horas trabajadas ni al salario»; nada sobre reducir la jornada máxima legal. |
| amnistia | programa | El programa es anterior a la ley de amnistía (LO 1/2024). Buscado «amnist», «indult», «sedición», «malversación»: hay medidas para recuperar la sedición y la malversación (p. 72) y reformar la ley de indulto (p. 75), pero nada sobre una amnistía. |
| prostitucion-abolicion | programa | Buscado «prostitu», «proxenet», «abolic», «tercería», «cliente», «explotación sexual». Lo único es la medida 205 (p. 62): una ley orgánica integral «DE LUCHA CONTRA LA TRATA CON FINES DE EXPLOTACIÓN SEXUAL», en la que «Perseguiremos a los proxenetas y el beneficio económico extraído de esta actividad por terceras personas»; se refiere a la trata, no a la prostitución consentida, ni a quien paga ni a quien la ejerce. No se extrapola. |
| impuesto-banca | programa | Buscado «banca», «bancos», «bancari», «entidades financieras», «gravamen», «impuestos temporales», «beneficios extraordinarios», «caídos del cielo» y leído el objetivo «Controlar el déficit y la deuda y reducir la presión fiscal» (pp. 23-24): ninguna mención al gravamen temporal sobre la banca. Solo «Eliminaremos el impuesto a las grandes fortunas» (p. 23), que es otro impuesto. |
| inmigracion-competencias-cataluna | programa | El programa es anterior a la proposición PSOE-Junts de delegación. Buscado «competencias» junto a inmigración/fronteras, «Mossos», «delegación»: las medidas de fronteras (p. 81) hablan de Policía Nacional y Guardia Civil, sin pronunciarse sobre delegar competencias a comunidades. |
| tauromaquia-patrimonio | programa | Buscado «taurin», «tauromaquia», «toros», «corrida», «festejos», «tradici», «patrimonio cultural inmaterial»: sin resultados. La medida 77 (p. 31) sobre la caza como «acervo cultural» no trata la tauromaquia. |

### prc (12)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: alquiler, precio, renta, tope, limitar, zonas tensionadas (págs. 181-184: parque público de alquiler, VPO con precio máximo tasado y «mecanismos legales y constitucionales para controlar la especulación», pero nada sobre limitar la renta de contratos privados). |
| irpf-inflacion | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: IRPF, deflactar, inflación, tramos (pág. 79 propone «ajustar la tarifa autonómica del impuesto para atenuar la excesiva progresividad», que no es la actualización anual con la inflación). |
| jornada-37-5 | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: jornada, 37,5, horas semanales, tiempo de trabajo. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: prisiones, penitenciario, funcionarios de prisiones, agentes de la autoridad (pág. 161 solo menciona una oficina judicial en el Centro Penitenciario de El Dueso). |
| amnistia | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: amnistía, procés, Cataluña. |
| nuclear | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: nuclear, centrales nucleares, cierre. |
| gasto-defensa | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: defensa (solo en sentido genérico), militar, OTAN, ejército, gasto en defensa. |
| impuesto-grandes-fortunas | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: grandes fortunas, impuesto de solidaridad, patrimonio. Duda: en la pág. 78 propone «bonificar al 100 por ciento el Impuesto sobre Patrimonio en Cantabria» para evitar la deslocalización fiscal; trata el impuesto autonómico, no un impuesto estatal específico sobre patrimonios de más de 10 millones, así que no se codifica para no inferir. |
| impuesto-banca | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: banca, bancos, entidades financieras, gravamen, beneficios extraordinarios. |
| registro-lobbies | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: lobbies, grupos de interés, grupos de presión, registro de transparencia, huella normativa. |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: competencias de inmigración, Generalitat, Cataluña. |
| tauromaquia-patrimonio | programa | No trata el asunto. Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.). Buscado: tauromaquia, toros, taurino. |

### psoe (6)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Buscado «deflact», «inflación» junto a «IRPF», «tarifa del IRPF», «indexa» en todo el PDF y leído el apartado de fiscalidad (pp. 37-39). Las menciones al IRPF son mínimos por descendientes, desgravación por hijo y cuenta ahorro vivienda; nada sobre actualizar tramos con la inflación. |
| prisiones-agentes-autoridad | programa | Buscado «penitenci», «prisiones», «prisión», «cárcel», «presos», «agente(s) de la autoridad», «funcionarios de prisiones» en todo el PDF. Solo aparece «Fortaleceremos las políticas resocializadoras de nuestro sistema penitenciario para evitar la reincidencia» (p. 238); nada sobre la condición de agentes de la autoridad de los funcionarios de prisiones. |
| amnistia | programa | El programa es anterior a la ley de amnistía (LO 1/2024). Buscado «amnist», «indult», «sedición», «malversación», «procés», «referéndum»: solo aparece una referencia histórica al proceso independentista y al art. 155 (p. 228), sin posición sobre una amnistía. |
| iva-primera-vivienda | programa | Buscado «IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «Actos Jurídicos» y «fiscal» junto a «vivienda». Lo que aparece sobre la compra no son impuestos de la compraventa: avales ICO del 20 % de la hipoteca para jóvenes (pp. 130 y 226) y una cuenta de ahorro para la primera vivienda exenta en el IRPF (p. 226). El IVA reducido solo se menciona para otros productos (higiene femenina, p. 138; sin gluten, p. 203). Nada sobre el IVA, el ITP ni el AJD de la compra de vivienda. |
| inmigracion-competencias-cataluna | programa | El programa es anterior a la proposición PSOE-Junts de delegación (2024-2025). Buscado «competencias» junto a inmigración/extranjería/fronteras, «Mossos», «delegación», «149»: sin resultados sobre competencias de inmigración. |
| tauromaquia-patrimonio | programa | Buscado «taurin», «tauromaquia», «toros», «corrida», «festejos», «patrimonio cultural inmaterial»: sin resultados. |

### salf (10)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: IRPF, inflación, deflactar, tramos (solo propone tarifa autonómica del 0 % por debajo de 35.000 € y deducciones por hijo, que no es actualizar la tarifa con el IPC). |
| jornada-37-5 | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: jornada, 37,5, horas semanales (el de Castilla y León solo incentiva «jornadas compatibles» con la conciliación). |
| prisiones-agentes-autoridad | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: prisiones, penitenciario, funcionarios de prisiones, agentes de la autoridad, cárcel. |
| amnistia | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: amnistía, procés, Cataluña. |
| prostitucion-abolicion | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: prostitución, proxenetismo, trata, explotación sexual. |
| gasto-defensa | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: defensa, gasto militar, OTAN, Fuerzas Armadas. |
| impuesto-banca | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: banca, bancos, entidades financieras, gravamen temporal, beneficios extraordinarios. |
| registro-lobbies | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: lobbies, grupos de interés, grupos de presión, registro de transparencia, huella normativa (el programa de Andalucía dice que suprimir la publicidad institucional «libera al poder político de los grupos de presión económicos» y el de Castilla y León, p. 12, propone el «Fin de las subvenciones a partidos, sindicatos y lobbies»; ninguno habla de un registro de grupos de interés). |
| inmigracion-competencias-cataluna | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: competencias de inmigración, Cataluña, Generalitat, delegación. |
| tauromaquia-patrimonio | programa | Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024. No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: toros, tauromaquia, patrimonio cultural. |

### soria-ya (14)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «alquiler», «tensionada», «precio» (solo vivienda pública y mediación en el alquiler). |
| irpf-inflacion | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «IRPF», «deflactar», «inflación», «tramo» (solo deducciones autonómicas por vivienda). |
| jornada-37-5 | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «jornada», «horas». |
| prisiones-agentes-autoridad | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad» (solo plazas de docentes en Instituciones Penitenciarias, p. 21). |
| amnistia | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «amnistía». |
| nuclear | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «nuclear» (solo un título de FP de medicina nuclear). |
| prostitucion-abolicion | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «prostitución», «proxenetismo», «trata», «explotación sexual». |
| gasto-defensa | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «militar», «defensa», «OTAN» (solo el centro tecnológico de defensa «Numant-IA» en Soria). |
| impuesto-grandes-fortunas | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «patrimonio» (solo patrimonio cultural), «fortunas». |
| okupacion-desalojo | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «ocupación», «okupa», «desalojo». |
| impuesto-banca | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «banca», «bancos», «entidades financieras», «gravamen». |
| registro-lobbies | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «lobby», «grupos de interés», «grupos de presión», «registro de transparencia». |
| inmigracion-competencias-cataluna | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «inmigración», «Cataluña». |
| tauromaquia-patrimonio | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023. El programa no trata el asunto. Buscado: «tauromaquia», «toros», «corrida». |

### sumar (7)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «deflact», «indexa», «tramos», «IRPF», «inflación». El IRPF aparece solo para subir tipos marginales y ampliar tramos desde 120.000 € (p. 17) y en medidas de vivienda; nada sobre actualizar la tarifa con la inflación. |
| prisiones-agentes-autoridad | programa | El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «penitenci», «prisiones», «prisión», «cárcel», «agente(s) de (la) autoridad», «funcionarios de prisiones». Habla de sanidad penitenciaria (pp. 92 y 133), de suprimir la prisión permanente revisable (p. 133) y de que en la policía haya funciones «que no requieran ser agente de autoridad» (p. 131); nada sobre la condición de los funcionarios de prisiones. |
| amnistia | programa | El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «amnist», «indult», «procés», «independentis», «desjudicializ». Solo elogia «la desjudicialización» en el marco de la mesa de diálogo (p. 121); el programa es anterior a la ley de amnistía. |
| prostitucion-abolicion | programa | El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «prostitu», «proxenet», «abolic», «tercería», «cliente», «trabajo sexual». Solo una ley integral contra la trata y «consolidar el Plan de Inserción sociolaboral dirigido a mujeres víctimas de trata y de explotación sexual y a mujeres en situación de prostitución» (p. 110); nada sobre castigar a quien paga ni el proxenetismo consentido. |
| gasto-defensa | programa | El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «gasto militar», «gasto en defensa», «presupuesto», «OTAN», «armamento», «2 %». Solo propone revisar y auditar los Programas Especiales de Armamento «con el fin de dotarlos de mayor transparencia» (p. 139) y desplazar las garantías de la OTAN a una autonomía estratégica europea; nada sobre el nivel del gasto. |
| okupacion-desalojo | programa | El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «ocupación», «okupa», «desalojo», «usurpación», «allanamiento». Solo menciona «el fenómeno de la ocupación» como ejemplo de inseguridad exagerada por la publicidad de la seguridad privada (p. 133); nada sobre el procedimiento de desalojo. |
| inmigracion-competencias-cataluna | programa | El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: «Generalitat», «Mossos», «competencias», «puertos y aeropuertos», «inmigración». Solo traspasar la gestión de puertos y aeropuertos para gestionarla con las ciudades (p. 82, en movilidad) y reforzar el autogobierno catalán en general (p. 121); nada sobre delegar la inmigración. |

### upl (14)

| Pregunta | Lente | Nota |
|---|---|---|
| vivienda-tope-alquiler | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «alquiler», «tensionadas», «precio» (solo vivienda protegida y ayudas al alquiler). |
| irpf-inflacion | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «IRPF», «deflactar», «inflación» (solo rebajas del IRPF en el medio rural). |
| jornada-37-5 | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «jornada», «37,5», «horas semanales». |
| prisiones-agentes-autoridad | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad». |
| amnistia | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «amnistía». |
| nuclear | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «nuclear». |
| prostitucion-abolicion | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «prostitución», «proxenetismo», «trata», «explotación sexual». |
| gasto-defensa | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «militar», «defensa nacional», «OTAN», «armamento». |
| impuesto-grandes-fortunas | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «patrimonio» (solo patrimonio cultural), «grandes fortunas». |
| okupacion-desalojo | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «ocupación», «okupa», «desalojo». |
| impuesto-banca | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «banca», «bancos», «entidades financieras», «gravamen» (solo «un mayor acceso a la banca en nuestras comarcas rurales», p. 93). |
| registro-lobbies | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «lobby», «grupos de interés», «grupos de presión», «registro de transparencia». |
| inmigracion-competencias-cataluna | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «inmigración», «Cataluña». |
| tauromaquia-patrimonio | programa | Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023. El programa no trata el asunto. Buscado: «tauromaquia», «toros», «corrida» (solo aparece la localidad de Toro). |

### upn (11)

| Pregunta | Lente | Nota |
|---|---|---|
| jornada-37-5 | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «jornada», «horas», «37,5». El apartado de empleo (p. 4) trata de contratos-programa, empleo juvenil y pensiones. |
| prisiones-agentes-autoridad | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «prisión», «penitenciari», «funcionarios», «agentes de la autoridad». Solo pide revisar los «beneficios penitenciarios sin arrepentimiento» de los presos de ETA (p. 3). |
| amnistia | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «amnist», «indult», «Cataluña». El programa es anterior a la ley (2024); solo pide que el Gobierno no dependa «ni de EH Bildu ni de los independentistas» (p. 2), sin hablar de amnistía. |
| nuclear | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «nuclear», «energía». Solo «Apuesta decidida por las energías renovables» (p. 5). |
| prostitucion-abolicion | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «prostitución», «proxenet», «trata», «explotación sexual». |
| gasto-defensa | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «defensa», «militar», «OTAN». |
| impuesto-grandes-fortunas | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «patrimonio», «fortunas», «riqueza». Solo el objetivo genérico «Reducir impuestos» (p. 2). |
| iva-primera-vivienda | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «IVA», «vivienda», «primera vivienda», «compra», «Transmisiones», «impuestos». Solo el objetivo genérico «Reducir impuestos» (p. 2). |
| impuesto-banca | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «banca», «bancos», «impuesto», «gravamen». Solo el objetivo genérico «Reducir impuestos» (p. 2) y un convenio para el acceso a servicios financieros en pequeñas poblaciones (p. 5). |
| registro-lobbies | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «lobby», «grupos de interés», «registro», «puertas giratorias», «transparencia». Solo el lema genérico «Lucha contra la corrupción» (p. 2). |
| inmigracion-competencias-cataluna | programa | No trata el asunto. Leído íntegro el programa (6 páginas); buscado: «inmigración», «Cataluña», «competencias». Las competencias que trata son las de Navarra. |

### vox (7)

| Pregunta | Lente | Nota |
|---|---|---|
| irpf-inflacion | programa | Buscado «deflact», «inflación» junto a «IRPF», «tarifa», «indexa»; leída la sección fiscal (pp. 73-77). Propone sustituir la tarifa por un tipo único del 15 %/25 % (medida 148) y, en la 148.4, «tablas de actualización automática» para el ahorro (ganancias por inflación), no para los tramos de la tarifa general. Sin posición sobre deflactar los tramos. |
| jornada-37-5 | programa | Buscado «37,5», «jornada», «horas semanales», «cuatro días»: solo una PNL pasada sobre cuidadores que reducen jornada (p. 166). Nada sobre la jornada máxima legal. |
| amnistia | programa | El programa es anterior a la ley de amnistía (LO 1/2024). Buscado «amnist», «indult», «sedición», «malversación»: propone reintroducir sedición y malversación (pp. 16, 126) y prohibir indultos por delitos contra la integridad territorial (p. 127), pero no se pronuncia sobre una amnistía. |
| prostitucion-abolicion | programa | Buscado «prostitu», «proxenet», «abolic», «tercería», «trata», «explotación sexual», «cliente» en todo el PDF: solo una iniciativa sobre abusos y explotación sexual en centros de menores (p. 70). Nada sobre la prostitución ni el proxenetismo. |
| impuesto-banca | programa | Buscado «banca», «bancos», «bancari», «entidades financieras», «gravamen», «impuesto extraordinario», «beneficios extraordinarios», «caídos del cielo» y leído el apartado fiscal (medidas 144-156, pp. 74-79): solo baja del Impuesto de Sociedades al 15 % (medida 150, p. 77). Nada sobre el gravamen a la banca. |
| registro-lobbies | programa | Buscado «lobby», «lobbies», «grupos de interés», «grupos de presión», «registro», «huella normativa», «puertas giratorias». «Lobbies» aparece solo como crítica a lobbies verdes, ecologistas o ideológicos (pp. 52, 108-110, 133) y las puertas giratorias en los consejos de las eléctricas (p. 119); nada sobre un registro de grupos de interés. |
| inmigracion-competencias-cataluna | programa | El programa es anterior a la proposición PSOE-Junts de delegación. En p. 8 propone «la devolución inmediata al Estado de las competencias en Educación, Sanidad, Seguridad y Justicia», y en p. 91 un «Mando Integrado de Gestión de las Fronteras», pero no menciona competencias de inmigración ni su delegación a Cataluña. Se deja sin posición en lugar de extrapolar. Buscado «competencias», «Mossos», «delegación», «fronteras». |

