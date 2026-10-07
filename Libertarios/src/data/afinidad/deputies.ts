import type { DeputyAttribution, Source } from "./types";

/**
 * Tabla diputado → partido para partidos sin grupo propio (Grupo Mixto en la
 * XV; Mixto y Plural en la XIV). Con ella WP4 atribuye el voto nominal de los
 * JSON de congreso.es al partido correcto en vez de leer el voto del grupo.
 *
 * - `deputy`: nombre EXACTO del campo `diputado` de los JSON de votaciones.
 * - `group`: código EXACTO del campo `grupo` en esos JSON («GMx», «GPlu»,
 *   «GSUMAR»).
 * - `from`/`to`: alta y baja en el grupo según los datos oficiales del Congreso
 *   (XV: ficheros de datos abiertos de diputados, campos FECHAALTA… /
 *   FECHABAJA…ENGRUPOPARLAMENTARIO; XIV: ficha oficial de cada diputado),
 *   contrastado con el listado del grupo en las votaciones.
 * - La pertenencia al partido se acredita con la formación electoral oficial
 *   cuando la hay; si el diputado fue elegido en una lista de coalición (p. ej.
 *   SUMAR), con el BOCG donde firma en nombre del partido o con su biografía
 *   oficial en congreso.es.
 *
 * NO se atribuyen (y por qué):
 *   - XV: José Luis Ábalos (elegido por el PSOE; en GMx del 27-2-2024 al
 *     28-1-2026, ya fuera del PSOE) y Francisco Javier Ortega Smith (elegido
 *     por VOX; en GMx desde el 17-7-2026): su voto no es el de ningún partido
 *     del test.
 *   - XV: Lilith Verstrynge (GMx 5-12-2023 → baja 26-1-2024): ninguna fuente
 *     oficial encontrada acredita su partido. Pendiente.
 *   - XIV: Sergio Sayas y Carlos García Adanero, elegidos por Navarra Suma
 *     (NA+, coalición UPN-PP-Cs): la formación oficial es NA+, no UPN, y UPN
 *     los expulsó en 2022. Pendiente de fuente con fechas antes de atribuir
 *     nada a UPN en la XIV.
 *   - XIV: Laura Borràs y Jaume Alonso-Cuevillas figuran como «JxCat-JUNTS» sin
 *     el sufijo «(Junts)» que sí llevan sus compañeros; los diputados con
 *     «(PDeCAT)» son de otro partido. Solo se atribuyen a Junts los «(Junts)».
 *   - XIV: Pedro Quevedo y María Fernández (NC-CCa-PNC) son de Nueva Canarias,
 *     no de CC; Carmen Pita (UP) votaba en el Mixto y su partido no consta.
 *   - XIV: Unidas Podemos tenía grupo propio (GCUP-EC-GC) compartido con IU y
 *     los Comuns; se trata a nivel de grupo (ver `recordNote` en parties.ts).
 */

const XV_ACTIVOS: Source = {
  url: "https://www.congreso.es/webpublica/opendata/diputados/DiputadosActivos__20261006050007.json",
  title: "Congreso — datos abiertos: diputados en activo, XV legislatura (FORMACIONELECTORAL y fechas de grupo)",
  date: "2026-10-06",
};
const XV_BIO_PODEMOS: Source = {
  ...XV_ACTIVOS,
  title:
    "Congreso — datos abiertos, diputados en activo: biografía oficial (Sánchez Serna: «Coordinador autonómico de Podemos Región de Murcia»; Santana: «Secretaria General de Podemos Canarias hasta 2019»)",
};
const BOCG_D_560: Source = {
  url: "https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-560.PDF",
  title: "BOCG-15-D-560, iniciativa 161/003584: «Ione Belarra Urteaga, Diputada de Podemos y Martina Velarde Gómez, Diputada de Podemos»",
};
const BOCG_D_552: Source = {
  url: "https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-552.PDF",
  title: "BOCG-15-D-552: «a instancia del diputado del Bloque Nacionalista Galego (BNG), Néstor Rego Candamil»",
};
const BOCG_D_537: Source = {
  url: "https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-537.PDF",
  title: "BOCG-15-D-537: «a instancia de la diputada Cristina Valido García de Coalición Canaria»",
};
const BOCG_D_557: Source = {
  url: "https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-557.PDF",
  title: "BOCG-15-D-557: «a instancia de la diputada de Compromís Àgueda Micó i Micó»",
};

/** Ficha oficial de un diputado de la XIV (muestra formación electoral y grupo). */
function fichaXIV(cod: number, who: string, formacion: string): Source {
  return {
    url: `https://www.congreso.es/es/busqueda-de-diputados?p_p_id=diputadomodule&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_diputadomodule_mostrarFicha=true&codParlamentario=${cod}&idLegislatura=XIV`,
    title: `Congreso — ficha de ${who}, XIV legislatura (formación electoral: ${formacion})`,
  };
}

