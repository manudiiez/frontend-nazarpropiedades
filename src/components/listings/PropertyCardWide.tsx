import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types";

interface PropertyCardWideProps {
  property: Property;
}

const PropertyCardWide = ({ property }: PropertyCardWideProps) => {
  const tags = ["Para Familias", "Amplio Espacio", "Excelente Ubicación"];
  const description = `Esta hermosa propiedad combina elegancia y funcionalidad en uno de los mejores barrios de Mendoza. Con amplios espacios y acabados de primera calidad, es perfecta para familias que buscan comodidad y estilo.`;
  const formattedPrice = `${
    property.currency === "USD" ? "US$" : "ARS$"
  } ${property.price.toLocaleString("es-AR")}`;
  console.log(property)
  // Definir todas las características posibles en orden de prioridad
  // Orden: Superficie Total, Habitaciones, Baños, Cochera, Barrio Privado, Orientación, Superficie Cubierta, Mascotas
  const allFeatures = [
    {
      key: "area",
      value: property.area,
      label: "m²",
      icon: "square_foot",
    },
    {
      key: "bedrooms",
      value: property.bedrooms,
      label: property.bedrooms === 1 ? "Habitación" : "Habitaciones",
      icon: "bed",
    },
    {
      key: "bathrooms",
      value: property.bathrooms,
      label: property.bathrooms === 1 ? "Baño" : "Baños",
      icon: "bathtub",
    },
    {
      key: "garages",
      value: property.garages,
      label: property.garages === 1 ? "Auto" : "Autos",
      icon: "garage",
    },
    {
      key: "barrioPrivado",
      value: property.barrioPrivado === "si" ? 1 : 0,
      label: "",
      displayLabel: "B. Privado",
      icon: "holiday_village",
    },
    {
      key: "orientation",
      value: property.orientation ? 1 : 0,
      label: property.orientation
        ? `Orient. ${
            property.orientation.charAt(0).toUpperCase() +
            property.orientation.slice(1)
          }`
        : "",
      icon: "explore",
    },
    {
      key: "coveredArea",
      value: property.coveredArea,
      label: "m² cubiertos",
      icon: "roofing",
    },
    {
      key: "petFriendly",
      value: property.petFriendly ? 1 : 0,
      label: "",
      displayLabel: "Acepta Mascotas",
      icon: "pets",
    },
  ];

  // Filtrar características que tienen valor y tomar solo las primeras 6 (2 filas de 3)
  const visibleFeatures = allFeatures
    .filter((feature) => feature.value && feature.value > 0)
    .slice(0, 6);

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="flex flex-col lg:flex-row bg-white rounded-sm overflow-hidden border border-gray-border hover:shadow-lg transition-shadow group"
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
          <h3 className="text-2xl font-bold text-gray-900">
            {property.location}
          </h3>
          <h4 className="text-sm font-semibold text-text-secondary-light mb-2">
            <span className="capitalize">
              {property.type} en {property.condition}
            </span>{" "}
            {property.neighborhood}
          </h4>
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
            {formattedPrice}
          </p>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-4 text-sm text-text-secondary-light mb-6">
            {visibleFeatures.map((feature) => (
              <div key={feature.key} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xl">
                  {feature.icon}
                </span>
                <span>
                  {feature.displayLabel
                    ? feature.displayLabel
                    : `${feature.value} ${feature.label}`}
                </span>
              </div>
            ))}
          </div>

          {/* Botones (solo mobile) */}
          <div className="flex gap-3 lg:hidden">
            <button className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded-sm text-sm font-medium transition-colors cursor-pointer">
              Ver Detalles
            </button>
            <button className="px-6 border border-gray-border hover:bg-gray-ui rounded-sm text-sm font-medium transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined">360</span>
              <span>Virtual Tour</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCardWide;
