import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { getNewsletterStrings } from "@/i18n/newsletter";
import { isConfirmToken, isUnsubscribeToken } from "@/lib/newsletter/schema";
import { confirmNewsletter, unsubscribeNewsletter } from "./actions";
import type { TokenPageKind } from "./metadata";

/**
 * Páginas de confirmación y baja del boletín. Servidor puro.
 *
 * Abrir el enlace no cambia nada: la página enseña un botón y es el botón
 * (server action, POST) el que confirma o da de baja. Los escáneres de enlaces
 * de los proveedores de correo abren las URL solos, y un GET que confirmara
 * daría por buena una suscripción que nadie ha pulsado.
 *
 * Tras el botón se redirige a `?estado=…` sin el token, así que el token no
 * se queda en el historial. `noindex` y `no-referrer`: la URL con token no
 * pinta nada en un buscador ni en el referer de otra web.
 */

type SearchParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function NewsletterTokenPage({
  locale,
  kind,
  searchParams,
}: {
  locale: string;
  kind: TokenPageKind;
  searchParams: SearchParams;
}) {
  const t = getNewsletterStrings(locale);
  const copy = kind === "confirm" ? t.confirm : t.unsubscribe;
  const state = first(searchParams.estado);
  const token = first(searchParams.t);
  const validToken = kind === "confirm" ? isConfirmToken(token) : isUnsubscribeToken(token);

  let title: string;
  let body: string;
  let showForm = false;
  if (state === "ok") {
    title = copy.doneTitle;
    body = copy.doneBody;
  } else if (state === "error") {
    title = copy.title;
    body = t.unavailable;
  } else if (!state && validToken) {
    title = copy.title;
    body = copy.body;
    showForm = true;
  } else {
    title = t.invalidTitle;
    body = t.invalidBody;
  }

  const action = kind === "confirm" ? confirmNewsletter : unsubscribeNewsletter;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <section
            data-testid="newsletter-token-page"
            className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-card"
          >
            <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
            {showForm ? (
              <form action={action} className="mt-6">
                <input type="hidden" name="t" value={token} />
                <input type="hidden" name="locale" value={locale} />
                <Button type="submit" variant={kind === "confirm" ? "cta" : "outline"} className="min-h-11">
                  {copy.button}
                </Button>
              </form>
            ) : (
              <Button variant="outline" className="mt-6 min-h-11" asChild>
                <Link href="/">{t.backHome}</Link>
              </Button>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
