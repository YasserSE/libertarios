"use client";

import { useId, useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { subscribeNewsletter } from "@/app/[locale]/novedades/actions";
import { getNewsletterStrings } from "@/i18n/newsletter";
import type { NewsletterSource } from "@/lib/newsletter/schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "done" | "error";

/**
 * «Novedades de Libertarios.eu»: correo + casilla + botón.
 *
 * - La casilla es el consentimiento: **sin marcar** por defecto, con el texto
 *   completo al lado y enlace a la política de privacidad.
 * - Es opcional siempre. En el resultado del test va después del resultado:
 *   nada de lo que la persona ya ha visto depende de esto.
 * - Lo que se envía es solo `email`, `consent`, `source` y `locale`. Este
 *   componente no recibe ni conoce respuestas, resultado ni voto habitual, y
 *   no debe recibirlos nunca.
 * - Tras enviar, «te hemos enviado un correo para confirmar» tanto si la
 *   dirección era nueva como si ya estaba: no se revela quién está suscrito.
 */
export function NewsletterForm({
  source,
  locale,
  variant = "card",
}: {
  source: NewsletterSource;
  locale: string;
  variant?: "card" | "footer";
}) {
  const t = getNewsletterStrings(locale).form;
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState(t.error);
  const emailId = useId();
  const consentId = useId();
  const footer = variant === "footer";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = new FormData(form);
    // Se construye a mano: solo estos cuatro campos salen del navegador.
    const data = new FormData();
    data.set("email", String(raw.get("email") ?? ""));
    if (raw.get("consent")) data.set("consent", "on");
    data.set("source", source);
    data.set("locale", locale);
    setStatus("sending");
    try {
      const res = await subscribeNewsletter(data);
      if (res.ok) {
        setStatus("done");
        return;
      }
      setErrorText(
        res.error === "invalid-email" ? t.errorInvalidEmail : res.error === "consent-required" ? t.errorConsent : t.error,
      );
      setStatus("error");
    } catch {
      setErrorText(t.error);
      setStatus("error");
    }
  };

  return (
    <div data-testid={`newsletter-${source}`}>
      <div className="mb-2 flex items-center gap-3">
        {!footer && <Mail className="h-5 w-5 text-primary" aria-hidden />}
        {footer ? (
          <h4 className="font-display font-semibold">{t.title}</h4>
        ) : (
          <h2 className="font-display font-semibold text-foreground">{t.title}</h2>
        )}
      </div>
      <p className={cn("mb-4 text-sm", footer ? "text-background/60" : "text-muted-foreground")}>
        {footer ? t.bodyFooter : t.bodyTest}
      </p>

      {status === "done" ? (
        <p role="status" className={cn("text-sm font-medium", footer ? "text-background" : "text-foreground")}>
          {t.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div className={cn("flex flex-col gap-2", !footer && "sm:flex-row")}>
            <label htmlFor={emailId} className="sr-only">
              {t.emailLabel}
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              className={cn(
                "h-11 flex-1 rounded-md border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                footer ? "border-background/20 bg-background/10 text-background placeholder:text-background/50" : "border-input bg-background",
              )}
            />
            <Button type="submit" className="h-11" disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.submit}
            </Button>
          </div>
          <label
            htmlFor={consentId}
            className={cn("flex items-start gap-2 text-xs", footer ? "text-background/70" : "text-muted-foreground")}
          >
            <input
              id={consentId}
              name="consent"
              type="checkbox"
              required
              defaultChecked={false}
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
            />
            <span>
              {t.checkbox}{" "}
              <Link href="/proyecto#privacidad" className="underline underline-offset-4">
                {t.privacyLink}
              </Link>
            </span>
          </label>
          {status === "error" && (
            <p role="alert" className={cn("text-sm", footer ? "text-red-300" : "text-destructive")}>
              {errorText}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
