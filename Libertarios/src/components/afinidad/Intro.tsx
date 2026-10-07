"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ArrowRight, CalendarDays, History, Lock, RotateCcw, Scale } from "lucide-react";
import { getDvhStrings } from "@/i18n/afinidad/dvh";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import type { Question } from "@/data/afinidad/types";
import { getFlowStrings } from "@/i18n/afinidad/flow";
import { encodeResultParams } from "@/lib/afinidad/encode";
import { OtherTestsRow } from "./KeepExploring";
import { VoteHandIllustration } from "./VoteHandIllustration";
import { TileArt, type TileArtKind } from "./TileArt";
import { forgetAfinidad, readAfinidad, toAnswers, type StoredAfinidad } from "@/lib/afinidad/storage";

/**
 * Portada del test, con el mismo patrón que la del cuadrante: un titular, una
 * línea, un botón grande y tres tarjetas de no más de seis palabras. Desde el
 * rediseño «más visual» el titular va a dos columnas con una ilustración (una
 * mano deja una papeleta en una urna transparente; sin partidos ni colores de
 * partido) y cada tarjeta lleva un pequeño dibujo en vez de un icono suelto.
 *
 * El rediseño quitó de aquí el «cómo funciona» en prosa (dueño: «poco visual,
 * mucho texto»): lo que explicaba —de dónde sale cada cifra, que la
 * hemeroteca no puntúa, que se usan los programas de 2023— está entero en la
 * metodología, a un clic desde la franja del módulo.
 */
export function Intro({
  locale,
  questions,
  version,
}: {
  locale: string;
  questions: Question[];
  version: string;
}) {
  const strings = getFlowStrings(locale);
  const s = strings.intro;
  const dvh = getDvhStrings(locale);
  const total = questions.length;
  const base = `/${locale}/a-quien-votar`;

  // Lo guardado se lee tras montar (no existe en el servidor).
  const [stored, setStored] = useState<StoredAfinidad | null>(null);
  useEffect(() => {
    setStored(readAfinidad(questions.map((q) => q.id)));
  }, [questions]);

  const visited = stored ? Object.keys(stored.values).length : 0;
  const inProgress = !!stored && !stored.completed && (visited > 0 || stored.contextDone);
  const lastResultHref =
    stored?.completed && total > 0
      ? `${base}/resultado?${encodeResultParams(
          { answers: toAnswers(stored.values, stored.important), context: stored.context },
          questions,
          stored.version || version,
        ).toString()}`
      : null;

  // La tercera lleva a «Dijeron vs. hicieron» (petición del dueño).
  const tiles: { art: TileArtKind; title: string; body: string; href?: string }[] = [
    { art: "programme", ...s.programme },
    { art: "record", ...s.record },
    { art: "hemeroteca", ...s.hemeroteca, href: `${base}/dijeron-vs-hicieron` },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero a dos columnas (texto | ilustración) desde `lg`; en móvil, la
          ilustración arriba y pequeña (≤ 200 px) para que el botón siga
          cerca del pliegue. Mismo lenguaje que el resto del sitio: tarjeta con
          degradado suave del color primario, titular en Space Grotesk. */}
      <section
        aria-labelledby="afinidad-titulo"
        className="relative mb-10 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-accent/70 via-card to-primary/5 px-5 py-8 shadow-card sm:px-8 md:py-10 lg:px-12 lg:py-12"
      >
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div className="order-last text-center lg:order-first lg:text-left">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
              <CalendarDays className="h-4 w-4" aria-hidden />
              {s.election}
            </p>
            <h1
              id="afinidad-titulo"
              className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {s.heroLead}{" "}
              <span className="bg-gradient-to-r from-primary to-[hsl(190_70%_35%)] bg-clip-text text-transparent dark:to-[hsl(190_70%_55%)]">
                {s.heroAccent}
              </span>
            </h1>
            {total > 0 && (
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground lg:mx-0 lg:text-xl">{s.promise(total)}</p>
            )}

            {total === 0 && (
              <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-card p-6 shadow-card lg:mx-0" role="status">
                <p className="font-display font-semibold text-foreground">{s.preparing}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.preparingBody}</p>
              </div>
            )}
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              {total > 0 &&
                (inProgress ? (
                  <>
                    <Button asChild variant="hero" size="xl" className="group w-full sm:w-auto">
                      <NextLink href={`${base}/test`}>
                        {s.resume(visited, total)}
                        <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
                      </NextLink>
                    </Button>
                    <Button asChild variant="ghost" className="min-h-11">
                      <NextLink href={`${base}/test`} onClick={() => forgetAfinidad()}>
                        <RotateCcw aria-hidden />
                        {s.restart}
                      </NextLink>
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="hero" size="xl" className="group w-full sm:w-auto">
                    <NextLink href={`${base}/test`}>
                      {s.cta}
                      <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
                    </NextLink>
                  </Button>
                ))}
              {/* «Dijeron vs. hicieron»: botón secundario junto al principal
                  (petición del dueño: «un botón»), que no compite con «Empezar».
                  También con el test en preparación: la página no depende de él. */}
              <Button
                asChild
                variant="outline"
                className="group min-h-12 w-full rounded-full border-primary/30 bg-card/70 px-5 sm:w-auto"
              >
                <NextLink href={`${base}/dijeron-vs-hicieron`} data-testid="intro-dvh-button">
                  <Scale className="h-4 w-4 text-primary" aria-hidden />
                  {dvh.footerLink}
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
                </NextLink>
              </Button>
            </div>
            {/* «3 minutos» ya va en la promesa; aquí solo la privacidad. */}
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {s.privacy}
            </p>
          </div>

          <div className="order-first mx-auto w-full max-w-[180px] sm:max-w-[220px] lg:order-last lg:max-w-[440px]">
            <VoteHandIllustration />
          </div>
        </div>
      </section>

      {/* «Ya hiciste el test»: misma tarjeta que en el cuadrante. */}
      {lastResultHref && (
        <div className="mb-8 rounded-2xl border border-primary/25 bg-primary/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <History className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-display font-semibold text-foreground">{s.lastTitle}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.lastBody}</p>
              </div>
            </div>
            <Button asChild variant="cta" className="min-h-11 shrink-0">
              <NextLink href={lastResultHref}>{s.seeLast}</NextLink>
            </Button>
          </div>
        </div>
      )}

      {/* Las tres fuentes, en tarjetas con una pequeña ilustración. */}
      <ul className="grid gap-4 sm:grid-cols-3">
        {tiles.map(({ art, title, body, href }, i) => {
          const inner = (
            <>
              <span className="mb-4 flex h-20 items-center justify-center rounded-xl bg-accent/70">
                <TileArt kind={art} />
              </span>
              <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </>
          );
          const card = "block h-full rounded-2xl border border-border bg-card p-4 pb-5 shadow-card sm:p-5";
          return (
            <Reveal as="li" key={title} delay={i * 80}>
              {href ? (
                <NextLink
                  href={href}
                  className={`${card} group transition-[border-color,transform] hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0`}
                  data-testid="intro-tile-dvh"
                >
                  {inner}
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {s.dvhTeaser}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </NextLink>
              ) : (
                <div className={card}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </ul>

      {/* Al final y discreto: quien viene a hacer el test no tiene nada delante. */}
      <OtherTestsRow
        lang={locale}
        from="portada"
        className="mt-10 flex justify-center border-t border-border pt-4 text-sm text-muted-foreground"
      />
    </div>
  );
}
