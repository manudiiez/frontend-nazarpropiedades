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
  search: string;
}

interface MapViewServerProps {
  searchParams?: {
    department?: string;
    locality?: string;
    type?: string;
    condition?: string;
    search?: string;
    north?: string;
    south?: string;
    east?: string;
    west?: string;
    page?: string;
  };
}

async function fetchInitialProperties(
  filters: Filters,
  bounds?: { north: string; south: string; east: string; west: string },
  page: number = 1
): Promise<{ properties: Property[]; pagination: any }> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
    if (!backendUri) {
      console.error("NEXT_PUBLIC_BACKEND_URI no está definido");
      return { properties: [], pagination: { totalDocs: 0, limit: 20, totalPages: 0, page: 1, hasPrevPage: false, hasNextPage: false } };
    }

    // Construir query params en formato Payload API
    const queryParams = new URLSearchParams();

    // Límite de resultados y página
    queryParams.append("limit", "20");
    queryParams.append("page", page.toString());
    queryParams.append("depth", "2");

    // Filtro: solo propiedades activas
    queryParams.append("where[status][equals]", "activa");

    // Búsqueda por texto - buscar en title y todos los campos de ubicación con OR
    if (filters.search) {
      queryParams.append("where[or][0][title][like]", filters.search);
      queryParams.append("where[or][1][ubication.address][like]", filters.search);
      queryParams.append("where[or][2][ubication.neighborhood][like]", filters.search);
      queryParams.append("where[or][3][ubication.locality][like]", filters.search);
      queryParams.append("where[or][4][ubication.department][like]", filters.search);
      queryParams.append("where[or][5][ubication.province][like]", filters.search);
    }

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
    console.log("Fetch URL:", `${backendUri}/propiedades?${queryParams}`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { properties: [], pagination: { totalDocs: 0, limit: 20, totalPages: 0, page: 1, hasPrevPage: false, hasNextPage: false } };
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

    // Extraer información de paginación de la respuesta
    const pagination = {
      totalDocs: data.totalDocs || 0,
      limit: data.limit || 20,
      totalPages: data.totalPages || 0,
      page: data.page || 1,
      hasPrevPage: data.hasPrevPage || false,
      hasNextPage: data.hasNextPage || false,
    };

    return { properties: transformedProperties, pagination };
  } catch (error) {
    console.error("Error al obtener propiedades iniciales:", error);
    return { properties: [], pagination: { totalDocs: 0, limit: 20, totalPages: 0, page: 1, hasPrevPage: false, hasNextPage: false } };
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
    search: searchParams.search || "",
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

  // Extraer página
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // Fetch inicial de propiedades desde el servidor
  const { properties, pagination } = await fetchInitialProperties(filters, bounds, page);

  return (
    <div className="w-full">
      {/* Filtros */}
      <MapFilters filters={filters} />

      {/* Mapa y grid (componente cliente) */}
      <MapViewClient
        initialProperties={properties}
        initialFilters={filters}
        initialPagination={pagination}
      />
    </div>
  );
}
