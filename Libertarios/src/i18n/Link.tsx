"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { DEFAULT_LOCALE, isAfinidadPath, isLocale, siteLocaleFor, type Locale } from "./config";

/**
 * Enlace interno con el idioma actual ya puesto.
 *
 * El idioma se deduce de la ruta en lugar de pasarlo por props: si no, cada
 * componente que enlace tendría que recibirlo, y basta olvidarlo una vez para
 * que un clic te devuelva al castellano sin avisar.
 *
 * Los enlaces externos, los anclas y `mailto:` pasan sin tocar.
 */
export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

type LinkProps = ComponentProps<typeof NextLink>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, ...props },
  ref,
) {
  const locale = useLocale();
  const raw = typeof href === "string" ? href : null;

  /*
   * Desde «¿A quién votar?» en gallego o euskera, la cabecera y el pie del sitio
   * (que el módulo usa desde el rediseño) enlazan a páginas que solo existen en
   * castellano: se manda directamente a `/es/...` en vez de a `/gl/cuadrante`,
   * que sería castellano etiquetado como gallego. Los enlaces al propio módulo
   * conservan el idioma.
   */
  const target = raw && !isAfinidadPath(raw) ? siteLocaleFor(locale) : locale;
  const localised =
    raw && raw.startsWith("/") && !isLocale(raw.split("/").filter(Boolean)[0] ?? "")
      ? `/${target}${raw === "/" ? "" : raw}`
      : href;

  return <NextLink ref={ref} href={localised} {...props} />;
});
