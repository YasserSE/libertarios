import { NextResponse, type NextRequest } from "next/server";
import {
  AFINIDAD_LOCALES,
  AFINIDAD_SEGMENT,
  LOCALES,
  LOCALE_COOKIE,
  SITE_LOCALES,
  isAfinidadPath,
  isLocale,
  matchLocale,
  type Locale,
} from "@/i18n/config";

/**
 * Encamina cada visita a su idioma.
 *
 * Una ruta sin prefijo (`/spain`) se redirige al idioma que pida el navegador,
 * y la elección explícita del usuario se recuerda en una cookie para que no se
 * la vuelva a pisar la detección automática en la siguiente visita.
 *
 * Hay dos juegos de idiomas: el del sitio (`SITE_LOCALES`) y el de «¿A quién
 * votar?» (`AFINIDAD_LOCALES`, con gallego y euskera). Al redirigir se elige
 * dentro del juego que corresponde a la ruta, para no mandar a nadie a una
 * versión que no existe.
 *
 * Nota: Next 16 renombra `middleware` a `proxy`; el nombre viejo sigue
 * funcionando (deprecado). La migración es un `mv` y renombrar la función, y
 * se deja para un cambio aparte que no mezcle infraestructura con el módulo.
 */

/**
 * Resultado del test de afinidad: la URL lleva las respuestas codificadas.
 * No debe indexarse —sería publicar respuestas individuales en un buscador— pero
 * sí tiene que poder rastrearse, porque de ahí sacan la vista previa WhatsApp,
 * X o Telegram. Por eso cabecera `X-Robots-Tag` y no `Disallow` en robots.txt:
 * un `Disallow` impediría leer el `og:image` y tampoco evita la indexación de la
 * URL desnuda si alguien la enlaza.
 */
const AFINIDAD_RESULT = new RegExp(`^/[a-z]{2}/${AFINIDAD_SEGMENT}/resultado(/|$)`);

function withRobots(response: NextResponse, pathname: string): NextResponse {
  const [, first] = pathname.split("/");
  const siteOnlyFallback =
    isLocale(first) && !(SITE_LOCALES as readonly Locale[]).includes(first) && !isAfinidadPath(pathname);

  // `/gl/spain` existe para que un enlace desde el módulo no dé 404, pero su
  // contenido es el castellano: indexarlo sería duplicar `/es/spain`.
  if (AFINIDAD_RESULT.test(pathname) || siteOnlyFallback) {
    response.headers.set("X-Robots-Tag", "noindex");
  }
  return response;
}

/**
 * Panel interno (`/admin/afinidad`). Vive fuera de `[locale]`: no se traduce y
 * no debe redirigirse a `/es/admin/…`, que no existe. Se marca para que no se
 * indexe, no se guarde en ninguna caché compartida y no filtre la URL como
 * referer.
 */
function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function adminResponse(): NextResponse {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminPath(pathname)) return adminResponse();

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return withRobots(NextResponse.next(), pathname);

  const candidates: readonly Locale[] = isAfinidadPath(pathname) ? AFINIDAD_LOCALES : SITE_LOCALES;
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  // La cookie solo manda si su idioma existe en esta parte del sitio: quien
  // eligió euskera en el cuestionario y luego va a `/spain` recibe la detección
  // normal, no una portada en castellano etiquetada como euskera.
  const locale =
    cookie && isLocale(cookie) && candidates.includes(cookie)
      ? cookie
      : matchLocale(request.headers.get("accept-language"), candidates);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Se excluyen assets y rutas internas: redirigir /geo/*.json rompería los mapas.
  // `opengraph-image` y `twitter-image` no llevan extensión, así que sin
  // excluirlas el middleware las manda a `/es/opengraph-image` y el rastreador
  // recibe una redirección en vez de la imagen: el enlace compartido sale sin
  // vista previa.
  matcher: ["/((?!_next|api|geo|favicon|robots|sitemap|opengraph-image|twitter-image|.*\\.).*)"],
};