export const deputies: DeputyAttribution[] = [
  // ─── XV ────────────────────────────────────────────────────────────────
  // Podemos: elegidos en listas de SUMAR; en GSUMAR del 17-8-2023 al 4-12-2023
  // y en GMx desde el 5-12-2023 (FECHAALTAENGRUPOPARLAMENTARIO = 05/12/2023).
  { legislature: "XV", deputy: "Belarra Urteaga, Ione", partyId: "podemos", group: "GSUMAR", from: "2023-08-17", to: "2023-12-04", source: BOCG_D_560 },
  { legislature: "XV", deputy: "Belarra Urteaga, Ione", partyId: "podemos", group: "GMx", from: "2023-12-05", source: BOCG_D_560 },
  { legislature: "XV", deputy: "Velarde Gómez, Martina", partyId: "podemos", group: "GSUMAR", from: "2023-08-17", to: "2023-12-04", source: BOCG_D_560 },
  { legislature: "XV", deputy: "Velarde Gómez, Martina", partyId: "podemos", group: "GMx", from: "2023-12-05", source: BOCG_D_560 },
  { legislature: "XV", deputy: "Sánchez Serna, Javier", partyId: "podemos", group: "GSUMAR", from: "2023-08-17", to: "2023-12-04", source: XV_BIO_PODEMOS },
  { legislature: "XV", deputy: "Sánchez Serna, Javier", partyId: "podemos", group: "GMx", from: "2023-12-05", source: XV_BIO_PODEMOS },
  { legislature: "XV", deputy: "Santana Perera, Noemí", partyId: "podemos", group: "GSUMAR", from: "2023-08-17", to: "2023-12-04", source: XV_BIO_PODEMOS },
  { legislature: "XV", deputy: "Santana Perera, Noemí", partyId: "podemos", group: "GMx", from: "2023-12-05", source: XV_BIO_PODEMOS },
  // BNG, CC, UPN: formación electoral propia; en GMx desde el 28-8-2023.
  { legislature: "XV", deputy: "Rego Candamil, Néstor", partyId: "bng", group: "GMx", from: "2023-08-28", source: BOCG_D_552 },
  { legislature: "XV", deputy: "Valido García, Cristina", partyId: "cc", group: "GMx", from: "2023-08-28", source: BOCG_D_537 },
  { legislature: "XV", deputy: "Catalán Higueras, Alberto", partyId: "upn", group: "GMx", from: "2023-08-28", source: XV_ACTIVOS },
  // Compromís: Micó, elegida en la lista de SUMAR; en GMx desde el 3-7-2025.
  // Alberto Ibáñez Mezquita (Compromís-Sumar) sigue en GSUMAR: no se atribuye.
  { legislature: "XV", deputy: "Micó Micó, Àgueda", partyId: "compromis", group: "GSUMAR", from: "2023-08-17", to: "2025-07-02", source: BOCG_D_557 },
  { legislature: "XV", deputy: "Micó Micó, Àgueda", partyId: "compromis", group: "GMx", from: "2025-07-03", source: BOCG_D_557 },

  // ─── XIV ───────────────────────────────────────────────────────────────
  { legislature: "XIV", deputy: "Rego Candamil, Néstor", partyId: "bng", group: "GPlu", from: "2019-11-19", to: "2023-08-17", source: fichaXIV(40, "Néstor Rego Candamil", "BNG") },
  { legislature: "XIV", deputy: "Oramas González-Moro, Ana María", partyId: "cc", group: "GMx", from: "2019-11-25", to: "2023-05-30", source: fichaXIV(161, "Ana María Oramas González-Moro", "CCa-PNC-NC") },
  { legislature: "XIV", deputy: "Baldoví Roda, Joan", partyId: "compromis", group: "GPlu", from: "2019-11-26", to: "2023-05-12", source: fichaXIV(247, "Joan Baldoví Roda", "MÉS COMPROMÍS") },
  { legislature: "XIV", deputy: "Picó Garcés, Maria Josep", partyId: "compromis", group: "GPlu", from: "2023-05-17", to: "2023-08-17", source: fichaXIV(408, "Maria Josep Picó Garcés", "MÉS COMPROMÍS") },
  { legislature: "XIV", deputy: "Nogueras i Camero, Míriam", partyId: "junts", group: "GPlu", from: "2019-11-19", to: "2023-08-17", source: fichaXIV(27, "Míriam Nogueras i Camero", "JxCat-JUNTS (Junts)") },
  { legislature: "XIV", deputy: "Illamola Dausà, Mariona", partyId: "junts", group: "GPlu", from: "2019-11-19", to: "2023-05-30", source: fichaXIV(22, "Mariona Illamola Dausà", "JxCat-JUNTS (Junts)") },
  { legislature: "XIV", deputy: "Calvo Gómez, Pilar", partyId: "junts", group: "GPlu", from: "2021-03-16", to: "2023-05-30", source: fichaXIV(381, "Pilar Calvo Gómez", "JxCat-JUNTS (Junts)") },
  { legislature: "XIV", deputy: "Pagès i Massó, Josep", partyId: "junts", group: "GPlu", from: "2021-03-09", to: "2023-05-30", source: fichaXIV(379, "Josep Pagès i Massó", "JxCat-JUNTS (Junts)") },
];
