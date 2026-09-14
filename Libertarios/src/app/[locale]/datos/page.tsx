import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpainProvinceMap } from "@/components/maps/SpainProvinceMap";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { getCountrySnapshot } from "@/lib/affiliates/repository";
import { ArrowRight, MapPin, Users, Heart, Globe, TrendingUp } from "lucide-react";
import { formatPublishedCount } from "@/lib/affiliates/format";

export default async function DatosPage() {
  // Cifras derivadas del agregado de España.
  const spain = (await getCountrySnapshot("ES"))!;
  const activeProvinces = spain.regions.filter((r) => r.count > 0);

  const topProvinces = activeProvinces.slice(0, 10).map((r) => ({
    name: r.meta.name,
    count: r.count,
    percentage: (r.share * 100).toFixed(1),
  }));

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
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {/* Solo cifras que salen del agregado. «Edad media 34 años»,
                  «Nacionalidades 15+» y «Este mes +127» estaban escritas a
                  mano: tres de las cinco tarjetas de una página de datos eran
                  inventadas, y las dos verdaderas quedaban contaminadas por
                  compañía. El eje medio sí sale de la base, y dice algo. */}
              {[
                {
                  icon: Users,
                  label: "Personas contadas",
                  value: formatPublishedCount(spain.count),
                },
                { icon: MapPin, label: "Provincias publicables", value: `${activeProvinces.length} / 52` },
                {
                  icon: TrendingUp,
                  label: "Últimos 30 días",
                  value: `+${spain.growth30d.toLocaleString("es-ES")}`,
                },
                {
                  icon: Globe,
                  label: "Cuadrante medio",
                  value: `${spain.position.economic > 0 ? "+" : ""}${spain.position.economic} / ${spain.position.social > 0 ? "+" : ""}${spain.position.social}`,
                },
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

        {/*
          Aquí había dos bloques que no medían nada.

          La «distribución por cuadrantes» y los «datos demográficos» se
          calculaban sobre `mockUsers`: quinientas personas generadas con un
          PRNG, y la edad y el género salían de `index % 4` e `index % 10`. Es
          decir, los porcentajes eran una propiedad de la posición en un array.
          En una página titulada «Datos y mapas», y bajo el reclamo de que no
          hace falta creernos, era lo más caro que había en el sitio: un lector
          que lo descubre deja de creerse también lo que sí es verdad.

          La base guarda la franja de edad y el género de quien los da, pero
          ninguna vista pública los agrega todavía, y con k-anonimato no se
          pueden publicar hasta que haya suficientes registros por tramo. Hasta
          entonces se dice eso mismo. Los componentes siguen en el repositorio.
        */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <Users className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                Lo que todavía no publicamos
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Quien se registra puede decir su franja de edad y su género, y la idea es publicar
                esa demografía. No está aquí todavía porque publicarla exige un mínimo de registros
                por tramo: con cuatro personas en una franja, un porcentaje señala a una persona.
                Aparecerá cuando los haya, y no antes.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Lo mismo vale para la distribución por cuadrantes: lo que se publica son medias por
                territorio, que es lo que el mapa de arriba enseña.
              </p>
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
