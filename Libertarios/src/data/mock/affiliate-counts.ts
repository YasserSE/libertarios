/**
 * MOCK DATA — cifras de ejemplo, no registros reales.
 *
 * Escala deliberadamente modesta: un proyecto que aún no ha lanzado no tiene
 * veintitrés mil simpatizantes. La versión anterior los tenía, y eso hacía dos
 * cosas malas a la vez: era inverosímil para cualquiera que conozca el tamaño
 * real del movimiento libertario en España, y contradecía la tesis del propio
 * sitio —que ese movimiento está por construir—. Menos de cuatro mil personas
 * repartidas por Europa dice la verdad y además dice algo más interesante.
 *
 * Territorios sin nadie: se omiten en lugar de ponerlos a cero. Que haya
 * provincias y países vacíos es parte del mensaje.
 *
 * Este fichero es el único punto de contacto con los datos. Al conectar la base
 * se borra; ver `docs/DATABASE.md`.
 */

/** Simpatizantes por país, por ISO 3166-1 alfa-2. España sale de sus provincias. */
export const COUNTRY_COUNTS: Record<string, number> = {
  PT: 210,
  IT: 165,
  FR: 148,
  DE: 132,
  GB: 118,
  NL: 78,
  PL: 62,
  BE: 52,
  CH: 48,
  IE: 41,
  AT: 36,
  SE: 32,
  CZ: 29,
  RO: 25,
  GR: 22,
  DK: 20,
  NO: 18,
  FI: 15,
  HU: 14,
  BG: 12,
  HR: 10,
  SK: 9,
  LT: 8,
  SI: 8,
  EE: 7,
  LV: 6,
  LU: 6,
  CY: 5,
  RS: 5,
  MT: 5,
  AD: 5,
  // Sin registros todavía: AL, BA, BY, IS, LI, MC, MD, ME, MK, SM, UA, XK.
};

/**
 * Simpatizantes por provincia española, por código INE.
 *
 * Ninguna entrada por debajo de 5: es el umbral de k-anonimato de las vistas
 * agregadas (`docs/DATABASE.md`). Con cifras menores la base ocultaría el
 * territorio y la web mostraría un número que la base no publica.
 */
export const SPAIN_PROVINCE_COUNTS: Record<string, number> = {
  "28": 520, // Madrid
  "08": 360, // Barcelona
  "46": 190, // Valencia
  "41": 125, // Sevilla
  "03": 112, // Alicante
  "29": 110, // Málaga
  "30": 78, // Murcia
  "50": 72, // Zaragoza
  "07": 66, // Illes Balears
  "35": 56, // Las Palmas
  "48": 54, // Bizkaia
  "38": 49, // Santa Cruz de Tenerife
  "33": 45, // Asturias
  "15": 43, // A Coruña
  "11": 42, // Cádiz
  "36": 35, // Pontevedra
  "18": 34, // Granada
  "43": 32, // Tarragona
  "17": 29, // Girona
  "14": 28, // Córdoba
  "31": 27, // Navarra
  "12": 26, // Castellón
  "04": 25, // Almería
  "47": 24, // Valladolid
  "39": 23, // Cantabria
  "45": 22, // Toledo
  "20": 22, // Gipuzkoa
  "06": 20, // Badajoz
  "23": 18, // Jaén
  "21": 17, // Huelva
  "24": 16, // León
  "37": 16, // Salamanca
  "13": 15, // Ciudad Real
  "25": 14, // Lleida
  "26": 14, // La Rioja
  "09": 14, // Burgos
  "02": 13, // Albacete
  "10": 12, // Cáceres
  "01": 11, // Álava
  "27": 10, // Lugo
  "32": 9, // Ourense
  "19": 9, // Guadalajara
  "22": 8, // Huesca
  "49": 6, // Zamora
  "40": 6, // Segovia
  "05": 5, // Ávila
  "34": 5, // Palencia
  "16": 5, // Cuenca
  // Sin registros todavía: Soria, Teruel, Ceuta y Melilla.
};

/** Cuándo se tocaron estas cifras. Hace de `MAX(updated_at)`. */
export const MOCK_UPDATED_AT = "2026-09-01T00:00:00.000Z";
