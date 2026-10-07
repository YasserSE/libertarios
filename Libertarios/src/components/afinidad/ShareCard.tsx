"use client";

import { useId, useState } from "react";
import { Share2, Vote } from "lucide-react";
import type { Party } from "@/data/afinidad/types";
import { PartyAvatar } from "./PartyBadge";
import { ShareButtons, type ShareChannel } from "@/components/ShareButtons";
import type { ResultStrings } from "@/i18n/afinidad/result";
import { track } from "@/lib/afinidad/track";

/*
 * Canal del botón → evento de analítica. Facebook no tiene evento propio en
 * `track.ts` (no está entre los canales que se miden), así que no se cuenta.
 * Solo el canal y si fue anónimo: nunca la URL, que lleva las respuestas.
 */
const TRACKED: Partial<Record<ShareChannel, "x" | "whatsapp" | "telegram" | "copy" | "native">> = {
  twitter: "x",
  whatsapp: "whatsapp",
  telegram: "telegram",
  copy: "copy",
  native: "native",
};

/**
 * Compartir el resultado.
 *
 * Por defecto se comparte el ENLACE DEL RESULTADO (`?r=…&v=…`), que abre esta
 * misma página con tus respuestas y genera la imagen OG con tus tres primeros
 * partidos. Compartir el test en blanco, como hacía el cuadrante al principio,
 * convertía «mira mi resultado» en «haz un test».
 *
 * «Compartir sin decir mi partido» existe porque el voto es secreto y mucha
 * gente quiere recomendar la herramienta sin publicar su afinidad: cambia el
 * texto por uno genérico y el enlace por el de la portada del test, que no
 * lleva respuestas y cuya imagen OG es la genérica.
 */
export function ShareCard({
  resultUrl,
  introUrl,
  resultText,
  leader,
  t,
}: {
  resultUrl: string;
  introUrl: string;
  /** Texto con el partido; si no hay partido comparable, `null` y solo se ofrece el genérico. */
  resultText: string | null;
  /** Para la tarjeta de vista previa: el primer partido y sus dos cifras ya formateadas. */
  leader?: { party: Party; programme: string; record: string } | null;
  t: ResultStrings;
}) {
  const [anon, setAnon] = useState(resultText === null);
  const id = useId();
  const url = anon || resultText === null ? introUrl : resultUrl;
  const text = anon || resultText === null ? t.shareTextGeneric : resultText;
  const showLeader = !anon && leader;

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <Share2 className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="font-display font-semibold text-foreground">{t.shareTitle}</h2>
      </div>

      {/* Vista previa de lo que se va a publicar —misma tarjeta que el
          cuadrante—, para que nadie comparta su partido sin darse cuenta. */}
      <div className="mb-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/30 p-5">
        <div className="flex items-start gap-4">
          {showLeader ? (
            <PartyAvatar party={leader.party} size={56} />
          ) : (
            <span className="gradient-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
              <Vote className="h-7 w-7 text-primary-foreground" aria-hidden />
            </span>
          )}
          <div className="min-w-0 flex-1">
            {showLeader && (
              <p className="mb-1 flex flex-wrap gap-x-3 font-display font-semibold text-foreground">
                <span>{leader.party.name}</span>
                <span className="text-sm font-medium tabular-nums text-muted-foreground">
                  {t.lensProgramme} <span className="text-foreground">{leader.programme}</span> · {t.lensRecord}{" "}
                  <span className="text-foreground">{leader.record}</span>
                </span>
              </p>
            )}
            <p className="whitespace-pre-line text-sm text-muted-foreground" data-testid="share-preview">
              {text}
            </p>
          </div>
        </div>
      </div>

      {resultText !== null && (
        <label htmlFor={id} className="mb-4 flex min-h-11 cursor-pointer items-center gap-2 text-sm text-foreground">
          <input
            id={id}
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="h-5 w-5 rounded border-input accent-[hsl(var(--primary))]"
          />
          {t.shareAnon}
        </label>
      )}
      <p className="mb-4 text-xs text-muted-foreground">{anon ? t.shareAnonHint : t.shareIntro}</p>

      <ShareButtons
        url={url}
        text={text}
        title={t.shareDocTitle}
        onShare={(channel) => {
          const c = TRACKED[channel];
          if (c) track(`afinidad_share_${c}`, { anon });
        }}
        labels={{
          copy: t.copyLink,
          copied: t.copied,
          share: t.shareNative,
          copiedToast: t.copiedToast,
          copyError: t.copyError,
          shareError: t.shareError,
        }}
      />
    </section>
  );
}
