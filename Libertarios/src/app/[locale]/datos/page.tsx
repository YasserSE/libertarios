import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpainProvinceMap } from "@/components/maps/SpainProvinceMap";
import { QuadrantDistribution } from "@/components/QuadrantDistribution";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { mockUsers } from "@/data/mockRegisteredUsers";
import { getCountrySnapshot } from "@/lib/affiliates/repository";
import { ArrowRight, MapPin, Users, Calendar, Heart, Globe, TrendingUp } from "lucide-react";

// Calculate stats from mock data
const spain = getCountrySnapshot("ES")!;
const activeProvinces = spain.regions.filter((r) => r.count > 0);

const calculateStats = () => {
  const ageGroups: Record<string, number> = {};
  const genders: Record<string, number> = {};

  mockUsers.forEach((user, index) => {
    // Age groups (simulated from index)
    const ageGroup = index % 4 === 0 ? "18-30" : index % 4 === 1 ? "31-45" : index % 4 === 2 ? "46-60" : "60+";
    ageGroups[ageGroup] = (ageGroups[ageGroup] || 0) + 1;

    // Genders (simulated)
    const gender = index % 10 < 7 ? "Hombre" : index % 10 < 9 ? "Mujer" : "Otro";
    genders[gender] = (genders[gender] || 0) + 1;
  });

  return { ageGroups, genders };
};

const stats = calculateStats();

const ageData = Object.entries(stats.ageGroups).map(([label, value]) => ({
  label,
  value: Math.round((value / mockUsers.length) * 100),
})).sort((a, b) => b.value - a.value);

const genderData = Object.entries(stats.genders).map(([label, value]) => ({
  label,
  value: Math.round((value / mockUsers.length) * 100),
}));

const topProvinces = activeProvinces.slice(0, 10).map((r) => ({
  name: r.meta.name,
  count: r.count,
  percentage: (r.share * 100).toFixed(1),
}));

export default function DatosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Datos y mapas
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Visualización de datos demográficos de simpatizantes libertarios en España.
                Toda la información es anónima y agregada.
              </p>
            </div>
          </div>
        </section>

        {/* Summary stats */}
        <section className="py-8">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Users, label: "Total registrados", value: spain.count.toLocaleString("es-ES") },
                { icon: MapPin, label: "Provincias", value: `${activeProvinces.length} / 52` },
                { icon: Calendar, label: "Edad media", value: "34 años" },
                { icon: Globe, label: "Nacionalidades", value: "15+" },
                { icon: TrendingUp, label: "Este mes", value: "+127" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map section */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Distribución geográfica
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Mapa de simpatizantes por provincia
            </p>
            
            <div className="max-w-4xl mx-auto">
              <SpainProvinceMap regions={spain.regions} />
            </div>

            {/* Top provinces */}
            <div className="max-w-3xl mx-auto mt-12">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6 text-center">
                Top 10 provincias
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {topProvinces.map((province, i) => (
                  <div key={i} className="flex items-center gap-4 bg-background border border-border rounded-lg p-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{province.name}</div>
                      <div className="text-sm text-muted-foreground">{province.count} simpatizantes</div>
                    </div>
                    <div className="text-primary font-semibold">{province.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quadrant Distribution */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <QuadrantDistribution />
            </div>
          </div>
        </section>

        {/* Demographics */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Datos demográficos
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Age distribution */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Distribución por edad
                  </h3>
                </div>
                <div className="space-y-4">
                  {ageData.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label} años</span>
                        <span className="font-medium text-foreground">{item.value}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender distribution */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Distribución por género
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {genderData.map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-3">
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
                          <span className="font-display text-lg font-bold text-foreground">{item.value}%</span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy notice */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Privacidad ante todo
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Todos los datos se muestran de forma agregada y anónima. Nunca es posible identificar 
                a un individuo concreto. Cumplimos estrictamente con la normativa RGPD.
              </p>
              <Button variant="outline" asChild>
                <Link href="/proyecto">
                  Ver metodología completa
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Contribuye a los datos
              </h3>
              <p className="text-muted-foreground mb-6">
                Registra tu posición ideológica y ayuda a crear una imagen más completa del pensamiento libertario en España.
              </p>
              <Button variant="cta" asChild>
                <Link href="/registro">
                  Registrarme como simpatizante
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
