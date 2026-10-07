import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { Answers } from "@/data/afinidad/types";
import type { DecodedResult } from "@/lib/afinidad/encode";
import { sampleDataset } from "./fixtures/afinidad-sample";

/**
 * «Novedades de Libertarios.eu»: consentimiento separado y sin marcar, nada
 * del test viaja con la suscripción, el token nunca vuelve al navegador,
 * Brevo sin configurar no rompe nada, las páginas de confirmación y baja
 * aguantan tokens rotos, y la importación de simpatizantes es una prueba por
 * defecto.
 */

vi.mock("server-only", () => ({}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/es/a-quien-votar/resultado",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  redirect: (url: string) => {
    throw Object.assign(new Error("NEXT_REDIRECT"), { url });
  },
}));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
}));
vi.mock("@/app/[locale]/a-quien-votar/actions", () => ({
  recordAfinidadResponse: vi.fn(async () => undefined),
}));
// El formulario del navegador llama a la action; aquí, a un doble.
const subscribeNewsletterMock = vi.fn(async (_fd: FormData) => ({ ok: true as const }));
vi.mock("@/app/[locale]/novedades/actions", () => ({
  subscribeNewsletter: (fd: FormData) => subscribeNewsletterMock(fd),
  confirmNewsletter: vi.fn(),
  unsubscribeNewsletter: vi.fn(),
}));

import { parseNewsletterForm, NEWSLETTER_CONSENT_VERSION } from "@/lib/newsletter/schema";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { ResultView } from "@/components/afinidad/ResultView";
import { buildConfirmationEmail } from "@/lib/newsletter/email";
import { brevoConfigFrom, sendTransactionalEmail } from "@/lib/newsletter/brevo-core";
import { DEFAULT_IMPORT_OPTIONS, parseImportArgs, runLegacyImport, type ImportDeps } from "@/lib/newsletter/legacy-import";
import { getNewsletterStrings, NEWSLETTER_TABLES } from "@/i18n/newsletter";
import { NewsletterTokenPage } from "@/app/[locale]/novedades/NewsletterTokenPage";

const form = (fields: Record<string, string | undefined>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) if (v !== undefined) fd.set(k, v);
  return fd;
};

const CONFIRM_TOKEN = `nlc_${"ab".repeat(32)}`;
const UNSUB_TOKEN = "3f2504e0-4f89-41d3-9a0c-0305e82c3301";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  subscribeNewsletterMock.mockClear();
});

describe("validación (zod)", () => {
  it("acepta correo + casilla y normaliza", () => {
    const r = parseNewsletterForm(form({ email: "  Ana@Ejemplo.ES ", consent: "on", source: "test", locale: "gl" }));
    expect(r).toEqual({ ok: true, data: { email: "ana@ejemplo.es", consent: "on", source: "test", locale: "gl" } });
  });

  it("sin casilla (o con «false») no hay alta", () => {
    for (const fields of [{ email: "a@b.es", source: "footer" }, { email: "a@b.es", consent: "false", source: "footer" }]) {
      expect(parseNewsletterForm(form(fields))).toEqual({ ok: false, error: "consent-required" });
    }
  });

  it("correo no válido", () => {
    expect(parseNewsletterForm(form({ email: "no-es-correo", consent: "on", source: "test" }))).toEqual({
      ok: false,
      error: "invalid-email",
    });
  });

  it("la web no puede declararse `legacy_affiliate` ni un origen inventado", () => {
    for (const source of ["legacy_affiliate", "otro", ""]) {
      expect(parseNewsletterForm(form({ email: "a@b.es", consent: "on", source })).ok).toBe(false);
    }
  });

  it("idioma desconocido cae a es", () => {
    const r = parseNewsletterForm(form({ email: "a@b.es", consent: "on", source: "test", locale: "xx" }));
    expect(r.ok && r.data.locale).toBe("es");
  });

  it("descarta todo lo que no sea correo, casilla, origen e idioma (respuestas, voto, comunidad…)", () => {
    const r = parseNewsletterForm(
      form({ email: "a@b.es", consent: "on", source: "test", locale: "es", r: "2a1b", vh: "pp", ca: "09", answers: "x" }),
    );
    expect(r.ok && Object.keys(r.data).sort()).toEqual(["consent", "email", "locale", "source"]);
  });
});

