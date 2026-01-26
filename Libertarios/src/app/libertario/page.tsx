import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowRight, Scale, BookOpen, Users, Lightbulb, 
  CheckCircle, XCircle, History, Globe, Landmark
} from "lucide-react";

const principles = [
  {
    icon: Scale,
    title: "Principio de no agresión",
    description: "Nadie tiene derecho a iniciar el uso de la fuerza contra otra persona o su propiedad. La violencia solo es legítima en defensa propia.",
  },
  {
    icon: Landmark,
    title: "Propiedad privada",
    description: "El derecho a poseer y disponer de bienes adquiridos legítimamente es fundamental e inviolable. Es la base de la libertad económica.",
  },
  {
    icon: Users,
    title: "Libertad individual",
    description: "Cada persona tiene derecho a vivir su vida como desee, mientras no perjudique a otros. Incluye libertades sociales, económicas y personales.",
  },
  {
    icon: Globe,
    title: "Libre mercado",
    description: "Los intercambios voluntarios entre personas libres generan prosperidad. El Estado no debe interferir en las transacciones económicas.",
  },
];

const isAndIsNot = {
  is: [
    "Una filosofía centrada en la libertad individual",
    "Defensa de la propiedad privada y el libre mercado",
    "Oposición al uso de la fuerza coercitiva",
    "Compatible con diversas posiciones sociales (conservadoras o progresistas)",
    "Un marco ético basado en derechos naturales",
  ],
  isNot: [
    "Sinónimo de caos o ausencia de reglas",
    "Una ideología exclusivamente económica",
    "Indiferencia hacia los problemas sociales",
    "Defensa de los intereses de grandes corporaciones",
    "Oposición a toda forma de organización colectiva voluntaria",
  ],
};

const historicalFigures = [
  {
    name: "John Locke",
    period: "1632-1704",
    contribution: "Padre del liberalismo clásico. Desarrolló la teoría de los derechos naturales: vida, libertad y propiedad.",
  },
  {
    name: "Frédéric Bastiat",
    period: "1801-1850",
    contribution: "Economista francés conocido por 'La Ley'. Defensor del libre comercio y crítico del proteccionismo.",
  },
  {
    name: "Ludwig von Mises",
    period: "1881-1973",
    contribution: "Economista de la Escuela Austríaca. Demostró la imposibilidad del cálculo económico bajo el socialismo.",
  },
  {
    name: "Friedrich Hayek",
    period: "1899-1992",
    contribution: "Premio Nobel de Economía. Autor de 'Camino de servidumbre', advirtiendo sobre el totalitarismo.",
  },
  {
    name: "Murray Rothbard",
    period: "1926-1995",
    contribution: "Fundador del anarcocapitalismo moderno. Desarrolló una ética libertaria sistemática.",
  },
  {
    name: "Milton Friedman",
    period: "1912-2006",
    contribution: "Premio Nobel de Economía. Popularizó el libertarismo económico y la libertad de elección.",
  },
];

const variants = [
  {
    name: "Minarquismo",
    description: "Defiende un Estado mínimo limitado a proteger derechos (policía, tribunales, defensa). También llamado 'Estado vigilante nocturno'.",
  },
  {
    name: "Anarcocapitalismo",
    description: "Propone la abolición total del Estado. Todos los servicios, incluida la seguridad, serían provistos por el mercado libre.",
  },
  {
    name: "Libertarismo de izquierda",
    description: "Combina libertad individual con crítica a las desigualdades. Enfatiza la justicia en la apropiación original de recursos.",
  },
  {
    name: "Paleolibertarismo",
    description: "Fusiona libertarismo económico con valores culturales conservadores y tradiciones occidentales.",
  },
];

export default function LibertarioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                ¿Qué es el libertarismo?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                El libertarismo no es una ideología única ni un bloque homogéneo.
                Es un marco de pensamiento centrado en la libertad individual, la responsabilidad personal
                y la limitación del poder coercitivo del Estado.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Principios fundamentales
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {principles.map((principle, i) => (
                <div key={i} className="bg-background border border-border rounded-2xl p-6 hover:shadow-card transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <principle.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Is and Is Not */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Qué es y qué no es
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Aclaraciones sobre concepciones erróneas comunes
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* What it IS */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <h3 className="font-display text-xl font-semibold text-foreground">El libertarismo ES</h3>
                </div>
                <ul className="space-y-3">
                  {isAndIsNot.is.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What it IS NOT */}
              <div className="bg-muted/50 border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-6 h-6 text-muted-foreground" />
                  <h3 className="font-display text-xl font-semibold text-foreground">El libertarismo NO ES</h3>
                </div>
                <ul className="space-y-3">
                  {isAndIsNot.isNot.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Corrientes dentro del libertarismo
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              El libertarismo engloba diversas tendencias con matices propios
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {variants.map((variant, i) => (
                <div key={i} className="bg-background border border-border rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {variant.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {variant.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historical context */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="flex items-center justify-center gap-3 mb-4">
              <History className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Contexto histórico
              </h2>
            </div>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Pensadores que han contribuido al desarrollo del pensamiento libertario
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {historicalFigures.map((figure, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{figure.name}</h3>
                      <p className="text-xs text-muted-foreground">{figure.period}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {figure.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                ¿Quieres saber tu posición?
              </h3>
              <p className="text-muted-foreground mb-6">
                Realiza el test del cuadrante ideológico y descubre dónde te sitúas en el espectro político.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" asChild>
                  <Link href="/cuadrante">
                    Hacer el test
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/comparativas">Ver comparativas</Link>
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
