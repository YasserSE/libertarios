"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuadrantResults } from "@/components/QuadrantResults";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { Loader2, KeyRound, Laptop } from "lucide-react";
import { getSavedResult } from "./actions";
import { readStoredResult, storeResult } from "@/lib/results/storage";
import type { SavedResult } from "@/lib/registration/schema";

/** `useSearchParams` exige un límite de Suspense en una ruta estática. */
export function MiResultadoClient() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}

type State =
  | { kind: "cargando" }
  /** Viene de la base: el resultado real, y vale desde cualquier dispositivo. */
  | { kind: "remoto"; result: SavedResult; token: string }
  /** Solo lo recuerda este navegador. Se avisa, para no prometer más. */
  | { kind: "local"; economic: number; social: number }
  | { kind: "vacio" }
  | { kind: "no-encontrado" };

/**
 * «Enséñame lo mío».
 *
 * Tres formas de llegar aquí, y las tres tienen que funcionar:
 *
 *   1. Con el enlace personal (`?t=…`) desde cualquier dispositivo. Es la vía
 *      buena: el resultado se lee de la base.
 *   2. Sin nada en la URL, en el mismo navegador donde se hizo el test: se usa
 *      el token guardado, y si tampoco hay, la posición recordada en local.
 *   3. Con un token que ya no vale —registro borrado, enlace mal copiado—: se
 *      dice claramente y se ofrece repetir el test.
 *
 * Lo que no hay es un campo de correo. Preguntar «¿cuál es tu email?» para
 * devolver una posición política sería un buscador de ideologías ajenas: basta
 * conocer la dirección de alguien. Hasta que haya envío de correo con el que
 * verificar quién pide qué, la recuperación va por enlace.
 */
function Content() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "cargando" });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const stored = readStoredResult();
      const token = searchParams.get("t") ?? stored?.token ?? null;

      if (token) {
        const result = await getSavedResult(token);
        if (cancelled) return;
        if (result) {
          // Abrir el enlace en un dispositivo nuevo lo deja recordado aquí:
          // la siguiente visita ya no necesita la URL con el token.
          storeResult({ economic: result.economic, social: result.social, token });
          setState({ kind: "remoto", result, token });
          return;
        }
      }

      if (cancelled) return;
      if (stored) {
        setState({ kind: "local", economic: stored.economic, social: stored.social });
      } else {
        setState({ kind: token ? "no-encontrado" : "vacio" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          {state.kind === "cargando" && (
            <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Buscando tu resultado…
            </div>
          )}

          {state.kind === "remoto" && (
            <div className="mx-auto max-w-4xl">
              <p className="mb-8 text-center text-sm text-muted-foreground">
                Guardado el{" "}
                <time dateTime={state.result.updatedAt}>
                  {new Date(state.result.updatedAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                .
              </p>
              <QuadrantResults
                economic={state.result.economic}
                social={state.result.social}
                recoveryToken={state.token}
                onReset={() => router.push("/cuadrante")}
              />
            </div>
          )}

          {state.kind === "local" && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <Laptop className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Esta posición la recuerda <strong>este navegador</strong>, no hemos podido
                  comprobarla en el registro. Si borras los datos del navegador o cambias de
                  dispositivo, se perderá. Vuelve a hacer el test para guardarla con tu correo y
                  llevártela a cualquier sitio.
                </p>
              </div>
              <QuadrantResults
                economic={state.economic}
                social={state.social}
                onReset={() => router.push("/cuadrante")}
              />
            </div>
          )}

          {(state.kind === "vacio" || state.kind === "no-encontrado") && (
            <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center">
              <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
                <KeyRound className="h-6 w-6 text-primary" />
              </span>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {state.kind === "no-encontrado"
                  ? "Este enlace ya no lleva a ningún resultado"
                  : "Aquí no hay ningún resultado guardado"}
              </h1>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {state.kind === "no-encontrado"
                  ? "Puede que el enlace se haya copiado incompleto o que el registro se haya borrado. Haciendo el test otra vez tendrás un enlace nuevo."
                  : "Tu resultado se recupera con el enlace personal que te damos al terminar el test, o desde el mismo navegador donde lo hiciste."}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="cta" asChild>
                  <Link href="/cuadrante">Hacer el test</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/proyecto#privacidad">Qué guardamos y por qué</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