describe("formulario", () => {
  it("la casilla empieza sin marcar y el texto dice que es Libertarios.eu", () => {
    render(<NewsletterForm source="footer" locale="es" />);
    const box = screen.getByRole("checkbox");
    expect(box).not.toBeChecked();
    expect(screen.getByText(/Quiero recibir novedades de Libertarios\.eu \(pocas, sin spam; baja en un clic\)\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Qué hacemos con tu correo/ })).toHaveAttribute("href", "/es/proyecto#privacidad");
  });

  it("solo envía correo, casilla, origen e idioma, y confirma con «te hemos enviado un correo»", async () => {
    render(<NewsletterForm source="test" locale="ca" />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ana@ejemplo.cat" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("textbox").closest("form")!);
    await waitFor(() => expect(subscribeNewsletterMock).toHaveBeenCalledTimes(1));
    const sent = subscribeNewsletterMock.mock.calls[0][0];
    expect(Array.from(sent.keys()).sort()).toEqual(["consent", "email", "locale", "source"]);
    expect(Object.fromEntries(sent.entries())).toEqual({
      email: "ana@ejemplo.cat",
      consent: "on",
      source: "test",
      locale: "ca",
    });
    expect(await screen.findByRole("status")).toHaveTextContent(NEWSLETTER_TABLES.ca.form.success);
  });

  it("los cuatro idiomas tienen todos los textos; el resto cae al castellano", () => {
    const keys = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? keys(v).map((s) => `${k}.${s}`) : [k]));
    const es = keys(NEWSLETTER_TABLES.es).sort();
    for (const lang of ["ca", "gl", "eu"] as const) {
      expect(keys(NEWSLETTER_TABLES[lang]).sort()).toEqual(es);
      expect(Object.values(NEWSLETTER_TABLES[lang].form).every((v) => v.length > 0)).toBe(true);
    }
    expect(getNewsletterStrings("pt")).toBe(NEWSLETTER_TABLES.es);
  });
});

describe("en el resultado del test", () => {
  const answers: Answers = {
    q1: { value: 2, important: false },
    q2: { value: -1, important: false },
    q3: { value: 1, important: true },
    q4: { value: -2, important: false },
    q5: { value: -1, important: false },
  };
  const decoded: DecodedResult = { answers, context: { usualVote: "partido-a" }, version: sampleDataset.version, stale: false };

  it("el resultado se ve entero sin tocar el boletín; casilla sin marcar; va después del resultado y antes de «Sigue explorando»", () => {
    render(<ResultView dataset={sampleDataset} decoded={decoded} lang="es" origin="https://example.org" />);
    const headline = screen.getByTestId("headline");
    expect(within(headline).getByText("Partido A")).toBeInTheDocument();

    const box = screen.getByTestId("newsletter-test");
    expect(within(box).getByRole("checkbox")).not.toBeChecked();
    expect(subscribeNewsletterMock).not.toHaveBeenCalled();

    const follows = (a: Node, b: Node) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    expect(follows(headline, box)).toBe(true);
    expect(follows(box, screen.getByTestId("keep-exploring"))).toBe(true);
  });
});

