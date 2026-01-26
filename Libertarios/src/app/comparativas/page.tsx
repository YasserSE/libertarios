"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Scale, Users, Building, Coins, Shield, Heart, GripVertical, Plus, X } from "lucide-react";
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

interface Ideology {
  id: string;
  name: string;
  color: string;
  description: string;
  keyPoints: string[];
  comparisons: {
    propiedadPrivada: string;
    libertadEconomica: string;
    libertadIndividual: string;
    rolEstado: string;
    derechosSociales: string;
  };
}

const allIdeologies: Ideology[] = [
  {
    id: "socialismo",
    name: "Socialismo",
    color: "bg-red-500",
    description: "Sistema que busca la propiedad colectiva de los medios de producción y la redistribución de la riqueza.",
    keyPoints: [
      "Propiedad estatal o colectiva de industrias clave",
      "Redistribución de ingresos mediante impuestos progresivos",
      "Servicios públicos universales (sanidad, educación)",
      "Regulación extensa del mercado laboral",
    ],
    comparisons: {
      propiedadPrivada: "Limitada, con control estatal",
      libertadEconomica: "Mercado regulado y planificación parcial",
      libertadIndividual: "Amplia con restricciones económicas",
      rolEstado: "Amplio, regulador y redistribuidor",
      derechosSociales: "Amplios, garantizados por ley",
    },
  },
  {
    id: "comunismo",
    name: "Comunismo",
    color: "bg-red-700",
    description: "Ideología que aspira a una sociedad sin clases, sin Estado y sin propiedad privada.",
    keyPoints: [
      "Abolición de la propiedad privada",
      "Economía planificada centralmente",
      "Dictadura del proletariado como fase transitoria",
      "Sociedad sin clases como objetivo final",
    ],
    comparisons: {
      propiedadPrivada: "Abolida completamente",
      libertadEconomica: "Economía planificada centralmente",
      libertadIndividual: "Subordinada al bien colectivo",
      rolEstado: "Total inicialmente, desaparece después",
      derechosSociales: "Determinados por el colectivo",
    },
  },
  {
    id: "fascismo",
    name: "Fascismo",
    color: "bg-slate-700",
    description: "Ideología ultranacionalista y autoritaria que prioriza el Estado sobre el individuo.",
    keyPoints: [
      "Nacionalismo extremo y culto al Estado",
      "Líder carismático con poderes absolutos",
      "Supresión de libertades individuales",
      "Economía corporativista controlada por el Estado",
    ],
    comparisons: {
      propiedadPrivada: "Nominal, subordinada al Estado",
      libertadEconomica: "Economía dirigida por el Estado",
      libertadIndividual: "Mínima, subordinada al Estado",
      rolEstado: "Totalitario y omnipresente",
      derechosSociales: "Restringidos según conveniencia estatal",
    },
  },
  {
    id: "conservadurismo",
    name: "Conservadurismo",
    color: "bg-blue-600",
    description: "Filosofía que defiende la tradición, el orden social establecido y cambios graduales.",
    keyPoints: [
      "Respeto por las instituciones tradicionales",
      "Valores familiares y religiosos",
      "Economía de mercado con regulación moderada",
      "Cambio social gradual y prudente",
    ],
    comparisons: {
      propiedadPrivada: "Respetada con algunas regulaciones",
      libertadEconomica: "Mercado con regulación moderada",
      libertadIndividual: "Alta con restricciones morales",
      rolEstado: "Moderado, enfocado en orden",
      derechosSociales: "Tradicionales, graduales",
    },
  },
  {
    id: "socialdemocracia",
    name: "Socialdemocracia",
    color: "bg-rose-500",
    description: "Modelo que combina economía de mercado con Estado del bienestar amplio.",
    keyPoints: [
      "Economía mixta con sector privado y público",
      "Estado del bienestar extenso",
      "Sindicatos fuertes y negociación colectiva",
      "Impuestos altos para financiar servicios públicos",
    ],
    comparisons: {
      propiedadPrivada: "Respetada con impuestos altos",
      libertadEconomica: "Mercado regulado con bienestar",
      libertadIndividual: "Alta con protección social",
      rolEstado: "Amplio bienestar y regulación",
      derechosSociales: "Muy amplios, universales",
    },
  },
  {
    id: "anarquismo",
    name: "Anarquismo",
    color: "bg-zinc-900",
    description: "Filosofía que rechaza toda forma de autoridad jerárquica y Estado.",
    keyPoints: [
      "Abolición del Estado y autoridad",
      "Autogestión y organización horizontal",
      "Comunidades autónomas y federadas",
      "Rechazo a la propiedad privada de medios de producción",
    ],
    comparisons: {
      propiedadPrivada: "Personal sí, productiva colectiva",
      libertadEconomica: "Autogestión sin capitalismo",
      libertadIndividual: "Máxima sin jerarquías",
      rolEstado: "Inexistente, abolido",
      derechosSociales: "Definidos por comunidad",
    },
  },
  {
    id: "nacionalismo",
    name: "Nacionalismo",
    color: "bg-amber-600",
    description: "Ideología centrada en la identidad y soberanía de la nación.",
    keyPoints: [
      "Prioridad a intereses nacionales",
      "Protección de cultura e identidad",
      "Soberanía sobre globalización",
      "Control de fronteras e inmigración",
    ],
    comparisons: {
      propiedadPrivada: "Respetada si beneficia la nación",
      libertadEconomica: "Proteccionismo económico",
      libertadIndividual: "Subordinada a interés nacional",
      rolEstado: "Fuerte en defensa nacional",
      derechosSociales: "Para ciudadanos nacionales",
    },
  },
];

