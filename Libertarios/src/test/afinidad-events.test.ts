import fs from "node:fs";
import path from "node:path";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import {
  AFINIDAD_EVENTS,
  CONTEXT_STEPS,
  EXPLORE_FROM,
  MAX_EVENTS_PER_BATCH,
  allowedPropFor,
  sanitizeEventProps,
} from "@/lib/afinidad/events";
import { parseEventBatch } from "@/lib/afinidad/event-schema";
import { clientKey, createRateLimiter } from "@/lib/afinidad/rate-limit";

const persist = vi.hoisted(() => vi.fn(async () => true));
vi.mock("@/lib/afinidad/events-server", () => ({ persistEventBatch: persist }));

import { POST } from "@/app/api/afinidad/event/route";
import { middleware } from "@/middleware";

const MIGRATION = fs.readFileSync(
  path.resolve(__dirname, "../../supabase/migrations/0009_afinidad_events.sql"),
  "utf8",
);

// La lista de eventos la redefine 0010 (amplía la de 0009 con «Dijeron vs.
// hicieron»); las propiedades no cambian y siguen en 0009.
const LATEST_EVENTS = fs.readFileSync(
  path.resolve(__dirname, "../../supabase/migrations/0010_afinidad_events_dvh.sql"),
  "utf8",
);

const batch = (e: unknown[], extra: Record<string, unknown> = {}) => ({ v: "2026.10.0", l: "es", e, ...extra });

describe("eventos · lista blanca", () => {
  it("la lista de TypeScript es exactamente la del CHECK y la de la función en la última migración (0010)", () => {
    const check = LATEST_EVENTS.match(/afinidad_events_event_chk check \(event in \(([\s\S]*?)\)\)/)?.[1] ?? "";
    const fn = LATEST_EVENTS.match(/p_event not in \(([\s\S]*?)\) then/)?.[1] ?? "";
    const names = (sql: string) => Array.from(sql.matchAll(/'([a-z_]+)'/g)).map((m) => m[1]).sort();
    expect(names(check)).toEqual([...AFINIDAD_EVENTS].sort());
    expect(names(fn)).toEqual([...AFINIDAD_EVENTS].sort());
  });

  it("las propiedades y sus valores coinciden con la base", () => {
    expect(MIGRATION).toContain("(props - array['anon', 'from', 'step']) = '{}'::jsonb");
    for (const v of EXPLORE_FROM) expect(MIGRATION).toMatch(new RegExp(`'from'[^;]*'${v}'`));
    for (const v of CONTEXT_STEPS) expect(MIGRATION).toMatch(new RegExp(`'step'[^;]*'${v}'`));
  });

  it("compartir una entrada de «Dijeron vs. hicieron» no lleva propiedades, tampoco en la base", () => {
    expect(allowedPropFor("afinidad_share_dvh")).toBeNull();
    expect(allowedPropFor("afinidad_dvh_open")).toBeNull();
    expect(sanitizeEventProps("afinidad_share_dvh", { anon: true, party: "pp" })).toEqual({});
    // La excepción va antes que la regla `afinidad_share_%` → anon.
    const fn = LATEST_EVENTS.slice(LATEST_EVENTS.indexOf("v_allowed := case"));
    expect(fn.indexOf("p_event = 'afinidad_share_dvh'")).toBeGreaterThan(-1);
    expect(fn.indexOf("p_event = 'afinidad_share_dvh'")).toBeLessThan(fn.indexOf("afinidad\\_share\\_%"));
  });

  it("ningún evento admite propiedades de opinión", () => {
    for (const e of AFINIDAD_EVENTS) {
      expect(["anon", "from", "step", null]).toContain(allowedPropFor(e));
    }
  });
});

describe("eventos · limpieza de propiedades", () => {
  it("tira respuestas, voto, comunidad, partidos y cualquier clave no prevista", () => {
    const dirty = {
      anon: true,
      usual_vote: "pp",
      usualVote: "psoe",
      region: "13",
      answers: "2211",
      party: "vox",
      r: "abc",
      email: "a@b.es",
    };
    expect(sanitizeEventProps("afinidad_share_x", dirty)).toEqual({ anon: true });
    expect(sanitizeEventProps("afinidad_complete", dirty)).toEqual({});
    expect(sanitizeEventProps("afinidad_start", { v: "2026.10.0" })).toEqual({});
  });

  it("tira valores de tipo o rango no permitido", () => {
    expect(sanitizeEventProps("afinidad_share_x", { anon: "true" })).toEqual({});
    expect(sanitizeEventProps("afinidad_explore_aprende", { from: "https://evil" })).toEqual({});
    expect(sanitizeEventProps("afinidad_explore_aprende", { from: "pie" })).toEqual({ from: "pie" });
    expect(sanitizeEventProps("afinidad_context_declared", { step: "pp" })).toEqual({});
    expect(sanitizeEventProps("afinidad_context_declared", { step: "vote" })).toEqual({ step: "vote" });
    expect(sanitizeEventProps("afinidad_share_x", ["anon"])).toEqual({});
    expect(sanitizeEventProps("afinidad_share_x", null)).toEqual({});
  });
});

