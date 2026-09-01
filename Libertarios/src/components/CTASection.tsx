import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Play } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 gradient-section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Un movimiento empieza por saber cuántos sois
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            No implica afiliación, militancia ni exposición pública: nadie verá tu nombre. Es la
            diferencia entre ser una opinión aislada y ser una cifra que se puede enseñar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button variant="hero" size="xl" asChild>
              <Link href="/registro">
                Contarme
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            
            <Button variant="heroOutline" size="lg" asChild>
              <Link href="/cuadrante">
                <Play className="mr-2 h-4 w-4" />
                Hacer el test ideológico
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Datos siempre agregados y anónimos</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>Cumplimos con la normativa RGPD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
