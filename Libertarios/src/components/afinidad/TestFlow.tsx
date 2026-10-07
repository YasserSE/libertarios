"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  USER_POSITIONS,
  type AnswerContext,
  type Party,
  type Question,
} from "@/data/afinidad/types";
import { getFlowStrings, resolveAfinidadLang } from "@/i18n/afinidad/flow";
import { encodeResultParams } from "@/lib/afinidad/encode";
import { MIN_ANSWERS } from "@/lib/afinidad/score";
import { hiddenCount, visibleParties } from "@/lib/afinidad/select";
import { track } from "@/lib/afinidad/track";
import {
  countAnswered,
  readAfinidad,
  storeAfinidad,
  toAnswers,
  type FlowValue,
} from "@/lib/afinidad/storage";
import { ContextStep, type ContextOption } from "./ContextStep";
import { QuestionCard } from "./QuestionCard";
import { ReviewList } from "./ReviewList";
import { PartyAvatar } from "./PartyBadge";

type Stage = "region" | "vote" | "answering" | "review";

/** Pausa antes de avanzar solo: lo justo para ver la selección marcada. */
export const AUTOADVANCE_MS = 180;

/** Parámetro del enlace de resultado con el consentimiento para el agregado. */
export const PARAM_CONTRIBUTE = "aporta";

/** Códigos INE de comunidad y ciudad autónoma, en su orden oficial. */
const REGION_CODES = Array.from({ length: 19 }, (_, i) => String(i + 1).padStart(2, "0"));

export interface TestFlowProps {
  questions: Question[];
  parties: Party[];
  /** Versión del dataset, que viaja en el enlace (`v=`). */
  version: string;
  /** Segmento `[locale]` tal cual; el idioma del módulo se resuelve aquí. */
  locale: string;
}

/**
 * El test completo: contexto opcional → afirmaciones → revisión → resultado.
 *
 * Recibe solo preguntas y partidos, no el dataset entero: las posiciones de
 * los partidos no hacen falta para preguntar, y mandarlas al navegador aquí
 * sería peso muerto (las usa la página de resultado).
 *
 * El resultado no se calcula aquí: se navega a `resultado?<parámetros>` con
 * las respuestas codificadas por `encode.ts`. Así el enlace que se comparte y
 * el que ve quien acaba de responder son el mismo, y no hay dos caminos de
 * cálculo que puedan divergir.
 */
