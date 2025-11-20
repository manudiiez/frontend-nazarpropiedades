import MapViewClient from "./MapViewClient";
import MapFilters from "./MapFilters";

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
  condition?: string;
  type?: string;
}

interface Filters {
  department: string;
  locality: string;
  type: string;
  condition: string;
}

interface MapViewServerProps {
  searchParams?: {
    department?: string;
    locality?: string;
    type?: string;
    condition?: string;
    north?: string;
    south?: string;
    east?: string;
    west?: string;
  };
}

async function fetchInitialProperties(
  filters: Filters,
  bounds?: { north: string; south: string; east: string; west: string }
): Promise<Property[]> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
    if (!backendUri) {
      console.error("NEXT_PUBLIC_BACKEND_URI no está definido");
      return [];
    }

    // Construir query params en formato Payload API
    const queryParams = new URLSearchParams();

    // Límite de resultados
    queryParams.append("limit", "20");
    queryParams.append("depth", "2");

    // Filtro: solo propiedades activas
    queryParams.append("where[status][equals]", "activa");

    // Viewport - usar bounds de la URL o viewport inicial de Mendoza
    const north = bounds?.north || "-32.5";
    const south = bounds?.south || "-33.5";
    const east = bounds?.east || "-68.0";
    const west = bounds?.west || "-69.5";

    queryParams.append("where[ubication][mapLocation][lat][greater_than_equal]", south);
    queryParams.append("where[ubication][mapLocation][lat][less_than_equal]", north);
    queryParams.append("where[ubication][mapLocation][lng][greater_than_equal]", west);
    queryParams.append("where[ubication][mapLocation][lng][less_than_equal]", east);

    // Agregar filtros si están definidos
    if (filters.department) {
      queryParams.append("where[ubication.department][equals]", filters.department);
    }
    if (filters.locality) {
      queryParams.append("where[ubication.locality][equals]", filters.locality);
    }
    if (filters.type) {
      queryParams.append("where[classification.type][equals]", filters.type);
    }
    if (filters.condition) {
      queryParams.append("where[classification.condition][equals]", filters.condition);
    }

    const response = await fetch(
      `${backendUri}/propiedades?${queryParams}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );


    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const data = await response.json();

    // Transformar datos de la API al formato del componente
    const transformedProperties: Property[] = (data.docs || []).map(
      (prop: any) => ({
        id: prop.id,
        title: prop.title,
        price: prop.caracteristics?.price || 0,
        currency: prop.caracteristics?.currency?.toUpperCase() || "USD",
        bedrooms: prop.environments?.bedrooms,
        bathrooms: prop.environments?.bathrooms,
        area: prop.caracteristics?.totalArea,
        image:
          prop.images?.coverImage?.sizes?.thumbnail?.url ||
          prop.images?.imagenesExtra?.[0]?.url ||
          "/imagenes/home.jpg",
        location: {
          lat:
            prop.ubication?.mapLocation?.lat ||
            prop.ubication?.mapLocation?.latitude ||
            0,
          lng:
            prop.ubication?.mapLocation?.lng ||
            prop.ubication?.mapLocation?.longitude ||
            0,
        },
        ubication: prop.ubication,
        condition: prop.classification?.condition,
        type: prop.classification?.type,
      })
    );

    return transformedProperties;
  } catch (error) {
    console.error("Error al obtener propiedades iniciales:", error);
    return [];
  }
}

export default async function MapViewServer({
  searchParams = {},
}: MapViewServerProps) {
  // Extraer filtros de los searchParams
  const filters: Filters = {
    department: searchParams.department || "",
    locality: searchParams.locality || "",
    type: searchParams.type || "",
    condition: searchParams.condition || "",
  };

  // Extraer bounds si existen
  const bounds =
    searchParams.north && searchParams.south && searchParams.east && searchParams.west
      ? {
          north: searchParams.north,
          south: searchParams.south,
          east: searchParams.east,
          west: searchParams.west,
        }
      : undefined;

  // Fetch inicial de propiedades desde el servidor
  const initialProperties = await fetchInitialProperties(filters, bounds);

  return (
    <div className="w-full">
      {/* Filtros */}
      <MapFilters filters={filters} />

      {/* Mapa y grid (componente cliente) */}
      <MapViewClient
        initialProperties={initialProperties}
        initialFilters={filters}
      />
    </div>
  );
}
