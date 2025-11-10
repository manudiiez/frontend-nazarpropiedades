import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/types'

interface PropertyCardCompactProps {
  property: Property
}

const PropertyCardCompact = ({ property }: PropertyCardCompactProps) => {
  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="flex flex-col bg-white rounded-sm overflow-hidden border border-gray-border hover:shadow-lg transition-shadow group"
    >
      {/* Imagen */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 relative z-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-md font-bold text-gray-900">{property.location}</h3>
        <p className="text-lg font-black text-accent">
          ${property.price.toLocaleString('es-AR')}
        </p>

        {/* Estadísticas */}
        <div className="flex justify-between text-xs text-text-secondary-light">
          <div className="flex items-center ">
            <span className="material-symbols-outlined text-base">
              square_foot
            </span>
            <span>{property.area} m²</span>
          </div>
          <div className="flex items-center ">
            <span className="material-symbols-outlined text-base">bed</span>
            <span>{property.bedrooms} Hab</span>
          </div>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-base">
              bathtub
            </span>
            <span>{property.bathrooms} Baños</span>
          </div>
        </div>

        {/* Botón (solo mobile) */}
        <button className="w-full md:hidden bg-accent hover:bg-accent-hover text-white py-2 rounded-sm font-medium transition-colors mt-2 text-sm cursor-pointer">
          Ver Detalles
        </button>
      </div>
    </Link>
  )
}

export default PropertyCardCompact
