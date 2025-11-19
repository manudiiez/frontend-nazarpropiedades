export const dynamic = 'force-dynamic';
export const revalidate = 3600;
import HeroSection from "@/components/sections/HeroSection";
import FeaturedPropertiesSection from "@/components/sections/FeaturedPropertiesSection";
import NewPropertiesSection from "@/components/sections/NewPropertiesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BenefitsStrip from "@/components/sections/BenefitsStrip";
import CTASection from "@/components/sections/CTASection";

// Forzar renderizado dinámico para que los fetch se ejecuten en runtime

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Ajustar para que solo sea client component la parte del filtro */}
      <HeroSection />

      <FeaturedPropertiesSection />

      <NewPropertiesSection />

      <ServicesSection />

      <BenefitsStrip />

      <CTASection />
    </main>
  );
}
