"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

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

  const localised =
    raw && raw.startsWith("/") && !isLocale(raw.split("/").filter(Boolean)[0] ?? "")
      ? `/${locale}${raw === "/" ? "" : raw}`
      : href;

  return <NextLink ref={ref} href={localised} {...props} />;
});
