"use client";

import { usePathname, useRouter } from "next/navigation";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALE_META, localisePath, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/Link";

/**
 * Selector de idioma.
 *
 * Cambia el segmento de la ruta y deja la misma página, en lugar de mandar a
 * la portada: quien está leyendo `/es/comparativas` y elige alemán quiere esa
 * página en alemán, no empezar de cero.
 *
 * La elección se guarda en cookie para que el middleware no vuelva a aplicar la
 * detección por navegador en la siguiente visita.
 */
export function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const current = useLocale();

  const change = (locale: Locale) => {
    document.cookie = `libertarios-locale=${locale};path=/;max-age=31536000;samesite=lax`;
    router.push(localisePath(pathname, locale));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent"
      >
        <Globe className="h-4 w-4" />
        <span className="tabular-nums">{LOCALE_META[current].short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-1.5">
        {LOCALES.map((locale) => {
          const meta = LOCALE_META[locale];
          const active = locale === current;
          return (
            <DropdownMenuItem
              key={locale}
              onSelect={() => change(locale)}
              className="cursor-pointer gap-2 rounded-md px-3 py-2"
            >
              <span aria-hidden>{meta.flag}</span>
              <span className={active ? "font-medium text-primary" : "text-foreground"}>
                {meta.label}
              </span>
              {active && <Check className="ml-auto h-3.5 w-3.5 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
