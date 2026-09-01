"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/Link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Info,
  Mail,
  Search,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RESOURCE_SECTIONS, type ResourceGroup } from "@/data/resources";

/**
 * Recursos.
 *
 * Esta página era un catálogo de contenidos inventado: veinte fichas de vídeos
 * y artículos que no existen, con contadores de visitas fabricados, y fotos de
 * banco de imágenes usadas como retrato de Milei, Ron Paul y Thatcher. Ninguna
 * ficha enlazaba a ningún sitio. Se ha sustituido por lo único que se puede
 * publicar honestamente hoy: enlaces reales a fuentes que existen, y un estado
 * vacío explícito para el contenido propio que todavía no hay.
 */

const GROUPS: { id: ResourceGroup | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "amigas", label: "Webs amigas" },
  { id: "fundamentos", label: "Para empezar" },
  { id: "espanol", label: "En español" },
  { id: "datos", label: "Datos e índices" },
  { id: "contraste", label: "La otra parte" },
];

export default function RecursosPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<ResourceGroup | "todos">("todos");

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCE_SECTIONS.filter((s) => group === "todos" || s.id === group)
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            q === "" ||
            item.title.toLowerCase().includes(q) ||
            item.org.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [query, group]);

  const total = sections.reduce((a, s) => a + s.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" />
                Recursos
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Dónde leer sobre esto
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Un directorio de fuentes que existen y se pueden abrir: textos clásicos, índices de
                datos e instituciones. Incluye deliberadamente fuentes que no son libertarias.
              </p>
            </div>
          </div>
        </section>

        {/* Aviso de honestidad */}
        <section className="pt-10">
          <div className="container">
            <div className="mx-auto flex max-w-3xl gap-3 rounded-2xl border border-border bg-card p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display text-sm font-semibold text-foreground">
                  Todavía no publicamos contenido propio
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Aquí no vas a encontrar vídeos ni análisis nuestros, porque aún no los hemos
                  hecho. Lo que hay son enlaces a terceros, con su fuente identificada. Cuando haya
                  material propio aparecerá en esta misma página, fechado y firmado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buscador y filtros */}
        <section className="py-10">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por título, institución o tema…"
                  aria-label="Buscar recursos"
                  className="pl-9 pr-9"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {GROUPS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGroup(g.id)}
                    aria-pressed={group === g.id}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      group === g.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Listado */}
        <section className="pb-8">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-12">
              {total === 0 && (
                <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
                  No hay recursos que coincidan con «{query}».
                </p>
              )}

              {sections.map((section) => (
                <div key={section.id}>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {section.label}
                  </h2>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{section.intro}</p>

                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li key={item.url + item.title}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-display font-semibold text-foreground">
                                {item.title}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">{item.org}</p>
                            </div>
                            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                          </div>

                          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                              {item.format}
                            </span>
                            {item.free && (
                              <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                                Acceso libre
                              </span>
                            )}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nota sobre los enlaces */}
        <section className="py-10">
          <div className="container">
            <p className="mx-auto max-w-3xl text-xs leading-relaxed text-muted-foreground">
              Todos los enlaces salen a sitios de terceros. Incluir una fuente no significa
              respaldar todo lo que publica: algunas defienden posiciones libertarias, otras las
              contradicen, y varias son bases de datos sin postura. Están marcadas para que se
              sepa cuál es cuál.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-16">
          <div className="container">
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <Mail className="mb-3 h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  ¿Falta una fuente?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Si conoces material que debería estar aquí —también si contradice lo que defiende
                  este proyecto— dínoslo.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <a href="mailto:contacto@libertarios.es?subject=Recurso%20para%20el%20directorio">
                    Proponer un recurso
                  </a>
                </Button>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Antes de leer nada
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Sitúate primero. Con tu posición en la mano, estos textos se leen de otra manera.
                </p>
                <Button variant="cta" size="sm" className="mt-4" asChild>
                  <Link href="/cuadrante">
                    Hacer el test
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
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
