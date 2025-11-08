import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/types'

interface PropertyCardWideProps {
  property: Property
}

const PropertyCardWide = ({ property }: PropertyCardWideProps) => {
  const tags = ['Para Familias', 'Amplio Espacio', 'Excelente Ubicación']
  const description = `Esta hermosa propiedad combina elegancia y funcionalidad en uno de los mejores barrios de Mendoza. Con amplios espacios y acabados de primera calidad, es perfecta para familias que buscan comodidad y estilo.`

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden border border-gray-border hover:shadow-lg transition-shadow group"
    >
      {/* Imagen */}
      <div className="relative w-full lg:w-2/3 xl:w-1/2 h-64 lg:h-auto overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Contenido */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {property.location}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Descripción */}
          <p className="text-sm text-text-secondary-light mb-4">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-3xl font-black text-accent mb-4">
            ${property.price.toLocaleString('es-AR')}
          </p>

          {/* Estadísticas */}
          <div className="flex gap-6 text-base text-text-secondary-light mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">
                square_foot
              </span>
              <span>{property.area} m²</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">bed</span>
              <span>{property.bedrooms} Habitaciones</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">
                bathtub
              </span>
              <span>{property.bathrooms} Baños</span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded-lg font-medium transition-colors cursor-pointer">
              Ver Detalles
            </button>
            <button className="px-6 border border-gray-border hover:bg-gray-ui rounded-lg font-medium transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined">360</span>
              <span>Virtual Tour</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PropertyCardWide
