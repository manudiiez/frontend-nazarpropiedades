import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/types'

interface RelatedPropertiesProps {
  properties: Property[]
}

const RelatedProperties = ({ properties }: RelatedPropertiesProps) => {
  if (properties.length === 0) return null

  return (
    <div className="mt-16 lg:mt-24">
      <h3 className="text-3xl font-bold mb-6">Propiedades Relacionadas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/propiedades/${property.id}`}
            className="flex flex-col rounded-xl overflow-hidden border border-gray-border bg-white hover:shadow-lg transition-shadow"
          >
            {/* Imagen */}
            <div className="relative h-56 w-full">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Información */}
            <div className="p-4 flex flex-col gap-2 flex-grow">
              <h4 className="font-bold text-lg">{property.title}</h4>
              <p className="text-text-secondary-light text-sm">
                {property.location}
              </p>
              <p className="text-accent font-bold text-lg mt-auto">
                ${property.price.toLocaleString('es-AR')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedProperties
