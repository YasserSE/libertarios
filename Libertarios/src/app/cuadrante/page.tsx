"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuadrantTest } from "@/components/QuadrantTest";
import { QuadrantResults } from "@/components/QuadrantResults";
import { InteractiveQuadrant } from "@/components/InteractiveQuadrant";
import { Button } from "@/components/ui/button";
import { Play, MousePointer, Info } from "lucide-react";
import { quadrantQuestions } from "@/data/quadrantQuestions";

type Mode = 'intro' | 'test' | 'manual' | 'results';

const REFERENCE_KINDS = ["country", "thinker", "leader", "party-es", "party-eu"] as const;
type Kind = (typeof REFERENCE_KINDS)[number];

/**
 * `useSearchParams` obliga a un límite de Suspense en una ruta estática; sin él
 * el build falla.
 */
export default function QuadrantPage() {
  return (
    <Suspense fallback={null}>
      <QuadrantPageContent />
    </Suspense>
  );
}

function QuadrantPageContent() {
  const searchParams = useSearchParams();

  // Enlaces profundos desde el resto del sitio: /cuadrante?capas=leader&ref=milei
  // abre el cuadrante ya filtrado y con esa ficha señalada.
  const layers = (searchParams.get("capas") ?? "")
    .split(",")
    .map((k) => k.trim())
    .filter((k): k is Kind => (REFERENCE_KINDS as readonly string[]).includes(k));
  const focusId = searchParams.get("ref");
  const initialLayers: Kind[] = layers.length > 0 ? layers : ["country"];

  const [mode, setMode] = useState<Mode>('intro');
  const [userPosition, setUserPosition] = useState<{ economic: number; social: number } | null>(null);

  const handleTestComplete = (economic: number, social: number) => {
    setUserPosition({ economic, social });
    setMode('results');
  };

  const handleManualPosition = (economic: number, social: number) => {
    setUserPosition({ economic, social });
  };

  const handleReset = () => {
    setUserPosition(null);
    setMode('intro');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Cuadrante Ideológico
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre tu posición en el espectro político y compárala con otros simpatizantes de la libertad.
            </p>
          </div>

          {/* Content based on mode */}
          {mode === 'intro' && (
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                      ¿Cómo funciona?
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      El cuadrante ideológico representa las ideas políticas en dos ejes: 
                      <strong> libertad económica</strong> (horizontal) y <strong>libertad social</strong> (vertical). 
                      Puedes descubrir tu posición realizando el test o seleccionándola manualmente.
                    </p>
                  </div>
                </div>

                {/* Mode selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setMode('test')}
                    className="group bg-background border-2 border-border rounded-xl p-6 text-left hover:border-primary transition-all duration-300 hover:shadow-card"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <Play className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Realizar el test
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Responde {quadrantQuestions.length} preguntas equilibradas para situarte en los dos ejes.
                    </p>
                    <span className="inline-block mt-4 text-sm font-medium text-primary">
                      ~4 minutos →
                    </span>
                  </button>

                  <button
                    onClick={() => setMode('manual')}
                    className="group bg-background border-2 border-border rounded-xl p-6 text-left hover:border-primary transition-all duration-300 hover:shadow-card"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <MousePointer className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Posición manual
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Si ya conoces tus ideas, haz clic directamente en el cuadrante para posicionarte.
                    </p>
                    <span className="inline-block mt-4 text-sm font-medium text-primary">
                      Inmediato →
                    </span>
                  </button>
                </div>
              </div>

              {/* Preview quadrant */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
                  Vista previa del cuadrante
                </h3>
                <InteractiveQuadrant
                  showAllUsers={true}
                  defaultLayers={initialLayers}
                  focusId={focusId}
                />
              </div>
            </div>
          )}

          {mode === 'test' && (
            <div className="max-w-2xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setMode('intro')}
                className="mb-6"
              >
                ← Volver
              </Button>
              <QuadrantTest onComplete={handleTestComplete} />
            </div>
          )}

          {mode === 'manual' && (
            <div className="max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setMode('intro')}
                className="mb-6"
              >
                ← Volver
              </Button>
              
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
                <div className="text-center mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    Haz clic en el cuadrante para posicionarte
                  </h2>
                  <p className="text-muted-foreground">
                    Tu posición aparecerá como un punto destacado en el cuadrante.
                  </p>
                </div>

                <InteractiveQuadrant 
                  userPosition={userPosition}
                  showAllUsers={true}
                  interactive={true}
                  onPositionChange={handleManualPosition}
                />

                {userPosition && (
                  <div className="mt-6 flex flex-col items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Tu posición:</p>
                      <p className="font-display font-semibold text-foreground">
                        Económico: {userPosition.economic > 0 ? '+' : ''}{userPosition.economic} | 
                        Social: {userPosition.social > 0 ? '+' : ''}{userPosition.social}
                      </p>
                    </div>
                    <Button variant="cta" onClick={() => setMode('results')}>
                      Ver análisis completo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {mode === 'results' && userPosition && (
            <div className="max-w-4xl mx-auto">
              <QuadrantResults 
                economic={userPosition.economic}
                social={userPosition.social}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
