/**
 * `fetch` educado para los scripts de afinidad.
 *
 * Comprobamos fuentes de terceros (congreso.es, BOE, webs de partidos,
 * archive.org): no podemos permitirnos que nos bloqueen ni cargarles el
 * servidor. Por eso:
 * - una sola petición a la vez por servidor y una pausa mínima entre ellas;
 * - un límite global de peticiones simultáneas;
 * - User-Agent que dice quién somos y dónde está la metodología;
 * - robots.txt leído de forma sencilla (grupo `User-agent: *` y el nuestro);
 *   si no se puede leer, no hay reglas (es lo que dice el estándar);
 * - reintentos con espera creciente solo ante errores de red, 429 y 5xx.
 */

export const USER_AGENT =
  "Mozilla/5.0 (compatible; LibertariosAfinidad/1.0; +https://www.libertarios.eu/a-quien-votar/metodologia)";

export interface PoliteOptions {
  /** Peticiones simultáneas en total. */
  concurrency?: number;
  /** Pausa mínima entre dos peticiones al mismo servidor, en ms. */
  perHostDelayMs?: number;
  timeoutMs?: number;
  retries?: number;
}

export interface FetchOutcome {
  ok: boolean;
  status: number;
  /** URL final tras redirecciones. */
  finalUrl?: string;
  contentType?: string;
  body?: ArrayBuffer;
  /** Error de red, timeout o «robots.txt lo prohíbe». */
  error?: string;
  blockedByRobots?: boolean;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class PoliteFetcher {
  private readonly concurrency: number;
  private readonly perHostDelayMs: number;
  private readonly timeoutMs: number;
  private readonly retries: number;
  private active = 0;
  private readonly waiting: Array<() => void> = [];
  private readonly hostChain = new Map<string, Promise<void>>();
  private readonly robots = new Map<string, Promise<RegExp[]>>();
  private readonly cache = new Map<string, Promise<FetchOutcome>>();

  constructor(opts: PoliteOptions = {}) {
    this.concurrency = opts.concurrency ?? 4;
    this.perHostDelayMs = opts.perHostDelayMs ?? 1000;
    this.timeoutMs = opts.timeoutMs ?? 20_000;
    this.retries = opts.retries ?? 2;
  }

  /** GET con cuerpo (cacheado por URL: la misma fuente se cita en muchas celdas). */
  get(url: string): Promise<FetchOutcome> {
    const k = `GET ${url}`;
    let p = this.cache.get(k);
    if (!p) {
      p = this.request(url, "GET");
      this.cache.set(k, p);
    }
    return p;
  }

  /**
   * ¿Está viva la URL? HEAD primero (no descarga PDFs de 30 MB); si el
   * servidor no admite HEAD (405/501) o lo rechaza (403, típico de CDNs), se
   * repite con GET.
   */
  async alive(url: string): Promise<FetchOutcome> {
    const k = `HEAD ${url}`;
    let p = this.cache.get(k);
    if (!p) {
      p = (async () => {
        const head = await this.request(url, "HEAD");
        if (head.blockedByRobots) return head;
        if (head.ok) return head;
        if (head.error || [400, 403, 405, 501].includes(head.status)) return this.get(url);
        return head;
      })();
      this.cache.set(k, p);
    }
    return p;
  }

  private async slot<T>(host: string, fn: () => Promise<T>): Promise<T> {
    // Límite global.
    if (this.active >= this.concurrency) await new Promise<void>((r) => this.waiting.push(r));
    this.active++;
    // Cola por servidor: cada petición espera a la anterior más la pausa.
    const prev = this.hostChain.get(host) ?? Promise.resolve();
    let release!: () => void;
    const mine = new Promise<void>((r) => (release = r));
    this.hostChain.set(
      host,
      prev.then(() => mine),
    );
    try {
      await prev;
      return await fn();
    } finally {
      setTimeout(release, this.perHostDelayMs);
      this.active--;
      this.waiting.shift()?.();
    }
  }

  private async disallowed(u: URL): Promise<boolean> {
    let rules = this.robots.get(u.origin);
    if (!rules) {
      rules = this.loadRobots(u);
      this.robots.set(u.origin, rules);
    }
    const path = u.pathname + u.search;
    return (await rules).some((rule) => rule.test(path));
  }

  private async loadRobots(u: URL): Promise<RegExp[]> {
    const res = await this.raw(`${u.origin}/robots.txt`, "GET").catch(() => null);
    if (!res || !res.ok || !res.body) return [];
    return parseRobots(new TextDecoder().decode(res.body));
  }

  private async request(url: string, method: "GET" | "HEAD"): Promise<FetchOutcome> {
    let u: URL;
    try {
      u = new URL(url);
    } catch {
      return { ok: false, status: 0, error: "URL mal formada" };
    }
    if (await this.disallowed(u)) return { ok: false, status: 0, error: "robots.txt lo prohíbe", blockedByRobots: true };
    let last: FetchOutcome = { ok: false, status: 0, error: "sin intentos" };
    for (let attempt = 0; attempt <= this.retries; attempt++) {
      if (attempt > 0) await sleep(1500 * 2 ** (attempt - 1));
      last = await this.raw(url, method);
      const retryable = !!last.error || last.status === 429 || last.status >= 500;
      if (!retryable) break;
    }
    return last;
  }

  private raw(url: string, method: "GET" | "HEAD"): Promise<FetchOutcome> {
    const host = new URL(url).host;
    return this.slot(host, async () => {
      try {
        const res = await fetch(url, {
          method,
          redirect: "follow",
          signal: AbortSignal.timeout(this.timeoutMs),
          headers: { "user-agent": USER_AGENT, accept: "*/*", "accept-language": "es-ES,es;q=0.9" },
        });
        const body = method === "GET" ? await res.arrayBuffer() : undefined;
        return {
          ok: res.ok,
          status: res.status,
          finalUrl: res.url,
          contentType: res.headers.get("content-type") ?? undefined,
          body,
        };
      } catch (e) {
        const err = e as Error;
        return { ok: false, status: 0, error: err.name === "TimeoutError" ? "timeout" : err.message };
      }
    });
  }
}

/**
 * robots.txt mínimo: reglas `Disallow` del grupo `*` o del nuestro
 * («LibertariosAfinidad»), con `*` y `$` como en el estándar. Se ignora
 * `Allow`: ante la duda, más prudente que el estándar, nunca menos.
 */
export function parseRobots(txt: string): RegExp[] {
  const out: RegExp[] = [];
  let applies = false;
  let lastWasAgent = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (field === "user-agent") {
      const match = value === "*" || /libertariosafinidad/i.test(value);
      applies = lastWasAgent ? applies || match : match;
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (applies && field === "disallow" && value) {
      const anchored = value.endsWith("$");
      const body = (anchored ? value.slice(0, -1) : value)
        .split("*")
        .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*");
      out.push(new RegExp("^" + body + (anchored ? "$" : "")));
    }
  }
  return out;
}