describe("server action", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  async function loadActions(sendSpy = vi.fn(async () => true)) {
    vi.doUnmock("@/app/[locale]/novedades/actions");
    const subscribe = vi.fn(async () => ({
      ok: true as const,
      send: { confirmToken: CONFIRM_TOKEN, unsubscribeToken: UNSUB_TOKEN },
    }));
    const confirm = vi.fn(async () => ({ status: "ok" as const, email: "a@b.es" }));
    const unsubscribe = vi.fn(async () => ({ status: "ok" as const, email: "a@b.es" }));
    vi.doMock("@/lib/newsletter/subscribers", () => ({ subscribe, confirm, unsubscribe }));
    vi.doMock("@/lib/newsletter/brevo", () => ({
      sendConfirmation: sendSpy,
      syncConfirmed: vi.fn(async () => true),
      syncUnsubscribed: vi.fn(async () => true),
    }));
    const actions = await import("@/app/[locale]/novedades/actions");
    return { actions, subscribe, confirm, unsubscribe, sendSpy };
  }

  it("nunca devuelve el token, y a la base solo llegan correo, origen e idioma", async () => {
    const { actions, subscribe, sendSpy } = await loadActions();
    const res = await actions.subscribeNewsletter(
      form({ email: "Ana@B.es", consent: "on", source: "test", locale: "es", r: "2a1b", vh: "pp", ca: "09" }),
    );
    expect(res).toEqual({ ok: true });
    expect(JSON.stringify(res)).not.toContain("nlc_");
    expect(JSON.stringify(res)).not.toContain(UNSUB_TOKEN);
    expect(subscribe).toHaveBeenCalledWith({ email: "ana@b.es", consent: "on", source: "test", locale: "es" });
    expect(sendSpy).toHaveBeenCalledWith({
      email: "ana@b.es",
      locale: "es",
      confirmToken: CONFIRM_TOKEN,
      unsubscribeToken: UNSUB_TOKEN,
    });
  });

  it("si el correo no sale (Brevo sin configurar o caído), la respuesta es la misma", async () => {
    const { actions } = await loadActions(vi.fn(async () => false));
    expect(await actions.subscribeNewsletter(form({ email: "a@b.es", consent: "on", source: "footer" }))).toEqual({ ok: true });
  });

  it("sin casilla no llama a la base", async () => {
    const { actions, subscribe } = await loadActions();
    expect(await actions.subscribeNewsletter(form({ email: "a@b.es", source: "footer" }))).toEqual({
      ok: false,
      error: "consent-required",
    });
    expect(subscribe).not.toHaveBeenCalled();
  });

  it("confirmar/baja con un token roto redirige a «inválido» sin tocar la base, y la URL final no lleva el token", async () => {
    const { actions, confirm, unsubscribe } = await loadActions();
    await expect(actions.confirmNewsletter(form({ t: "nlc_corto", locale: "gl" }))).rejects.toMatchObject({
      url: "/gl/novedades/confirmar?estado=invalido",
    });
    await expect(actions.unsubscribeNewsletter(form({ t: "no-es-uuid", locale: "pt" }))).rejects.toMatchObject({
      url: "/pt/novedades/baja?estado=invalido",
    });
    expect(confirm).not.toHaveBeenCalled();
    expect(unsubscribe).not.toHaveBeenCalled();
    await expect(actions.confirmNewsletter(form({ t: CONFIRM_TOKEN, locale: "zz" }))).rejects.toMatchObject({
      url: "/es/novedades/confirmar?estado=ok",
    });
  });
});

describe("Brevo", () => {
  it("sin variables no hace nada: sin fetch, sin excepción, con aviso en el log", async () => {
    vi.resetModules();
    vi.doUnmock("@/lib/newsletter/brevo");
    vi.stubEnv("BREVO_API_KEY", "");
    vi.stubEnv("BREVO_SENDER_EMAIL", "");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const brevo = await import("@/lib/newsletter/brevo");
    await expect(
      brevo.sendConfirmation({ email: "a@b.es", locale: "es", confirmToken: CONFIRM_TOKEN, unsubscribeToken: UNSUB_TOKEN }),
    ).resolves.toBe(false);
    await expect(brevo.syncConfirmed("a@b.es")).resolves.toBe(false);
    await expect(brevo.syncUnsubscribed("a@b.es")).resolves.toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("BREVO_API_KEY"));
    expect(brevo.isBrevoConfigured()).toBe(false);
  });

  it("con configuración, manda a /v3/smtp/email con la clave en cabecera y List-Unsubscribe", async () => {
    const config = brevoConfigFrom({ BREVO_API_KEY: "xkeysib-test", BREVO_SENDER_EMAIL: "hola@libertarios.eu", BREVO_LIST_ID: "7" });
    expect(config).toEqual({ apiKey: "xkeysib-test", senderEmail: "hola@libertarios.eu", senderName: "Libertarios.eu", listId: 7 });
    const fetchImpl = vi.fn(async () => new Response(null, { status: 201 }));
    const built = buildConfirmationEmail({
      siteUrl: "https://www.libertarios.eu",
      locale: "es",
      confirmToken: CONFIRM_TOKEN,
      unsubscribeToken: UNSUB_TOKEN,
    });
    await expect(sendTransactionalEmail(config!, { to: "a@b.es", ...built }, fetchImpl as unknown as typeof fetch)).resolves.toBe(true);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");
    expect((init.headers as Record<string, string>)["api-key"]).toBe("xkeysib-test");
    const body = JSON.parse(init.body as string);
    expect(body.headers["List-Unsubscribe"]).toContain(`/api/newsletter/unsubscribe?t=${UNSUB_TOKEN}`);
    expect(body.headers["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
  });

  it("un fallo de Brevo devuelve false, no lanza", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const config = brevoConfigFrom({ BREVO_API_KEY: "k", BREVO_SENDER_EMAIL: "s@x.es" })!;
    const failing = vi.fn(async () => {
      throw new TypeError("network");
    });
    await expect(
      sendTransactionalEmail(config, { to: "a@b.es", subject: "s", html: "h", text: "t" }, failing as unknown as typeof fetch),
    ).resolves.toBe(false);
  });
});

describe("subscribers (RPC)", () => {
  beforeEach(() => {
    vi.doUnmock("@/lib/newsletter/subscribers");
  });

  it("sin NEWSLETTER_SERVER_KEY no llama a la base", async () => {
    vi.resetModules();
    vi.stubEnv("SUPABASE_URL", "https://x.supabase.co");
    vi.stubEnv("SUPABASE_ANON_KEY", "anon");
    vi.stubEnv("NEWSLETTER_SERVER_KEY", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { subscribe } = await import("@/lib/newsletter/subscribers");
    expect(await subscribe({ email: "a@b.es", consent: "on", source: "test", locale: "es" })).toEqual({ ok: false });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("el cuerpo de la RPC lleva solo clave, correo, casilla, origen, idioma y versión del texto", async () => {
    vi.resetModules();
    vi.stubEnv("SUPABASE_URL", "https://x.supabase.co");
    vi.stubEnv("SUPABASE_ANON_KEY", "anon");
    vi.stubEnv("NEWSLETTER_SERVER_KEY", `nlk_${"0".repeat(64)}`);
    // jsdom no trae `AbortSignal.timeout`, que `rpc.ts` usa (Node sí).
    const S = AbortSignal as unknown as { timeout?: (ms: number) => AbortSignal };
    if (typeof S.timeout !== "function") S.timeout = () => new AbortController().signal;
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify([{ confirm_token: CONFIRM_TOKEN, unsubscribe_token: UNSUB_TOKEN }])));
    const { subscribe } = await import("@/lib/newsletter/subscribers");
    const out = await subscribe({ email: "a@b.es", consent: "on", source: "registro", locale: "eu" });
    expect(out).toEqual({ ok: true, send: { confirmToken: CONFIRM_TOKEN, unsubscribeToken: UNSUB_TOKEN } });
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://x.supabase.co/rest/v1/rpc/subscribe_newsletter");
    expect(Object.keys(JSON.parse(init.body as string)).sort()).toEqual([
      "p_consent",
      "p_consent_text_version",
      "p_email",
      "p_locale",
      "p_server_key",
      "p_source",
    ]);
    expect(JSON.parse(init.body as string).p_consent_text_version).toBe(NEWSLETTER_CONSENT_VERSION);
  });
});

describe("correo de confirmación", () => {
  it("por idioma, con enlace de confirmación y de baja; pt cae a es; nada del test", () => {
    const ca = buildConfirmationEmail({ siteUrl: "https://www.libertarios.eu/", locale: "ca", confirmToken: CONFIRM_TOKEN, unsubscribeToken: UNSUB_TOKEN });
    expect(ca.subject).toBe(NEWSLETTER_TABLES.ca.email.subject);
    expect(ca.text).toContain(`https://www.libertarios.eu/ca/novedades/confirmar?t=${CONFIRM_TOKEN}`);
    expect(ca.html).toContain(`https://www.libertarios.eu/ca/novedades/baja?t=${UNSUB_TOKEN}`);
    expect(ca.html).not.toMatch(/<img|<script/i);
    const pt = buildConfirmationEmail({ siteUrl: "https://x.eu", locale: "pt", confirmToken: CONFIRM_TOKEN, unsubscribeToken: UNSUB_TOKEN });
    expect(pt.text).toContain("https://x.eu/es/novedades/confirmar");
    const legacy = buildConfirmationEmail({ siteUrl: "https://x.eu", locale: "es", confirmToken: CONFIRM_TOKEN, unsubscribeToken: UNSUB_TOKEN, legacy: true });
    expect(legacy.subject).toBe(NEWSLETTER_TABLES.es.email.subjectLegacy);
    expect(legacy.text).toContain("Te registraste en Libertarios.eu");
  });
});

describe("páginas de confirmación y baja", () => {
  const page = (kind: "confirm" | "unsubscribe", sp: Record<string, string | undefined>, locale = "es") =>
    render(<NewsletterTokenPage locale={locale} kind={kind} searchParams={sp} />);

  it("token roto o ausente: «este enlace no sirve», sin botón", () => {
    for (const sp of [{}, { t: "nlc_xyz" }, { t: "<script>" }] as Record<string, string | undefined>[]) {
      const { unmount } = page("confirm", sp);
      const box = screen.getByTestId("newsletter-token-page");
      expect(within(box).getByText(NEWSLETTER_TABLES.es.invalidTitle)).toBeInTheDocument();
      expect(within(box).queryByRole("button", { name: "Confirmar" })).toBeNull();
      unmount();
    }
    page("unsubscribe", { t: "no-es-un-uuid" }, "eu");
    expect(screen.getByText(NEWSLETTER_TABLES.eu.invalidTitle)).toBeInTheDocument();
  });

  it("abrir el enlace no confirma: enseña un botón (POST) con el token oculto", () => {
    page("confirm", { t: CONFIRM_TOKEN }, "gl");
    const box = screen.getByTestId("newsletter-token-page");
    const button = within(box).getByRole("button", { name: NEWSLETTER_TABLES.gl.confirm.button });
    const formEl = button.closest("form")!;
    expect((formEl.querySelector('input[name="t"]') as HTMLInputElement).value).toBe(CONFIRM_TOKEN);
  });

  it("estados tras el botón: hecho, inválido, no disponible", () => {
    const { unmount } = page("unsubscribe", { estado: "ok" }, "ca");
    expect(screen.getByText(NEWSLETTER_TABLES.ca.unsubscribe.doneTitle)).toBeInTheDocument();
    unmount();
    const r2 = page("confirm", { estado: "invalido" });
    expect(screen.getByText(NEWSLETTER_TABLES.es.invalidTitle)).toBeInTheDocument();
    r2.unmount();
    page("confirm", { estado: "error", t: CONFIRM_TOKEN });
    expect(screen.getByText(NEWSLETTER_TABLES.es.unavailable)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Confirmar" })).toBeNull();
  });
});

describe("importación de simpatizantes", () => {
  const fakeDeps = (tokens: number, sendOk: (i: number) => boolean = () => true) => {
    let issued = 0;
    const calls: string[] = [];
    const deps: ImportDeps = {
      rpc: vi.fn(async (name: string, body: Record<string, unknown>) => {
        calls.push(name);
        if (name === "newsletter_legacy_counts") return { affiliates_with_email: tokens, to_import: tokens };
        if (name === "newsletter_import_legacy_affiliates") return tokens;
        if (name === "newsletter_issue_legacy_tokens") {
          const n = Math.min(Number(body.p_limit), tokens - issued);
          const out = Array.from({ length: n }, (_, i) => ({
            email: `p${issued + i}@x.es`,
            locale: "es",
            confirm_token: CONFIRM_TOKEN,
            unsubscribe_token: UNSUB_TOKEN,
          }));
          issued += n;
          return out;
        }
        return null;
      }),
      send: vi.fn(async () => sendOk(0)),
      sleep: vi.fn(async () => {}),
      log: vi.fn(),
    };
    return { deps, calls };
  };

  it("por defecto es una prueba: solo recuentos, ni importa ni envía", async () => {
    expect(parseImportArgs([])).toEqual(DEFAULT_IMPORT_OPTIONS);
    expect(DEFAULT_IMPORT_OPTIONS.mode).toBe("dry-run");
    const { deps, calls } = fakeDeps(10);
    const report = await runLegacyImport(parseImportArgs([]), deps);
    expect(calls).toEqual(["newsletter_legacy_counts"]);
    expect(deps.send).not.toHaveBeenCalled();
    expect(report).toMatchObject({ mode: "dry-run", imported: 0, sent: 0 });
  });

  it("--import copia pero no envía", async () => {
    const { deps, calls } = fakeDeps(10);
    const report = await runLegacyImport(parseImportArgs(["--import"]), deps);
    expect(calls).toEqual(["newsletter_legacy_counts", "newsletter_import_legacy_affiliates"]);
    expect(deps.send).not.toHaveBeenCalled();
    expect(report.imported).toBe(10);
  });

  it("--send envía por lotes, con pausa y tope, y nunca imprime direcciones", async () => {
    const { deps } = fakeDeps(10);
    const report = await runLegacyImport(parseImportArgs(["--send", "--batch=3", "--limit=7", "--delay-ms=50"]), deps);
    expect(report.sent).toBe(7);
    expect(deps.sleep).toHaveBeenCalledWith(50);
    const logged = (deps.log as ReturnType<typeof vi.fn>).mock.calls.flat().join("\n");
    expect(logged).not.toMatch(/@x\.es/);
  });

  it("si Brevo falla, devuelve a pendiente y se para tras 5 fallos seguidos", async () => {
    const { deps, calls } = fakeDeps(20, () => false);
    const report = await runLegacyImport(parseImportArgs(["--send", "--batch=10", "--delay-ms=0"]), deps);
    expect(report.sent).toBe(0);
    expect(report.failed).toBe(5);
    expect(report.aborted).toBe(true);
    // Los 5 fallidos y los 5 que quedaban del lote vuelven a pendiente.
    expect(calls.filter((c) => c === "newsletter_release_legacy_token")).toHaveLength(10);
  });
});