describe("eventos · esquema zod del lote", () => {
  it("acepta un lote válido y limpia sus propiedades", () => {
    const parsed = parseEventBatch(
      batch([{ n: "afinidad_share_whatsapp", p: { anon: false, usual_vote: "pp" } }, { n: "afinidad_start" }]),
    );
    expect(parsed).toEqual({
      v: "2026.10.0",
      l: "es",
      e: [
        { n: "afinidad_share_whatsapp", p: { anon: false } },
        { n: "afinidad_start", p: {} },
      ],
    });
  });

  it("rechaza eventos fuera de la lista, lotes vacíos o demasiado largos", () => {
    expect(parseEventBatch(batch([{ n: "afinidad_vote_pp" }]))).toBeNull();
    expect(parseEventBatch(batch([]))).toBeNull();
    expect(
      parseEventBatch(batch(Array.from({ length: MAX_EVENTS_PER_BATCH + 1 }, () => ({ n: "afinidad_start" })))),
    ).toBeNull();
  });

  it("rechaza versión, idioma o claves extra", () => {
    expect(parseEventBatch(batch([{ n: "afinidad_start" }], { v: "../../x" }))).toBeNull();
    expect(parseEventBatch(batch([{ n: "afinidad_start" }], { l: "en" }))).toBeNull();
    expect(parseEventBatch(batch([{ n: "afinidad_start" }], { sid: "abc" }))).toBeNull();
    expect(parseEventBatch(batch([{ n: "afinidad_start", region: "13" }]))).toBeNull();
    expect(parseEventBatch("nope")).toBeNull();
  });
});

describe("eventos · límite por cliente", () => {
  it("corta al pasar del límite y se reabre con la ventana siguiente", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect([1, 2, 3, 4].map(() => limiter.take("a", 1, 0))).toEqual([true, true, true, false]);
    expect(limiter.take("b", 1, 0)).toBe(true);
    expect(limiter.take("a", 1, 1000)).toBe(true);
  });

  it("usa la primera IP de x-forwarded-for", () => {
    expect(clientKey(new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" }))).toBe("1.2.3.4");
    expect(clientKey(new Headers())).toBe("unknown");
  });
});

describe("POST /api/afinidad/event", () => {
  let ip = 0;
  const post = (body: unknown, headers: Record<string, string> = {}) =>
    POST(
      new Request("https://www.libertarios.eu/api/afinidad/event", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "https://www.libertarios.eu",
          "x-forwarded-for": `10.0.0.${++ip}`,
          ...headers,
        },
        body: typeof body === "string" ? body : JSON.stringify(body),
      }),
    );

  beforeEach(() => persist.mockClear());

  it("acepta un lote válido (204) y guarda solo lo limpio", async () => {
    const res = await post(batch([{ n: "afinidad_explore_medidas", p: { from: "resultado", region: "13" } }]));
    expect(res.status).toBe(204);
    expect(persist).toHaveBeenCalledWith({
      v: "2026.10.0",
      l: "es",
      e: [{ n: "afinidad_explore_medidas", p: { from: "resultado" } }],
    });
  });

  it("rechaza otro origen (403) sin tocar la base", async () => {
    expect((await post(batch([{ n: "afinidad_start" }]), { origin: "https://evil.example" })).status).toBe(403);
    expect((await post(batch([{ n: "afinidad_start" }]), { "sec-fetch-site": "cross-site" })).status).toBe(403);
    expect(persist).not.toHaveBeenCalled();
  });

  it("rechaza JSON roto, eventos desconocidos (400) y cuerpos grandes (413)", async () => {
    expect((await post("{")).status).toBe(400);
    expect((await post(batch([{ n: "afinidad_nope" }]))).status).toBe(400);
    expect((await post("x".repeat(5000))).status).toBe(413);
    expect(persist).not.toHaveBeenCalled();
  });

  it("limita los envíos por cliente (429)", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 31; i++) {
      const res = await POST(
        new Request("https://www.libertarios.eu/api/afinidad/event", {
          method: "POST",
          headers: { origin: "https://www.libertarios.eu", "x-forwarded-for": "9.9.9.9" },
          body: JSON.stringify(batch([{ n: "afinidad_start" }])),
        }),
      );
      statuses.push(res.status);
    }
    expect(statuses.slice(0, 30).every((s) => s === 204)).toBe(true);
    expect(statuses[30]).toBe(429);
  });
});

describe("middleware · panel interno", () => {
  it("no redirige /admin/afinidad a un idioma y lo marca noindex y sin caché", () => {
    const res = middleware(new NextRequest("https://www.libertarios.eu/admin/afinidad"));
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("X-Robots-Tag")).toContain("noindex");
    expect(res.headers.get("Cache-Control")).toContain("no-store");
  });

  it("el resto sigue redirigiendo, también rutas que solo empiezan por «admin»", () => {
    const res = middleware(new NextRequest("https://www.libertarios.eu/administracion"));
    expect(res.headers.get("location")).toMatch(/\/es\/administracion$/);
  });
});
