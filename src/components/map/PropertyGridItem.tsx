"use client";

import { getDepartmentLabel, getLocalityLabel } from "@/utils/propertyLabels";
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
  ubication?: {
    neighborhood?: string;
    locality?: string;
    department?: string;
    province?: string;
  };
  condition?: string;
  type?: string;
}

interface PropertyGridItemProps {
  property: Property;
  isSelected: boolean;
  onClick: () => void;
}

export default function PropertyGridItem({
  property,
  isSelected,
  onClick,
}: PropertyGridItemProps) {
  // Construir la ubicación en texto

  const locationParts = [
    property?.ubication?.neighborhood,
    getLocalityLabel(property?.ubication?.locality || ""),
    getDepartmentLabel(property?.ubication?.department || ""),
    property?.ubication?.province,
  ].filter(Boolean);

  if (
    property?.ubication?.neighborhood &&
    locationParts[1] === locationParts[2]
  ) {
    locationParts.splice(1, 1);
  } else if (
    !property?.ubication?.neighborhood &&
    locationParts[0] === locationParts[1]
  ) {
    locationParts.splice(0, 1);
  }
  const locationText = locationParts.join(", ");
  

  // Formatear precio
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: property.currency === "USD" ? "USD" : "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden border-2 transition-all cursor-pointer hover:shadow-lg ${
        isSelected
          ? "border-accent shadow-lg"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      {/* Imagen */}
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="400px"
        />
        {/* Badge de condición */}
        {property.condition && (
          <div className="absolute top-2 left-2 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
            {property.condition === "venta" ? "En Venta" : "En Alquiler"}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Precio */}
        <div className="mb-2">
          <p className="text-xl font-bold text-accent">{formattedPrice}</p>
        </div>

        {/* Título */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
          {locationText}
        </h3>

        {/* Ubicación */}
        <div className="flex items-start gap-1 mb-3">
          <span className="material-symbols-outlined text-gray-400 text-sm mt-0.5">
            location_on
          </span>
          <p className="text-xs text-gray-600 line-clamp-1">{locationText}</p>
        </div>

        {/* Características */}
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-gray-400 text-sm">
                  bed
                </span>
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-gray-400 text-sm">
                  bathroom
                </span>
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-gray-400 text-sm">
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
          className={`block w-full text-gray-900 text-center px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            isSelected ? "bg-accent text-white hover:bg-accent-hover hover:text-white" : "bg-gray-100 hover:bg-accent hover:text-white"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
