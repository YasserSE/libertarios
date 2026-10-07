"use client";

import type { AnswerValue, Answers, Dataset, Party } from "@/data/afinidad/types";
import { getStance, type Surprise as SurpriseData } from "@/lib/afinidad/score";
import { answerLabel, measureLabel, pct, surpriseSentence, topicLabel, type ResultStrings } from "@/i18n/afinidad/result";
import { HemerotecaQuote } from "./HemerotecaQuote";
import { PartyAvatar } from "./PartyBadge";
import { ProgrammeSource, RecordSource, questionText } from "./SourcePopover";
import { Disclosure } from "./ui";

/**
 * «Tu sorpresa»: un partido de fuera de tu bloque con el que coincides más que
 * con el de referencia.
 *
 * Con alcance (petición del dueño): si sale de UNA pregunta se nombra la
 * medida («En "impuesto a patrimonios >10 M€"…») y se pone al lado la
 * coincidencia en el tema entero, que puede ir en sentido contrario; solo se
 * habla del tema cuando el partido gana en varias preguntas del tema y en la
 * media (`surprise().scope`).
 *
 * A la vista: la frase y, si hay datos del tema, dos barras con las dos
 * coincidencias. Plegado («Ver por qué»): la pregunta, tu respuesta, la cita y
 * las fuentes de programa y voto, para que cualquiera pueda comprobarla.
 */
export function Surprise({
  data,
  dataset,
  answers,
  partyBy,
  t,
  lang,
}: {
  data: SurpriseData;
  dataset: Dataset;
  answers: Answers;
  partyBy: Map<string, Party>;
  t: ResultStrings;
  lang: string;
}) {
  const party = partyBy.get(data.partyId);
  const ref = partyBy.get(data.referencePartyId);
  const question = dataset.questions.find((q) => q.id === data.questionId);
  if (!party || !ref || !question) return null;
  const stance = getStance(dataset, party.id, question.id);
  const answer = answers[question.id] as AnswerValue | undefined;
  const quotes = (dataset.quotes ?? []).filter((q) => q.partyId === party.id && q.questionId === question.id);
  const sentence = surpriseSentence(t, data, { party: party.name, ref: ref.name, label: measureLabel(question, lang) });
  const { party: tp, reference: tr } = data.topicAgreement;

  return (
    <div className="space-y-3" data-testid="surprise" data-scope={data.scope}>
      <div className="flex items-start gap-3">
        <PartyAvatar party={party} size={40} />
        <div className="min-w-0">
          <p className="font-display text-base font-semibold leading-snug text-foreground">{sentence.main}</p>
          {sentence.context && <p className="mt-1 text-xs text-muted-foreground">{sentence.context}</p>}
        </div>
      </div>

      {/* El tema en dos barras: la medida puede ir a favor y el tema en contra. */}
      {tp !== null && tr !== null && (
        <div className="space-y-1.5 rounded-xl bg-muted/50 p-3" aria-hidden>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{topicLabel(t, data.topic)}</p>
          {[
            { p: party, v: tp },
            { p: ref, v: tr },
          ].map(({ p, v }) => (
            <div key={p.id} className="flex items-center gap-2">
              <PartyAvatar party={p} size={18} />
              <span className="w-12 shrink-0 truncate text-xs text-foreground">{p.short}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${Math.round(v * 100)}%` }} />
              </span>
              <span className="w-10 text-right text-xs font-semibold tabular-nums text-foreground">{pct(v)}</span>
            </div>
          ))}
        </div>
      )}

      <Disclosure summary={t.seeWhy}>
        <div className="space-y-3">
          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            <p className="text-foreground">{questionText(question, lang)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t.you}:{" "}
              <span className="font-medium text-foreground">{answer ? answerLabel(t, answer.value) : t.skipped}</span>
              {" · "}
              {party.short} {pct(data.agreement)} · {ref.short} {pct(data.referenceAgreement)}
            </p>
          </div>
          {quotes.map((q, i) => (
            <HemerotecaQuote key={i} quote={q} party={party} t={t} lang={lang} />
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.promised}</p>
              <ProgrammeSource stance={stance?.programme} t={t} showPosition />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.voted}</p>
              <RecordSource stance={stance?.record} t={t} lang={lang} showPosition />
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
