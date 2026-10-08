/**
 * Vercel Web Analytics (plan Hobby): visitas por página, país, dispositivo y
 * origen. Sin cookies.
 *
 * Lo que NO puede salir hacia Vercel: los tests guardan las respuestas en la
 * URL (`?r=…&vh=<voto habitual>&ca=<comunidad>` en «¿A quién votar?», igual en
 * el cuadrante). Eso es opinión política (art. 9 RGPD), así que se quita toda
 * la query y el hash y solo se conservan los `utm_*`, que dicen de dónde viene
 * la visita y nada de quien la hace. El panel de /admin no se cuenta: son
 * visitas nuestras.
 */
const KEEP_PARAM = /^utm_[a-z]+$/;

export function stripPrivateUrl(raw: string): string | null {
  const url = new URL(raw);
  if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) return null;
  const kept = new URLSearchParams();
  url.searchParams.forEach((value, key) => {
    if (KEEP_PARAM.test(key)) kept.append(key, value);
  });
  url.search = kept.toString();
  url.hash = "";
  return url.toString();
}
