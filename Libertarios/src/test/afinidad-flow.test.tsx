import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { decodeResultParams } from "@/lib/afinidad/encode";
import {
  STORAGE_KEY,
  countAnswered,
  forgetAfinidad,
  readAfinidad,
  storeAfinidad,
  toAnswers,
} from "@/lib/afinidad/storage";
import { getFlowStrings, resolveAfinidadLang, flowStrings } from "@/i18n/afinidad/flow";
import { AUTOADVANCE_MS, PARAM_CONTRIBUTE, TestFlow } from "@/components/afinidad/TestFlow";
import { sampleDataset as ds } from "./fixtures/afinidad-sample";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/es/a-quien-votar/test",
}));

const ids = ds.questions.map((q) => q.id);
const es = flowStrings.es;

/**
 * Memoria del test en el navegador. Lo guardado puede venir de otra versión
 * del cuestionario, de otra pestaña o de alguien tocando la consola: nada de
 * eso debe romper el test ni colarse en el enlace del resultado.
 */
describe("afinidad: almacenamiento local", () => {
  beforeEach(() => window.localStorage.clear());

  it("guarda y recupera el progreso", () => {
    storeAfinidad({
      version: ds.version,
      values: { q1: 2, q2: "skip" },
      important: ["q1"],
      context: { region: "09", usualVote: "partido-a" },
      contextDone: true,
      completed: false,
    });
    expect(readAfinidad(ids)).toMatchObject({
      values: { q1: 2, q2: "skip" },
      important: ["q1"],
      context: { region: "09", usualVote: "partido-a" },
      contextDone: true,
      completed: false,
    });
  });

  it("descarta valores fuera de escala, preguntas que ya no existen y contexto inválido", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: "x",
        values: { q1: 0, q2: 3, q3: -1, borrada: 2 },
        important: ["q3", "borrada", 7],
        context: { region: "99", usualVote: "<script>" },
      }),
    );
    const s = readAfinidad(ids)!;
    // 0 no existe en la escala de la persona (sin punto medio).
    expect(s.values).toEqual({ q3: -1 });
    expect(s.important).toEqual(["q3"]);
    expect(s.context).toEqual({});
    expect(s.completed).toBe(false);
  });

  it("JSON roto o almacenamiento bloqueado no rompen nada", () => {
    window.localStorage.setItem(STORAGE_KEY, "{no es json");
    expect(readAfinidad(ids)).toBeNull();

    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    const setSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceeded");
    });
    expect(readAfinidad(ids)).toBeNull();
    expect(() =>
      storeAfinidad({ version: "v", values: {}, important: [], context: {}, contextDone: false, completed: false }),
    ).not.toThrow();
    expect(() => forgetAfinidad()).not.toThrow();
    spy.mockRestore();
    setSpy.mockRestore();
  });

  it("«No sé» no cuenta como respondida ni pesa aunque se marcara importante", () => {
    const values = { q1: 2, q2: "skip", q3: -1 } as const;
    expect(countAnswered(values)).toBe(2);
    expect(toAnswers(values, ["q2", "q3"])).toEqual({
      q1: { value: 2, important: false },
      q2: "skip",
      q3: { value: -1, important: true },
    });
  });
});

describe("afinidad: textos", () => {
  it("un idioma desconocido cae al castellano", () => {
    expect(resolveAfinidadLang("de")).toBe("es");
    expect(resolveAfinidadLang(undefined)).toBe("es");
    expect(resolveAfinidadLang("eu")).toBe("eu");
    expect(getFlowStrings("pt")).toBe(flowStrings.es);
  });

  it("los cuatro idiomas tienen las 19 comunidades", () => {
    for (const s of Object.values(flowStrings)) expect(Object.keys(s.regions)).toHaveLength(19);
  });
});

