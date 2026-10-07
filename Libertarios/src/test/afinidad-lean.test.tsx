import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Answer, Answers, UserPosition } from "@/data/afinidad/types";
import { dataset } from "@/data/afinidad";
import { ECONOMIC_ITEMS, economicLean } from "@/lib/afinidad/lean";
import { QuadrantInvite } from "@/components/afinidad/QuadrantInvite";
import { TRACK_EVENT } from "@/lib/afinidad/track";

/**
 * Invitación personalizada al cuadrante: se decide solo con las respuestas de
 * la persona a las preguntas de impuestos, nunca con partidos.
 */

const qs = dataset.questions;
const a = (value: UserPosition): Answer => ({ value, important: false });

/** Respuestas «pro libertad» de intensidad `v` en las cuatro preguntas. */
const proFreedom = (v: 1 | 2): Answers =>
  Object.fromEntries(Object.entries(ECONOMIC_ITEMS).map(([id, dir]) => [id, a((dir * v) as UserPosition)]));

describe("economicLean", () => {
  it("las cuatro preguntas del mapa existen en el cuestionario", () => {
    const ids = new Set(qs.map((q) => q.id));
    for (const id of Object.keys(ECONOMIC_ITEMS)) expect(ids.has(id)).toBe(true);
  });

  it("solo recibe respuestas y preguntas (nada de partidos)", () => {
    expect(economicLean.length).toBe(2);
  });

  it("orientación clara en un sentido y en el otro", () => {
    expect(economicLean(proFreedom(2), qs)).toEqual({ lean: "libertad", answered: 4 });
    expect(economicLean(proFreedom(1), qs).lean).toBe("libertad"); // media 0,5
    const anti = Object.fromEntries(
      Object.entries(ECONOMIC_ITEMS).map(([id, dir]) => [id, a((-dir * 2) as UserPosition)]),
    );
    expect(economicLean(anti, qs)).toEqual({ lean: "intervencion", answered: 4 });
  });

  it("umbrales en ±0,25 y mixto entre medias", () => {
    // +1 y −0,5 → 0,25: libertad (el umbral cuenta).
    expect(economicLean({ "irpf-inflacion": a(2), "impuesto-banca": a(1) }, qs).lean).toBe("libertad");
    // −0,25: intervención.
    expect(economicLean({ "irpf-inflacion": a(-2), "impuesto-banca": a(-1) }, qs).lean).toBe("intervencion");
    // +0,5 y −0,5 → 0: mixto.
    expect(economicLean({ "irpf-inflacion": a(1), "iva-primera-vivienda": a(-1) }, qs).lean).toBe("mixto");
    // (0,5 + 0,5 − 0,5) / 3 ≈ 0,17: mixto.
    expect(
      economicLean({ "irpf-inflacion": a(1), "impuesto-banca": a(-1), "iva-primera-vivienda": a(-1) }, qs).lean,
    ).toBe("mixto");
  });

  it("saltar no cuenta y con menos de 2 respuestas no se dice nada", () => {
    expect(economicLean({}, qs)).toEqual({ lean: "unknown", answered: 0 });
    expect(economicLean({ "irpf-inflacion": a(2) }, qs)).toEqual({ lean: "unknown", answered: 1 });
    expect(
      economicLean({ "irpf-inflacion": a(2), "impuesto-banca": "skip", "impuesto-grandes-fortunas": "skip" }, qs),
    ).toEqual({ lean: "unknown", answered: 1 });
    // Una saltada no tira hacia el centro: dos respuestas a favor siguen siendo «libertad».
    expect(
      economicLean({ "irpf-inflacion": a(2), "impuesto-banca": a(-2), "iva-primera-vivienda": "skip" }, qs),
    ).toEqual({ lean: "libertad", answered: 2 });
  });

  it("las preguntas que no son de impuestos no cuentan", () => {
    const other = qs.find((q) => !(q.id in ECONOMIC_ITEMS))!;
    expect(economicLean({ [other.id]: a(2), "irpf-inflacion": a(2) }, qs)).toEqual({ lean: "unknown", answered: 1 });
  });

  it("solo cuentan las preguntas presentes en el cuestionario", () => {
    expect(economicLean(proFreedom(2), [{ id: "irpf-inflacion" }]).answered).toBe(1);
  });
});

describe("QuadrantInvite", () => {
  const show = (answers: Answers, lang = "es") =>
    render(<QuadrantInvite answers={answers} questions={qs} lang={lang} />);
  const link = () => screen.getByRole("link", { name: /test del cuadrante|test del quadrant|test do cadrante|koadrantearen testa/i });

  afterEach(() => document.body.replaceChildren());

  it("libertad", () => {
    show(proFreedom(2));
    expect(screen.getByRole("heading", { name: /más libertad económica/ })).toBeInTheDocument();
    expect(screen.getByText(/Descubre si tu perfil es libertario/)).toBeInTheDocument();
    expect(link()).toHaveTextContent("Hacer el test del cuadrante");
    expect(screen.getByTestId("quadrant-invite-note")).toHaveTextContent(
      "Calculado solo con tus 4 respuestas sobre impuestos; no se guarda.",
    );
  });

  it("intervención", () => {
    show({ "impuesto-banca": a(2), "impuesto-grandes-fortunas": a(1), "irpf-inflacion": "skip" });
    expect(screen.getByRole("heading", { name: /más intervención económica/ })).toBeInTheDocument();
    expect(screen.getByText("¿Dónde estás en libertad personal?")).toBeInTheDocument();
    expect(screen.getByTestId("quadrant-invite-note")).toHaveTextContent("tus 2 respuestas");
  });

  it("mixto", () => {
    show({ "irpf-inflacion": a(1), "iva-primera-vivienda": a(-1) });
    expect(screen.getByRole("heading", { name: "¿Dónde estás en libertad económica y personal?" })).toBeInTheDocument();
    expect(screen.getByText("Descúbrelo en 3 minutos.")).toBeInTheDocument();
    expect(screen.getByTestId("quadrant-invite-note")).toHaveTextContent("tus 2 respuestas");
  });

  it("sin datos: el texto genérico y sin nota", () => {
    show({ "irpf-inflacion": a(2) });
    expect(screen.getByTestId("quadrant-invite")).toHaveAttribute("data-lean", "unknown");
    expect(screen.getByRole("heading", { name: "¿Dónde estás en libertad económica y personal?" })).toBeInTheDocument();
    expect(screen.queryByTestId("quadrant-invite-note")).not.toBeInTheDocument();
  });

  it.each([
    ["es", "/es/cuadrante", "Hacer el test del cuadrante"],
    ["ca", "/ca/cuadrante", "Fer el test del quadrant"],
    ["gl", "/es/cuadrante", "Facer o test do cadrante"],
    ["eu", "/es/cuadrante", "Egin koadrantearen testa"],
  ])("enlace en %s", (lang, href, cta) => {
    show(proFreedom(2), lang);
    expect(link()).toHaveAttribute("href", href);
    expect(link()).toHaveTextContent(cta);
  });

  it("el clic se cuenta sin la orientación", () => {
    const events: unknown[] = [];
    const on = (e: Event) => events.push((e as CustomEvent).detail);
    window.addEventListener(TRACK_EVENT, on);
    try {
      show(proFreedom(2));
      // jsdom no navega: se cancela la navegación para no ensuciar la salida.
      link().addEventListener("click", (e) => e.preventDefault());
      fireEvent.click(link());
    } finally {
      window.removeEventListener(TRACK_EVENT, on);
    }
    expect(events).toEqual([{ event: "afinidad_explore_cuadrante", props: { from: "resultado" } }]);
  });
});
