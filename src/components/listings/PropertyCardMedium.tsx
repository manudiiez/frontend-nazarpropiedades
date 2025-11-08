import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/types'

interface PropertyCardMediumProps {
  property: Property
}

const PropertyCardMedium = ({ property }: PropertyCardMediumProps) => {
  const description = `Amplia propiedad en una ubicación privilegiada con excelente conectividad y servicios cercanos.`

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="flex flex-col bg-white rounded-sm overflow-hidden border border-gray-border hover:shadow-lg transition-shadow group"
    >
      {/* Imagen */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-900">{property.location}</h3>

        {/* Descripción */}
        <p className="text-sm text-text-secondary-light line-clamp-2">
          {description}
        </p>

        <p className="text-xl font-black text-accent">
          ${property.price.toLocaleString('es-AR')}
        </p>

        {/* Estadísticas */}
        <div className="flex justify-between text-base text-text-secondary-light text-sm">
          <div className="flex items-center">
            <span className="material-symbols-outlined text-lg">
              square_foot
            </span>
            <span>{property.area} m²</span>
          </div>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-lg">bed</span>
            <span>{property.bedrooms} Hab</span>
          </div>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-lg">
              bathtub
            </span>
            <span>{property.bathrooms} Baños</span>
          </div>
        </div>

        {/* Botón (solo mobile) */}
        <button className="w-full md:hidden bg-accent hover:bg-accent-hover text-white py-2.5 rounded-sm font-medium transition-colors mt-2 text-sm cursor-pointer">
          Ver Detalles
        </button>
      </div>
    </Link>
  )
}

export default PropertyCardMedium
