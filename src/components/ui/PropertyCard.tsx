import Image from "next/image";
import type { Property } from "@/types";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  // Definir todas las características posibles en orden de prioridad
  const allFeatures = [
    {
      key: "bedrooms",
      value: property.bedrooms,
      label: "Hab",
      icon: "bed",
    },
    {
      key: "bathrooms",
      value: property.bathrooms,
      label: "Baños",
      icon: "bathtub",
    },
    {
      key: "area",
      value: property.area,
      label: "m²",
      icon: "square_foot",
    },
    {
      key: "coveredArea",
      value: property.coveredArea,
      label: "m² cub.",
      icon: "square_foot",
    },
    {
      key: "garages",
      value: property.garages,
      label: "Cocheras",
      icon: "garage",
    },
  ];

  // Filtrar características que tienen valor (no son 0, null, o undefined) y tomar solo las primeras 3
  const visibleFeatures = allFeatures
    .filter((feature) => feature.value && feature.value > 0)
    .slice(0, 3);
  // Formatear el precio con la moneda
  const currencySymbol =
    property.currency?.toUpperCase() === "USD" ? "US$" : "ARS$";
  const formattedPrice = `${currencySymbol} ${property.price.toLocaleString(
    "es-AR"
  )}`;

  return (
    <Link href={`/propiedades/${property.id}`} className="flex flex-col overflow-hidden rounded-lg border border-neutral-light bg-white cursor-pointer hover:shadow-lg transition-shadow">
      <div className="relative aspect-video w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <p className="text-2xl font-bold text-primary">{formattedPrice}</p>
          <p className="mt-1 text-lg font-semibold text-primary capitalize">
            {property.type} en {property.condition}
          </p>
          <p className="text-sm text-gray-500">{property.location}</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-neutral-light pt-4 text-sm text-gray-600">
          {visibleFeatures.map((feature) => (
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-lg"
                key={feature.key}
              >
                {feature.icon}
              </span>
              <span>
                {feature.value} {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
