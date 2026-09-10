"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/Link";
import { EUROPE_COUNTRIES } from "@/data/geo/europe-countries";
import { SPAIN_PROVINCES } from "@/data/geo/spain-provinces";
import { submitRegistration } from "@/app/[locale]/registro/actions";

/**
 * El muro que hay antes del resultado del test.
 *
 * Pide lo mínimo que la base exige —correo y territorio— y nada más: el
 * formulario largo sigue en `/registro` para quien quiera dar edad y género.
 * Cada campo de más aquí es gente que abandona a un paso de contarse.
 *
 * Sobre la promesa: **no dice «no te escribiremos»**. El proyecto guarda la
 * dirección precisamente para poder escribir, y prometer lo contrario en el
 * momento de pedirla invalidaría el consentimiento —el RGPD exige que sea
 * informado y específico, y «te dije que no y luego te escribí» es el caso de
 * manual—. Dice lo que sí es verdad y sigue tranquilizando: nada de spam, poco
 * y solo sobre esto, y baja cuando quieras.
 */
export function ResultsGate({
  economic,
  social,
  onUnlock,
}: {
  economic: number;
  social: number;
  /**
   * Recibe el token con el que la persona podrá recuperar su resultado más
   * adelante. Llega vacío si la base no lo devuelve, y entonces el resultado
   * solo se recuerda en este navegador.
   */
  onUnlock: (token: string | null) => void;
}) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("ES");
  const [region, setRegion] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSending(true);
    const result = await submitRegistration({
      email,
      country,
      region: country === "ES" && region ? region : null,
      economic,
      social,
      method: "test",
      consent: consent as true,
    });
    setSending(false);
    if (result.ok) {
      onUnlock(result.token);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 lg:p-8">
      <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
        <Lock className="h-6 w-6 text-primary" />
      </span>

      <h2 className="text-center font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
        Ya está. ¿Quieres ver dónde has caído?
      </h2>
      <p className="mt-3 text-center leading-relaxed text-muted-foreground">
        Déjanos tu correo y te enseñamos el resultado. Sirve para tres cosas: que no te contemos dos
        veces, que tu posición pase a formar parte del mapa que ve todo el mundo, y que puedas
        volver a ver tu resultado más adelante sin repetir el test.
      </p>
      {/* Quien ya se registró antes de que existiera el enlace de recuperación
          pasa por aquí una vez más. Conviene decirle que no está duplicándose. */}
      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
        ¿Ya te habías registrado? Pon el mismo correo: actualizamos tu ficha en vez de crear otra, y
        recuperas tu enlace.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gate-email">Correo electrónico</Label>
          <Input
            id="gate-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gate-country">País</Label>
            <select
              id="gate-country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {EUROPE_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {country === "ES" && (
            <div className="space-y-2">
              <Label htmlFor="gate-region">Provincia</Label>
              <select
                id="gate-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Prefiero no decirlo</option>
                {SPAIN_PROVINCES.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4">
          <Checkbox
            checked={consent}
            onCheckedChange={(v) => setConsent(v === true)}
            className="mt-0.5"
            aria-describedby="gate-consent"
          />
          <span id="gate-consent" className="text-sm leading-relaxed text-muted-foreground">
            Doy mi consentimiento para que se registre mi posición política, se publique de forma{" "}
            <strong className="text-foreground">agregada y anónima</strong> y se guarde mi correo
            para que podáis escribirme. Puedo pedir el borrado cuando quiera.
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" variant="cta" className="w-full" disabled={!consent || sending}>
          {sending ? (
            <>
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              Registrando…
            </>
          ) : (
            "Ver mi resultado"
          )}
        </Button>

        {/*
          Lo que se promete aquí tiene que ser lo que se hace. «No te
          escribiremos» sería mentira —la dirección se guarda justo para eso— y
          convertiría el consentimiento en inválido.
        */}
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Nada de spam ni de cederlo a nadie. Escribimos poco y solo sobre esto, y te das de baja
          cuando quieras.{" "}
          <Link href="/proyecto" className="underline underline-offset-4 hover:text-foreground">
            Qué hacemos con tus datos
          </Link>
        </p>
      </form>
    </div>
  );
}
