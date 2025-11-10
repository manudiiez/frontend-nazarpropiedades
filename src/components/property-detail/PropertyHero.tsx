interface PropertyHeroProps {
  title: string
  location: string
  price: number
  currency: string
  bedrooms: number
  bathrooms: number
  area: number
}

export default function PropertyHero({
  title,
  location,
  price,
  currency,
  bedrooms,
  bathrooms,
  area,
}: PropertyHeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
            {title}
          </h1>
          <div className="text-lg text-gray-600">{location}</div>
          <div className="text-4xl font-semibold text-gray-900">
            {currency} {price.toLocaleString()}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 my-8">
            <div className="text-center py-6 border-t border-gray-200">
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {bedrooms}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-600">
                Dormitorios
              </div>
            </div>
            <div className="text-center py-6 border-t border-gray-200">
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {bathrooms}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-600">
                Baños
              </div>
            </div>
            <div className="text-center py-6 border-t border-gray-200">
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {area}m²
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-600">
                Superficie
              </div>
            </div>
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
