import type { Chapter } from "./chapters";

/**
 * Qué entrada de «Dijeron vs. hicieron» acompaña a cada capítulo de cada
 * partido. Es una elección editorial, así que se hace a mano y a la vista:
 *
 *  - Solo entradas del mismo tema que el capítulo (sueldo = impuestos sobre la
 *    renta, casa = vivienda, trabajo = empleo y jornada, país = inmigración).
 *  - Si hay una con `questionId` igual a la pregunta del capítulo, va esa.
 *  - Si no hay ninguna, el capítulo no lleva bloque «Dijo / hizo». Nunca se
 *    rellena con otra cosa.
 *
 * `said` es la cita tal como sale en pantalla: si se recorta, los cortes van
 * marcados con «[…]» y cada trozo tiene que estar literal en la cita original
 * (lo comprueba `npm run check`).
 * `did` es un resumen corto del hecho, sin adjetivos y sin nada que no esté en
 * el `summary` de la entrada o en el título de la norma citada.
 */
export type DvhPick = {
  id: string;
  said: string;
  saidWho: string;
  did: string;
  didSource: string;
  /** Nota de matiz de la propia entrada, resumida. */
  note?: string;
  /** Lo que cuenta la voz: dicho, hecho y veredicto, en llano y sin adjetivos. */
  voice: string;
};

