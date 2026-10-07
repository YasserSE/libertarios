"use client";

import { ArrowRight, Vote } from "lucide-react";
import { Link, useLocale } from "@/i18n/Link";
import { getDictionary } from "@/i18n/getDictionary";
import { afinidadHref } from "@/i18n/config";
import { Button } from "@/components/ui/button";

/**
 * Invitación de la portada a «¿A quién votar? Objetivamente».
 *
 * Va justo después del mapa y antes de «Comparar no es atacar»: con las
 * generales del 29-N convocadas es lo más útil que el sitio puede ofrecer a
 * quien llega, pero no desplaza al hero (el mapa es la portada). Usa el
 * lenguaje visual del sitio —tarjeta con degradado suave y botón `hero`, como
 * la llamada al registro del cuadrante— y no la paleta neutra del módulo: aquí
 * habla el sitio, y lo que dice es que el test es aparte y neutral.
 *
 * El enlace va al idioma del módulo (`afinidadHref`): desde `/pt` o `/fr` el
 * cuestionario no existe en ese idioma y se manda al castellano.
 */
export function AfinidadPromoSection() {
  const locale = useLocale();
  const t = getDictionary(locale).afinidad;
  return (
    <section id="a-quien-votar" aria-labelledby="afinidad-promo-titulo" className="scroll-mt-16 py-12 lg:py-16">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-start gap-4">
            <span className="gradient-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
              <Vote className="h-6 w-6 text-primary-foreground" aria-hidden />
            </span>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.eyebrow}</p>
              <h2
                id="afinidad-promo-titulo"
                className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                {t.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t.body}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.neutral}</p>
            </div>
          </div>
          <Button variant="hero" size="lg" className="group shrink-0 md:self-center" asChild>
            <Link href={afinidadHref(locale)}>
              {t.cta}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
