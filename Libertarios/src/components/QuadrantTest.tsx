"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ListChecks, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  answerOptions,
  quadrantQuestions,
  scoreQuadrant,
} from "@/data/quadrantQuestions";

interface QuadrantTestProps {
  onComplete: (economic: number, social: number) => void;
}

type Stage = "answering" | "review";

const TOTAL = quadrantQuestions.length;

export function QuadrantTest({ onComplete }: QuadrantTestProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [stage, setStage] = useState<Stage>("answering");

  const question = quadrantQuestions[index];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / TOTAL) * 100;
  const currentAnswer = answers[question?.id];

  const goNext = useCallback(() => {
    setIndex((i) => (i < TOTAL - 1 ? i + 1 : i));
    if (index === TOTAL - 1) setStage("review");
  }, [index]);

  const advanceTimer = useRef<number | null>(null);

  const answer = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [question.id]: value }));

      // Avanzar solo, con una pausa corta para que se vea la selección: veinte
      // preguntas con un clic extra cada una son veinte clics de fricción.
      //
      // Cancelar el avance pendiente no es opcional. Cambiar de respuesta —o
      // teclear rápido, que con las teclas 1-5 es lo normal— programaba un
      // segundo avance, y los dos temporizadores saltaban dos preguntas
      // dejando una sin responder por el camino.
      if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
      advanceTimer.current = window.setTimeout(() => {
        advanceTimer.current = null;
        setIndex((i) => {
          if (i < TOTAL - 1) return i + 1;
          setStage("review");
          return i;
        });
      }, 180);
    },
    [question],
  );

  useEffect(
    () => () => {
      if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    },
    [],
  );

  // Responder con las teclas 1–5 y navegar con las flechas.
  useEffect(() => {
    if (stage !== "answering") return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= answerOptions.length) {
        e.preventDefault();
        answer(answerOptions[n - 1].value);
        return;
      }
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, TOTAL - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, answer]);

  const score = useMemo(() => scoreQuadrant(answers), [answers]);
  const unanswered = useMemo(
    () => quadrantQuestions.filter((q) => answers[q.id] === undefined),
    [answers],
  );

  const reset = () => {
    setAnswers({});
    setIndex(0);
    setStage("answering");
  };

  if (stage === "review") {
    return (
      <ReviewStage
        answers={answers}
        unanswered={unanswered}
        onEdit={(id) => {
          setIndex(quadrantQuestions.findIndex((q) => q.id === id));
          setStage("answering");
        }}
        onReset={reset}
        onSubmit={() => onComplete(score.economic, score.social)}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="font-medium text-foreground">
            Pregunta {index + 1} <span className="text-muted-foreground">de {TOTAL}</span>
          </span>
          <span className="tabular-nums text-muted-foreground">{answeredCount} respondidas</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
        {question.topic}
      </p>
      <h3 className="mb-7 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
        {question.text}
      </h3>

      <div role="radiogroup" aria-label="Tu respuesta" className="space-y-2">
        {answerOptions.map((option, i) => {
          const selected = currentAnswer === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => answer(option.value)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[11px] font-semibold tabular-nums ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {selected ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Puedes responder con las teclas <kbd className="rounded border border-border px-1">1</kbd>–
        <kbd className="rounded border border-border px-1">5</kbd> y moverte con las flechas.
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={reset} disabled={answeredCount === 0}>
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </Button>
          {/* En la última pregunta hay que poder llegar a la revisión aunque
              queden huecos: si no, saltarse una pregunta y avanzar hasta el
              final dejaba al usuario sin salida. */}
          {answeredCount === TOTAL || index === TOTAL - 1 ? (
            <Button variant="cta" size="sm" onClick={() => setStage("review")}>
              Revisar respuestas
              <ListChecks className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={goNext}
              disabled={index === TOTAL - 1}
            >
              Saltar
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Revisión antes del resultado.
 *
 * Aquí es donde aparece qué medía cada pregunta. Mostrarlo entre pregunta y
 * pregunta —como hacía la versión anterior— convierte el test en un argumento:
 * el usuario aprende qué respuesta «toca» y las siguientes dejan de medir nada.
 */
function ReviewStage({
  answers,
  unanswered,
  onEdit,
  onReset,
  onSubmit,
}: {
  answers: Record<number, number>;
  unanswered: typeof quadrantQuestions;
  onEdit: (id: number) => void;
  onReset: () => void;
  onSubmit: () => void;
}) {
  const label = (value: number | undefined) =>
    answerOptions.find((o) => o.value === value)?.label ?? "Sin responder";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
        Revisa tus respuestas
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Ahora sí: debajo de cada respuesta puedes ver qué medía la pregunta. Toca cualquiera para
        cambiarla antes de ver tu posición.
      </p>

      {unanswered.length > 0 && (
        <p className="mt-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
          Te quedan <strong>{unanswered.length}</strong> sin responder. Puedes verlo así — el
          cálculo solo usa lo que has contestado — pero con menos respuestas la posición es menos
          fiable.
        </p>
      )}

      <ol className="mt-6 space-y-2">
        {quadrantQuestions.map((q, i) => {
          const value = answers[q.id];
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onEdit(q.id)}
                className="w-full rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {i + 1}. {q.topic}
                  </span>
                  <span
                    className={`shrink-0 text-xs font-semibold ${
                      value === undefined ? "text-muted-foreground" : "text-primary"
                    }`}
                  >
                    {label(value)}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium leading-snug text-foreground">{q.text}</p>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{q.rationale}</p>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          Empezar de nuevo
        </Button>
        <Button variant="cta" onClick={onSubmit}>
          Ver mi posición
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
