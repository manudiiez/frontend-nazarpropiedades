import Link from 'next/link'

interface RelatedProperty {
  id: number
  title: string
  location: string
  price: number
  currency: string
}

interface RelatedPropertiesProps {
  properties: RelatedProperty[]
}

export default function RelatedProperties({
  properties,
}: RelatedPropertiesProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-semibold text-gray-900 mb-12">
        Propiedades similares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/propiedades/${property.id}`}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-400 text-4xl">
                home
              </span>
            </div>
            <div className="p-6">
              <div className="text-base font-semibold text-gray-900 mb-2">
                {property.title}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {property.location}
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {property.currency} {property.price.toLocaleString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
