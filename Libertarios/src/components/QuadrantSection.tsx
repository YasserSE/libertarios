import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function QuadrantSection() {
  return (
    <section id="cuadrante" className="py-24 lg:py-32 gradient-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              El espectro político no es blanco o negro
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Las ideas políticas no caben en una sola etiqueta. Por eso utilizamos un modelo de dos ejes:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Libertad económica</strong> ↔ Intervención estatal
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Libertad social</strong> ↔ Autoritarismo social
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cada persona registrada se representa como un punto anónimo dentro de este cuadrante, 
              mostrando la diversidad real de pensamiento existente en España.
            </p>
            <Button variant="cta" size="lg" asChild>
              <Link href="/cuadrante">
                Ver el cuadrante ideológico
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>

          {/* Quadrant Visualization */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background grid */}
              <div className="absolute inset-0 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="border-r border-b border-border/50" />
                  <div className="border-b border-border/50" />
                  <div className="border-r border-border/50" />
                  <div />
                </div>

                {/* Axis labels */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
                  Libertad social
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
                  Autoritarismo
                </div>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-muted-foreground whitespace-nowrap">
                  Intervención
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-xs font-medium text-muted-foreground whitespace-nowrap">
                  Libre mercado
                </div>

                {/* Sample data points */}
                <div className="absolute inset-8">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const x = 20 + Math.random() * 60;
                    const y = 15 + Math.random() * 45;
                    const size = 4 + Math.random() * 4;
                    return (
                      <div
                        key={i}
                        className="absolute rounded-full bg-primary/60 animate-pulse"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          width: size,
                          height: size,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Libertarian zone highlight */}
                <div className="absolute right-8 top-8 w-1/3 h-1/3 bg-primary/10 rounded-xl border border-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
