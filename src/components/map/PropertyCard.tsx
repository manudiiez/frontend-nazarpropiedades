"use client";

import Image from "next/image";
import Link from "next/link";

interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
  ubication?: {
    neighborhood?: string;
    locality?: string;
    department?: string;
    province?: string;
  };
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Construir la ubicación en texto
  const locationParts = [
    property.ubication?.neighborhood,
    property.ubication?.locality,
    property.ubication?.department,
    property.ubication?.province,
  ].filter(Boolean);

  const locationText = locationParts.length > 0 ? locationParts.join(", ") : "Ubicación no especificada";

  // Formatear precio
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: property.currency === "USD" ? "USD" : "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Imagen */}
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Precio */}
        <div className="mb-2">
          <p className="text-2xl font-bold text-accent">{formattedPrice}</p>
        </div>

        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Ubicación */}
        <div className="flex items-start gap-1 mb-4">
          <span className="material-symbols-outlined text-gray-400 text-sm mt-0.5">
            location_on
          </span>
          <p className="text-sm text-gray-600 line-clamp-2">{locationText}</p>
        </div>

        {/* Características */}
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-gray-400 text-base">
                  bed
                </span>
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-gray-400 text-base">
                  bathroom
                </span>
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-gray-400 text-base">
                  square_foot
                </span>
                <span>{property.area} m²</span>
              </div>
            )}
          </div>
        )}

        {/* Botón Ver Detalles */}
        <Link
          href={`/propiedades/${property.id}`}
          className="block w-full bg-accent hover:bg-red-700 text-white text-center px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
