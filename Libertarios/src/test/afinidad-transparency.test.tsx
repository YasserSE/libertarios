import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { Dataset } from "@/data/afinidad/types";
import { IMPORTANT_WEIGHT, MIN_LENS_ITEMS, SHRINK_K, MIN_ANSWERS, agreement } from "@/lib/afinidad/score";
import { validateDataset } from "@/lib/afinidad/schema";
import { getMethodologyStrings } from "@/i18n/afinidad/methodology";
import { getTransparencyStrings } from "@/i18n/afinidad/transparency";
import { sampleDataset } from "./fixtures/afinidad-sample";
// `vi.mock` se eleva por encima de estos imports: las páginas ya ven el mock.
import MetodologiaPage from "@/app/[locale]/a-quien-votar/metodologia/page";
import DatosPage from "@/app/[locale]/a-quien-votar/datos/page";
import * as partyModule from "@/app/[locale]/a-quien-votar/partidos/[id]/page";
import { GET } from "@/app/api/afinidad/datos.json/route";

/*
 * Las páginas leen `dataset` de "@/data/afinidad". Aquí se sustituye por un
 * objeto que cada test rellena (vacío o con el fixture), para que los tests no
 * dependan de qué datos reales haya cargados en ese momento.
 */
const mock = vi.hoisted(() => ({
  dataset: { version: "test", parties: [], questions: [], stances: [], quotes: [], deputies: [] } as Dataset,
}));
vi.mock("@/data/afinidad", () => ({
  get dataset() {
    return mock.dataset;
  },
}));

const EMPTY: Dataset = { version: "vacío", parties: [], questions: [], stances: [], quotes: [], deputies: [] };


const params = <T extends object>(p: T) => ({ params: Promise.resolve(p) });
const pct = (x: number) => `${(x * 100).toLocaleString("es-ES", { maximumFractionDigits: 0 })} %`;
const t = getTransparencyStrings("es");

beforeEach(() => {
  cleanup();
  mock.dataset = EMPTY;
});

describe("afinidad · metodología", () => {
  it("las cifras del método salen de las constantes del motor, no de texto fijo", async () => {
    render(await MetodologiaPage(params({ locale: "es" })));
    expect(screen.getByTestId("coverage")).toHaveTextContent(String(MIN_LENS_ITEMS));
    expect(screen.getByTestId("min-answers")).toHaveTextContent(String(MIN_ANSWERS));
    expect(document.body.textContent).toContain(`×${IMPORTANT_WEIGHT}`);
  });

  it("el ejemplo numérico es el cálculo real de agreement() con los pesos del motor", async () => {
    render(await MetodologiaPage(params({ locale: "es" })));
    // Mismas filas que la página: (+2 importante vs +1), (−1 vs +2), (+1 vs 0).
    // Con el encogimiento hacia el neutro: (Σ w·acuerdo + K·0,5) / (Σ w + K).
    const expected =
      (IMPORTANT_WEIGHT * agreement(2, 1) + agreement(-1, 2) + agreement(1, 0) + SHRINK_K * 0.5) /
      (IMPORTANT_WEIGHT + 2 + SHRINK_K);
    expect(screen.getByTestId("worked-score")).toHaveTextContent(pct(expected));
    expect(screen.getByTestId("shrink-k")).toHaveTextContent(String(SHRINK_K));
    expect(screen.getByTestId("shrink-five")).toHaveTextContent(pct((MIN_LENS_ITEMS + SHRINK_K * 0.5) / (MIN_LENS_ITEMS + SHRINK_K)));
    expect(screen.getByTestId("shrink-five").textContent).not.toMatch(/^100/);
    expect(screen.getAllByTestId("worked-agreement")).toHaveLength(3);
  });

  it("declara quién lo hace y que el P-LIB sigue la misma regla, sin datos inventados", async () => {
    render(await MetodologiaPage(params({ locale: "es" })));
    const text = document.body.textContent ?? "";
    expect(text).toContain("equipo de Libertarios.eu");
    expect(text).toContain("Partido Libertario (P-LIB) se somete a la misma regla");
    expect(text).toContain("se publicará con la primera versión de los datos");
    expect(text).toContain("69.7");
  });

  it("con datos, dice si el P-LIB está o no según el dataset", async () => {
    mock.dataset = sampleDataset;
    render(await MetodologiaPage(params({ locale: "es" })));
    expect(document.body.textContent).toContain("no cumple ninguna de las tres condiciones");
  });

  it("en otro idioma la prosa está traducida (sin aviso de «solo en castellano»)", async () => {
    render(await MetodologiaPage(params({ locale: "ca" })));
    const ca = getMethodologyStrings("ca");
    expect(document.body.textContent).toContain(ca.calc.h);
    expect(document.body.textContent).not.toContain(getMethodologyStrings("es").calc.h);
  });
});

