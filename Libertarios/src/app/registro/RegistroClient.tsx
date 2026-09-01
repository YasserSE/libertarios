"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegistrationForm, RegistrationData } from "@/components/RegistrationForm";
import { InteractiveQuadrant } from "@/components/InteractiveQuadrant";
import { QuadrantTest } from "@/components/QuadrantTest";
import { Button } from "@/components/ui/button";
import { Play, MousePointer, CheckCircle, ArrowLeft, Shield, Lock } from "lucide-react";
import { quadrantQuestions } from "@/data/quadrantQuestions";

type Step = 'method' | 'test' | 'manual' | 'form' | 'complete';

export function RegistroClient({ configured }: { configured: boolean }) {
  const [step, setStep] = useState<Step>('method');
  const [quadrantPosition, setQuadrantPosition] = useState<{ economic: number; social: number } | null>(null);

  const handleTestComplete = (economic: number, social: number) => {
    setQuadrantPosition({ economic, social });
    setStep('form');
  };

  const handleManualPosition = (economic: number, social: number) => {
    setQuadrantPosition({ economic, social });
  };

  const handleRegistrationComplete = (data: RegistrationData) => {
    console.log("Registration complete:", data);
    setStep('complete');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Registrarme como simpatizante
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contribuye a una fotografía más honesta del pensamiento político en España.
              Tus datos siempre serán anónimos y agregados.
            </p>
          </div>

          {!configured && (
            <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-center">
              <p className="font-display font-semibold text-foreground">
                El registro no está operativo todavía
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Puedes hacer el test y ver tu posición, pero de momento no podemos guardarla.
                Estamos terminando de conectarlo.
              </p>
            </div>
          )}

          {/* Step: Select method */}
          {step === 'method' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
                  Primero, determina tu posición ideológica
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep('test')}
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
                    onClick={() => setStep('manual')}
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
          )}

          {/* Step: Test */}
          {step === 'test' && (
            <div className="max-w-2xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setStep('method')}
                className="mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
              <QuadrantTest onComplete={handleTestComplete} />
            </div>
          )}

          {/* Step: Manual */}
          {step === 'manual' && (
            <div className="max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setStep('method')}
                className="mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
              
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
                <div className="text-center mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    Haz clic en el cuadrante para posicionarte
                  </h2>
                  <p className="text-muted-foreground">
                    Tu posición aparecerá como un punto destacado.
                  </p>
                </div>

                <InteractiveQuadrant 
                  userPosition={quadrantPosition}
                  showAllUsers={true}
                  interactive={true}
                  onPositionChange={handleManualPosition}
                />

                {quadrantPosition && (
                  <div className="mt-6 flex flex-col items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Tu posición:</p>
                      <p className="font-display font-semibold text-foreground">
                        Económico: {quadrantPosition.economic > 0 ? '+' : ''}{quadrantPosition.economic} | 
                        Social: {quadrantPosition.social > 0 ? '+' : ''}{quadrantPosition.social}
                      </p>
                    </div>
                    <Button variant="cta" onClick={() => setStep('form')}>
                      Continuar con el registro
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step: Registration form */}
          {step === 'form' && (
            <div className="max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setStep('method')}
                className="mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Completa tu perfil
                  </h2>
                  <RegistrationForm 
                    onComplete={handleRegistrationComplete}
                    quadrantPosition={quadrantPosition}
                  />
                </div>

                {/* Quadrant preview */}
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Tu posición ideológica
                  </h2>
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-soft sticky top-24">
                    <InteractiveQuadrant 
                      userPosition={quadrantPosition}
                      showAllUsers={true}
                      interactive={false}
                    />
                    {quadrantPosition && (
                      <div className="mt-4 text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setStep('method')}
                        >
                          Cambiar posición
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step: Complete */}
          {step === 'complete' && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-card border border-border rounded-2xl p-12 shadow-card">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  ¡Gracias por registrarte!
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Tu participación ayuda a construir una imagen más completa del pensamiento político en España.
                  Tus datos se muestran de forma anónima y agregada.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="cta" onClick={() => window.location.href = '/datos'}>
                    Ver los datos
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/cuadrante'}>
                    Explorar el cuadrante
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
