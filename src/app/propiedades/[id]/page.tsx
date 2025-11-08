import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyHeader from '@/components/property/PropertyHeader'
import PropertyFeatures from '@/components/property/PropertyFeatures'
import PropertyDescription from '@/components/property/PropertyDescription'
import PropertyMap from '@/components/property/PropertyMap'
import PropertyVideo from '@/components/property/PropertyVideo'
import AgentContactSidebar from '@/components/property/AgentContactSidebar'
import RelatedProperties from '@/components/property/RelatedProperties'
import { propertyDetail } from '@/data/propertyDetails'
import { featuredProperties } from '@/data/properties'

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  // En una aplicación real, aquí cargarías los datos de la propiedad usando params.id
  const property = propertyDetail
  const relatedProps = featuredProperties.slice(0, 3)

  return (
    <main className="flex flex-1 justify-center py-5 lg:py-10 mt-20">
      <div className="layout-content-container flex flex-col w-full max-w-7xl px-4 md:px-6">
        {/* Galería de Imágenes */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* Grid Principal: Contenido + Sidebar */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenido Principal (2/3) */}
          <div className="lg:col-span-2">
            <PropertyHeader
              title={property.title}
              price={property.price}
              condition={property.condition}
            />

            <PropertyFeatures property={property} />

            <PropertyDescription
              description={property.description}
              detailedDescription={property.detailedDescription}
              legalInfo={property.legalInfo}
            />

            {property.mapImage && (
              <PropertyMap
                mapImage={property.mapImage}
                location={property.location}
              />
            )}

            {property.videoUrl && (
              <PropertyVideo videoUrl={property.videoUrl} />
            )}
          </div>

          {/* Sidebar (1/3) */}
          {property.agent && <AgentContactSidebar agent={property.agent} />}
        </div>

        {/* Propiedades Relacionadas */}
        <RelatedProperties properties={relatedProps} />
      </div>
    </main>
  )
}
