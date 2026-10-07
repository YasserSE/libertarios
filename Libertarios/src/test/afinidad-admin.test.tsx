import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  adminCookieOptions,
  adminTokenSchema,
  parseAdminStats,
  parseRangeDays,
  rangeFor,
  summarize,
  type AdminStats,
} from "@/lib/afinidad/admin-rules";
import { TRACK_EVENT, flushTrackQueue, setTrackTransport, track } from "@/lib/afinidad/track";

/*
 * El panel y sus server actions dependen de `next/headers`, `next/navigation`
 * y de `admin.ts` (server-only, habla con Supabase). Aquí se sustituyen los
 * tres para comprobar el comportamiento sin red.
 */
const mocks = vi.hoisted(() => ({
  cookie: undefined as string | undefined,
  set: vi.fn(),
  del: vi.fn(),
  adminLogin: vi.fn(async (_t: unknown): Promise<string | null> => null),
  adminLogout: vi.fn(async () => {}),
  fetchAdminStats: vi.fn(async (): Promise<AdminStats | null> => null),
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
  cookies: async () => ({
    get: (name: string) => (name === ADMIN_COOKIE && mocks.cookie ? { name, value: mocks.cookie } : undefined),
    set: mocks.set,
    delete: mocks.del,
  }),
}));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new Error(`REDIRECT:${url}`);
  },
}));
vi.mock("@/lib/afinidad/admin", () => ({
  adminLogin: mocks.adminLogin,
  adminLogout: mocks.adminLogout,
  fetchAdminStats: mocks.fetchAdminStats,
}));

import AdminPage from "@/app/admin/afinidad/page";
import { loginAction, logoutAction } from "@/app/admin/afinidad/actions";

const SESSION = `afs_${"a".repeat(64)}`;
const TOKEN = `afa_${"b".repeat(64)}`;

const STATS: AdminStats = {
  from: "2026-10-05",
  to: "2026-10-06",
  k: 20,
  event_totals: [
    { event: "afinidad_start", n: 10 },
    { event: "afinidad_complete", n: 7 },
    { event: "afinidad_share_x", n: 2 },
  ],
  events_by_day: [
    { day: "2026-10-05", event: "afinidad_start", n: 4 },
    { day: "2026-10-06", event: "afinidad_start", n: 6 },
    { day: "2026-10-06", event: "afinidad_complete", n: 7 },
  ],
  events_by_locale: [{ locale: "es", event: "afinidad_start", n: 10 }],
  events_by_version: [{ version: "2026.10.0", event: "afinidad_start", n: 10 }],
  events_by_prop: [{ event: "afinidad_share_x", key: "anon", value: "true", n: 2 }],
  responses: {
    total: 40,
    by_day: [{ day: "2026-10-06", n: 40 }],
    by_version: [{ version: "2026.10.0", n: 40 }],
    by_usual_vote: [{ usual_vote: "psoe", n: 25 }],
    by_region: [{ region: "13", n: 40 }],
    by_region_vote: [],
  },
  rate_peaks: [],
};

const renderPage = async (searchParams: Record<string, string> = {}) =>
  render(await AdminPage({ searchParams: Promise.resolve(searchParams) }));

beforeEach(() => {
  cleanup();
  mocks.cookie = undefined;
  mocks.set.mockClear();
  mocks.del.mockClear();
  mocks.adminLogin.mockReset().mockResolvedValue(null);
  mocks.adminLogout.mockClear();
  mocks.fetchAdminStats.mockReset().mockResolvedValue(null);
});

describe("admin · cookie de sesión", () => {
  it("httpOnly, Secure, SameSite=Strict, prefijo __Host- y caducidad corta", () => {
    const o = adminCookieOptions();
    expect(ADMIN_COOKIE.startsWith("__Host-")).toBe(true);
    expect(o).toEqual({ httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: ADMIN_SESSION_SECONDS });
    expect(ADMIN_SESSION_SECONDS).toBeLessThanOrEqual(30 * 60);
  });

  it("el formato de token es estricto", () => {
    expect(adminTokenSchema.safeParse(TOKEN).success).toBe(true);
    expect(adminTokenSchema.safeParse(` ${TOKEN} `).success).toBe(true);
    expect(adminTokenSchema.safeParse(SESSION).success).toBe(false);
    expect(adminTokenSchema.safeParse("afa_' or 1=1 --").success).toBe(false);
  });
});

