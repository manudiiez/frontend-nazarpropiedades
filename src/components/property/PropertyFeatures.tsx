import type { PropertyDetail } from '@/types'

interface PropertyFeaturesProps {
  property: PropertyDetail
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  const features = [
    { icon: 'bed', label: 'Dormitorios', value: property.bedrooms },
    { icon: 'shower', label: 'Baños', value: property.bathrooms },
    { icon: 'aspect_ratio', label: 'm² Construidos', value: property.area },
    {
      icon: 'landscape',
      label: 'm² Terreno',
      value: property.landArea || property.area,
    },
    { icon: 'garage', label: 'Cocheras', value: property.garages || 'N/A' },
    { icon: 'construction', label: 'Año', value: property.yearBuilt || 'N/A' },
  ]

  const specifications = [
    { label: 'Precio/m²', value: `$${property.pricePerSqm?.toLocaleString('es-AR') || 'N/A'}` },
    { label: 'Impuesto Inmobiliario (Anual)', value: `$${property.annualTax?.toLocaleString('es-AR') || 'N/A'}` },
    { label: 'Expensas (Mensuales)', value: `$${property.monthlyExpenses?.toLocaleString('es-AR') || 'N/A'}` },
    { label: 'Sistema de Calefacción', value: property.heating || 'N/A' },
    { label: 'Sistema de Refrigeración', value: property.cooling || 'N/A' },
    { label: 'Pisos', value: property.flooring || 'N/A' },
    { label: 'Ventanas', value: property.windows || 'N/A' },
  ]

  return (
    <div className="py-6 space-y-4">
      {/* Ubicación */}
      <div className="rounded-lg border border-gray-border bg-white overflow-hidden">
        <div className="flex items-center justify-between p-3 text-lg font-bold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-accent">
              location_on
            </span>
            <span>Ubicación</span>
          </div>
        </div>
        <div className="p-3 border-t border-gray-border space-y-2">
          <p className="text-base font-normal">{property.fullAddress}</p>
          <p className="text-sm text-text-secondary-light">{property.location}</p>
        </div>
      </div>

      {/* Características Principales */}
      <div className="rounded-lg border border-gray-border bg-white overflow-hidden">
        <div className="flex items-center gap-2 p-3 text-lg font-bold">
          <span className="material-symbols-outlined text-accent">
            home
          </span>
          <span>Características</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4 py-3 px-3 border-t border-gray-border">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-accent text-2xl mb-1">
                {feature.icon}
              </span>
              <p className="text-xs text-text-secondary-light mb-0.5">
                {feature.label}
              </p>
              <p className="text-sm font-bold">{feature.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Zonas Cercanas */}
      {property.nearbyPlaces && (
        <div className="rounded-lg border border-gray-border bg-white overflow-hidden">
          <div className="flex items-center gap-2 p-3 text-lg font-bold">
            <span className="material-symbols-outlined text-accent">
              map
            </span>
            <span>Zonas Cercanas</span>
          </div>
          <div className="p-3 space-y-2 text-sm border-t border-gray-border">
            {property.nearbyPlaces.schools && (
              <p>
                <strong>Colegios:</strong> {property.nearbyPlaces.schools}
              </p>
            )}
            {property.nearbyPlaces.hospitals && (
              <p>
                <strong>Hospitales:</strong> {property.nearbyPlaces.hospitals}
              </p>
            )}
            {property.nearbyPlaces.shopping && (
              <p>
                <strong>Compras:</strong> {property.nearbyPlaces.shopping}
              </p>
            )}
            {property.nearbyPlaces.parks && (
              <p>
                <strong>Parques:</strong> {property.nearbyPlaces.parks}
              </p>
            )}
            {property.nearbyPlaces.transport && (
              <p>
                <strong>Transporte Público:</strong> {property.nearbyPlaces.transport}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Especificaciones Detalladas */}
      <div className="rounded-lg border border-gray-border bg-white overflow-hidden">
        <div className="flex items-center gap-2 p-3 text-lg font-bold">
          <span className="material-symbols-outlined text-accent">
            info
          </span>
          <span>Especificaciones Detalladas</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-3 text-sm border-t border-gray-border">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-1">
              <span className="text-text-secondary-light">{spec.label}:</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Comodidades */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="p-3 border-t border-gray-border">
            <p className="font-bold text-sm mb-2">Comodidades:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary-light">
              {property.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyFeatures
