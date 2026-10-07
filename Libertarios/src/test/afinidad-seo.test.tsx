import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import type { Answers } from "@/data/afinidad/types";
import { dataset } from "@/data/afinidad";
import { encodeResultParams } from "@/lib/afinidad/encode";
import { resultLeader } from "@/lib/afinidad/leader";
import { introJsonLd, OG_LOCALE } from "@/lib/afinidad/meta";
import { getSeoStrings } from "@/i18n/afinidad/seo";
import { fmt } from "@/i18n/afinidad/result";

/*
 * Vistas previas al compartir y metadatos de buscadores de «¿A quién votar?»,
 * y la ilustración de la portada. Con el dataset REAL: lo que se comprueba es
 * lo que verá WhatsApp al pegar un enlace.
 */

// El layout importa la cabecera del sitio, que llega a módulos `server-only`.
vi.mock("server-only", () => ({}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/es/a-quien-votar",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import { VoteHandIllustration } from "@/components/afinidad/VoteHandIllustration";
import { TileArt } from "@/components/afinidad/TileArt";
import IntroPage from "@/app/[locale]/a-quien-votar/page";
import { generateMetadata as layoutMetadata } from "@/app/[locale]/a-quien-votar/layout";
import { generateMetadata as resultMetadata } from "@/app/[locale]/a-quien-votar/resultado/page";
import { generateMetadata as dvhMetadata } from "@/app/[locale]/a-quien-votar/dijeron-vs-hicieron/page";
import { generateMetadata as partyMetadata } from "@/app/[locale]/a-quien-votar/partidos/[id]/page";

const SITE = "https://www.libertarios.eu";
const LANGS = ["es", "ca", "gl", "eu"] as const;
const p = <T extends object>(v: T) => Promise.resolve(v);

type Img = { url: string; width?: number; height?: number; alt?: string };
const ogImage = (m: { openGraph?: unknown }) => ((m.openGraph as { images: Img[] }).images)[0];

/** Un resultado completo y válido con el dataset real. */
function sampleResultParams(): URLSearchParams {
  const answers: Answers = {};
  dataset.questions.forEach((q, i) => {
    answers[q.id] = { value: ([2, 1, -1, -2] as const)[i % 4], important: false };
  });
  return encodeResultParams({ answers }, dataset.questions, dataset.version);
}

beforeEach(() => cleanup());

describe("ilustración de la portada", () => {
  it("es decorativa: aria-hidden y sin foco", () => {
    render(<VoteHandIllustration />);
    const svg = screen.getByTestId("vote-hand-illustration");
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg.querySelector("title")).toBeNull();
  });

  it("las piezas animadas se apagan con prefers-reduced-motion", () => {
    render(<VoteHandIllustration />);
    const animated = document.querySelectorAll(".vote-ballot-drop, .vote-slot-glow");
    expect(animated.length).toBeGreaterThanOrEqual(3);
    animated.forEach((el) => expect(el.getAttribute("class")).toContain("motion-reduce:animate-none"));
    // Y las animaciones solo existen dentro de `no-preference`.
    const css = readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf8");
    const block = css.slice(css.indexOf("@keyframes vote-ballot-drop") - 400);
    expect(block).toMatch(/@media \(prefers-reduced-motion: no-preference\)\s*\{\s*@keyframes vote-ballot-drop/);
  });

  it("sin colores de partido: solo tokens del sitio", () => {
    const { container } = render(<VoteHandIllustration />);
    expect(container.innerHTML).not.toMatch(/fill="#|stroke="#/);
    dataset.parties.forEach((party) => expect(container.innerHTML).not.toContain(party.color));
  });

  it("los dibujos de las tarjetas también son decorativos", () => {
    for (const kind of ["programme", "record", "hemeroteca"] as const) {
      render(<TileArt kind={kind} />);
      expect(screen.getByTestId(`tile-art-${kind}`)).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("la portada la lleva, con el JSON-LD", async () => {
    const { container } = render(await IntroPage({ params: p({ locale: "es" }) }));
    expect(screen.getByTestId("vote-hand-illustration")).toBeInTheDocument();
    expect(screen.getByTestId("intro-dvh-button")).toBeInTheDocument();
    const ld = container.querySelector('script[type="application/ld+json"]');
    expect(ld).not.toBeNull();
    const json = JSON.parse(ld!.textContent ?? "{}");
    expect(json["@type"]).toBe("WebApplication");
    expect(json.isAccessibleForFree).toBe(true);
    expect(json.publisher.name).toBe("Libertarios.eu");
  });
});

describe("textos para compartir", () => {
  it.each(LANGS)("%s: títulos ≤ 60 y descripciones ≤ 155", (lang) => {
    const s = getSeoStrings(lang);
    for (const title of [s.introTitle, s.dvhTitle, s.resultTitleGeneric]) expect(title.length).toBeLessThanOrEqual(60);
    for (const d of [s.introDescription, s.resultDescription, s.dvhDescription, s.partyDescription]) {
      expect(fmt(d, { n: 15, party: "PSOE" }).length).toBeLessThanOrEqual(155);
    }
  });

  it("ca, gl y eu tienen sus propias cadenas (no caen al castellano)", () => {
    const es = getSeoStrings("es");
    for (const lang of ["ca", "gl", "eu"]) {
      const s = getSeoStrings(lang);
      for (const key of Object.keys(es) as (keyof typeof es)[]) expect(s[key], `${lang}.${key}`).not.toBe(es[key]);
    }
  });
});

describe("metadatos de la portada", () => {
  it.each(LANGS)("%s: og:image absoluta en su idioma, og:locale y alternativas", async (lang) => {
    const m = await layoutMetadata({ params: p({ locale: lang }) });
    const img = ogImage(m);
    expect(img.url).toBe(`${SITE}/api/og/afinidad?l=${lang}`);
    expect([img.width, img.height]).toEqual([1200, 630]);
    const og = m.openGraph as Record<string, unknown>;
    expect(og.type).toBe("website");
    expect(og.locale).toBe(OG_LOCALE[lang]);
    expect(og.alternateLocale).toEqual(LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]));
    expect(og.url).toBe(`${SITE}/${lang}/a-quien-votar`);
    expect((m.twitter as { card: string }).card).toBe("summary_large_image");
    expect(m.alternates?.canonical).toBe(`/${lang}/a-quien-votar`);
    expect(Object.keys(m.alternates?.languages ?? {})).toEqual(["es-ES", "ca-ES", "gl-ES", "eu-ES", "x-default"]);
    expect(m.title).toBe(getSeoStrings(lang).introTitle);
  });

  it("JSON-LD en el idioma de la página", () => {
    expect(introJsonLd("gl").inLanguage).toBe("gl-ES");
    expect(introJsonLd("eu").url).toBe(`${SITE}/eu/a-quien-votar`);
  });
});

describe("metadatos del resultado", () => {
  it.each(LANGS)("%s: «Mi resultado: X», imagen con todos los parámetros e idioma, noindex", async (lang) => {
    const sp = sampleResultParams();
    sp.set("ca", "13");
    const leader = resultLeader(sp, dataset);
    expect(leader).not.toBeNull();
    const m = await resultMetadata({ params: p({ locale: lang }), searchParams: p(Object.fromEntries(sp)) });
    const url = new URL(ogImage(m).url);
    expect(url.origin + url.pathname).toBe(`${SITE}/api/og/afinidad`);
    for (const key of ["r", "v", "ca"]) expect(url.searchParams.get(key)).toBe(sp.get(key));
    expect(url.searchParams.get("l")).toBe(lang);
    expect((m.openGraph as { title: string }).title).toBe(fmt(getSeoStrings(lang).resultTitle, { party: leader!.name }));
    expect((m.openGraph as { locale: string }).locale).toBe(OG_LOCALE[lang]);
    expect(m.robots).toEqual({ index: false, follow: true });
  });

  it("anónimo: título e imagen genéricos, sin las respuestas", async () => {
    const sp = sampleResultParams();
    const m = await resultMetadata({ params: p({ locale: "ca" }), searchParams: p({ ...Object.fromEntries(sp), anon: "1" }) });
    expect(ogImage(m).url).toBe(`${SITE}/api/og/afinidad?anon=1&l=ca`);
    expect((m.openGraph as { title: string }).title).toBe(getSeoStrings("ca").resultTitleGeneric);
  });

  it("enlace ilegible: título genérico", async () => {
    const m = await resultMetadata({ params: p({ locale: "es" }), searchParams: p({ r: "zzz", v: "x" }) });
    expect((m.openGraph as { title: string }).title).toBe(getSeoStrings("es").resultTitleGeneric);
  });
});

describe("metadatos de «Dijeron vs. hicieron» y de las fichas", () => {
  it.each(LANGS)("%s: «Dijeron vs. hicieron» con su título y su URL", async (lang) => {
    const m = await dvhMetadata({ params: p({ locale: lang }) });
    expect(m.title).toBe(getSeoStrings(lang).dvhTitle);
    expect((m.openGraph as { url: string }).url).toBe(`${SITE}/${lang}/a-quien-votar/dijeron-vs-hicieron`);
    expect(ogImage(m).url).toBe(`${SITE}/api/og/afinidad?l=${lang}`);
    expect(m.alternates?.canonical).toBe(`/${lang}/a-quien-votar/dijeron-vs-hicieron`);
  });

  it.each(LANGS)("%s: ficha con ?dvh= usa la tarjeta de la entrada en su idioma", async (lang) => {
    const entry = (dataset.saidVsDid ?? [])[0];
    expect(entry).toBeDefined();
    const m = await partyMetadata({
      params: p({ locale: lang, id: entry.partyId }),
      searchParams: p({ dvh: entry.id }),
    });
    expect(ogImage(m).url).toBe(`${SITE}/api/og/afinidad?dvh=${encodeURIComponent(entry.id)}&l=${lang}`);
    expect((m.openGraph as { locale: string }).locale).toBe(OG_LOCALE[lang]);
    expect(String(m.title).length).toBeLessThanOrEqual(60);
    expect(m.alternates?.canonical).toBe(`/${lang}/a-quien-votar/partidos/${entry.partyId}`);
  });
});
