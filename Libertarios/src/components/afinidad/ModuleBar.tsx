import NextLink from "next/link";
import { BookOpen, Database, Flag, Scale, ShieldCheck } from "lucide-react";
import type { FlowStrings } from "@/i18n/afinidad/flow";
import { getDvhStrings } from "@/i18n/afinidad/dvh";

/**
 * TODO(afinidad): sustituir por el buzón definitivo de correcciones (plan §1,
 * «buzón de correcciones con registro público»). Mientras tanto, una incidencia
 * en el repositorio: deja rastro público, que es lo que pide el plan, pero hay
 * que confirmar que el repositorio es público antes del lanzamiento.
 */
export const CORRECTIONS_URL =
  "https://github.com/YasserSE/libertarios/issues/new?title=%5BA%20qui%C3%A9n%20votar%5D%20Correcci%C3%B3n%20de%20un%20dato";

/**
 * Franja propia del módulo bajo la cabecera del sitio.
 *
 * Desde el rediseño (decisión del dueño: «que se parezca al test oficial») el
 * módulo usa la cabecera y el pie de Libertarios.eu. Lo que el pie propio
 * decía —sin afiliación, fuentes abiertas, metodología, datos, corregir— se
 * condensa aquí: un distintivo y cuatro enlaces cortos, siempre a la vista.
 * La neutralidad ya no la sostiene una paleta gris, sino esto y el método.
 */
export function ModuleBar({ locale, strings }: { locale: string; strings: FlowStrings }) {
  const base = `/${locale}/a-quien-votar`;
  const dvh = getDvhStrings(locale);
  const link =
    "relative inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 sm:mb-8">
      <p className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium leading-tight text-primary sm:text-xs">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {strings.intro.badge}
      </p>
      <nav aria-label={strings.nav.label}>
        <ul className="flex shrink-0 items-center gap-1">
          {/* «Dijeron vs. hicieron», primero y destacado (petición del dueño:
              que se vea), con el texto siempre a la vista. */}
          <li>
            <NextLink
              href={`${base}/dijeron-vs-hicieron`}
              data-testid="modulebar-dvh"
              className="gradient-cta mr-1 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-shadow hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Scale className="h-4 w-4" aria-hidden />
              {/* Rótulo corto: el largo («Esan zutena eta egin zutena») desbordaba a 360 px. */}
              <span title={dvh.footerLink}>{dvh.modulePill}</span>
            </NextLink>
          </li>
          <li>
            <NextLink href={`${base}/metodologia`} className={link} title={strings.footer.methodology}>
              <BookOpen className="h-4 w-4" aria-hidden />
              <span className="sr-only lg:not-sr-only">{strings.footer.methodology}</span>
            </NextLink>
          </li>
          <li>
            <NextLink href={`${base}/datos`} className={link} title={strings.footer.data}>
              <Database className="h-4 w-4" aria-hidden />
              <span className="sr-only lg:not-sr-only">{strings.footer.data}</span>
            </NextLink>
          </li>
          <li>
            {/* Solo icono: es la acción menos frecuente, pero tiene que estar. */}
            <a
              href={CORRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link} min-w-11 justify-center`}
              aria-label={strings.footer.correct}
              title={strings.footer.correct}
            >
              <Flag className="h-4 w-4" aria-hidden />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
