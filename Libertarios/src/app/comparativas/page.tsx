"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronDown, Scale, GripVertical, Plus, X } from "lucide-react";
import {
  COMPARISON_ASPECTS,
  IDEOLOGIES,
  LIBERTARIANISM,
  type Ideology,
} from "@/data/ideologies";
import { MiniQuadrant, PositionLabel } from "@/components/aprende/MiniQuadrant";
import { QuadrantFigures } from "@/components/aprende/QuadrantFigures";
import { ReferenceAvatar } from "@/components/maps/ReferenceAvatar";
import { REFERENCE_SETS } from "@/data/quadrantReferences";
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
  const [tableOpen, setTableOpen] = useState(false);

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

  // Seis fichas, en orden explícito y cubriendo todo el rango del eje: de +88 a
  // −62. Una rejilla de tres columnas se completa exacta y el enganche no se
  // convierte en otro listado largo.
  const HOOK_IDS = ["milei", "rallo", "bukele", "trump", "sanchez", "lula"];
  const allPoints = REFERENCE_SETS.flatMap((set) => set.points);
  const hooks = HOOK_IDS.map((id) => allPoints.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  
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

        {/* Acceso directo a la tabla, lo primero tras la cabecera */}
        <section className="pb-4">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="cta"
                onClick={() => {
                  setTableOpen(true);
                  requestAnimationFrame(() =>
                    document.getElementById("tabla")?.scrollIntoView({ behavior: "smooth" }),
                  );
                }}
              >
                Ver la tabla comparativa
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button variant="outline" asChild>
                <a href="#referentes">Ver los referentes actuales</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Enganche: caras conocidas antes que conceptos */}
        <section className="py-12">
          <div className="container">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Empieza por las caras
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Las etiquetas se entienden mejor con ejemplos. Toca cualquiera y se abre el
                cuadrante ya filtrado, con esa ficha señalada.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {hooks.map((point) => (
                <Link
                  key={point.id}
                  href={`/cuadrante?capas=${point.kind}&ref=${point.id}`}
                  className="group flex gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ReferenceAvatar point={point} size={44} />
                  <div className="min-w-0">
                    <p className="font-display font-semibold leading-tight text-foreground">
                      {point.label}
                    </p>
                    <p className="mt-0.5 font-display text-[11px] font-semibold tabular-nums text-primary">
                      E {point.economic > 0 ? "+" : ""}
                      {point.economic} · S {point.social > 0 ? "+" : ""}
                      {point.social}
                    </p>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-snug text-muted-foreground">
                      {point.note}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Ver en el cuadrante
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

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

        {/* Interactive selector */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Ideologías seleccionadas para comparar
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Arrastra para reordenar • Haz clic en × para quitar • Añade más abajo
              </p>
              
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
            </div>
          </div>
        </section>

        {/* Dynamic comparison table */}
        <section id="tabla" className="scroll-mt-20 border-y border-border bg-card py-12">
          <div className="container">
            <h2 className="mb-4 text-center font-display text-2xl font-bold text-foreground md:text-3xl">
              Tabla comparativa
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-center text-muted-foreground">
              Comparación directa de posiciones en aspectos fundamentales.
            </p>

            <div className="mb-10 text-center">
              <Button
                variant={tableOpen ? "outline" : "cta"}
                onClick={() => setTableOpen((v) => !v)}
                aria-expanded={tableOpen}
                aria-controls="tabla-comparativa"
              >
                {tableOpen ? "Ocultar tabla" : "Mostrar tabla comparativa"}
                <ChevronDown
                  className={`ml-1.5 h-4 w-4 transition-transform ${tableOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </div>

            <div id="tabla-comparativa" hidden={!tableOpen}>
            {selectedIdeologies.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Selecciona al menos una ideología para ver la comparación
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full max-w-6xl mx-auto">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-display font-semibold text-foreground">
                        Aspecto
                      </th>
                      <th className="min-w-[11rem] py-4 px-4 text-left font-display font-semibold text-primary">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-primary" />
                          Libertarismo
                        </div>
                        <span className="mt-0.5 block font-body text-[11px] font-normal tabular-nums text-muted-foreground">
                          E +{LIBERTARIANISM.position.economic} · S +{LIBERTARIANISM.position.social}
                        </span>
                      </th>
                      {selectedIdeologies.map((ideology) => (
                        <th
                          key={ideology.id}
                          className="min-w-[11rem] py-4 px-4 text-left font-display font-semibold text-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${ideology.color}`} />
                            {ideology.name}
                          </div>
                          <span className="mt-0.5 block font-body text-[11px] font-normal tabular-nums text-muted-foreground">
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
                    {COMPARISON_ASPECTS.map((aspect) => (
                      <tr
                        key={aspect.key}
                        className="border-b border-border/50 hover:bg-accent/30 transition-colors"
                      >
                        <td className="py-4 px-4 align-top">
                          <span className="font-medium text-foreground">{aspect.label}</span>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <RatingBar value={LIBERTARIANISM.ratings[aspect.key]} accent />
                          <span className="mt-1.5 block text-sm font-medium text-primary">
                            {LIBERTARIANISM.comparisons[aspect.key]}
                          </span>
                        </td>
                        {selectedIdeologies.map((ideology) => (
                          <td
                            key={ideology.id}
                            className="animate-fade-in py-4 px-4 align-top"
                          >
                            <RatingBar value={ideology.ratings[aspect.key]} />
                            <span className="mt-1.5 block text-sm text-muted-foreground">
                              {ideology.comparisons[aspect.key]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* Ideology detail cards */}
        {tableOpen && selectedIdeologies.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="container">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
                Detalle de las ideologías seleccionadas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {selectedIdeologies.map((ideology) => (
                  <div
                    key={ideology.id}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-card transition-all animate-scale-in"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <MiniQuadrant position={ideology.position} size={56} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 shrink-0 rounded-full ${ideology.color}`} />
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            {ideology.name}
                          </h3>
                        </div>
                        <PositionLabel position={ideology.position} />
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {ideology.summary}
                    </p>
                    <ul className="space-y-2">
                      {ideology.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <QuadrantFigures />

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
