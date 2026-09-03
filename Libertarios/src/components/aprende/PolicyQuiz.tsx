"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, Lightbulb, RotateCcw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { MeasureDiagram } from "@/components/medidas/MeasureDiagram";
import { MEASURES, STRENGTH_LABEL, type Measure } from "@/data/measures";

/**
 * El orden importa y no es el del archivo de datos.
 *
 * Empieza por el tope al alquiler, que es el caso que todo el mundo tiene en la
 * cabeza, y sigue por el control de precios, que es el mismo mecanismo con otra
 * cara: reconocer la forma repetida es media lección.
 *
 * El salario mínimo va en el cuarto puesto, justo en el centro, y es
 * deliberado. Es la única de las siete donde quien se equivoca es nuestro
 * propio bando, y si estuviera al final —donde ya casi nadie llega— esto sería
 * un embudo de propaganda con una coartada. En medio no se puede saltar.
 */
const ORDER = [
  "control-alquileres",
  "control-precios",
  "subvencion-demanda",
  "salario-minimo",
  "aranceles",
  "licencias",
  "subvenciones-cultura",
];

const LESSONS: Measure[] = ORDER.map((id) => MEASURES.find((m) => m.id === id)!).filter(Boolean);

/** Un texto largo se parte por líneas en blanco; un párrafo de doce líneas no lo lee nadie. */
function Prose({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph, i) => (
        <p key={i} className={`leading-relaxed text-muted-foreground ${i > 0 ? "mt-3" : ""} ${className}`}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

const STRENGTH_STYLE: Record<string, string> = {
  sólida: "border-primary/30 bg-primary/10 text-primary",
  media: "border-border bg-muted text-muted-foreground",
  discutida: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

export function PolicyQuiz() {
  const [step, setStep] = useState(0);
  /** Qué contestó el lector en cada pregunta. `null` = aún sin contestar. */
  const [answers, setAnswers] = useState<(number | null)[]>(() => LESSONS.map(() => null));
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const lesson = LESSONS[step];
  const answer = answers[step];
  const revealed = answer !== null;
  const right = answer === lesson?.quiz.correct;

  const choose = (index: number) => {
    if (revealed) return;
    setAnswers((prev) => prev.map((a, i) => (i === step ? index : a)));
  };

  /** Al cambiar de paso hay que volver arriba: la ficha anterior es larga. */
  const goTo = (next: number) => {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hits = answers.filter((a, i) => a !== null && a === LESSONS[i].quiz.correct).length;
  const answered = answers.filter((a) => a !== null).length;

  if (done) {
    return (
      <div ref={topRef} className="scroll-mt-24">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Check className="h-7 w-7 text-primary" />
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {hits} de {LESSONS.length}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            El resultado importa poco: no hay nada que ganar por acertar. Si algo se queda, que sea
            esto — casi todas estas medidas se proponen por buenas razones, y casi todas producen el
            efecto contrario al que buscan. No por maldad de nadie: porque cambian los incentivos de
            miles de personas que no salen en el debate.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Y una de las siete iba en la dirección contraria a propósito. Si el salario mínimo te
            pilló, ahí quien afirma de más es nuestro propio bando.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="cta" asChild>
              <Link href="/medidas">
                Las siete, con sus estudios
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setAnswers(LESSONS.map(() => null));
                setStep(0);
                setDone(false);
              }}
            >
              <RotateCcw className="mr-1.5 h-4 w-4" />
              Empezar de nuevo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            ¿Y tú dónde caes en los dos ejes?{" "}
            <Link href="/cuadrante" className="underline underline-offset-4 hover:text-foreground">
              Hacer el test ideológico
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Progreso */}
      <div className="mx-auto mb-6 max-w-3xl">
        <div className="mb-2 flex items-baseline justify-between text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">
            {lesson.area} · {step + 1} de {LESSONS.length}
          </span>
          <span className="tabular-nums">{answered} contestadas</span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={LESSONS.length}
          aria-label="Progreso"
        >
          <span
            className="block h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / LESSONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 lg:p-8">
        <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl">
          {lesson.quiz.question}
        </h2>

        {/* Opciones */}
        <div className="mt-6 space-y-3" role="radiogroup" aria-label={lesson.quiz.question}>
          {lesson.quiz.options.map((option, i) => {
            const chosen = answer === i;
            const isRight = i === lesson.quiz.correct;
            // Antes de contestar, todas iguales: marcar la buena de algún modo
            // —un orden, un color, un tamaño— convertiría esto en un formulario
            // con truco.
            const state = !revealed
              ? "border-border bg-background hover:border-primary/50 hover:bg-accent/50"
              : isRight
                ? "border-primary bg-primary/10"
                : chosen
                  ? "border-amber-500/40 bg-amber-500/[0.07]"
                  : "border-border bg-background opacity-60";

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={chosen}
                disabled={revealed}
                onClick={() => choose(i)}
                className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default ${state}`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                    revealed && isRight
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40 text-muted-foreground"
                  }`}
                >
                  {revealed && isRight ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + i)}
                </span>
                <span className="leading-relaxed text-foreground">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Respuesta */}
        {revealed && (
          <div className="mt-8 space-y-6 border-t border-border pt-7" aria-live="polite">
            <p className="font-display text-lg font-semibold text-foreground">
              {right
                ? "Eso es lo que muestran los datos."
                : "La evidencia apunta a la otra, y es la respuesta que da casi todo el mundo."}
            </p>

            {/*
              El lado humano va primero, siempre, y no por diplomacia: si el
              lector nota que se ridiculiza la intención de la medida, deja de
              leer y hace bien. La intención casi siempre es buena. Lo que falla
              es el resultado.
            */}
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Target className="h-3.5 w-3.5" />
                Por qué se propone, y por qué se entiende
              </p>
              <p className="leading-relaxed text-muted-foreground">{lesson.goal}</p>
            </div>

            <MeasureDiagram id={lesson.id} />

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Qué pasa en realidad
              </p>
              <Prose text={lesson.quiz.everyday} />
            </div>

            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                <Lightbulb className="h-3.5 w-3.5" />
                La lección
              </p>
              <Prose text={lesson.quiz.lesson} />
            </div>

            {/* Cada afirmación con su fuerza y su fuente. Sin esto sería un
                panfleto con dibujos. */}
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  De dónde sale
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    STRENGTH_STYLE[lesson.strength]
                  }`}
                >
                  {STRENGTH_LABEL[lesson.strength]}
                </span>
              </div>
              <ul className="space-y-2">
                {lesson.cases.map((c) => (
                  <li key={c.place} className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="font-medium text-foreground">{c.place}.</strong> {c.finding}{" "}
                    <span className="italic">{c.source}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <strong className="font-medium text-foreground">Dónde no vale simplificar.</strong>{" "}
                {lesson.disputed}
              </p>
              <Link
                href={`/medidas#${lesson.id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Ver la ficha completa
              </Link>
            </div>
          </div>
        )}

        {/* Navegación */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Anterior
          </Button>

          {revealed ? (
            <Button
              variant="cta"
              onClick={() => (step === LESSONS.length - 1 ? setDone(true) : goTo(step + 1))}
            >
              {step === LESSONS.length - 1 ? "Ver el resumen" : "Siguiente"}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          ) : (
            <span className="text-sm text-muted-foreground">Elige una para ver la respuesta</span>
          )}
        </div>
      </div>
    </div>
  );
}