const libertarianComparisons = {
  propiedadPrivada: "Derecho fundamental e inviolable",
  libertadEconomica: "Mercado libre sin intervención",
  libertadIndividual: "Máxima, limitada solo por no agredir a otros",
  rolEstado: "Mínimo o inexistente",
  derechosSociales: "Máxima libertad personal",
};

const comparisonAspects = [
  { key: "propiedadPrivada", label: "Propiedad privada", icon: Building },
  { key: "libertadEconomica", label: "Libertad económica", icon: Coins },
  { key: "libertadIndividual", label: "Libertad individual", icon: Heart },
  { key: "rolEstado", label: "Rol del Estado", icon: Shield },
  { key: "derechosSociales", label: "Derechos sociales", icon: Users },
] as const;

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
  const [selectedIds, setSelectedIds] = useState<string[]>(["socialismo", "comunismo", "fascismo"]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const selectedIdeologies = selectedIds
    .map((id) => allIdeologies.find((i) => i.id === id))
    .filter(Boolean) as Ideology[];

  const availableIdeologies = allIdeologies.filter((i) => !selectedIds.includes(i.id));

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
        <section className="py-12 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Tabla comparativa
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Comparación directa de posiciones en aspectos fundamentales
            </p>

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
                      <th className="text-left py-4 px-4 font-display font-semibold text-primary">
                        Libertarismo
                      </th>
                      {selectedIdeologies.map((ideology) => (
                        <th
                          key={ideology.id}
                          className="text-left py-4 px-4 font-display font-semibold text-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${ideology.color}`} />
                            {ideology.name}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonAspects.map((aspect) => (
                      <tr
                        key={aspect.key}
                        className="border-b border-border/50 hover:bg-accent/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <aspect.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{aspect.label}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-primary font-medium">
                          {libertarianComparisons[aspect.key]}
                        </td>
                        {selectedIdeologies.map((ideology) => (
                          <td
                            key={ideology.id}
                            className="py-4 px-4 text-sm text-muted-foreground animate-fade-in"
                          >
                            {ideology.comparisons[aspect.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Ideology detail cards */}
        {selectedIdeologies.length > 0 && (
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-4 h-4 rounded-full ${ideology.color}`} />
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {ideology.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {ideology.description}
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

        {/* Disclaimer */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto bg-accent/50 border border-border rounded-2xl p-8 text-center">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                Nota sobre estas comparaciones
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Estas descripciones son simplificaciones con fines educativos. Cada ideología tiene múltiples 
                variantes y matices. El objetivo no es atacar ni promover ninguna posición, sino facilitar 
                la comprensión de las diferencias fundamentales.
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
