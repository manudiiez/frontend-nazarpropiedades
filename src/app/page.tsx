import Navbar from '@/components/layout/Navbar'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import PropertyCarousel from '@/components/sections/PropertyCarousel'
import ServicesSection from '@/components/sections/ServicesSection'
import BenefitsStrip from '@/components/sections/BenefitsStrip'
import CTASection from '@/components/sections/CTASection'
import { featuredProperties, recentProperties } from '@/data/properties'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WhatsAppButton />

      <main>
        <HeroSection />

        <PropertyCarousel
          title="Propiedades destacadas"
          subtitle="Las mejores oportunidades del mercado mendocino"
          properties={featuredProperties}
        />

        <PropertyCarousel
          title="Propiedades recién añadidas"
          subtitle="Las últimas incorporaciones a nuestro catálogo"
          properties={recentProperties}
        />

        <ServicesSection />

        <BenefitsStrip />

        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
