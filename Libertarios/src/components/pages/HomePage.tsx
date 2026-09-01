import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { QuadrantSection } from "@/components/QuadrantSection";
import { DataSection } from "@/components/DataSection";
import { LibertarianSection } from "@/components/LibertarianSection";
import { CompareSection } from "@/components/CompareSection";
import { NewsResourcesSection } from "@/components/NewsResourcesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AffiliateMapSection, type MapScope } from "@/components/maps/AffiliateMapSection";
import { getCountrySnapshot, getEuropeSnapshot } from "@/lib/affiliates/repository";

/**
 * The home page, rendered at one of two scopes.
 *
 * `/` shows the whole of Europe; `/spain` renders the identical page with the
 * map pre-filtered to Spain. Keeping it one component means the two URLs can
 * never drift apart — only the map's scope differs.
 */
export function HomePage({ scope }: { scope: MapScope }) {
  const europe = getEuropeSnapshot();
  const spain = getCountrySnapshot("ES")!;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AffiliateMapSection europe={europe} spain={spain} scope={scope} />
        {/* La comparación va inmediatamente después del mapa: es el gancho que
            explica de qué van los dos ejes que el hero acaba de mostrar. */}
        <CompareSection />
        <AboutSection />
        <QuadrantSection />
        <DataSection />
        <LibertarianSection />
        <NewsResourcesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