describe("afinidad · datos.json", () => {
  it("devuelve un dataset que valida contra el esquema, con licencia, versión y fecha", async () => {
    mock.dataset = sampleDataset;
    const res = GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toMatch(/max-age=\d+/);
    const body = await res.json();
    const v = validateDataset(body);
    expect(v.ok).toBe(true);
    expect(body.version).toBe(sampleDataset.version);
    expect(body.license).toBe("CC BY 4.0");
    expect(body.licenseUrl).toContain("creativecommons.org/licenses/by/4.0");
    expect(Number.isNaN(Date.parse(body.generatedAt))).toBe(false);
    expect(body.stances).toHaveLength(sampleDataset.stances.length);
    expect(body.quotes).toHaveLength(sampleDataset.quotes!.length);
  });

  it("con el dataset vacío también es válido y no inventa nada", async () => {
    const body = await GET().json();
    expect(validateDataset(body).ok).toBe(true);
    expect(body.parties).toEqual([]);
    expect(body.quotes).toEqual([]);
  });

  it("si el dataset no pasa el esquema, no lo publica", async () => {
    mock.dataset = { ...sampleDataset, stances: [...sampleDataset.stances, sampleDataset.stances[0]] };
    const res = GET();
    expect(res.status).toBe(500);
    expect((await res.json()).errors.join(" ")).toContain("celda duplicada");
  });
});

describe("afinidad · página de datos", () => {
  it("vacía: «en preparación»", async () => {
    render(await DatosPage(params({ locale: "es" })));
    expect(screen.getByRole("status")).toHaveTextContent(t.inPreparation.title);
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("con datos: tabla con huecos y discrepancias a la vista, y enlace al JSON", async () => {
    mock.dataset = sampleDataset;
    render(await DatosPage(params({ locale: "es" })));
    expect(screen.getByRole("table")).toBeInTheDocument();
    const text = document.body.textContent ?? "";
    expect(text).toContain(t.status.pendiente);
    expect(text).toContain(t.status["sin-posicion"]);
    expect(text).toContain(t.status.contested);
    expect(text).toContain("Texto ficticio del programa de partido-a sobre el ítem 1.");
    expect(screen.getByRole("link", { name: t.data.download })).toHaveAttribute("href", "/api/afinidad/datos.json");
  });
});

describe("afinidad · ficha de partido", () => {
  it("dataset vacío: sin rutas estáticas y la ficha dice «en preparación» en vez de 404", async () => {
    expect(partyModule.generateStaticParams()).toEqual([]);
    render(await partyModule.default(params({ locale: "es", id: "cualquiera" })));
    expect(screen.getByRole("status")).toHaveTextContent(t.inPreparation.title);
  });

  it("con datos: una ruta por partido, y la ficha enseña inclusión, coherencia, fuentes y hemeroteca", async () => {
    mock.dataset = sampleDataset;
    expect(partyModule.generateStaticParams()).toEqual(sampleDataset.parties.map((p) => ({ id: p.id })));
    render(await partyModule.default(params({ locale: "es", id: "partido-b" })));
    const text = document.body.textContent ?? "";
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Partido B");
    expect(text).toContain("Partido ficticio de prueba.");
    expect(text).toContain(t.party.coherence);
    expect(text).toContain("Texto ficticio de una intervención");
    expect(text).toContain(t.status.contested);
  });

  it("id desconocido con datos cargados: 404", async () => {
    mock.dataset = sampleDataset;
    await expect(partyModule.default(params({ locale: "es", id: "no-existe" }))).rejects.toThrow();
  });
});