describe("afinidad: flujo del test", () => {
  beforeEach(() => {
    window.localStorage.clear();
    push.mockReset();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const tick = () => act(() => vi.advanceTimersByTime(AUTOADVANCE_MS + 20));
  const key = (k: string) => fireEvent.keyDown(window, { key: k });
  const renderFlow = () =>
    render(<TestFlow questions={ds.questions} parties={ds.parties} version={ds.version} locale="es" />);

  it("sin preguntas enseña «en preparación», nunca preguntas de relleno", () => {
    render(<TestFlow questions={[]} parties={[]} version="v" locale="es" />);
    expect(screen.getByText(es.empty.title)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /a favor/i })).toBeNull();
  });

  it("contexto saltable, teclado, importancia, revisión y enlace de resultado", () => {
    renderFlow();

    // Paso 1: comunidad. Se elige Cataluña (09), donde se presenta el partido regional.
    expect(screen.getByRole("heading", { name: es.context.regionTitle })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: es.regions["09"] }));
    tick();

    // Paso 2: voto habitual, con el regional visible porque coincide la comunidad.
    expect(screen.getByRole("heading", { name: es.context.voteTitle })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Partido C/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: es.context.preferNot }));
    tick();

    // Afirmación 1: «Esto me importa» con I y «Muy a favor» con 4.
    expect(screen.getByRole("heading", { name: /Afirmación de prueba 1/ })).toBeInTheDocument();
    key("i");
    expect(screen.getByRole("button", { name: new RegExp(es.question.important) })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    key("4");
    tick();
    // 2: «En contra» (2); 3: «No sé» (5); 4: «Muy en contra» (1); 5: «A favor» (3).
    key("2");
    tick();
    key("5");
    tick();
    key("1");
    tick();
    key("3");
    tick();

    // Revisión: con una «No sé», el fixture (5 preguntas) exige las 5 → bloqueado.
    expect(screen.getByRole("heading", { name: es.review.title })).toBeInTheDocument();
    const submit = screen.getByRole("button", { name: es.review.submit });
    expect(submit).toBeDisabled();
    expect(screen.getByText(es.review.notEnough(5, 1))).toBeInTheDocument();

    // Volver a la 3 desde la revisión y responder.
    fireEvent.click(screen.getByRole("button", { name: /Cambiar: 3\./ }));
    expect(screen.getByRole("heading", { name: /Afirmación de prueba 3/ })).toBeInTheDocument();
    key("3");
    tick();
    // Tras la última respuesta de la lista sigue el avance normal: va a la 4.
    fireEvent.click(screen.getByRole("button", { name: es.question.toReview }));
    expect(screen.getByRole("button", { name: es.review.submit })).toBeEnabled();
    // La aportación anónima es opt-in: desmarcada por defecto.
    const optIn = screen.getByRole("checkbox", { name: es.review.contribute.label });
    expect(optIn).not.toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: es.review.submit }));

    const href: string = push.mock.calls[0][0];
    expect(href.startsWith("/es/a-quien-votar/resultado?")).toBe(true);
    const decoded = decodeResultParams(new URLSearchParams(href.split("?")[1]), ds.questions, {
      currentVersion: ds.version,
    })!;
    expect(decoded.stale).toBe(false);
    expect(decoded.context).toEqual({ region: "09" });
    expect(decoded.answers).toEqual({
      q1: { value: 2, important: true },
      q2: { value: -1, important: false },
      q3: { value: 1, important: false },
      q4: { value: -2, important: false },
      q5: { value: 1, important: false },
    });

    // Sin la casilla marcada no viaja el consentimiento.
    expect(new URLSearchParams(href.split("?")[1]).has(PARAM_CONTRIBUTE)).toBe(false);

    // Con la casilla marcada, sí (`aporta=1`).
    fireEvent.click(optIn);
    fireEvent.click(screen.getByRole("button", { name: es.review.submit }));
    expect(new URLSearchParams(push.mock.calls[1][0].split("?")[1]).get(PARAM_CONTRIBUTE)).toBe("1");

    // Queda recordado como completado, para «ver mi último resultado».
    expect(readAfinidad(ids)?.completed).toBe(true);
  });

  it("sin comunidad, el regional queda tras «ver todos»", () => {
    renderFlow();
    fireEvent.click(screen.getByRole("button", { name: es.context.preferNot }));
    tick();
    expect(screen.queryByRole("button", { name: /Partido C/ })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: es.context.showAll(1) }));
    expect(screen.getByRole("button", { name: /Partido C/ })).toBeInTheDocument();
  });

  it("teclear rápido no se salta preguntas (un solo avance pendiente)", () => {
    storeAfinidad({ version: ds.version, values: {}, important: [], context: {}, contextDone: true, completed: false });
    renderFlow();
    key("1");
    key("2");
    tick();
    expect(screen.getByRole("heading", { name: /Afirmación de prueba 2/ })).toBeInTheDocument();
    expect(readAfinidad(ids)?.values).toEqual({ q1: -1 });
  });

  it("retoma donde se dejó", () => {
    storeAfinidad({
      version: ds.version,
      values: { q1: 2, q2: -1 },
      important: [],
      context: {},
      contextDone: true,
      completed: false,
    });
    renderFlow();
    expect(screen.getByRole("heading", { name: /Afirmación de prueba 3/ })).toBeInTheDocument();
    expect(screen.getByText(es.question.answered(2))).toBeInTheDocument();
  });
});
