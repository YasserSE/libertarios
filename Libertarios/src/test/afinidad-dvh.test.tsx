import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { Answers, Dataset, OfficialSourceType, SaidVsDid } from "@/data/afinidad/types";
import type { DecodedResult } from "@/lib/afinidad/encode";
import { ONLY_GOVERNMENT_DATA_NOTE, recordStanceSchema, validateDataset } from "@/lib/afinidad/schema";
import { dataset } from "@/data/afinidad";
import { countVerdicts, filterEntries, sortByDate, topicsOf } from "@/lib/afinidad/dvh";
import { getDvhStrings } from "@/i18n/afinidad/dvh";
import { TRACK_EVENT } from "@/lib/afinidad/track";
import { sampleDataset, sampleSaidVsDid } from "./fixtures/afinidad-sample";

/*
 * «Dijeron vs. hicieron»: esquema, tarjeta del resultado, página propia y
 * ficha de partido, con datos SINTÉTICOS. Lo que se fija aquí es lo que hace
 * honesta la sección: el recuento de las tres etiquetas siempre a la vista,
 * pruebas enlazadas, fechas en orden y «en preparación» antes que una lista
 * vacía que parezca «no hay nada que decir».
 */

const mock = vi.hoisted(() => ({
  dataset: { version: "test", parties: [], questions: [], stances: [] } as Dataset,
}));
vi.mock("@/data/afinidad", () => ({
  get dataset() {
    return mock.dataset;
  },
}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/es/a-quien-votar/resultado",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));
vi.mock("@/app/[locale]/a-quien-votar/actions", () => ({
  recordAfinidadResponse: vi.fn(async () => undefined),
}));
vi.mock("@/app/[locale]/novedades/actions", () => ({
  subscribeNewsletter: vi.fn(async () => ({ ok: true })),
  confirmNewsletter: vi.fn(),
  unsubscribeNewsletter: vi.fn(),
}));

import { ResultView } from "@/components/afinidad/ResultView";
import { SaidVsDidExplorer, SaidVsDidItem } from "@/components/afinidad/SaidVsDid";
import DvhPage from "@/app/[locale]/a-quien-votar/dijeron-vs-hicieron/page";
import PartyPage, { generateMetadata as generatePartyMetadata } from "@/app/[locale]/a-quien-votar/partidos/[id]/page";
import IntroPage from "@/app/[locale]/a-quien-votar/page";
import { ModuleBar } from "@/components/afinidad/ModuleBar";
import { getFlowStrings } from "@/i18n/afinidad/flow";
import MetodologiaPage from "@/app/[locale]/a-quien-votar/metodologia/page";

const t = getDvhStrings("es");
const WITH_DVH: Dataset = { ...sampleDataset, saidVsDid: sampleSaidVsDid };
const EMPTY: Dataset = { version: "vacío", parties: [], questions: [], stances: [], quotes: [], deputies: [] };
const params = <T extends object>(p: T) => ({ params: Promise.resolve(p) });
const counts = (c: number, x: number, p: number, n: number) =>
  `${c} cumplidas · ${x} contradichas · ${p} parciales · ${n} no hechas`;

beforeEach(() => {
  cleanup();
  mock.dataset = EMPTY;
});

/** Copia de una entrada con cambios, para los casos inválidos. */
function variant(patch: (e: SaidVsDid) => SaidVsDid, base = sampleSaidVsDid[0]): Dataset {
  return { ...sampleDataset, saidVsDid: [patch(structuredClone(base))] };
}
const errorsOf = (d: Dataset) => {
  const r = validateDataset(d);
  return r.ok ? [] : r.errors;
};

describe("dijeron vs. hicieron · esquema", () => {
  it("el fixture válido pasa, y un dataset sin la clave también", () => {
    expect(errorsOf(WITH_DVH)).toEqual([]);
    expect(errorsOf(sampleDataset)).toEqual([]);
  });

  it("rechaza una cita de más de 50 palabras", () => {
    const long = Array.from({ length: 51 }, (_, i) => `p${i}`).join(" ");
    expect(errorsOf(variant((e) => ({ ...e, said: { ...e.said, text: long } }))).join()).toMatch(/más de 50 palabras/);
  });

  it("rechaza un hecho sin pruebas enlazadas o con una URL que no es http(s)", () => {
    expect(errorsOf(variant((e) => ({ ...e, did: { ...e.did, evidence: [] } }))).join()).toMatch(/prueba enlazada/);
    expect(
      errorsOf(
        variant((e) => ({
          ...e,
          did: { ...e.did, evidence: [{ kind: "otro-parlamento", chamber: "X", title: "Y", date: "2024-01-10", vote: "si", url: "" }] },
        })),
      ).length,
    ).toBeGreaterThan(0);
  });

  it("valida la URL de una votación del Congreso igual que en Hechos", () => {
    const bad = variant((e) => {
      const v = e.did.evidence[0];
      if (v.kind !== "votacion") throw new Error("fixture");
      return { ...e, did: { ...e.did, evidence: [{ ...v, number: v.number + 1 }] } };
    });
    expect(errorsOf(bad).join()).toMatch(/número de votación de la URL no coincide/);
  });

  it("rechaza que lo que hicieron sea anterior a lo que dijeron", () => {
    expect(errorsOf(variant((e) => ({ ...e, said: { ...e.said, date: "2025-01-01" } }))).join()).toMatch(
      /anterior a lo que dijeron/,
    );
  });

  it("«no-hecho» exige nota (por qué podían) y acepta como prueba el estado de una iniciativa", () => {
    const noHecho = sampleSaidVsDid.find((e) => e.verdict === "no-hecho")!;
    expect(errorsOf(variant((e) => e, noHecho))).toEqual([]);
    expect(errorsOf(variant((e) => ({ ...e, note: " " }), noHecho)).join()).toMatch(/por qué el partido podía/);
    const bad = variant(
      (e) => ({
        ...e,
        did: { ...e.did, evidence: [{ kind: "iniciativa", title: "X", url: "https://example.org/x", status: "", date: "2025-06-30" }] },
      }),
      noHecho,
    );
    expect(errorsOf(bad).length).toBeGreaterThan(0);
  });

  it("acepta un dato oficial (organismo, fecha, valor, enlace) y rechaza uno incompleto; nunca entra en Hechos", () => {
    const dato = {
      kind: "dato-oficial" as const,
      title: "Estadística ficticia de viviendas terminadas",
      url: "https://example.org/estadistica",
      date: "2025-06-30",
      publisher: "INE",
      value: "12.345 viviendas",
      sourceType: "estadistica-oficial" as const,
    };
    const ok = variant((e) => ({ ...e, did: { ...e.did, evidence: [...e.did.evidence, dato] } }));
    expect(errorsOf(ok)).toEqual([]);
    for (const k of ["publisher", "value", "url", "date", "sourceType"] as const) {
      const bad = variant((e) => ({ ...e, did: { ...e.did, evidence: [{ ...dato, [k]: "" }] } }));
      expect(errorsOf(bad).length, k).toBeGreaterThan(0);
    }
    // En una celda de Hechos el mismo objeto no es una prueba válida: no puntúa nunca.
    const rec = recordStanceSchema.safeParse({ position: 2, status: "verificado", confidence: "alta", evidence: [dato] });
    expect(rec.success).toBe(false);
  });

  it("la entrada enseña el dato oficial con organismo, fecha, valor y enlace", () => {
    const e = structuredClone(sampleSaidVsDid[0]);
    e.did.evidence = [
      {
        kind: "dato-oficial",
        title: "Serie ficticia",
        url: "https://example.org/serie",
        date: "2025-06-30",
        publisher: "INE",
        value: "12.345 viviendas",
        sourceType: "estadistica-oficial",
      },
    ];
    render(<SaidVsDidItem entry={e} t={t} lang="es" />);
    expect(screen.getByTestId("dvh-official-value")).toHaveTextContent("12.345 viviendas");
    expect(screen.getByTestId("dvh-source-type")).toHaveTextContent(t["sourceType_estadistica-oficial"]);
    expect(document.body.textContent).toContain("dato oficial de INE");
    expect(document.body.textContent).toMatch(/2025/);
    expect(screen.getByRole("link", { name: t.source })).toHaveAttribute("href", "https://example.org/serie");
  });

  it("independencia de la fuente: un «cumple» no se apoya solo en datos del propio Gobierno; un «parcial» lo dice", () => {
    const gov = {
      kind: "dato-oficial" as const,
      title: "Nota de prensa ficticia",
      url: "https://example.org/nota",
      date: "2025-06-30",
      publisher: "Ministerio ficticio",
      value: "100 %",
      sourceType: "gobierno" as OfficialSourceType,
    };
    const withEv = (ev: (typeof gov)[], verdict: "cumple" | "parcial", note?: string) =>
      variant((e) => ({ ...e, verdict, note, did: { ...e.did, evidence: [...e.did.evidence, ...ev] } }));
    expect(errorsOf(withEv([gov], "cumple")).join()).toMatch(/solo en datos del propio Gobierno/);
    expect(errorsOf(withEv([gov], "parcial", "Matiz.")).join()).toMatch(/solo hay datos del propio Gobierno/);
    expect(errorsOf(withEv([gov], "parcial", `Matiz: ${ONLY_GOVERNMENT_DATA_NOTE}.`))).toEqual([]);
    for (const sourceType of ["independiente", "estadistica-oficial"] as const)
      expect(errorsOf(withEv([gov, { ...gov, sourceType }], "cumple")), sourceType).toEqual([]);
  });

  it("el dataset real cumple la regla: ningún «cumple» con solo datos del propio Gobierno", () => {
    const bad = (dataset.saidVsDid ?? []).filter((e) => {
      const d = e.did.evidence.filter((x) => x.kind === "dato-oficial");
      return e.verdict === "cumple" && d.length > 0 && d.every((x) => x.sourceType === "gobierno");
    });
    expect(bad.map((e) => e.id)).toEqual([]);
  });

  it("«parcial» exige nota; ids únicos; partido y pregunta existentes", () => {
    expect(errorsOf(variant((e) => ({ ...e, verdict: "parcial", note: undefined }))).join()).toMatch(/nota/);
    expect(
      errorsOf({ ...sampleDataset, saidVsDid: [sampleSaidVsDid[0], sampleSaidVsDid[0]] }).join(),
    ).toMatch(/duplicada: partido-a-ficticio-1/);
    expect(errorsOf(variant((e) => ({ ...e, partyId: "no-existe" }))).join()).toMatch(/partido desconocido/);
    expect(errorsOf(variant((e) => ({ ...e, questionId: "q99" }))).join()).toMatch(/pregunta desconocida/);
    expect(errorsOf(variant((e) => ({ ...e, id: "Con Espacios" }))).length).toBeGreaterThan(0);
  });
});

describe("dijeron vs. hicieron · utilidades", () => {
  it("ordena por fecha (más reciente primero), cuenta las tres etiquetas y filtra", () => {
    expect(sortByDate(sampleSaidVsDid).map((e) => e.id)).toEqual([
      "partido-b-ficticio-2",
      "partido-b-ficticio-1",
      "partido-a-ficticio-1",
      "partido-a-ficticio-2",
    ]);
    expect(countVerdicts([])).toEqual({ cumple: 0, contradice: 0, parcial: 0, "no-hecho": 0, total: 0 });
    expect(countVerdicts(sampleSaidVsDid)).toEqual({ cumple: 1, contradice: 1, parcial: 1, "no-hecho": 1, total: 4 });
    expect(filterEntries(sampleSaidVsDid, { party: "partido-a", topic: "Vivienda" }).map((e) => e.id)).toEqual([
      "partido-a-ficticio-1",
    ]);
    expect(topicsOf(sampleSaidVsDid)).toEqual(["Defensa", "Pensiones", "Vivienda"]);
  });
});

const answersA: Answers = {
  q1: { value: 2, important: false },
  q2: { value: -1, important: false },
  q3: { value: 1, important: true },
  q4: { value: -2, important: false },
  q5: { value: -1, important: false },
};
const decoded = (context: DecodedResult["context"] = {}): DecodedResult => ({
  answers: answersA,
  context,
  version: sampleDataset.version,
  stale: false,
});
const dvhCard = () => screen.getByTestId("dvh-result");

describe("dijeron vs. hicieron · tarjeta del resultado", () => {
  it("va después de «Promesa frente a hechos» y enseña recuentos y etiquetas por partido", () => {
    render(<ResultView dataset={WITH_DVH} decoded={decoded()} lang="es" origin="https://example.org" />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings.indexOf(t.title)).toBe(headings.indexOf("Promesa frente a hechos") + 1);

    const card = dvhCard();
    const a = card.querySelector('[data-dvh-party="partido-a"]') as HTMLElement;
    expect(within(a).getByTestId("dvh-counts")).toHaveTextContent(counts(1, 0, 1, 0));
    expect(a.querySelector('[data-dvh] [data-verdict="cumple"]')).toHaveTextContent("Cumple");
    expect(a.querySelector('[data-dvh] [data-verdict="parcial"]')).toHaveTextContent("Parcial");
    expect(within(a).getByText(/Matiz ficticio/)).toBeInTheDocument();
    const item = a.querySelector('[data-dvh="partido-a-ficticio-1"]') as HTMLElement;
    expect(item.textContent!.indexOf(t.said)).toBeLessThan(item.textContent!.indexOf(t.did));
    expect(within(item).getByRole("link", { name: "Nota ficticia A" })).toHaveAttribute("href", "https://example.org/partido-a/nota.html");
    expect(within(item).getByRole("link", { name: /ver vídeo \(desde 00:12:30\)/ })).toBeInTheDocument();
    expect(within(item).getByRole("link", { name: "ver en congreso.es" })).toBeInTheDocument();

    const b = card.querySelector('[data-dvh-party="partido-b"]') as HTMLElement;
    expect(within(b).getByTestId("dvh-counts")).toHaveTextContent(counts(0, 1, 0, 1));
    expect(b.querySelector('[data-dvh] [data-verdict="contradice"]')).toHaveTextContent("Contradice");
    expect(b.querySelector('[data-dvh] [data-verdict="no-hecho"]')).toHaveTextContent("No lo hicieron");
    const nh = b.querySelector('[data-dvh="partido-b-ficticio-2"]') as HTMLElement;
    expect(nh).toHaveTextContent("estado: Caducado");
    expect(within(nh).getByRole("link", { name: "fuente" })).toHaveAttribute("href", "https://example.org/iniciativa-ficticia");
    expect(nh).toHaveTextContent("el Partido B gobernaba");
  });

  it("incluye el voto habitual aunque no esté entre los tres primeros, y lo marca", () => {
    // Partido C es regional: sin comunidad no sale en el ranking visible, pero
    // al declararlo como voto habitual entra en la tarjeta.
    render(
      <ResultView dataset={WITH_DVH} decoded={decoded({ usualVote: "partido-c" })} lang="es" origin="https://example.org" />,
    );
    const c = dvhCard().querySelector('[data-dvh-party="partido-c"]') as HTMLElement;
    expect(c).not.toBeNull();
    expect(within(c).getByText(t.usualVote)).toBeInTheDocument();
    expect(within(c).getByTestId("dvh-counts")).toHaveTextContent(counts(0, 0, 0, 0));
    expect(within(c).getByText(t.none)).toBeInTheDocument();
  });

  it("sin ninguna entrada en el dataset, dice «En preparación» y no hay botones", () => {
    render(<ResultView dataset={sampleDataset} decoded={decoded()} lang="es" origin="https://example.org" />);
    expect(within(dvhCard()).getByText(t.inPreparationTitle)).toBeInTheDocument();
    expect(screen.queryByTestId("dvh-buttons")).toBeNull();
  });

  it("botones compactos tras el titular y antes del ranking: el primero y el voto habitual", () => {
    render(<ResultView dataset={WITH_DVH} decoded={decoded({ usualVote: "partido-b" })} lang="es" origin="https://example.org" />);
    const nav = screen.getByTestId("dvh-buttons");
    expect(nav).toHaveTextContent(t.resultTitle);
    const links = within(nav).getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual([
      "/es/a-quien-votar/dijeron-vs-hicieron?partido=partido-a",
      "/es/a-quien-votar/dijeron-vs-hicieron?partido=partido-b",
    ]);
    expect(links[0]).toHaveTextContent("Ver PA");
    const follows = (x: Node, y: Node) => !!(x.compareDocumentPosition(y) & Node.DOCUMENT_POSITION_FOLLOWING);
    expect(follows(screen.getByTestId("headline"), nav)).toBe(true);
    expect(follows(nav, screen.getByRole("heading", { level: 2, name: "Todos los partidos" }))).toBe(true);
  });

  it("un solo botón si el voto habitual es el primero o no se dijo", () => {
    render(<ResultView dataset={WITH_DVH} decoded={decoded({ usualVote: "partido-a" })} lang="es" origin="https://example.org" />);
    expect(within(screen.getByTestId("dvh-buttons")).getAllByRole("link")).toHaveLength(1);
  });

  it("«Compartir» copia el enlace con ?dvh= y el ancla, y enlaza la imagen OG de la entrada", async () => {
    const writeText = vi.fn(async () => undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const events: unknown[] = [];
    const listener = (e: Event) => events.push((e as CustomEvent).detail);
    window.addEventListener(TRACK_EVENT, listener);
    try {
      render(<ResultView dataset={WITH_DVH} decoded={decoded()} lang="es" origin="https://example.org" />);
      const item = dvhCard().querySelector('[data-dvh="partido-b-ficticio-1"]') as HTMLElement;
      fireEvent.click(within(item).getByRole("button", { name: t.shareAria }));
      await waitFor(() => expect(within(item).getByText(t.copied)).toBeInTheDocument());
      expect(writeText).toHaveBeenCalledWith(
        `${window.location.origin}/es/a-quien-votar/partidos/partido-b?dvh=partido-b-ficticio-1#dvh-partido-b-ficticio-1`,
      );
      expect(events).toContainEqual({ event: "afinidad_share_dvh", props: undefined });
      expect(within(item).getByRole("link", { name: t.shareImage })).toHaveAttribute(
        "href",
        "/api/og/afinidad?dvh=partido-b-ficticio-1&l=es",
      );
    } finally {
      window.removeEventListener(TRACK_EVENT, listener);
    }
  });
});

describe("dijeron vs. hicieron · página propia", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  const explorer = () =>
    render(<SaidVsDidExplorer entries={sampleSaidVsDid} parties={sampleDataset.parties} t={t} lang="es" />);
  const shownIds = () => Array.from(document.querySelectorAll("[data-dvh]")).map((el) => el.getAttribute("data-dvh"));

  it("lista todas por fecha, con el recuento por partido, y cuenta la apertura", () => {
    const events: unknown[] = [];
    const listener = (e: Event) => events.push((e as CustomEvent).detail);
    window.addEventListener(TRACK_EVENT, listener);
    explorer();
    window.removeEventListener(TRACK_EVENT, listener);
    expect(events).toContainEqual({ event: "afinidad_dvh_open", props: undefined });
    expect(screen.getByTestId("dvh-results-count")).toHaveTextContent("4 entradas");
    expect(shownIds()).toEqual([
      "partido-b-ficticio-2",
      "partido-b-ficticio-1",
      "partido-a-ficticio-1",
      "partido-a-ficticio-2",
    ]);
    const a = document.querySelector('[data-dvh-count="partido-a"]') as HTMLElement;
    expect(a).toHaveTextContent(counts(1, 0, 1, 0));
  });

  it("filtra por partido, etiqueta y tema con fichas, y se pueden quitar los filtros", () => {
    explorer();
    // Rediseño: los filtros son fichas (botones con `aria-pressed`) en tres grupos.
    const chip = (group: string, name: RegExp | string) =>
      within(screen.getByRole("group", { name: group })).getByRole("button", { name });
    fireEvent.click(chip(t.filterParty, /Partido A/));
    expect(chip(t.filterParty, /Partido A/)).toHaveAttribute("aria-pressed", "true");
    expect(shownIds()).toEqual(["partido-a-ficticio-1", "partido-a-ficticio-2"]);
    expect(window.location.search).toContain("partido=partido-a");

    fireEvent.click(chip(t.filterVerdict, "Contradice"));
    expect(shownIds()).toEqual([]);
    expect(screen.getByText(t.noMatches)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: t.clearFilters }));
    fireEvent.click(chip(t.filterTopic, "Defensa"));
    expect(shownIds()).toEqual(["partido-a-ficticio-2"]);
    // Pulsar otra vez la ficha activa la quita.
    fireEvent.click(chip(t.filterTopic, "Defensa"));
    expect(shownIds()).toHaveLength(4);

    fireEvent.click(chip(t.filterVerdict, "No lo hicieron"));
    expect(shownIds()).toEqual(["partido-b-ficticio-2"]);
    expect(window.location.search).toContain("etiqueta=no-hecho");
  });

  it("abre ya filtrada con ?partido=… en la URL", () => {
    window.history.replaceState(null, "", "/es/a-quien-votar/dijeron-vs-hicieron?partido=partido-b");
    explorer();
    expect(shownIds()).toEqual(["partido-b-ficticio-2", "partido-b-ficticio-1"]);
  });

  it("dataset vacío: criterios arriba y «En preparación», sin lista", async () => {
    render(await DvhPage(params({ locale: "es" })));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(t.title);
    expect(document.body.textContent).toContain(t.criteria2);
    expect(screen.getByRole("status")).toHaveTextContent(t.inPreparationTitle);
    expect(document.querySelectorAll("[data-dvh]")).toHaveLength(0);
  });

  it("con datos: criterios antes de la primera entrada", async () => {
    mock.dataset = WITH_DVH;
    render(await DvhPage(params({ locale: "es" })));
    const text = document.body.textContent ?? "";
    expect(text.indexOf(t.criteriaTitle)).toBeLessThan(text.indexOf("Texto ficticio de un compromiso"));
    expect(document.querySelectorAll("[data-dvh]")).toHaveLength(4);
  });
});

describe("dijeron vs. hicieron · ficha de partido y metodología", () => {
  it("la ficha tiene la sección con recuento y cada entrada con su ancla", async () => {
    mock.dataset = WITH_DVH;
    render(await PartyPage(params({ locale: "es", id: "partido-a" })));
    expect(screen.getByRole("heading", { level: 2, name: t.title })).toHaveAttribute("id", "dijeron-vs-hicieron");
    expect(document.getElementById("dvh-partido-a-ficticio-1")).not.toBeNull();
    expect(document.getElementById("dvh-partido-a-ficticio-2")).not.toBeNull();
    expect(document.getElementById("dvh-partido-b-ficticio-1")).toBeNull();
    expect(screen.getAllByTestId("dvh-counts")[0]).toHaveTextContent(counts(1, 0, 1, 0));
    expect(screen.getByRole("link", { name: t.seeAll })).toHaveAttribute(
      "href",
      "/es/a-quien-votar/dijeron-vs-hicieron?partido=partido-a",
    );
  });

  it("contexto de gobierno y aviso de que los recuentos no se comparan entre partidos", async () => {
    // partido-a ha gobernado (se le añade un periodo); partido-b no.
    mock.dataset = {
      ...WITH_DVH,
      parties: WITH_DVH.parties.map((p) =>
        p.id === "partido-a" ? { ...p, inGovernment: [{ from: "2011-12-21", to: "2018-06-02", level: "estatal" as const }] } : p,
      ),
    };
    render(await PartyPage(params({ locale: "es", id: "partido-a" })));
    expect(screen.getByTestId("dvh-government")).toHaveTextContent(/^Gobernó en el Estado: .*2011.*2018/);
    expect(screen.getByTestId("dvh-not-comparable")).toHaveTextContent(t.notComparable);
    cleanup();
    render(await PartyPage(params({ locale: "es", id: "partido-b" })));
    expect(screen.getByTestId("dvh-government")).toHaveTextContent(t.neverGoverned);
  });

  it("la página publica el registro de búsqueda y el hueco autonómico", async () => {
    mock.dataset = WITH_DVH;
    render(await DvhPage(params({ locale: "es" })));
    expect(screen.getByRole("heading", { level: 2, name: t.searchLogTitle })).toBeInTheDocument();
    expect(screen.getByTestId("dvh-known-gaps")).toHaveTextContent(/gobiernos autonómicos/);
    // Criterio corregido: nada del mismo debate, sin plazo mínimo.
    expect(document.body.textContent).toContain(t.criteria7);
    expect(t.criteria7).toMatch(/mismo debate/);
    expect(t.criteria1).not.toMatch(/debate parlamentario/);
  });

  it("la metodología explica los criterios y enlaza la página", async () => {
    mock.dataset = WITH_DVH;
    render(await MetodologiaPage(params({ locale: "es" })));
    expect(screen.getByRole("heading", { level: 2, name: /Dijeron vs\. hicieron/ })).toHaveAttribute(
      "id",
      "dijeron-vs-hicieron",
    );
    expect(screen.getByTestId("dvh-total")).toHaveTextContent("4");
    expect(document.body.textContent).toContain(t.criteria6);
    expect(screen.getByRole("link", { name: "Ver todas las entradas" })).toHaveAttribute(
      "href",
      "/es/a-quien-votar/dijeron-vs-hicieron",
    );
  });
});

