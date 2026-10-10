import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import type { Answers, Dataset, Stance } from "@/data/afinidad/types";
import type { DecodedResult } from "@/lib/afinidad/encode";
import { sampleDataset } from "./fixtures/afinidad-sample";

// La página vive fuera del router de Next en los tests: basta con una ruta.
let currentParams = new URLSearchParams();
vi.mock("next/navigation", () => ({
  usePathname: () => "/es/a-quien-votar/resultado",
  useSearchParams: () => currentParams,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));
// Las server actions escriben en Supabase; aquí no se llama a ninguna.
vi.mock("@/app/[locale]/a-quien-votar/actions", () => ({
  recordAfinidadResponse: vi.fn(async () => undefined),
}));
vi.mock("@/app/[locale]/novedades/actions", () => ({
  subscribeNewsletter: vi.fn(async () => ({ ok: true })),
  confirmNewsletter: vi.fn(),
  unsubscribeNewsletter: vi.fn(),
}));

import { ResultFromUrl, ResultView } from "@/components/afinidad/ResultView";
import { recordAfinidadResponse } from "@/app/[locale]/a-quien-votar/actions";
import { dataset } from "@/data/afinidad";
import { encodeResultParams } from "@/lib/afinidad/encode";
import { QuadrantResults } from "@/components/QuadrantResults";
import { OtherTestsRow } from "@/components/afinidad/KeepExploring";
import { TRACK_EVENT } from "@/lib/afinidad/track";

/**
 * La página de resultado con el dataset SINTÉTICO del fixture.
 *
 * Lo que se fija aquí son las reglas de honestidad de la interfaz, no el
 * cálculo (eso lo prueba `afinidad-score.test.ts`): un hueco nunca se pinta
 * como 0, un empate se enseña como empate, una coalición sin registrar lo dice
 * y un enlace roto no inventa un resultado.
 */

/** Votante que coincide con el programa del Partido A (q5: A no tiene posición). */
const answersA: Answers = {
  q1: { value: 2, important: false },
  q2: { value: -1, important: false },
  q3: { value: 1, important: true },
  q4: { value: -2, important: false },
  q5: { value: -1, important: false },
};

const decoded = (answers: Answers, context: DecodedResult["context"] = {}, stale = false): DecodedResult => ({
  answers,
  context,
  version: sampleDataset.version,
  stale,
});

const view = (ds: Dataset, d: DecodedResult | null) =>
  render(<ResultView dataset={ds} decoded={d} lang="es" origin="https://example.org" />);

const row = (partyId: string) => {
  const el = document.querySelector(`li[data-party="${partyId}"]`);
  if (!el) throw new Error(`sin fila para ${partyId}`);
  return el as HTMLElement;
};

/** Copia del fixture con celdas sustituidas. */
function withStances(map: (s: Stance) => Stance, extra: Partial<Dataset> = {}): Dataset {
  return { ...sampleDataset, stances: sampleDataset.stances.map(map), ...extra };
}

describe("página de resultado de afinidad", () => {
  it("el titular da programa y votos como dos cifras separadas", () => {
    view(sampleDataset, decoded(answersA));
    const headline = screen.getByTestId("headline");
    expect(within(headline).getByText("Partido A")).toBeInTheDocument();
    expect(within(headline).getByText("programa")).toBeInTheDocument();
    expect(within(headline).getByText("votos en el Congreso")).toBeInTheDocument();
    // Programa 2023 con aviso de que se actualizará.
    expect(within(headline).getByText(/programa 2023 — se actualizará con el de 2026/)).toBeInTheDocument();
  });

  it("comparte el enlace del resultado, no el test en blanco", () => {
    view(sampleDataset, decoded(answersA));
    const preview = screen.getByTestId("share-preview");
    expect(preview.textContent).toMatch(/Partido A/);
    expect(screen.getByLabelText("Compartir sin decir mi partido")).not.toBeChecked();
  });

  it("datos insuficientes: fila atenuada y sin porcentaje, nunca 0", () => {
    // Partido B sin datos verificados en q1–q2 en ambas lentes → 3 de 5, por debajo del mínimo.
    const ds = withStances((s) =>
      s.partyId === "partido-b" && (s.questionId === "q1" || s.questionId === "q2")
        ? {
            ...s,
            programme: s.programme && { ...s.programme, status: "pendiente" },
            record: s.record && { ...s.record, status: "pendiente" },
          }
        : s,
    );
    view(ds, decoded(answersA));
    const b = row("partido-b");
    expect(b).toHaveAttribute("data-usable", "false");
    expect(b.className).toMatch(/opacity-60/);
    expect(within(b).getAllByText("datos insuficientes").length).toBeGreaterThan(0);
    expect(within(b).queryByText(/^0\s*%$/)).toBeNull();
  });

  it("cada barra dice en cuántas respuestas se basa, también con «datos insuficientes»", () => {
    view(sampleDataset, decoded(answersA));
    const a = row("partido-a");
    const based = within(a).getAllByTestId("based-on").map((x) => x.textContent);
    expect(based).toHaveLength(2);
    for (const b of based) expect(b).toMatch(/^basado en \d+ de 5 respuestas$/);
    // Y en el titular, bajo las dos cifras.
    expect(within(screen.getByTestId("headline")).getAllByTestId("based-on")).toHaveLength(2);
  });

  it("sin historial: «sin historial en el Congreso», nunca 0", () => {
    const ds = withStances((s) => (s.partyId === "partido-c" ? { ...s, record: null } : s));
    view(ds, decoded(answersA, { region: "09" }));
    const c = row("partido-c");
    expect(within(c).getByText("sin historial en el Congreso")).toBeInTheDocument();
    expect(within(c).queryByText(/^0\s*%$/)).toBeNull();
  });

  it("los empates se muestran como empates, también en el titular", () => {
    // Partido D: copia exacta de las posiciones de A.
    const clone = sampleDataset.stances
      .filter((s) => s.partyId === "partido-a")
      .map((s) => ({ ...s, partyId: "partido-d" }));
    const ds: Dataset = {
      ...sampleDataset,
      parties: [...sampleDataset.parties, { ...sampleDataset.parties[0], id: "partido-d", name: "Partido D", short: "PD", initials: "PD" }],
      stances: [...sampleDataset.stances, ...clone],
    };
    view(ds, decoded(answersA));
    expect(within(row("partido-a")).getByText("empate")).toBeInTheDocument();
    expect(within(row("partido-d")).getByText("empate")).toBeInTheDocument();
    const headline = screen.getByTestId("headline");
    expect(within(headline).getByText("Empate en primera posición")).toBeInTheDocument();
    expect(within(headline).getByText("Partido A")).toBeInTheDocument();
    expect(within(headline).getByText("Partido D")).toBeInTheDocument();
  });

  it("una coalición por confirmar lo dice, con su nota de historial", () => {
    view(sampleDataset, decoded(answersA, { region: "09" }));
    const c = row("partido-c");
    expect(within(c).getByText("coalición por confirmar")).toBeInTheDocument();
    expect(within(c).getByText(/Voto atribuido por diputado/)).toBeInTheDocument();
  });

  it("un partido regional no sale fuera de su comunidad salvo con «ver todos»", () => {
    view(sampleDataset, decoded(answersA));
    expect(document.querySelector('li[data-party="partido-c"]')).toBeNull();
    expect(screen.getByRole("button", { name: /Ver todos los partidos \(1 más\)/ })).toBeInTheDocument();
  });

  it("enlace inválido: mensaje claro y volver al test", () => {
    view(sampleDataset, null);
    expect(screen.getByText("Este enlace no contiene un resultado válido")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hacer el test" })).toHaveAttribute("href", "/es/a-quien-votar/test");
  });

  it("pocas respuestas: no da resultado", () => {
    view(sampleDataset, decoded({ q1: { value: 2, important: false }, q2: "skip" }));
    expect(screen.getByText("Has respondido 1 de 5 afirmaciones")).toBeInTheDocument();
    expect(screen.queryByTestId("headline")).toBeNull();
  });

  it("versión antigua: recalcula y lo avisa", () => {
    view(sampleDataset, decoded(answersA, {}, true));
    expect(screen.getByText(/El resultado se ha recalculado/)).toBeInTheDocument();
    expect(screen.getByTestId("headline")).toBeInTheDocument();
  });

  it("sin datos cargados no inventa nada", () => {
    view({ ...sampleDataset, questions: [], stances: [], parties: [] }, null);
    expect(screen.getByText(/aún no están cargados/)).toBeInTheDocument();
  });
});

describe("aportación anónima (`aporta=1`)", () => {
  const allAnswered = () =>
    encodeResultParams(
      { answers: Object.fromEntries(dataset.questions.map((q) => [q.id, { value: 1, important: false }])) as Answers },
      dataset.questions,
      dataset.version,
    );

  it("solo se guarda con consentimiento explícito, una vez, y se quita de la URL", () => {
    if (dataset.questions.length === 0) return; // sin datos reales aún no hay nada que guardar
    const params = allAnswered();
    params.set("aporta", "1");
    currentParams = params;
    window.history.replaceState(null, "", `/es/a-quien-votar/resultado?${params.toString()}`);
    const { rerender } = render(<ResultFromUrl lang="es" />);
    rerender(<ResultFromUrl lang="es" />);
    expect(recordAfinidadResponse).toHaveBeenCalledTimes(1);
    expect(vi.mocked(recordAfinidadResponse).mock.calls[0][0]).not.toMatch(/aporta/);
    expect(window.location.search).not.toMatch(/aporta/);
  });

  it("abrir un enlace compartido no guarda nada", () => {
    vi.mocked(recordAfinidadResponse).mockClear();
    currentParams = allAnswered();
    render(<ResultFromUrl lang="es" />);
    expect(recordAfinidadResponse).not.toHaveBeenCalled();
  });
});

describe("QuadrantResults tras extraer ShareButtons", () => {
  it("sigue pintando los botones de compartir", () => {
    render(<QuadrantResults economic={40} social={20} onReset={() => {}} />);
    expect(screen.getByText("Comparte tus resultados")).toBeInTheDocument();
    for (const name of ["Facebook", "WhatsApp", "Telegram", "Copiar enlace"]) {
      expect(screen.getByRole("button", { name: new RegExp(name) })).toBeInTheDocument();
    }
  });
});

/**
 * Enlaces con el resto de Libertarios.eu (plan, actualización §7). Lo que se
 * fija: el bloque va después del detalle y de compartir (nunca por encima del
 * ranking), dice quién hace el test, y desde gl/eu enlaza al castellano porque
 * el resto del sitio no existe en esas lenguas.
 */
describe("«Sigue explorando» al final del resultado", () => {
  const hrefs = (root: HTMLElement) =>
    Array.from(root.querySelectorAll("a")).map((a) => a.getAttribute("href"));

  const isAfter = (a: Element, b: Element) =>
    Boolean(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING);

  it("va después del ranking, del detalle por pregunta y de compartir", () => {
    view(sampleDataset, decoded(answersA));
    const explore = screen.getByTestId("keep-exploring");
    const ranking = screen.getByRole("heading", { name: "Todos los partidos" });
    const breakdown = screen.getByRole("heading", { name: "Pregunta a pregunta" });
    const share = screen.getByTestId("share-preview");
    expect(isAfter(explore, ranking)).toBe(true);
    expect(isAfter(explore, breakdown)).toBe(true);
    expect(isAfter(explore, share)).toBe(true);
    expect(within(explore).getByRole("heading", { name: "Otros tests de Libertarios.eu" })).toBeInTheDocument();
    expect(within(explore).getByText(/proyecto de Libertarios\.eu/)).toBeInTheDocument();
  });

  it("tres tarjetas en el idioma del sitio: es → /es", () => {
    view(sampleDataset, decoded(answersA));
    const explore = screen.getByTestId("keep-exploring");
    expect(hrefs(explore)).toEqual(["/es/cuadrante", "/es/aprende", "/es/medidas"]);
    expect(within(explore).getByText("Desafía tus creencias")).toBeInTheDocument();
    // En castellano no hace falta avisar del idioma.
    expect(within(explore).queryByText(/Estas páginas están en castellano/)).not.toBeInTheDocument();
  });

  it("catalán: el sitio existe en ca, se queda en /ca", () => {
    render(<ResultView dataset={sampleDataset} decoded={decoded(answersA)} lang="ca" origin="https://example.org" />);
    const explore = screen.getByTestId("keep-exploring");
    expect(hrefs(explore)).toEqual(["/ca/cuadrante", "/ca/aprende", "/ca/medidas"]);
    expect(within(explore).getByRole("heading", { name: "Altres tests de Libertarios.eu" })).toBeInTheDocument();
  });

  it("gallego y euskera caen a /es y lo avisan", () => {
    const { unmount } = render(
      <ResultView dataset={sampleDataset} decoded={decoded(answersA)} lang="gl" origin="https://example.org" />,
    );
    let explore = screen.getByTestId("keep-exploring");
    expect(hrefs(explore)).toEqual(["/es/cuadrante", "/es/aprende", "/es/medidas"]);
    expect(within(explore).getByText(/Estas páxinas están en castelán/)).toBeInTheDocument();
    unmount();

    render(<ResultView dataset={sampleDataset} decoded={decoded(answersA)} lang="eu" origin="https://example.org" />);
    explore = screen.getByTestId("keep-exploring");
    expect(hrefs(explore)).toEqual(["/es/cuadrante", "/es/aprende", "/es/medidas"]);
  });

  it("cuenta el clic con el destino y sin datos del resultado", () => {
    const events: { event: string; props?: Record<string, unknown> }[] = [];
    const listener = (e: Event) => events.push((e as CustomEvent).detail);
    window.addEventListener(TRACK_EVENT, listener);
    try {
      view(sampleDataset, decoded(answersA));
      const link = screen.getByTestId("keep-exploring").querySelector('a[data-explore="aprende"]')!;
      // jsdom no navega: se cancela la navegación para no ensuciar la salida.
      link.addEventListener("click", (e) => e.preventDefault());
      fireEvent.click(link);
      expect(events).toContainEqual({ event: "afinidad_explore_aprende", props: { from: "resultado" } });
    } finally {
      window.removeEventListener(TRACK_EVENT, listener);
    }
  });

  it("sin resultado (enlace inválido) no hay bloque: primero el test", () => {
    view(sampleDataset, null);
    expect(screen.queryByTestId("keep-exploring")).not.toBeInTheDocument();
  });

  // El pie propio del módulo desapareció en el rediseño (el módulo usa el pie
  // del sitio); la fila discreta sigue al final de la portada.
  it("la portada lleva la fila discreta «Otros tests», también con caída gl → es", () => {
    render(<OtherTestsRow lang="gl" from="portada" />);
    const row = screen.getByTestId("other-tests-portada");
    expect(hrefs(row)).toEqual(["/es/cuadrante", "/es/aprende", "/es/medidas"]);
  });
});

describe("del cuadrante a «¿A quién votar?»", () => {
  it("el resultado del cuadrante invita al test y enlaza a la portada del módulo", () => {
    render(<QuadrantResults economic={40} social={20} onReset={() => {}} />);
    const invite = screen.getByTestId("afinidad-invite");
    expect(within(invite).getByText("¿Y a qué partido te pareces de verdad?")).toBeInTheDocument();
    expect(invite.querySelector("a")?.getAttribute("href")).toBe("/es/a-quien-votar");
  });
});

/** «¿Te sorprende tu resultado?» (petición del dueño, 10-10-2026): justo tras el ranking. */
describe("«¿Te sorprende tu resultado?» tras el ranking", () => {
  const isAfter = (a: Element, b: Element) =>
    Boolean(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING);

  it("va después del ranking y antes del detalle, y enlaza a compartir y al cuadrante", () => {
    const { container } = view(sampleDataset, decoded(answersA));
    const next = screen.getByTestId("result-next");
    const ranking = screen.getByRole("heading", { name: "Todos los partidos" });
    const breakdown = screen.getByRole("heading", { name: "Pregunta a pregunta" });
    expect(isAfter(next, ranking)).toBe(true);
    expect(isAfter(breakdown, next)).toBe(true);
    expect(within(next).getByRole("heading", { name: "¿Te sorprende tu resultado?" })).toBeInTheDocument();
    const links = Array.from(next.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(links).toEqual(["#compartir", "/es/cuadrante"]);
    expect(container.querySelector("#compartir")).not.toBeNull();
  });
});