describe("admin · página", () => {
  it("sin cookie muestra solo el formulario y no llama a la base", async () => {
    await renderPage();
    expect(screen.getByLabelText("Token")).toHaveAttribute("type", "password");
    expect(screen.queryByText(/Tests empezados/)).not.toBeInTheDocument();
    expect(mocks.fetchAdminStats).not.toHaveBeenCalled();
  });

  it("con una cookie con formato inválido, tampoco llama a la base", async () => {
    mocks.cookie = "lo-que-sea";
    await renderPage();
    expect(screen.getByLabelText("Token")).toBeInTheDocument();
    expect(mocks.fetchAdminStats).not.toHaveBeenCalled();
  });

  it("sesión caducada o revocada (la base devuelve null): vuelve al formulario", async () => {
    mocks.cookie = SESSION;
    await renderPage();
    expect(mocks.fetchAdminStats).toHaveBeenCalledOnce();
    expect(screen.getByText(/La sesión ha caducado/)).toBeInTheDocument();
    expect(screen.queryByText(/Tests empezados/)).not.toBeInTheDocument();
  });

  it("con sesión válida pinta el panel, y la sesión no aparece en el HTML", async () => {
    mocks.cookie = SESSION;
    mocks.fetchAdminStats.mockResolvedValue(STATS);
    const { container } = await renderPage({ dias: "7" });
    expect(screen.getByText("Tests empezados")).toBeInTheDocument();
    expect(screen.getByText("70 %")).toBeInTheDocument();
    expect(container.innerHTML).not.toContain(SESSION);
    expect(mocks.fetchAdminStats).toHaveBeenCalledWith(SESSION, expect.objectContaining({ to: expect.any(String) }));
  });

  it("el error de acceso es genérico", async () => {
    await renderPage({ error: "1" });
    expect(screen.getByRole("alert")).toHaveTextContent("Token no válido.");
  });
});

describe("admin · server actions", () => {
  const form = (token: string) => {
    const f = new FormData();
    f.set("token", token);
    return f;
  };

  it("token bueno: guarda la SESIÓN (no el token) en la cookie con sus flags", async () => {
    mocks.adminLogin.mockResolvedValue(SESSION);
    await expect(loginAction(form(TOKEN))).rejects.toThrow("REDIRECT:/admin/afinidad");
    expect(mocks.set).toHaveBeenCalledWith(ADMIN_COOKIE, SESSION, adminCookieOptions());
    expect(JSON.stringify(mocks.set.mock.calls)).not.toContain(TOKEN);
  });

  it("más de 5 intentos por minuto y cliente no llegan a la base", async () => {
    mocks.adminLogin.mockClear();
    for (let i = 0; i < 6; i++) await loginAction(form("nope")).catch(() => {});
    // Como mucho 5 en la ventana (el test anterior ya gastó alguno).
    expect(mocks.adminLogin.mock.calls.length).toBeLessThanOrEqual(5);
    mocks.adminLogin.mockClear();
    mocks.adminLogin.mockResolvedValue(SESSION);
    await expect(loginAction(form(TOKEN))).rejects.toThrow("REDIRECT:/admin/afinidad?error=1");
    expect(mocks.adminLogin).not.toHaveBeenCalled();
    expect(mocks.set).not.toHaveBeenCalled();
  });

  it("token malo: no hay cookie y vuelve con error", async () => {
    await expect(loginAction(form("nope"))).rejects.toThrow("REDIRECT:/admin/afinidad?error=1");
    expect(mocks.set).not.toHaveBeenCalled();
  });

  it("salir cierra la sesión en la base y borra la cookie con los mismos flags", async () => {
    mocks.cookie = SESSION;
    await expect(logoutAction()).rejects.toThrow("REDIRECT:/admin/afinidad");
    expect(mocks.adminLogout).toHaveBeenCalledWith(SESSION);
    expect(mocks.del).toHaveBeenCalledWith(expect.objectContaining({ name: ADMIN_COOKIE, secure: true, path: "/" }));
  });
});

