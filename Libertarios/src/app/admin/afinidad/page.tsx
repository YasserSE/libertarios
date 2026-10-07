import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dataset } from "@/data/afinidad";
import { getFlowStrings } from "@/i18n/afinidad/flow";
import { fetchAdminStats } from "@/lib/afinidad/admin";
import {
  ADMIN_COOKIE,
  RANGE_DAYS,
  adminSessionSchema,
  parseRangeDays,
  rangeFor,
  shortEventName,
  summarize,
  type AdminStats,
} from "@/lib/afinidad/admin-rules";
import { isPublicationEmbargoed } from "@/lib/afinidad/aggregate-rules";
import { loginAction, logoutAction } from "./actions";

/**
 * Panel interno de «¿A quién votar?»: uso del test y recuento de respuestas.
 *
 * Fuera de `[locale]` y del middleware de idioma (ver `src/middleware.ts`),
 * `noindex` y sin un solo componente cliente: todo se pinta en el servidor, así
 * que ni el token ni la sesión pueden acabar en el JavaScript del navegador.
 * Sin cookie de sesión válida, la página solo muestra el formulario y no llama
 * a la base.
 */

export const metadata: Metadata = {
  title: "Panel interno — ¿A quién votar?",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminAfinidadPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;

  if (!session || !adminSessionSchema.safeParse(session).success) {
    return <Login error={params.error !== undefined} />;
  }

  const days = parseRangeDays(params.dias);
  const stats = await fetchAdminStats(session, rangeFor(days));
  if (!stats) return <Login error={false} expired />;

  return <Dashboard stats={stats} days={days} />;
}

// ─── Acceso ──────────────────────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">{children}</main>;
}

function Login({ error, expired = false }: { error: boolean; expired?: boolean }) {
  return (
    <Shell>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Panel interno · ¿A quién votar?</CardTitle>
          <CardDescription>
            Pega tu token de administrador. Se canjea por una sesión de 30 minutos y no se guarda en este
            navegador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-3">
            <label htmlFor="token" className="text-sm font-medium">
              Token
            </label>
            <Input
              id="token"
              name="token"
              type="password"
              autoComplete="off"
              spellCheck={false}
              required
              maxLength={80}
            />
            {error && (
              <p role="alert" className="text-sm text-destructive">
                Token no válido.
              </p>
            )}
            {expired && (
              <p role="status" className="text-sm text-muted-foreground">
                La sesión ha caducado o se ha cerrado. Vuelve a entrar.
              </p>
            )}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Shell>
  );
}

// ─── Panel ───────────────────────────────────────────────────────────────────

const pct = (x: number | null) =>
  x === null ? "—" : `${(x * 100).toLocaleString("es-ES", { maximumFractionDigits: 1 })} %`;
const fmt = (x: number) => x.toLocaleString("es-ES");

function Bar({ value, max }: { value: number; max: number }) {
  const width = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-2 w-full rounded bg-muted" aria-hidden>
      <div className="h-2 rounded bg-primary" style={{ width: `${width}%` }} />
    </div>
  );
}

function BarTable({ title, rows, note }: { title: string; rows: { label: string; n: number }[]; note?: string }) {
  const max = Math.max(0, ...rows.map((r) => r.n));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {note && <CardDescription>{note}</CardDescription>}
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin datos.</p>
        ) : (
          <Table>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.label}>
                  <TableCell className="w-1/3">{r.label}</TableCell>
                  <TableCell className="w-16 text-right tabular-nums">{fmt(r.n)}</TableCell>
                  <TableCell>
                    <Bar value={r.n} max={max} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function Dashboard({ stats, days }: { stats: AdminStats; days: number }) {
  const s = summarize(stats);
  const regions = getFlowStrings("es").regions;
  const partyName = (id: string) => dataset.parties.find((p) => p.id === id)?.short ?? id;
  const embargoed = isPublicationEmbargoed();
  const maxDaily = Math.max(0, ...s.daily.map((d) => Math.max(d.starts, d.completes)));

  const pivot = <T extends { n: number }>(rows: T[], key: (r: T) => string) => {
    const groups = new Map<string, number>();
    for (const r of rows) groups.set(key(r), (groups.get(key(r)) ?? 0) + r.n);
    return Array.from(groups.entries()).map(([label, n]) => ({ label, n })).sort((a, b) => b.n - a.n);
  };

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Panel interno · ¿A quién votar?</h1>
          <p className="text-sm text-muted-foreground">
            Del {stats.from} al {stats.to} (hora de Madrid). Eventos con la hora truncada; respuestas por día.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <nav aria-label="Rango" className="flex gap-1">
            {RANGE_DAYS.map((d) => (
              <Button key={d} asChild size="sm" variant={d === days ? "default" : "outline"}>
                <a href={`/admin/afinidad?dias=${d}`}>{d} d</a>
              </Button>
            ))}
          </nav>
          <form action={logoutAction}>
            <Button type="submit" size="sm" variant="ghost">
              Salir
            </Button>
          </form>
        </div>
      </header>

      <p className="rounded-md border border-border bg-muted p-3 text-sm">
        <strong>Uso interno.</strong> Quien hace el test no es una muestra representativa. Nada de lo que hay bajo
        «Respuestas» se publica con menos de {stats.k} personas por celda
        {embargoed ? (
          <>
            {" "}
            y <strong>ahora mismo está en vigor la veda del art. 69.7 LOREG: no se publica ningún agregado</strong>
          </>
        ) : (
          <> ni entre el 24 y el 29 de noviembre (veda del art. 69.7 LOREG)</>
        )}
        .
      </p>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Tests empezados" value={fmt(s.starts)} />
        <Stat label="Tests terminados" value={fmt(s.completes)} />
        <Stat
          label="Tasa de finalización"
          value={pct(s.completionRate)}
          hint="Terminados / empezados. Retomar un test a medias no cuenta como empezar."
        />
        <Stat label="Enlaces ajenos abiertos" value={fmt(s.openShared)} />
        <Stat label="Fuentes abiertas" value={fmt(s.sourceOpens)} />
        <Stat label="Contexto declarado" value={fmt(s.contextDeclared)} hint="Comunidad o voto, sin decir cuál." />
        <Stat label="Respuestas guardadas (total)" value={fmt(stats.responses.total)} hint="Solo con la casilla marcada." />
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Por día</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Día</TableHead>
                <TableHead className="text-right">Empezados</TableHead>
                <TableHead className="text-right">Terminados</TableHead>
                <TableHead className="text-right">Respuestas</TableHead>
                <TableHead className="w-1/3">Terminados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...s.daily].reverse().map((d) => (
                <TableRow key={d.day}>
                  <TableCell className="tabular-nums">{d.day}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmt(d.starts)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmt(d.completes)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmt(d.responses)}</TableCell>
                  <TableCell>
                    <Bar value={d.completes} max={maxDaily} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <BarTable title="Compartir, por canal" rows={s.shares.map((r) => ({ label: r.channel, n: r.n }))} />
        <BarTable
          title="«Sigue explorando», por destino"
          rows={s.explore.map((r) => ({ label: r.destination, n: r.n }))}
        />
        <BarTable
          title="Eventos por idioma"
          rows={pivot(stats.events_by_locale, (r) => r.locale)}
        />
        <BarTable
          title="Eventos por versión del dataset"
          rows={pivot(stats.events_by_version, (r) => r.version)}
        />
        <BarTable
          title="Propiedades"
          note="anon = compartió el enlace sin voto habitual; from = desde dónde; step = qué paso de contexto."
          rows={stats.events_by_prop.map((r) => ({
            label: `${shortEventName(r.event)} · ${r.key}=${r.value}`,
            n: r.n,
          }))}
        />
        <BarTable
          title="Todos los eventos"
          rows={stats.event_totals.map((r) => ({ label: shortEventName(r.event), n: r.n }))}
        />
      </div>

      <h2 className="pt-4 text-xl font-semibold">Respuestas anónimas (todo el histórico, k ≥ {stats.k})</h2>
      <p className="text-sm text-muted-foreground">
        Voto habitual y comunidad se cuentan siempre sobre todo el histórico, no sobre el rango elegido, para que
        restar dos rangos no aísle a nadie. Las celdas con menos de {stats.k} personas no aparecen.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <BarTable
          title="Por versión del dataset"
          rows={stats.responses.by_version.map((r) => ({ label: r.version, n: r.n }))}
        />
        <BarTable
          title="Voto habitual declarado"
          note="Dato interno. No publicar sin revisar la veda y el aviso de no representatividad."
          rows={stats.responses.by_usual_vote.map((r) => ({ label: partyName(r.usual_vote), n: r.n }))}
        />
        <BarTable
          title="Comunidad declarada"
          rows={stats.responses.by_region.map((r) => ({ label: regions[r.region] ?? r.region, n: r.n }))}
        />
        <BarTable
          title="Comunidad × voto habitual"
          rows={stats.responses.by_region_vote.map((r) => ({
            label: `${regions[r.region] ?? r.region} · ${partyName(r.usual_vote)}`,
            n: r.n,
          }))}
        />
      </div>

      <BarTable
        title="Techo global: máximo por minuto"
        note="Si un ámbito roza su techo (response 600, event 3000, subscribe 60) hubo un pico o un abuso. admin_fail = intentos fallidos de acceso."
        rows={stats.rate_peaks.map((r) => ({ label: `${r.day} · ${r.scope}`, n: r.max_per_minute }))}
      />
    </Shell>
  );
}
