import PropertyCarousel from "./PropertyCarousel";
import type { Property } from "@/types";
import type { Property as ApiProperty } from "@/types/property";
import { getDepartmentLabel, getLocalityLabel } from "@/utils/propertyLabels";
import { getBackendUrl } from "@/utils/utils";

interface PropertiesResponse {
  docs: ApiProperty[];
  totalDocs: number;
  limit: number;
  page: number;
}

// Función para transformar la propiedad de la API al formato del PropertyCard
function transformProperty(apiProperty: ApiProperty): Property {
  // Obtener la primera imagen o una imagen por defecto
  const image =
    apiProperty.images?.coverImage?.sizes?.thumbnail?.url ||
    apiProperty.images?.imagenesExtra[0]?.url ||
    "/imagenes/home.jpg";

  // Construir la ubicación
  const locationParts = [
    apiProperty.ubication.neighborhood,
    getLocalityLabel(apiProperty.ubication.locality || ""),
    getDepartmentLabel(apiProperty.ubication.department || ""),
    apiProperty.ubication.province,
  ].filter(Boolean);
  if (
    apiProperty.ubication.neighborhood &&
    locationParts[1] === locationParts[2]
  ) {
    locationParts.splice(2, 1);
  } else if (
    !apiProperty.ubication.neighborhood &&
    locationParts[0] === locationParts[1]
  ) {
    locationParts.splice(0, 1);
  }
  const location = locationParts.join(", ");

  // Obtener el área (priorizar coveredArea, luego totalArea)
  const area = apiProperty.caracteristics?.totalArea || 0;

  return {
    id: String(apiProperty.id),
    title: apiProperty.title,
    location: location,
    neighborhood: apiProperty.ubication.neighborhood,
    price: apiProperty.caracteristics?.price || 0,
    currency: apiProperty.caracteristics?.currency || "USD",
    bedrooms: apiProperty.environments?.bedrooms || 0,
    bathrooms: apiProperty.environments?.bathrooms || 0,
    area: area,
    coveredArea: apiProperty.caracteristics?.coveredArea,
    garages: apiProperty.environments?.garages,
    garageType: apiProperty.environments?.garageType,
    image: image,
    type: apiProperty.classification.type,
    condition: apiProperty.classification.condition,
    barrioPrivado: apiProperty.amenities?.barrioPrivado,
    orientation: apiProperty.environments?.orientation,
    petFriendly: apiProperty.amenities?.petFriendly,
  };
}

async function getNewProperties(): Promise<Property[]> {
  try {
    const backendUri = getBackendUrl();

    if (!backendUri) {
      console.error("NEXT_PUBLIC_BACKEND_URI no está definido en .env");
      return [];
    }
    console.log('Iniciando fetch')

    const res = await fetch(
      `${backendUri}/propiedades?sort=-createdAt&limit=6`,
      {
        cache: "no-store",
      }
    );

    console.log('Fetch completado:', res);

    if (!res.ok) {
      console.error(`Error al obtener propiedades nuevas: ${res.status}`);
      return [];
    }

    const data: PropertiesResponse = await res.json();
    const apiProperties = data.docs || [];

    // Transformar las propiedades al formato esperado
    return apiProperties.map(transformProperty);
  } catch (error) {
    console.error("Error al hacer fetch de propiedades nuevas:", error);
    return [];
  }
}

export default async function NewPropertiesSection() {
  const properties = await getNewProperties();

  // Si no hay propiedades, no mostrar la sección
  if (properties.length === 0) {
    return <div className="container mx-auto px-4">
      <div className="text-center text-2xl font-bold text-gray-800">
        No hay propiedades nuevas
      </div>
    </div>;
  }

  return (
    <PropertyCarousel
      title="Propiedades Nuevas"
      subtitle="Las últimas propiedades agregadas a nuestro catálogo"
      properties={properties}
      keyPrefix="new-properties"
      containerBgColor="bg-gray-ui"
    />
  );
}
