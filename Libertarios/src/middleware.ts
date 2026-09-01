import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, matchLocale } from "@/i18n/config";

/**
 * Encamina cada visita a su idioma.
 *
 * Una ruta sin prefijo (`/spain`) se redirige al idioma que pida el navegador,
 * y la elección explícita del usuario se recuerda en una cookie para que no se
 * la vuelva a pisar la detección automática en la siguiente visita.
 */
const LOCALE_COOKIE = "libertarios-locale";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookie && (LOCALES as readonly string[]).includes(cookie)
      ? cookie
      : matchLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Se excluyen assets y rutas internas: redirigir /geo/*.json rompería los mapas.
  matcher: ["/((?!_next|api|geo|favicon|robots|sitemap|.*\\.).*)"],
};
