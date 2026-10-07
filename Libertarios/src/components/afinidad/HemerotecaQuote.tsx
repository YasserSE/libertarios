"use client";

import { ExternalLink, Play } from "lucide-react";
import type { Party, Quote } from "@/data/afinidad/types";
import { fmt, formatDate, type ResultStrings } from "@/i18n/afinidad/result";
import { ClampText } from "./ui";

/**
 * Una cita de hemeroteca: quién, cuándo, el texto literal y dónde comprobarlo.
 *
 * Rediseño: la cita se recorta a dos líneas con «Leer más» (el texto entero
 * sigue en la página, solo lo recorta el CSS) y el vídeo es un botón de
 * reproducir en vez de un enlace de texto.
 *
 * No puntúa (plan, actualización §5). Aquí no hay ningún «pero» ni ningún
 * resaltado de incoherencia, solo la cita y su fuente.
 */
export function HemerotecaQuote({
  quote,
  party,
  t,
  lang,
}: {
  quote: Quote;
  party?: Party;
  t: ResultStrings;
  lang: string;
}) {
  const videoLabel = quote.videoStart ? fmt(t.videoFrom, { t: quote.videoStart }) : t.video;
  return (
    <figure className="rounded-xl border border-border bg-background p-3 text-sm">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <ClampText as="blockquote" lines={2} more={t.readMore} less={t.readLess} className="leading-relaxed text-foreground">
            «{quote.text}»
          </ClampText>
        </div>
        {quote.videoUrl && (
          <a
            href={quote.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={videoLabel}
            title={videoLabel}
            className="gradient-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary-foreground shadow-soft transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden />
          </a>
        )}
      </div>
      <figcaption className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{quote.speaker}</span>
        {quote.role && <span>· {quote.role}</span>}
        {party && <span>· {party.short}</span>}
        <span>· {formatDate(quote.date, lang)}</span>
        <a
          href={quote.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-foreground"
        >
          {quote.source.title}
          {quote.source.page ? ` (${fmt(t.page, { page: quote.source.page })})` : ""}
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </figcaption>
    </figure>
  );
}
