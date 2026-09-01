"use client";

import { Fragment, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { ArrowRight, ChevronDown, Scale, GripVertical, Plus, X } from "lucide-react";
import {
  COMPARISON_ASPECTS,
  IDEOLOGIES,
  LIBERTARIANISM,
  type Ideology,
} from "@/data/ideologies";
import { MiniQuadrant, PositionLabel } from "@/components/aprende/MiniQuadrant";
import { QuadrantFigures } from "@/components/aprende/QuadrantFigures";
import { CountryPairs } from "@/components/aprende/CountryPairs";
import { FaceExplorer } from "@/components/aprende/FaceExplorer";
import { ReferenceAvatar } from "@/components/maps/ReferenceAvatar";
import { FEATURED_FIGURE_IDS } from "@/data/quadrantReferences";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * Intensidad de 0 a 4 en un aspecto.
 *
 * La tabla anterior solo tenía prosa: cinco frases distintas por fila que no se
 * pueden comparar de un vistazo. La barra da el orden de magnitud y la frase
 * explica el matiz; hacen falta las dos, y el número queda en el `title` y en
 * el texto accesible para quien no distinga la barra.
 */
function RatingBar({ value, accent = false }: { value: number; accent?: boolean }) {
  const levels = ["Nulo", "Bajo", "Medio", "Alto", "Máximo"];
  return (
    <span
      className="flex items-center gap-1"
      title={`${levels[value]} (${value} de 4)`}
      role="img"
      aria-label={`${levels[value]}, ${value} de 4`}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-5 rounded-full ${
            i < value
              ? accent
                ? "bg-primary"
                : "bg-foreground/45"
              : "bg-muted"
          }`}
        />
      ))}
    </span>
  );
}

function SortableIdeologyChip({ ideology, onRemove }: { ideology: Ideology; onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ideology.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card shadow-sm ${
        isDragging ? "opacity-50 shadow-lg z-50" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div className={`w-3 h-3 rounded-full ${ideology.color}`} />
      <span className="font-medium text-foreground text-sm">{ideology.name}</span>
      <button
        onClick={onRemove}
        className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function IdeologySelector({ 
  available, 
  onAdd 
}: { 
  available: Ideology[]; 
  onAdd: (id: string) => void;
}) {
  if (available.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {available.map((ideology) => (
        <button
          key={ideology.id}
          onClick={() => onAdd(ideology.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-border bg-background hover:bg-accent hover:border-primary/50 transition-all text-sm"
        >
          <Plus className="w-3 h-3 text-muted-foreground" />
          <div className={`w-2 h-2 rounded-full ${ideology.color}`} />
          <span className="text-muted-foreground">{ideology.name}</span>
        </button>
      ))}
    </div>
  );
}

export default function ComparativasPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["socialdemocracia", "conservadurismo", "socialismo"]);
  // La tabla es densa y ocupa toda la pantalla: se abre a petición, no de
  // entrada. Quien llega buscando la comparación tiene el enlace arriba.
  // La tabla ya no es una pared de prosa, así que abrirla de entrada no
  // sepulta la página y ahorra un clic a quien viene justo a comparar.
  const [tableOpen, setTableOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  // El navegador intenta saltar al ancla antes de que esta página —cliente y con
  // dnd-kit— termine de hidratar, así que la posición se pierde y te deja
  // arriba. Se repite el salto una vez montado.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const selectedIdeologies = selectedIds
    .map((id) => IDEOLOGIES.find((i) => i.id === id))
    .filter(Boolean) as Ideology[];

  const availableIdeologies = IDEOLOGIES.filter((i) => !selectedIds.includes(i.id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSelectedIds((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemove = (id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleAdd = (id: string) => {
    setSelectedIds((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Comparar para entender
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Selecciona y arrastra las ideologías que quieras comparar con el libertarismo.
                La tabla se actualiza instantáneamente.
              </p>
            </div>
          </div>
        </section>

        {/* Selector y tabla, en un solo bloque */}
        <section id="tabla" className="scroll-mt-20 border-y border-border bg-card py-12">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    Compara el libertarismo con lo que quieras
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Arrastra para reordenar, quita con × y añade más abajo. La tabla se actualiza al
                    instante.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTableOpen((v) => !v)}
                  aria-expanded={tableOpen}
                  aria-controls="tabla-comparativa"
                >
                  {tableOpen ? "Ocultar tabla" : "Mostrar tabla"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${tableOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>
              
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={selectedIds}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="flex flex-wrap gap-3 mb-6 min-h-[48px] p-4 bg-accent/30 rounded-xl border border-dashed border-border">
                    {selectedIdeologies.length === 0 ? (
                      <p className="text-muted-foreground text-sm">Añade ideologías para comparar...</p>
                    ) : (
                      selectedIdeologies.map((ideology) => (
                        <SortableIdeologyChip
                          key={ideology.id}
                          ideology={ideology}
                          onRemove={() => handleRemove(ideology.id)}
                        />
                      ))
                    )}
                  </div>
                </SortableContext>
              </DndContext>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-3">Añadir más ideologías:</p>
                <IdeologySelector available={availableIdeologies} onAdd={handleAdd} />
              </div>

              <div id="tabla-comparativa" hidden={!tableOpen}>
            {selectedIdeologies.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Selecciona al menos una ideología para ver la comparación
              </div>
            ) : (
              /*
                La tabla anterior metía una frase larga en cada celda: con cinco
                aspectos y cuatro columnas eran veinte párrafos, y había que
                hacer scroll en los dos ejes para leer una comparación. Ahora la
                rejilla es compacta —barra de intensidad y una etiqueta corta— y
                la prosa se despliega por filas, solo la que se quiera leer.
              */
              <div className="mx-auto max-w-6xl overflow-x-auto">
                <table className="w-full border-collapse">
                  <caption className="sr-only">
                    Comparación del libertarismo con otras ideologías en cinco aspectos, con una
                    escala de intensidad de 0 a 4.
                  </caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="w-40 py-3 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Aspecto
                      </th>
                      <th scope="col" className="min-w-[7.5rem] px-3 py-3 text-left">
                        <span className="flex items-center gap-1.5 font-display text-sm font-semibold text-primary">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                          Libertarismo
                        </span>
                        <span className="mt-0.5 block text-[10px] font-normal tabular-nums text-muted-foreground">
                          E +{LIBERTARIANISM.position.economic} · S +{LIBERTARIANISM.position.social}
                        </span>
                      </th>
                      {selectedIdeologies.map((ideology) => (
                        <th key={ideology.id} scope="col" className="min-w-[7.5rem] px-3 py-3 text-left">
                          <span className="flex items-center gap-1.5 font-display text-sm font-semibold text-foreground">
                            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${ideology.color}`} />
                            {ideology.name}
                          </span>
                          <span className="mt-0.5 block text-[10px] font-normal tabular-nums text-muted-foreground">
                            E {ideology.position.economic > 0 ? "+" : ""}
                            {ideology.position.economic} · S{" "}
                            {ideology.position.social > 0 ? "+" : ""}
                            {ideology.position.social}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ASPECTS.map((aspect) => {
                      const open = expanded === aspect.key;
                      return (
                        <Fragment key={aspect.key}>
                          <tr className="border-b border-border/60">
                            <th scope="row" className="py-2.5 pr-3 text-left align-middle">
                              <button
                                type="button"
                                onClick={() => setExpanded(open ? null : aspect.key)}
                                aria-expanded={open}
                                className="flex items-center gap-1.5 text-left text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <ChevronDown
                                  className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${
                                    open ? "rotate-180" : ""
                                  }`}
                                />
                                {aspect.label}
                              </button>
                            </th>
                            <td className="px-3 py-2.5 align-middle">
                              <RatingBar value={LIBERTARIANISM.ratings[aspect.key]} accent />
                            </td>
                            {selectedIdeologies.map((ideology) => (
                              <td key={ideology.id} className="px-3 py-2.5 align-middle">
                                <RatingBar value={ideology.ratings[aspect.key]} />
                              </td>
                            ))}
                          </tr>

                          {open && (
                            <tr className="border-b border-border/60 bg-accent/30">
                              <td className="py-3 pr-3 align-top text-[11px] uppercase tracking-wide text-muted-foreground">
                                Detalle
                              </td>
                              <td className="px-3 py-3 align-top text-xs leading-relaxed text-primary">
                                {LIBERTARIANISM.comparisons[aspect.key]}
                              </td>
                              {selectedIdeologies.map((ideology) => (
                                <td
                                  key={ideology.id}
                                  className="px-3 py-3 align-top text-xs leading-relaxed text-muted-foreground"
                                >
                                  {ideology.comparisons[aspect.key]}
                                </td>
                              ))}
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>

                <p className="mt-4 text-xs text-muted-foreground">
                  Escala de 0 a 4. Toca cualquier aspecto para leer el matiz de cada posición.
                </p>
              </div>
            )}

              {selectedIdeologies.length > 0 && (
                <div className="mt-10 border-t border-border pt-8">
                  <h3 className="mb-5 font-display text-lg font-semibold text-foreground">
                    Detalle de las seleccionadas
                  </h3>
                  {/*
                    El libertarismo va siempre el primero, como en la tabla. Es
                    el término de comparación de toda la página: sin él, estas
                    fichas describen ideologías sueltas en vez de compararlas
                    con algo.
                  */}
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {[LIBERTARIANISM, ...selectedIdeologies].map((ideology) => (
                      <div
                        key={ideology.id}
                        className={`animate-scale-in rounded-2xl border p-5 ${
                          ideology.id === LIBERTARIANISM.id
                            ? "border-primary/30 bg-primary/5"
                            : "border-border bg-background"
                        }`}
                      >
                        <div className="mb-3 flex items-start gap-3">
                          <MiniQuadrant position={ideology.position} size={48} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${ideology.color}`} />
                              <h4
                                className={`font-display text-base font-semibold ${
                                  ideology.id === LIBERTARIANISM.id
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {ideology.name}
                              </h4>
                            </div>
                            <PositionLabel position={ideology.position} />
                          </div>
                          {ideology.id === LIBERTARIANISM.id && (
                            <span className="ml-auto shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                              Referencia
                            </span>
                          )}
                        </div>
                        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                          {ideology.summary}
                        </p>
                        <ul className="space-y-1.5">
                          {ideology.keyPoints.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-sm">
                              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </section>

        <FaceExplorer
          ids={FEATURED_FIGURE_IDS}
          title="Empieza por las caras"
          intro="Los mismos referentes, colocados donde les toca. Toca cualquiera para ver por qué está ahí: las medidas concretas que sostienen su posición."
        />

        {/* Libertarianism summary */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">Libertarismo</h2>
                  <p className="text-muted-foreground">El punto de referencia para las comparaciones</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                El libertarismo es una filosofía política que prioriza la libertad individual, la propiedad privada 
                y la limitación del poder coercitivo del Estado. Defiende que cada persona tiene derecho a vivir 
                como desee mientras no agreda los derechos de otros.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Libertad individual máxima",
                  "Propiedad privada inviolable",
                  "Estado mínimo o inexistente",
                  "No agresión como principio",
                ].map((point, i) => (
                  <div key={i} className="bg-background border border-border rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-primary mb-2" />
                    <p className="text-sm font-medium text-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <QuadrantFigures />

        <CountryPairs />

        {/* Disclaimer */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto bg-accent/50 border border-border rounded-2xl p-8 text-center">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                Nota sobre estas comparaciones
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Son simplificaciones con fines educativos: cada ideología tiene variantes que discrepan
                entre sí tanto como discrepan del resto. Las coordenadas usan la misma escala que el
                cuadrante y el test, con el eje económico anclado en el tamaño del Estado. El objetivo
                no es atacar ni promover ninguna posición, sino que las diferencias se puedan leer en
                paralelo.
              </p>
              <Button variant="cta" asChild>
                <Link href="/libertario">
                  Conocer más sobre el libertarismo
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