describe("admin · lectura y resumen de cifras", () => {
  it("valida el JSON de la base y rechaza formas raras", () => {
    expect(parseAdminStats(STATS)).toEqual(STATS);
    expect(parseAdminStats({ ...STATS, k: "20" })).toBeNull();
    expect(parseAdminStats(null)).toBeNull();
  });

  it("embudo, canales y días sin datos a cero", () => {
    const s = summarize(STATS);
    expect(s.starts).toBe(10);
    expect(s.completes).toBe(7);
    expect(s.completionRate).toBeCloseTo(0.7);
    expect(s.shares.find((x) => x.channel === "x")?.n).toBe(2);
    expect(s.daily).toEqual([
      { day: "2026-10-05", starts: 4, completes: 0, responses: 0 },
      { day: "2026-10-06", starts: 6, completes: 7, responses: 40 },
    ]);
  });

  it("rango: solo valores de la lista y en hora de Madrid", () => {
    expect(parseRangeDays("7")).toBe(7);
    expect(parseRangeDays("9999")).toBe(30);
    expect(rangeFor(7, new Date("2026-10-06T23:30:00Z"))).toEqual({ from: "2026-10-01", to: "2026-10-07" });
  });
});

describe("track()", () => {
  const sent: string[] = [];
  beforeEach(() => {
    sent.length = 0;
    vi.useFakeTimers();
    setTrackTransport((body) => sent.push(body));
  });
  afterEach(() => {
    flushTrackQueue();
    setTrackTransport(null);
    vi.useRealTimers();
    Object.defineProperty(navigator, "globalPrivacyControl", { value: undefined, configurable: true });
  });

  it("agrupa en un lote, añade versión e idioma y tira propiedades no permitidas", () => {
    const seen: unknown[] = [];
    const listener = (e: Event) => seen.push((e as CustomEvent).detail);
    window.addEventListener(TRACK_EVENT, listener);
    track("afinidad_share_x", { anon: true, usual_vote: "pp", region: "13" });
    track("afinidad_start");
    window.removeEventListener(TRACK_EVENT, listener);

    expect(seen).toEqual([
      { event: "afinidad_share_x", props: { anon: true } },
      { event: "afinidad_start", props: undefined },
    ]);
    expect(sent).toHaveLength(0); // no bloquea: se envía después
    vi.advanceTimersByTime(3000);
    expect(sent).toHaveLength(1);
    const body = JSON.parse(sent[0]);
    expect(body).toEqual({
      v: expect.stringMatching(/^\d{4}\./),
      l: "es",
      e: [
        { n: "afinidad_share_x", p: { anon: true } },
        { n: "afinidad_start", p: {} },
      ],
    });
    expect(sent[0]).not.toMatch(/pp|region|usual/);
  });

  it("al ocultar la pestaña envía lo pendiente", () => {
    track("afinidad_source_open");
    window.dispatchEvent(new Event("pagehide"));
    expect(sent).toHaveLength(1);
  });

  it("con Global Privacy Control no envía nada (pero sigue emitiendo el evento local)", () => {
    Object.defineProperty(navigator, "globalPrivacyControl", { value: true, configurable: true });
    track("afinidad_start");
    vi.advanceTimersByTime(5000);
    expect(sent).toHaveLength(0);
  });

  it("un transporte que falla no rompe nada", () => {
    setTrackTransport(() => {
      throw new Error("boom");
    });
    expect(() => {
      track("afinidad_start");
      flushTrackQueue();
    }).not.toThrow();
  });
});
