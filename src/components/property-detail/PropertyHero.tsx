import type { Classification, Ubication, Price, Features, Measures } from '@/types/property'

interface PropertyHeroProps {
  title: string
  classification: Classification
  ubication: Ubication
  price: Price
  features?: Features
  measures?: Measures
}

export default function PropertyHero({
  title,
  classification,
  ubication,
  price,
  features,
  measures,
}: PropertyHeroProps) {
  // Construir el string de ubicación
  const locationParts = [
    ubication.neighborhood,
    ubication.locality,
    ubication.department,
    ubication.province
  ].filter(Boolean)
  const location = locationParts.join(', ')

  // Obtener área (priorizar coveredArea, luego totalArea)
  const area = measures?.coveredArea || measures?.totalArea

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
            {classification.type} en {classification.condition}
          </h1>
          <div className="text-lg text-gray-600">{location}</div>
          <div className="text-4xl font-semibold text-gray-900">
            {price.currency} {price.amount.toLocaleString()}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 my-8">
            {features?.bedrooms && (
              <div className="text-center py-6 border-t border-gray-200">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {features.bedrooms}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  Dormitorios
                </div>
              </div>
            )}
            {features?.bathrooms && (
              <div className="text-center py-6 border-t border-gray-200">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {features.bathrooms}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  Baños
                </div>
              </div>
            )}
            {area && (
              <div className="text-center py-6 border-t border-gray-200">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {area}m²
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  Superficie
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="bg-accent text-white px-8 py-4 rounded-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5">
              Consultar por esta propiedad
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
