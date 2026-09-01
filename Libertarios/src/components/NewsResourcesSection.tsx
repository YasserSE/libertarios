import { Link } from "@/i18n/Link";
import { ArrowRight, BookOpen, Compass, FlaskConical, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESOURCE_SECTIONS } from "@/data/resources";

/**
 * Puerta de entrada a la sección de aprendizaje.
 *
 * La versión anterior era el mismo catálogo inventado que había en `/noticias`:
 * once fotos de banco de imágenes, duraciones y contadores de visitas de vídeos
 * que no existen, y retratos de desconocidos puestos bajo los nombres de Milei,
 * Ron Paul y Ciudadanos. Se sustituye por enlaces a lo que sí existe.
 */
const RESOURCE_COUNT = RESOURCE_SECTIONS.reduce((a, s) => a + s.items.length, 0);

const ENTRIES = [
  {
    icon: Compass,
    title: "¿Qué es ser libertario?",
    href: "/libertario",
    description:
      "Los principios, las cinco corrientes que discrepan entre sí, y las objeciones serias con su respuesta.",
    cta: "Leer",
  },
  {
    icon: Scale,
    title: "Comparativas",
    href: "/comparativas",
    description:
      "Frente a socialdemocracia, conservadurismo o socialismo, en los mismos dos ejes. Con caras conocidas de cada cuadrante.",
    cta: "Comparar",
  },
  {
    icon: FlaskConical,
    title: "Medidas y efectos",
    href: "/medidas",
    description:
      "Topes al alquiler, salario mínimo, aranceles: qué buscan y qué han medido los estudios. Con las fuentes y con lo que la evidencia no respalda.",
    cta: "Ver la evidencia",
  },
  {
    icon: BookOpen,
    title: "Recursos",
    href: "/noticias",
    description: `${RESOURCE_COUNT} fuentes de acceso libre, incluidas las que contradicen lo que defendemos.`,
    cta: "Ver el directorio",
  },
];

export function NewsResourcesSection() {
  return (
    <section id="recursos" className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Antes de decidir, entérate
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            No hace falta que nos creas. Estas páginas explican de qué va esto, dónde encaja frente
            a otras posiciones y dónde leer las fuentes originales.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ENTRIES.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary">
                <entry.icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">{entry.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {entry.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/cuadrante">
              O sitúate tú primero con el test
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
