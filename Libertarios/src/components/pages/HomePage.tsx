import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { QuadrantSection } from "@/components/QuadrantSection";
import { LearnSection } from "@/components/LearnSection";
import { DataSection } from "@/components/DataSection";
import { LibertarianSection } from "@/components/LibertarianSection";
import { CompareSection } from "@/components/CompareSection";
import { MeasuresSection } from "@/components/MeasuresSection";
import { NewsResourcesSection } from "@/components/NewsResourcesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AffiliateMapSection, type MapScope } from "@/components/maps/AffiliateMapSection";
import { FaceExplorer } from "@/components/aprende/FaceExplorer";
import { FEATURED_FIGURE_IDS } from "@/data/quadrantReferences";
import { getCountrySnapshot, getEuropeSnapshot } from "@/lib/affiliates/repository";
import { isRegistrationConfigured } from "@/lib/registration/register";

/**
 * The home page, rendered at one of two scopes.
 *
 * `/` shows Spain; `/europa` renders the identical page with the map opened
 * out to the whole continent. Keeping it one component means the two URLs can
 * never drift apart — only the map's scope differs.
 */
export async function HomePage({ scope }: { scope: MapScope }) {
  const europe = await getEuropeSnapshot();
  const spain = (await getCountrySnapshot("ES"))!;
  const registrationOpen = isRegistrationConfigured();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AffiliateMapSection
          europe={europe}
          spain={spain}
          scope={scope}
          registrationOpen={registrationOpen}
        />
        {/* La comparación va inmediatamente después del mapa: es el gancho que
            explica de qué van los dos ejes que el hero acaba de mostrar. */}
        <CompareSection />
        <FaceExplorer
          ids={FEATURED_FIGURE_IDS}
          title="Y esto, ¿quién lo gobierna?"
          intro="Diecisiete gobernantes y economistas colocados donde les toca. Toca cualquiera para ver las medidas concretas que sostienen su posición."
        />
        <AboutSection registrationOpen={registrationOpen} />
        {/*
          Tres secciones fuera, y ninguna por ser mala:

          * `QuadrantSection` explicaba los dos ejes con sesenta puntos de
            `Math.random()`, justo después de que `CompareSection` y
            `FaceExplorer` ya los hubieran explicado con posiciones reales.
          * `DataSection` presumía de demografía con constantes escritas a mano
            («52 provincias», «35% de 18 a 24») bajo el título «Diversidad real,
            no estereotipos». Volverá cuando haya datos que la sostengan.
          * `NewsResourcesSection` era un índice de las tres secciones
            inmediatamente anteriores.

          Con ellas, «contarme» aparecía cuatro veces en la página y el test
          cinco; en móvil eran unas doce pantallas de scroll hasta el pie. Los
          componentes siguen en el repositorio: volver a montarlos es añadir la
          línea.
        */}
        <LearnSection />
        <LibertarianSection />
        <MeasuresSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
