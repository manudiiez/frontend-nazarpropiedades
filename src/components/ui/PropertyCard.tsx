import Image from 'next/image'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  // Definir todas las características posibles en orden de prioridad
  const allFeatures = [
    {
      key: 'bedrooms',
      value: property.bedrooms,
      label: 'Hab',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      key: 'bathrooms',
      value: property.bathrooms,
      label: 'Baños',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    },
    {
      key: 'area',
      value: property.area,
      label: 'm²',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      )
    },
    {
      key: 'coveredArea',
      value: property.coveredArea,
      label: 'm² cub.',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      key: 'garages',
      value: property.garages,
      label: 'Cocheras',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ]

  // Filtrar características que tienen valor (no son 0, null, o undefined) y tomar solo las primeras 3
  const visibleFeatures = allFeatures.filter(feature => feature.value && feature.value > 0).slice(0, 3)
  console.log(property)
  // Formatear el precio con la moneda
  const currencySymbol = property.currency?.toUpperCase() === 'USD' ? 'US$' : 'ARS$'
  const formattedPrice = `${currencySymbol} ${property.price.toLocaleString('es-AR')}`

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-light bg-white cursor-pointer hover:shadow-lg transition-shadow">
      <div className="relative aspect-video w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <p className="text-2xl font-bold text-primary">
            {formattedPrice}
          </p>
          <p className="mt-1 text-lg font-semibold text-primary capitalize">
            {property.type} en {property.condition}
          </p>
          <p className="text-sm text-gray-500">{property.location}</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-neutral-light pt-4 text-sm text-gray-600">
          {visibleFeatures.map((feature) => (
            <span key={feature.key} className="flex items-center gap-1.5">
              {feature.icon}
              {feature.value} {feature.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