export function TestFlow({ questions: rawQuestions, parties, version, locale }: TestFlowProps) {
  const lang = resolveAfinidadLang(locale);
  const strings = getFlowStrings(locale);
  const router = useRouter();

  const questions = useMemo(() => [...rawQuestions].sort((a, b) => a.order - b.order), [rawQuestions]);
  const total = questions.length;
  const minAnswers = Math.min(MIN_ANSWERS, total);
  const hasParties = parties.length > 0;

  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState<Stage>("region");
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Record<string, FlowValue>>({});
  const [important, setImportant] = useState<string[]>([]);
  const [context, setContext] = useState<AnswerContext>({});
  const [contextDone, setContextDone] = useState(false);
  const [showAllParties, setShowAllParties] = useState(false);
  /*
   * Consentimiento para el agregado anónimo. No se guarda en el navegador ni
   * se presupone de una visita anterior: se pide cada vez, desmarcado.
   */
  const [contribute, setContribute] = useState(false);

  const importantSet = useMemo(() => new Set(important), [important]);
  const visited = Object.keys(values).length;
  const answered = countAnswered(values);

  /*
   * Retomar donde se dejó. Se lee en un efecto, no al construir el estado:
   * `localStorage` no existe en el servidor y leerlo en el render daría un HTML
   * distinto al del cliente. Hasta entonces no se pinta el test, para que quien
   * vuelve no vea un instante el primer paso y luego un salto a la pregunta 9.
   */
  useEffect(() => {
    const stored = readAfinidad(rawQuestions.map((q) => q.id));
    if (stored && !stored.completed) {
      setValues(stored.values);
      setImportant(stored.important);
      setContext(stored.context);
      setContextDone(stored.contextDone);
      if (stored.contextDone) {
        const firstOpen = questions.findIndex((q) => stored.values[q.id] === undefined);
        if (firstOpen === -1 && questions.length > 0) {
          setStage("review");
        } else {
          setIndex(Math.max(0, firstOpen));
          setStage("answering");
        }
      }
    } else if (stored) {
      // Repetir el test: respuestas en blanco, pero el contexto ya declarado
      // queda preseleccionado (se puede cambiar o quitar en el mismo paso).
      setContext(stored.context);
    }
    // Empezar cuenta solo un test nuevo, no retomar uno a medias: así
    // «terminados / empezados» es una tasa de finalización de verdad.
    if (!stored || stored.completed) track("afinidad_start");
    setHydrated(true);
    // Solo al montar: después manda el estado, no lo guardado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Guardar en cada cambio, para que cerrar la pestaña no cueste el progreso.
  useEffect(() => {
    if (!hydrated) return;
    storeAfinidad({ version, values, important, context, contextDone, completed: false });
  }, [hydrated, version, values, important, context, contextDone]);

  /*
   * El foco va al enunciado en cada cambio de pregunta o de fase. Los botones
   * de respuesta son los mismos nodos para todas las preguntas: sin esto, el
   * foco se quedaba en «En contra» de la siguiente y un lector de pantalla no
   * leía el enunciado nuevo.
   */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusedOnce = useRef(false);
  useEffect(() => {
    if (!hydrated) return;
    // Al cargar no se roba el foco ni se hace scroll: la persona aún no ha
    // interactuado. A partir del primer cambio, sí.
    if (!focusedOnce.current) {
      focusedOnce.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: false });
  }, [hydrated, stage, index]);

  /*
   * Avance automático. Cancelar el pendiente no es opcional: cambiar de
   * respuesta o teclear rápido programaba un segundo avance y se saltaba una
   * pregunta sin responder (bug ya visto en el cuadrante).
   */
  const timer = useRef<number | null>(null);
  const schedule = useCallback((fn: () => void) => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      timer.current = null;
      fn();
    }, AUTOADVANCE_MS);
  }, []);
  const cancelScheduled = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);
  useEffect(() => cancelScheduled, [cancelScheduled]);

  const goToQuestions = useCallback(() => {
    cancelScheduled();
    setContextDone(true);
    setStage("answering");
  }, [cancelScheduled]);

  const afterRegion = useCallback(() => {
    if (hasParties) setStage("vote");
    else goToQuestions();
  }, [hasParties, goToQuestions]);

  const current = questions[index];

  const answer = useCallback(
    (v: FlowValue) => {
      if (!current) return;
      setValues((prev) => ({ ...prev, [current.id]: v }));
      schedule(() => {
        setIndex((i) => {
          if (i < total - 1) return i + 1;
          setStage("review");
          return i;
        });
      });
    },
    [current, schedule, total],
  );

  const toggleImportant = useCallback((id: string) => {
    setImportant((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const goPrev = useCallback(() => {
    cancelScheduled();
    setIndex((i) => Math.max(0, i - 1));
  }, [cancelScheduled]);
  const goNext = useCallback(() => {
    cancelScheduled();
    setIndex((i) => {
      if (i < total - 1) return i + 1;
      setStage("review");
      return i;
    });
  }, [cancelScheduled, total]);
  const goReview = useCallback(() => {
    cancelScheduled();
    setStage("review");
  }, [cancelScheduled]);
  const restart = useCallback(() => {
    cancelScheduled();
    setValues({});
    setImportant([]);
    setIndex(0);
    setStage("answering");
  }, [cancelScheduled]);

  // Teclado: 1–4 responden, 5 = «No sé», I = «Esto me importa», flechas.
  useEffect(() => {
    if (!hydrated || stage !== "answering" || !current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= USER_POSITIONS.length) {
        e.preventDefault();
        answer(USER_POSITIONS[n - 1]);
      } else if (e.key === "5") {
        e.preventDefault();
        answer("skip");
      } else if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        toggleImportant(current.id);
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hydrated, stage, current, answer, toggleImportant, goNext, goPrev]);

  const submit = () => {
    cancelScheduled();
    const answers = toAnswers(values, important);
    const params = encodeResultParams({ answers, context }, questions, version);
    // `aporta=1` solo con la casilla marcada: la página de resultado graba la
    // respuesta anónima únicamente si lo ve. Al compartir el enlace este
    // parámetro debe quitarse (lo hace la página de resultado), o cada persona
    // que lo abriera contaría como una respuesta más.
    if (contribute) params.set(PARAM_CONTRIBUTE, "1");
    storeAfinidad({ version, values, important, context, contextDone: true, completed: true });
    router.push(`/${locale}/a-quien-votar/resultado?${params.toString()}`);
  };

  // ─── Sin preguntas: estado honesto, nunca preguntas de relleno ───────────
  if (total === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card sm:p-8">
        <h2 className="text-xl font-semibold text-foreground">{strings.empty.title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {strings.empty.body}
        </p>
        <Button asChild variant="outline" className="mt-5 min-h-11">
          <NextLink href={`/${locale}/a-quien-votar`}>{strings.empty.back}</NextLink>
        </Button>
      </div>
    );
  }

  if (!hydrated) {
    return <div className="min-h-[28rem] rounded-2xl border border-border bg-card" aria-busy="true" />;
  }

  const contextSteps = hasParties ? 2 : 1;

  if (stage === "region") {
    const options: ContextOption[] = REGION_CODES.map((code) => ({
      value: code,
      label: strings.regions[code] ?? code,
    }));
    return (
      <ContextStep
        stepLabel={strings.context.step(1, contextSteps)}
        optionalLabel={strings.context.optional}
        title={strings.context.regionTitle}
        help={strings.context.regionHelp}
        options={options}
        selected={context.region}
        preferNotLabel={strings.context.preferNot}
        onSelect={(region) => {
          // Se cuenta QUE se declaró la comunidad, nunca cuál.
          if (context.region === undefined) track("afinidad_context_declared", { step: "region" });
          setContext((c) => ({ ...c, region }));
          schedule(afterRegion);
        }}
        onPreferNot={() => {
          setContext((c) => ({ ...c, region: undefined }));
          schedule(afterRegion);
        }}
        backLabel={strings.context.back}
        nextLabel={hasParties ? strings.question.next : strings.context.toQuestions}
        onNext={() => {
          cancelScheduled();
          afterRegion();
        }}
        headingRef={headingRef}
      />
    );
  }

  if (stage === "vote") {
    // Orden alfabético: cualquier otro (escaños, encuestas) sería ya una
    // jerarquía entre partidos, y aquí solo se pregunta.
    const include = context.usualVote ? [context.usualVote] : [];
    const list = visibleParties(parties, context.region, { showAll: showAllParties, include }).sort((a, b) =>
      a.name.localeCompare(b.name, lang),
    );
    const hidden = showAllParties ? 0 : hiddenCount(parties, context.region, { include });
    const options: ContextOption[] = [
      ...list.map((p) => ({
        value: p.id,
        label: p.name,
        avatar: <PartyAvatar party={p} size={24} />,
        detail:
          [p.short !== p.name ? p.short : null, p.status === "por-confirmar" ? strings.context.pendingCoalition : null]
            .filter(Boolean)
            .join(" · ") || undefined,
      })),
      { value: "__otro", label: strings.context.otherVote },
    ];
    return (
      <ContextStep
        stepLabel={strings.context.step(2, contextSteps)}
        optionalLabel={strings.context.optional}
        title={strings.context.voteTitle}
        help={strings.context.voteHelp}
        options={options}
        selected={context.usualVote}
        preferNotLabel={strings.context.preferNot}
        onSelect={(id) => {
          // «Otro, en blanco o no voto» no es un partido del dataset: no se
          // guarda nada, igual que «prefiero no decirlo».
          // Se cuenta QUE se declaró un voto habitual, nunca cuál.
          if (id !== "__otro" && context.usualVote === undefined) {
            track("afinidad_context_declared", { step: "vote" });
          }
          setContext((c) => ({ ...c, usualVote: id === "__otro" ? undefined : id }));
          schedule(goToQuestions);
        }}
        onPreferNot={() => {
          setContext((c) => ({ ...c, usualVote: undefined }));
          schedule(goToQuestions);
        }}
        onBack={() => {
          cancelScheduled();
          setStage("region");
        }}
        backLabel={strings.context.back}
        nextLabel={strings.context.toQuestions}
        onNext={goToQuestions}
        headingRef={headingRef}
        extra={
          hidden > 0 ? (
            <Button
              variant="ghost"
              className="mt-3 min-h-11"
              onClick={() => setShowAllParties(true)}
            >
              {strings.context.showAll(hidden)}
            </Button>
          ) : null
        }
      />
    );
  }

  if (stage === "review") {
    return (
      <ReviewList
        questions={questions}
        lang={lang}
        strings={strings}
        values={values}
        important={importantSet}
        answered={answered}
        minAnswers={minAnswers}
        headingRef={headingRef}
        onEdit={(i) => {
          setIndex(i);
          setStage("answering");
        }}
        onToggleImportant={toggleImportant}
        contribute={contribute}
        onContributeChange={setContribute}
        onSubmit={submit}
        onRestart={restart}
      />
    );
  }

  return (
    <QuestionCard
      question={current}
      lang={lang}
      strings={strings}
      index={index}
      total={total}
      visited={visited}
      value={values[current.id]}
      important={importantSet.has(current.id)}
      headingRef={headingRef}
      onAnswer={answer}
      onToggleImportant={() => toggleImportant(current.id)}
      onPrev={goPrev}
      onNext={goNext}
      onReview={goReview}
      onRestart={restart}
    />
  );
}
