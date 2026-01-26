"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChartBar, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px] transition-transform duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] transition-transform duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle, hsl(190 70% 45%) 0%, transparent 70%)",
            right: `${100 - mousePosition.x * 0.2}%`,
            bottom: `${100 - mousePosition.y * 0.2}%`,
            transform: "translate(50%, 50%)",
          }}
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Proyecto independiente y transparente</span>
          </div>

          {/* Main headline with gradient text */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="block text-foreground">Personas reales.</span>
            <span 
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(190 70% 45%) 50%, hsl(var(--primary)) 100%)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 4s ease infinite",
              }}
            >
              Ideas libres.
            </span>
            <span className="block text-foreground">Datos abiertos.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Plataforma abierta para entender cuántas personas en España se identifican con la libertad individual y qué significa realmente apoyar ideas libertarias.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button variant="hero" size="xl" className="w-full sm:w-auto group" asChild>
              <Link href="/registro">
                Registrarme como simpatizante
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/datos">
                <ChartBar className="mr-2" />
                Explorar los datos
              </Link>
            </Button>
          </div>

          {/* Secondary CTA */}
          <div className="mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button variant="ghost" size="lg" className="text-primary hover:text-primary hover:bg-primary/10" asChild>
              <Link href="/cuadrante">
                <Play className="mr-2 h-4 w-4" />
                Hacer el test de ideología política
              </Link>
            </Button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            {[
              { value: "12,847", label: "Simpatizantes", sublabel: "registrados" },
              { value: "52", label: "Provincias", sublabel: "representadas" },
              { value: "100%", label: "Datos", sublabel: "anónimos" },
              { value: "0", label: "Afiliaciones", sublabel: "políticas" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Este proyecto no pertenece a ningún partido político. No pedimos el voto. Solo datos, ideas y transparencia.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
