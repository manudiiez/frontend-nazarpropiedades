import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types";

interface PropertyCardMediumProps {
  property: Property;
}

const PropertyCardMedium = ({ property }: PropertyCardMediumProps) => {
  const description = `Amplia propiedad en una ubicación privilegiada con excelente conectividad y servicios cercanos.`;
  const formattedPrice = `${
    property.currency === "USD" ? "US$" : "ARS$"
  } ${property.price.toLocaleString("es-AR")}`;

  // Definir todas las características posibles en orden de prioridad
  // Orden: Superficie Total, Habitaciones, Baños, Cochera, Barrio Privado, Orientación, Superficie Cubierta, Mascotas
  const allFeatures = [
    {
      key: 'area',
      value: property.area,
      label: 'm²',
      icon: 'square_foot'
    },
    {
      key: 'bedrooms',
      value: property.bedrooms,
      label: 'Hab',
      icon: 'bed'
    },
    {
      key: 'bathrooms',
      value: property.bathrooms,
      label: 'Baños',
      icon: 'bathtub'
    },
    {
      key: 'garages',
      value: property.garages,
      label: property.garages === 1 ? 'Cochera' : 'Cocheras',
      icon: 'garage'
    },
    {
      key: 'barrioPrivado',
      value: property.barrioPrivado === 'si' ? 1 : 0,
      label: '',
      displayLabel: 'B. Privado',
      icon: 'holiday_village'
    },
    {
      key: 'orientation',
      value: property.orientation ? 1 : 0,
      label: property.orientation ? property.orientation.charAt(0).toUpperCase() + property.orientation.slice(1) : '',
      icon: 'explore'
    },
    {
      key: 'coveredArea',
      value: property.coveredArea,
      label: 'm² cub.',
      icon: 'roofing'
    },
    {
      key: 'petFriendly',
      value: property.petFriendly ? 1 : 0,
      label: '',
      displayLabel: 'Mascotas',
      icon: 'pets'
    }
  ];

  // Filtrar características que tienen valor y tomar solo las primeras 4
  const visibleFeatures = allFeatures.filter(feature => feature.value && feature.value > 0).slice(0, 4);

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
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {property.location}
          </h3>
          <h4 className="text-sm font-semibold text-text-secondary-light pb-3">
            <span className="capitalize">
              {property.type} en {property.condition}
            </span>{" "}
            {property.neighborhood}
          </h4>
          <p className="text-xl font-black text-accent">{formattedPrice}</p>
        </div>
        {/* Descripción */}
        {/* <p className="text-sm text-text-secondary-light line-clamp-2">
          {description}
        </p> */}

        {/* <p className="text-xl font-black text-accent">
          ${property.price.toLocaleString("es-AR")}
        </p> */}

        {/* Estadísticas */}
        <div className="flex justify-between text-base text-text-secondary-light text-sm">
          {visibleFeatures.map((feature) => (
            <div key={feature.key} className="flex items-center">
              <span className="material-symbols-outlined text-lg">
                {feature.icon}
              </span>
              <span>
                {feature.displayLabel ? feature.displayLabel : `${feature.value} ${feature.label}`}
              </span>
            </div>
          ))}
        </div>

        {/* Botón (solo mobile) */}
        <button className="w-full md:hidden bg-accent hover:bg-accent-hover text-white py-2.5 rounded-sm font-medium transition-colors mt-2 text-sm cursor-pointer">
          Ver Detalles
        </button>
      </div>
    </Link>
  );
};

export default PropertyCardMedium;
