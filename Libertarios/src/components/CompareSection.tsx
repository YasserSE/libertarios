import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeftRight } from "lucide-react";

const comparisons = [
  { name: "Socialismo", color: "bg-red-500/20 border-red-500/30" },
  { name: "Comunismo", color: "bg-rose-500/20 border-rose-500/30" },
  { name: "Fascismo", color: "bg-slate-500/20 border-slate-500/30" },
  { name: "Socialdemocracia", color: "bg-orange-500/20 border-orange-500/30" },
  { name: "Conservadurismo", color: "bg-blue-500/20 border-blue-500/30" },
];

export function CompareSection() {
  return (
    <section id="comparativas" className="py-24 lg:py-32 bg-card">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comparar no es atacar
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Para reducir la polarización es necesario comprender las diferencias reales entre corrientes políticas.
            Comparamos el libertarismo con otras ideas desde un enfoque descriptivo y no emocional.
          </p>
          <p className="text-lg text-foreground font-medium mt-6">
            Porque disentir no implica <span className="text-primary">deshumanizar</span>.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-background border border-border rounded-2xl p-8 shadow-card">
            <div className="flex flex-col items-center">
              {/* Central libertarian badge */}
              <div className="gradient-primary text-primary-foreground font-display font-semibold px-6 py-3 rounded-xl shadow-soft mb-8">
                Libertarismo
              </div>

              {/* Comparison arrows and badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {comparisons.map((comp, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
                    <span className={`px-4 py-2 rounded-lg border text-sm font-medium text-foreground ${comp.color}`}>
                      {comp.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-center text-muted-foreground max-w-xl mb-8">
                Cada comparativa analiza diferencias en cuanto a libertad económica, libertad social,
                rol del Estado, propiedad privada y derechos individuales.
              </p>

              <Button variant="cta" size="lg">
                Ver comparativas
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
