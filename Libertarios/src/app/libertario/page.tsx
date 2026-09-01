import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Globe,
  Landmark,
  Lightbulb,
  MessageCircleQuestion,
  Scale,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MiniQuadrant, PositionLabel } from "@/components/aprende/MiniQuadrant";
import { ReferenceAvatar } from "@/components/maps/ReferenceAvatar";
import { LIBERTARIAN_CURRENTS, OBJECTIONS } from "@/data/ideologies";
import { getReferenceSet } from "@/data/quadrantReferences";

export const metadata: Metadata = {
  title: "¿Qué es ser libertario? — Libertarios.eu",
  description:
    "Los principios del libertarismo, sus corrientes internas y las objeciones más serias que se le hacen. Sin caricaturas en ninguna dirección.",
};

const principles = [
  {
    icon: Scale,
    title: "Principio de no agresión",
    description:
      "Nadie puede iniciar el uso de la fuerza contra otra persona o su propiedad. La violencia solo es legítima en defensa.",
    tension:
      "El desacuerdo empieza al definir «agresión»: si contaminar cuenta, buena parte de la industria la comete a diario.",
  },
  {
    icon: Landmark,
    title: "Propiedad privada",
    description:
      "Poder poseer y disponer de lo adquirido legítimamente es la base del resto de libertades: sin ella no hay independencia frente a nadie.",
    tension:
      "«Legítimamente» hace mucho trabajo. Casi toda la propiedad actual arrastra apropiaciones que no lo fueron.",
  },
  {
    icon: Users,
    title: "Libertad individual",
    description:
      "Cada persona decide cómo vivir mientras no perjudique a otros. Incluye lo económico, lo social y lo personal a la vez.",
    tension:
      "Los dos ejes no siempre van juntos: hay quien defiende el mercado y quiere regular la vida privada, y al revés.",
  },
  {
    icon: Globe,
    title: "Intercambio voluntario",
    description:
      "Si dos personas acuerdan algo libremente es porque ambas esperan ganar. De ahí sale la prosperidad, no de dirigirla.",
    tension:
      "Un acuerdo es voluntario en el papel; con una de las partes sin alternativas, la palabra pierde parte de su sentido.",
  },
];

const misconceptions = [
  {
    myth: "Es lo mismo que la ley del más fuerte",
    reality:
      "El principio de no agresión existe precisamente para prohibir imponerse por la fuerza. Otra discusión es si sin Estado se puede hacer cumplir.",
  },
  {
    myth: "Es una ideología solo económica",
    reality:
      "El eje social pesa igual: drogas, expresión, eutanasia, fronteras. Es lo que separa a un libertario de un conservador con impuestos bajos.",
  },
  {
    myth: "Defiende a las grandes corporaciones",
    reality:
      "Buena parte de la crítica libertaria se dirige justamente al capitalismo de amiguetes: licencias, rescates y barreras que protegen al que ya está dentro.",
  },
  {
    myth: "Le dan igual los problemas sociales",
    reality:
      "El desacuerdo no es sobre si importan, sino sobre el método: sociedad civil, mutualismo y mercado frente a provisión estatal obligatoria.",
  },
  {
    myth: "Es una postura marginal y reciente",
    reality:
      "Arranca en Locke en el siglo XVII y pasa por Bastiat, Mises y Hayek. Sí es minoritaria en votos: en España ningún partido libertario tiene representación.",
  },
];

const thinkerSet = getReferenceSet("thinker");

