import { Button } from "@/components/ui/button";
import { SpainMap } from "@/components/SpainMap";
import { InternationalMap } from "@/components/InternationalMap";
import { MapPin, Users, Calendar, Heart, Globe, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dataCategories = [
  { icon: MapPin, label: "Distribución geográfica", value: "52 provincias" },
  { icon: Calendar, label: "Rangos de edad", value: "18-75+ años" },
  { icon: Users, label: "Género", value: "Diversidad total" },
  { icon: Heart, label: "Orientación sexual", value: "Datos anónimos" },
  { icon: Globe, label: "Nacionalidades", value: "15+ países" },
];

export function DataSection() {
  return (
    <section id="datos" className="py-24 lg:py-32 bg-card">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Diversidad real, no estereotipos
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Los datos agregados permiten observar tendencias sin exponer a nadie.
            Visualizamos información demográfica de forma anónima, transparente y con fines exclusivamente educativos.
          </p>
        </div>

        {/* Data categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {dataCategories.map((category, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-xl p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">
                {category.label}
              </h3>
              <p className="text-sm text-muted-foreground">{category.value}</p>
            </div>
          ))}
        </div>

        {/* Maps section with tabs */}
        <div className="bg-background border border-border rounded-2xl p-8 shadow-card mb-8">
          <Tabs defaultValue="spain" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Distribución geográfica de simpatizantes
              </h3>
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="spain" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  España
                </TabsTrigger>
                <TabsTrigger value="international" className="gap-2">
                  <Globe className="w-4 h-4" />
                  Internacional
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="spain" className="mt-0">
              <SpainMap />
            </TabsContent>

            <TabsContent value="international" className="mt-0">
              <InternationalMap />
            </TabsContent>
          </Tabs>
        </div>

        {/* Chart preview */}
        <div className="bg-background border border-border rounded-2xl p-8 shadow-card">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Sample bar chart */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                Distribución por edad
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Explora gráficos de distribución y análisis demográficos. 
                Todos los datos son agregados y nunca identifican a individuos.
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  { label: "18-30 años", value: 35 },
                  { label: "31-45 años", value: 42 },
                  { label: "46-60 años", value: 18 },
                  { label: "60+ años", value: 5 },
                ].map((bar, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-24 flex-shrink-0">
                      {bar.label}
                    </span>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-1000"
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-10 text-right">
                      {bar.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender distribution */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                Distribución por género
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Hombres", value: 68, color: "bg-primary" },
                  { label: "Mujeres", value: 28, color: "bg-primary/60" },
                  { label: "Otros", value: 4, color: "bg-primary/30" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-muted"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-primary"
                          strokeWidth="3"
                          strokeDasharray={`${item.value} ${100 - item.value}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display font-bold text-foreground">{item.value}%</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              <Button variant="cta" size="lg" className="w-full mt-6">
                Explorar todos los gráficos
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