describe("dijeron vs. hicieron · botones en el módulo", () => {
  it("portada: botón secundario bajo el principal y la tercera tarjeta enlazan la página", async () => {
    render(await IntroPage(params({ locale: "es" })));
    const btn = screen.getByTestId("intro-dvh-button");
    expect(btn).toHaveAttribute("href", "/es/a-quien-votar/dijeron-vs-hicieron");
    expect(btn).toHaveTextContent(t.footerLink);
    expect(screen.getByTestId("intro-tile-dvh")).toHaveAttribute("href", "/es/a-quien-votar/dijeron-vs-hicieron");
    // Sin bloque grande en la portada.
    expect(screen.queryByTestId("dvh-teaser")).toBeNull();
  });

  it("franja del módulo: «Dijeron vs. hicieron» es el primer enlace, con texto", () => {
    render(<ModuleBar locale="es" strings={getFlowStrings("es")} />);
    const links = within(screen.getByRole("navigation")).getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/es/a-quien-votar/dijeron-vs-hicieron");
    expect(links[0]).toHaveTextContent(t.footerLink);
  });

  it("ficha: botón arriba (antes de las posiciones) y la sección completa más abajo", async () => {
    mock.dataset = WITH_DVH;
    render(await PartyPage(params({ locale: "es", id: "partido-a" })));
    const btn = document.querySelector('[data-dvh-button="partido-a"]') as HTMLElement;
    expect(btn).toHaveAttribute("href", "/es/a-quien-votar/dijeron-vs-hicieron?partido=partido-a");
    expect(btn).toHaveTextContent("Dijeron vs. hicieron de PA");
    const positions = screen.getByRole("heading", { level: 2, name: /Posiciones/ });
    const section = screen.getByRole("heading", { level: 2, name: t.title });
    expect(btn.compareDocumentPosition(positions) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(positions.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("ficha sin entradas: sin botón", async () => {
    mock.dataset = WITH_DVH;
    render(await PartyPage(params({ locale: "es", id: "partido-c" })));
    expect(document.querySelector("[data-dvh-button]")).toBeNull();
  });

  it("ficha con ?dvh=<id>: imagen OG de esa entrada; con un id ajeno, la genérica", async () => {
    mock.dataset = WITH_DVH;
    const meta = await generatePartyMetadata({
      params: Promise.resolve({ locale: "es", id: "partido-a" }),
      searchParams: Promise.resolve({ dvh: "partido-a-ficticio-2" }),
    });
    const images = meta.openGraph?.images as { url: string }[];
    expect(images[0].url).toBe("https://www.libertarios.eu/api/og/afinidad?dvh=partido-a-ficticio-2&l=es");
    const other = await generatePartyMetadata({
      params: Promise.resolve({ locale: "es", id: "partido-a" }),
      searchParams: Promise.resolve({ dvh: "partido-b-ficticio-1" }),
    });
    // Id de otro partido: la ficha con la tarjeta genérica (en su idioma).
    expect((other.openGraph?.images as { url: string }[])[0].url).toBe("https://www.libertarios.eu/api/og/afinidad?l=es");
  });

  it("ficha con ?dvh=<id>: resalta la entrada y le abre el detalle", async () => {
    mock.dataset = WITH_DVH;
    window.history.replaceState(null, "", "/es/a-quien-votar/partidos/partido-a?dvh=partido-a-ficticio-2");
    try {
      render(await PartyPage(params({ locale: "es", id: "partido-a" })));
      const el = document.getElementById("dvh-partido-a-ficticio-2")!;
      await waitFor(() => expect(el).toHaveAttribute("data-focus", "true"));
      expect(el.querySelector("details")).toHaveAttribute("open");
    } finally {
      window.history.replaceState(null, "", "/");
    }
  });
});
