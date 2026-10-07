import type { Dataset, Lang, Question } from "@/data/afinidad/types";

/**
 * Enlaces y utilidades puras de las páginas de transparencia (WP8). Separadas
 * de `ui.tsx` para que ese fichero exporte solo componentes.
 */

/** Repositorio público: el código y los tests que se citan se pueden leer ahí. */
export const REPO_URL = "https://github.com/YasserSE/libertarios";
const REPO_BLOB = `${REPO_URL}/blob/main/Libertarios`;
export const repoFile = (path: string) => `${REPO_BLOB}/${path}`;
export const CHANGELOG_URL = repoFile("docs/AFINIDAD-CAMBIOS.md");
export const CODING_RULES_URL = repoFile("docs/AFINIDAD-DATOS.md");
export const JSON_PATH = "/api/afinidad/datos.json";
export const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/deed.es";
export const CORRECTIONS_EMAIL = "contacto@libertarios.es";
/** Enlace de correo para corregir un dato, con el asunto en el idioma de la página (`t.correctionsSubject`). */
export const correctionsMailto = (subject: string) =>
  `mailto:${CORRECTIONS_EMAIL}?subject=${encodeURIComponent(subject)}`;
/** El mismo enlace con el asunto en castellano. */
export const CORRECTIONS_MAILTO = correctionsMailto("Corrección — ¿A quién votar? Objetivamente");

/** Ruta interna del módulo con el idioma ya puesto. */
export const modulePath = (locale: string, sub = "") => `/${locale}/a-quien-votar${sub}`;

export const isEmptyDataset = (d: Dataset) => d.parties.length === 0 || d.questions.length === 0;

export const questionText = (q: Question, lang: Lang) => q.text[lang] ?? q.text.es;

export const sortedQuestions = (d: Dataset) => [...d.questions].sort((a, b) => a.order - b.order);

/** «+2», «−1», «+0,5». Con signo siempre, para que 0 y +1 no se confundan. */
export function formatPosition(n: number): string {
  const abs = Math.abs(n).toLocaleString("es-ES", { maximumFractionDigits: 1 });
  if (n === 0) return "0";
  return `${n > 0 ? "+" : "−"}${abs}`;
}

export const formatPct = (x: number) =>
  `${(x * 100).toLocaleString("es-ES", { maximumFractionDigits: 0 })} %`;

