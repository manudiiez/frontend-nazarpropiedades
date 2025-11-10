import PropertyCarousel from './PropertyCarousel'
import type { Property } from '@/types'
import type { Property as ApiProperty } from '@/types/property'
import { getDepartmentLabel, getLocalityLabel } from '@/utils/propertyLabels'

interface FeaturedPropertiesResponse {
  featuredProperties: ApiProperty[]
}

// Función para transformar la propiedad de la API al formato del PropertyCard
function transformProperty(apiProperty: ApiProperty): Property {
  // Obtener la primera imagen o una imagen por defecto
  const image = apiProperty.images?.coverImage?.sizes?.thumbnail?.url || apiProperty.images?.imagenesExtra[0]?.url ||  '/imagenes/home.jpg'
  // Construir la ubicación
  const locationParts = [
    apiProperty.ubication.neighborhood,
    getLocalityLabel(apiProperty.ubication.locality || ''),
    getDepartmentLabel(apiProperty.ubication.department || ''),
    apiProperty.ubication.province,
  ].filter(Boolean)
  if(locationParts[1] === locationParts[2]) {
    locationParts.splice(2, 1)
  }
  const location = locationParts.join(', ')

  // Obtener el área (priorizar coveredArea, luego totalArea)
  const area = apiProperty.caracteristics?.totalArea || 0

  return {
    id: String(apiProperty.id),
    title: apiProperty.title,
    location: location,
    price: apiProperty.caracteristics?.price || 0,
    bedrooms: apiProperty.environments?.bedrooms || 0,
    bathrooms: apiProperty.environments?.bathrooms || 0,
    area: area,
    coveredArea: apiProperty.caracteristics?.coveredArea,
    garages: apiProperty.environments?.garages,
    image: image,
    type: apiProperty.classification.type,
    condition: apiProperty.classification.condition,
  }
}

async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI

    if (!backendUri) {
      console.error('NEXT_PUBLIC_BACKEND_URI no está definido en .env')
      return []
    }

    const res = await fetch(
      `${backendUri}/globals/featured?depth=2&draft=false&locale=undefined&trash=false`,
      {
        next: { revalidate: 60 }, // Revalidar cada 60 segundos
      }
    )

    if (!res.ok) {
      console.error(`Error al obtener propiedades destacadas: ${res.status}`)
      return []
    }

    const data: FeaturedPropertiesResponse = await res.json()
    const apiProperties = data.featuredProperties || []

    // Transformar las propiedades al formato esperado
    return apiProperties.map(transformProperty)
  } catch (error) {
    console.error('Error al hacer fetch de propiedades destacadas:', error)
    return []
  }
}

export default async function FeaturedPropertiesSection() {
  const properties = await getFeaturedProperties()

  // Si no hay propiedades, no mostrar la sección
  if (properties.length === 0) {
    return null
  }

  return (
    <PropertyCarousel
      title="Propiedades Destacadas"
      subtitle="Descubre las mejores oportunidades del mercado"
      properties={properties}
      containerBgColor="bg-white"
    />
  )
}
