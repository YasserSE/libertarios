import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { QuadrantSection } from "@/components/QuadrantSection";
import { DataSection } from "@/components/DataSection";
import { LibertarianSection } from "@/components/LibertarianSection";
import { CompareSection } from "@/components/CompareSection";
import { NewsResourcesSection } from "@/components/NewsResourcesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <QuadrantSection />
        <DataSection />
        <LibertarianSection />
        <CompareSection />
        <NewsResourcesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