export const DVH_MAP: Record<string, Partial<Record<Chapter["key"], DvhPick>>> = {
  pp: {
    sueldo: {
      id: "pp-irpf-2011",
      said: "Yo tengo que decir que mi intención es no subir los impuestos, porque en un momento como este […] no me parece lo más razonable.",
      saidWho: "Mariano Rajoy · investidura · DS Congreso p. 26",
      did: "El Gobierno aprueba un gravamen complementario del IRPF para 2012 y 2013, y sube retenciones del 19 al 21 %.",
      didSource: "Real Decreto-ley 20/2011 · BOE-A-2011-20638",
      note: "Era una intención declarada, no una promesa con plazo.",
      voice: "En 2011, Rajoy dijo que su intención era no subir los impuestos. Once días después, su Gobierno subió el IRPF. Contradice.",
    },
    casa: {
      id: "pp-alquiler-flexibilizacion-2011",
      said: "Dotaremos al contrato de arrendamiento de mayor flexibilidad y libertad de pactos.",
      saidWho: "Programa electoral del PP 2011 · p. 59",
      did: "La Ley 4/2013 refuerza la libertad de pactos y reduce la prórroga obligatoria de cinco a tres años.",
      didSource: "Ley 4/2013 · BOE-A-2013-5941",
      voice: "En 2011 prometió contratos de alquiler más flexibles, con más libertad entre casero e inquilino. En 2013 lo aprobó por ley. Cumple.",
    },
    trabajo: {
      id: "pp-reforma-laboral-2012",
      said: "[…] remitiremos al Congreso de los Diputados un proyecto de reforma laboral en el primer trimestre del año 2012.",
      saidWho: "Mariano Rajoy · investidura · DS Congreso p. 13",
      did: "El Gobierno aprueba la reforma laboral por real decreto-ley el 10-2-2012; luego se tramita como Ley 3/2012.",
      didSource: "Real Decreto-ley 3/2012 · BOE-A-2012-2076",
      note: "Llegó en el plazo dicho, pero por decreto-ley y no como proyecto de ley.",
      voice: "Rajoy prometió una reforma laboral en los tres primeros meses de 2012. La aprobó en febrero, por decreto. Cumple.",
    },
  },
  psoe: {
    sueldo: {
      id: "psoe-smi-60-2020",
      said: "[…] el salario mínimo al final de la legislatura sea del 60 % del salario medio en nuestro país.",
      saidWho: "Pedro Sánchez · investidura · DS Congreso p. 14",
      did: "En 2023 el Gobierno lo fija en 1.080 € al mes y dice haber llegado al 60 %. Eurostat lo sitúa en el 49,1 % del salario medio bruto.",
      didSource: "Real Decreto 99/2023 · BOE-A-2023-3982",
      note: "El 60 % solo sale con la medida que eligió el Gobierno (salario neto).",
      voice: "En 2020, Sánchez prometió subir el salario mínimo hasta el 60 % del salario medio. Lo subió mucho, pero según Eurostat se quedó en el 49 %. Parcial.",
    },
    casa: {
      id: "psoe-tope-alquiler-2020",
      said: "Vamos a frenar las subidas abusivas de los alquileres al poner techo en zonas de mercado tensionado […]",
      saidWho: "Pedro Sánchez · investidura · DS Congreso p. 20",
      did: "El Gobierno presenta la Ley de vivienda, que permite limitar la renta en zonas tensionadas. El PSOE vota a favor y se aprueba como Ley 12/2023.",
      didSource: "Ley 12/2023 · BOE-A-2023-12203",
      voice: "En 2020, Sánchez prometió poner techo a los alquileres en zonas tensionadas. En 2023 lo aprobó con la Ley de vivienda. Cumple.",
    },
    trabajo: {
      id: "psoe-reforma-laboral-2019",
      said: "Derogaremos la reforma laboral. Recuperaremos los derechos laborales arrebatados por la reforma laboral de 2012.",
      saidWho: "Acuerdo de coalición PSOE–Unidas Podemos · p. 3",
      did: "Entre 2020 y 2021 se revierten tres puntos de la reforma de 2012 (despido por absentismo, convenios y salario), pero no se deroga entera.",
      didSource: "Real Decreto-ley 32/2021 · BOE-A-2021-21788",
      note: "No se recupera, por ejemplo, la indemnización por despido anterior a 2012.",
      voice: "En 2019, PSOE y Podemos prometieron derogar la reforma laboral de 2012. Cambiaron tres puntos clave, pero no la derogaron entera. Parcial.",
    },
  },
  vox: {
    pais: {
      id: "vox-arraigo-2025",
      said: "Supresión de la institución del arraigo como forma de regular la inmigración ilegal […]",
      saidWho: "Programa electoral de Vox 2023 · p. 103",
      did: "Vox lleva al Congreso una ley para restringir el arraigo y vota a favor. La Cámara la rechaza: 169 a favor, 177 en contra.",
      didSource: "Congreso · toma en consideración",
      voice: "En 2023, Vox prometió suprimir el arraigo como vía para regularizar la inmigración ilegal. En 2025 llevó una ley al Congreso, pero fue rechazada. Cumple.",
    },
  },
  sumar: {
    sueldo: {
      id: "sumar-smi-60-2023",
      said: "El SMI seguirá creciendo a lo largo de la legislatura para asegurar su poder adquisitivo, garantizándose en el Estatuto de los Trabajadores que aumentará acompasado al 60% del salario medio.",
      saidWho: "Acuerdo de Gobierno PSOE–Sumar · p. 11",
      did: "El Gobierno sube el SMI cada año (1.221 € al mes en 2026), pero la garantía del 60 % no entra en el Estatuto de los Trabajadores.",
      didSource: "Real Decreto 126/2026 · BOE-A-2026-3815",
      voice: "En 2023, PSOE y Sumar acordaron subir el salario mínimo cada año y blindar por ley el 60 % del salario medio. Lo subieron, pero no lo blindaron. Parcial.",
    },
    casa: {
      id: "sumar-indice-precios-alquiler-2023",
      said: "[…] se definirá con carácter inmediato el índice de precios de referencia que permitan identificar los municipios y distritos que se consideran zonas tensionadas […]",
      saidWho: "Acuerdo de Gobierno PSOE–Sumar · p. 29",
      did: "En marzo de 2024 se publica en el BOE el índice de precios de referencia del alquiler y las primeras zonas tensionadas.",
      didSource: "Resolución de 14-3-2024 · BOE-A-2024-5213",
      note: "«Con carácter inmediato»: llegó casi cinco meses después del acuerdo.",
      voice: "En 2023 prometieron crear ya el índice de precios del alquiler. Se publicó en marzo de 2024, casi cinco meses después. Cumple.",
    },
    trabajo: {
      id: "sumar-jornada-37-5-2023",
      said: "Reduciremos la jornada laboral máxima legal sin reducción salarial para establecerla en 37 horas y media semanales. […]",
      saidWho: "Acuerdo de Gobierno PSOE–Sumar · p. 11",
      did: "La ley de las 37,5 horas llega al Congreso en 2025. Sumar vota contra su devolución, pero el Congreso la devuelve y la jornada no baja.",
      didSource: "Congreso · enmiendas de totalidad",
      voice: "En 2023 prometieron bajar la jornada a 37 horas y media. Sumar defendió la ley, pero el Congreso la devolvió y la jornada no bajó. Parcial.",
    },
  },
  podemos: {
    casa: {
      id: "podemos-tope-alquiler-2023",
      said: "Intervenir el mercado del alquiler para impedir subidas abusivas mediante el control de precios […]",
      saidWho: "Programa electoral de Podemos 2019 · p. 90",
      did: "Su grupo vota sí a la Ley de vivienda, que permite limitar la renta de los nuevos contratos en zonas tensionadas.",
      didSource: "Ley 12/2023 · BOE-A-2023-12203",
      voice: "En 2019, Podemos prometió controlar el precio del alquiler. En 2023 votó la ley que permite limitarlo en zonas tensionadas. Cumple.",
    },
    trabajo: {
      id: "podemos-reforma-laboral-2022",
      said: "Derogar la reforma laboral de Zapatero de 2010 y la de Rajoy de 2012.",
      saidWho: "Programa electoral de Podemos 2019 · p. 74",
      did: "Apoya el decreto de 2021 que cambia la contratación temporal y los convenios, pero que no deroga esas reformas.",
      didSource: "Real Decreto-ley 32/2021 · BOE-A-2021-21788",
      voice: "En 2019, Podemos prometió derogar las reformas laborales de 2010 y 2012. En 2021 apoyó una reforma que cambió una parte, pero no las derogó. Parcial.",
    },
  },
};
