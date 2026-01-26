import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, History, Scale, CheckCircle, ArrowRight } from "lucide-react";

const topics = [
  {
    icon: BookOpen,
    title: "Qué es el libertarismo",
    description: "Principios fundamentales de la libertad individual y responsabilidad personal.",
  },
  {
    icon: History,
    title: "Contexto histórico",
    description: "Orígenes y evolución del pensamiento libertario a lo largo de la historia.",
  },
  {
    icon: Scale,
    title: "Diferencias con otras corrientes",
    description: "Cómo se distingue de otras ideologías políticas y económicas.",
  },
  {
    icon: CheckCircle,
    title: "Qué es y qué no es",
    description: "Desmitificando estereotipos y aclarando conceptos erróneos.",
  },
];

export function LibertarianSection() {
  return (
    <section id="libertario" className="py-24 lg:py-32 gradient-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Topics grid */}
          <div className="order-2 lg:order-1 grid sm:grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <topic.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ideas, no etiquetas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              El libertarismo no es una ideología única ni un bloque homogéneo.
              Es un marco de pensamiento centrado en la libertad individual, la responsabilidad personal
              y la limitación del poder coercitivo del Estado.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              En esta plataforma explicamos los fundamentos, el contexto histórico,
              las diferencias con otras corrientes y qué significa realmente apoyar la libertad individual.
            </p>
            <Button variant="cta" size="lg" asChild>
              <Link href="/libertario">
                Aprender más
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