export default function LibertarioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                <Lightbulb className="h-7 w-7 text-primary-foreground" />
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                ¿Qué es ser libertario?
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                No es una ideología cerrada ni un bloque homogéneo, sino una familia de posiciones
                que comparten un punto de partida: la libertad individual como valor central y el
                poder coactivo del Estado como algo que hay que justificar, no dar por hecho.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Esta página expone sus principios, sus corrientes internas —que discrepan bastante
                entre sí— y las objeciones más serias que se le hacen. Sin caricaturas en ninguna
                de las dos direcciones.
              </p>
            </div>
          </div>
        </section>

        {/* Principios */}
        <section className="border-y border-border bg-card py-16 lg:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Cuatro principios y dónde se discuten
              </h2>
              <p className="mt-3 text-muted-foreground">
                Cada principio viene con la tensión que genera. Un principio sin su punto débil se
                aprende de memoria; con él, se entiende.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                    <principle.icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                  <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">Dónde se discute: </span>
                    {principle.tension}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corrientes */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Cinco corrientes, no una
              </h2>
              <p className="mt-3 text-muted-foreground">
                Discrepan en cuánto Estado admiten y en qué hacen con el eje social. Cada una está
                situada en el mismo cuadrante que usa el test.
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-4">
              {LIBERTARIAN_CURRENTS.map((current) => (
                <article
                  key={current.id}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <MiniQuadrant position={current.position} />
                      <PositionLabel position={current.position} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {current.name}
                        </h3>
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                          Estado: {current.state}
                        </span>
                      </div>
                      <p className="mt-1.5 text-muted-foreground">{current.summary}</p>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                            Su mejor argumento
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {current.steelman}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/40 p-4">
                          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            Su punto flaco
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {current.objection}
                          </p>
                        </div>
                      </div>

                      {current.thinkers.length > 0 && thinkerSet && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            Referentes
                          </span>
                          {current.thinkers.map((id) => {
                            const thinker = thinkerSet.points.find((p) => p.id === id);
                            if (!thinker) return null;
                            return (
                              <span
                                key={id}
                                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-1 pr-2.5"
                              >
                                <ReferenceAvatar point={thinker} size={20} />
                                <span className="text-xs font-medium text-foreground">
                                  {thinker.short}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-4xl text-center text-sm text-muted-foreground">
              Puedes ver estas corrientes junto a países, partidos y economistas en el{" "}
              <Link
                href="/cuadrante"
                className="underline underline-offset-4 hover:text-foreground"
              >
                cuadrante interactivo
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Malentendidos */}
        <section className="border-y border-border bg-card py-16 lg:py-24">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Cinco malentendidos frecuentes
              </h2>
              <p className="mt-3 text-muted-foreground">
                Lo que suele atribuirse al libertarismo, y qué dice en realidad.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-3">
              {misconceptions.map((item) => (
                <div
                  key={item.myth}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <p className="font-display font-semibold text-foreground">
                    <span className="mr-2 text-muted-foreground">«</span>
                    {item.myth}
                    <span className="ml-1 text-muted-foreground">»</span>
                  </p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.reality}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Objeciones */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <MessageCircleQuestion className="h-6 w-6 text-primary" />
              </span>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Las objeciones que sí duelen
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Estas son las críticas serias, no las fáciles de rebatir. Debajo de cada una está la
                respuesta libertaria habitual — y hasta dónde llega, porque en varias no zanja el
                asunto.
              </p>
            </div>

            <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
              {OBJECTIONS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`objection-${i}`}
                  className="rounded-2xl border border-border bg-card px-5"
                >
                  <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline">
                    {item.objection}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-5">
                    <p className="leading-relaxed text-muted-foreground">{item.detail}</p>
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                        La respuesta libertaria
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Lecturas */}
        <section className="border-y border-border bg-card py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Por dónde empezar a leer
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  {
                    work: "La Ley",
                    author: "Frédéric Bastiat, 1850",
                    why: "Sesenta páginas y sin jerga. El mejor primer contacto que existe.",
                  },
                  {
                    work: "Camino de servidumbre",
                    author: "Friedrich Hayek, 1944",
                    why: "El argumento de que la planificación económica erosiona la libertad política.",
                  },
                  {
                    work: "Libertad de elegir",
                    author: "Milton y Rose Friedman, 1980",
                    why: "La versión divulgativa y aplicada a políticas públicas concretas.",
                  },
                  {
                    work: "Anarquía, Estado y utopía",
                    author: "Robert Nozick, 1974",
                    why: "La defensa filosófica del Estado mínimo; responde directamente a Rawls.",
                  },
                  {
                    work: "Teoría de la justicia",
                    author: "John Rawls, 1971",
                    why: "El contrario. Leer solo a los propios es la forma más rápida de no entender nada.",
                  },
                ].map((book) => (
                  <li
                    key={book.work}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <p className="font-display font-semibold text-foreground">
                      {book.work}{" "}
                      <span className="font-body text-sm font-normal text-muted-foreground">
                        — {book.author}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{book.why}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center">
              <h2 className="font-display text-xl font-semibold text-foreground">
                ¿Y tú dónde estás?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                El test son 20 preguntas equilibradas. Al terminar verás tu posición junto a la de
                países, economistas y partidos.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="cta" asChild>
                  <Link href="/cuadrante">
                    Hacer el test
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/comparativas">Comparar con otras ideologías</Link>
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
