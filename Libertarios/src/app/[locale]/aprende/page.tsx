import type { Metadata } from "next";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { PolicyQuiz } from "@/components/aprende/PolicyQuiz";

export const metadata: Metadata = {
  title: "Aprende — Libertarios.eu",
  description:
    "Ocho políticas que suenan justas. Adivina qué provocan de verdad y compruébalo con los estudios. Incluida una en la que quien se equivoca somos nosotros.",
};

export default function AprendePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 pt-24">
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                <GraduationCap className="h-7 w-7 text-primary" />
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Suena justo. ¿Y luego qué pasa?
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Ocho medidas que se proponen para arreglar un daño real. Adivina qué provocan y
                compruébalo. No hay trampa en la pregunta: la respuesta que da casi todo el mundo es
                la razonable, y por eso merece una explicación y no una burla.
              </p>

              {/*
                Esta advertencia es la que separa esto de un embudo de
                propaganda, y va delante de la primera pregunta, no escondida al
                final: si el lector no puede fiarse de que alguna respuesta nos
                deje mal a nosotros, no tiene motivo para fiarse de las otras
                siete.
              */}
              <p className="mx-auto mt-6 max-w-xl rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                Una de las ocho va contra nosotros. En el salario mínimo, quien afirma de más es el
                bando que defiende el mercado, y la respuesta lo dice con esas palabras. Va la
                cuarta, en medio, donde no se puede saltar.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-8">
          <div className="container">
            <PolicyQuiz />
          </div>
        </section>

        <section className="py-14">
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Los estudios citados son públicos y se pueden buscar por autor y año. Si encuentras
                uno que contradiga lo que hay aquí, escríbenos: corregirlo es más útil que tener
                razón.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="outline" asChild>
                  <Link href="/medidas">
                    Las fichas completas
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/libertario">Las objeciones al libertarismo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
