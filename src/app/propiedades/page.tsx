import PropertyGrid from "@/components/listings/PropertyGrid";
import PropertyFiltersClient from "@/components/listings/PropertyFiltersClient";
import type { Property } from "@/types";
import type { Property as ApiProperty } from "@/types/property";
import { getDepartmentLabel, getLocalityLabel } from "@/utils/propertyLabels";
import Link from "next/link";

interface PropertiesResponse {
  docs: ApiProperty[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface SearchParams {
  page?: string;
  search?: string;
  type?: string;
  condition?: string;
  currency?: string;
  priceMin?: string;
  priceMax?: string;
  bedroomsMin?: string;
  bedroomsMax?: string;
  bathroomsMin?: string;
  bathroomsMax?: string;
  totalAreaMin?: string;
  totalAreaMax?: string;
  coveredAreaMin?: string;
  coveredAreaMax?: string;
  floorsMin?: string;
  floorsMax?: string;
  roomsMin?: string;
  roomsMax?: string;
  // Filtros checkbox
  barrioPrivado?: string;
  cochera?: string;
  financiacion?: string;
  aceptaHipoteca?: string;
  recibePermuta?: string;
}

// Función para transformar la propiedad de la API al formato del PropertyCard
function transformProperty(apiProperty: ApiProperty): Property {
  // Obtener la primera imagen o una imagen por defecto
  const image =
    apiProperty.images?.coverImage?.sizes?.thumbnail?.url ||
    apiProperty.images?.imagenesExtra?.[0]?.url ||
    "/imagenes/home.jpg";

  // Construir la ubicación
  const locationParts = [
    
    getLocalityLabel(apiProperty.ubication.locality || ""),
    getDepartmentLabel(apiProperty.ubication.department || ""),
    apiProperty.ubication.province,
  ].filter(Boolean);

  if (locationParts[0] === locationParts[1]) {
    locationParts.splice(0, 1);
  }
  const location = locationParts.join(", ");

  // Obtener el área (priorizar totalArea)
  const area = apiProperty.caracteristics?.totalArea || 0;

  return {
    id: String(apiProperty.id),
    title: apiProperty.title,
    location: location,
    neighborhood: apiProperty.ubication.neighborhood,
    price: apiProperty.caracteristics?.price || 0,
    currency: apiProperty.caracteristics?.currency?.toUpperCase() || "USD",
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

// Función para construir la query string con filtros
function buildQueryString(searchParams: SearchParams): string {
  const params = new URLSearchParams();

  // Paginación
  const page = searchParams.page || "1";
  params.append("page", page);
  params.append("limit", "18");
  params.append("sort", "-createdAt");

  // Búsqueda por texto
  if (searchParams.search) {
    params.append("where[title][like]", searchParams.search);
  }

  // Tipo de propiedad
  if (searchParams.type && searchParams.type !== "any") {
    params.append("where[classification.type][equals]", searchParams.type);
  }

  // Condición (venta/alquiler)
  if (searchParams.condition && searchParams.condition !== "any") {
    params.append(
      "where[classification.condition][equals]",
      searchParams.condition
    );
  }

  // Moneda
  if (searchParams.currency) {
    params.append(
      "where[caracteristics.currency][equals]",
      searchParams.currency.toLowerCase()
    );
  }

  // Precio
  if (searchParams.priceMin) {
    params.append(
      "where[caracteristics.price][greater_than_equal]",
      searchParams.priceMin
    );
  }
  if (searchParams.priceMax) {
    params.append(
      "where[caracteristics.price][less_than_equal]",
      searchParams.priceMax
    );
  }

  // Dormitorios
  if (searchParams.bedroomsMin) {
    params.append(
      "where[environments.bedrooms][greater_than_equal]",
      searchParams.bedroomsMin
    );
  }
  if (searchParams.bedroomsMax) {
    params.append(
      "where[environments.bedrooms][less_than_equal]",
      searchParams.bedroomsMax
    );
  }

  // Baños
  if (searchParams.bathroomsMin) {
    params.append(
      "where[environments.bathrooms][greater_than_equal]",
      searchParams.bathroomsMin
    );
  }
  if (searchParams.bathroomsMax) {
    params.append(
      "where[environments.bathrooms][less_than_equal]",
      searchParams.bathroomsMax
    );
  }

  // Área total
  if (searchParams.totalAreaMin) {
    params.append(
      "where[caracteristics.totalArea][greater_than_equal]",
      searchParams.totalAreaMin
    );
  }
  if (searchParams.totalAreaMax) {
    params.append(
      "where[caracteristics.totalArea][less_than_equal]",
      searchParams.totalAreaMax
    );
  }

  // Área cubierta
  if (searchParams.coveredAreaMin) {
    params.append(
      "where[caracteristics.coveredArea][greater_than_equal]",
      searchParams.coveredAreaMin
    );
  }
  if (searchParams.coveredAreaMax) {
    params.append(
      "where[caracteristics.coveredArea][less_than_equal]",
      searchParams.coveredAreaMax
    );
  }

  // Filtros checkbox - solo agregar si están marcados (true)
  if (searchParams.barrioPrivado === "true") {
    params.append("where[amenities.barrioPrivado][equals]", "si");
  }

  // Cochera: buscar en environments.garageType donde exista un valor y ese valor NO sea "sin_cochera"
  if (searchParams.cochera === "true") {
    params.append("where[environments.garageType][exists]", "true");
    params.append("where[environments.garageType][not_equals]", "sin_cochera");
  }

  // Financiación, Acepta Hipoteca y Recibe Permuta: buscar en el array amenities.servicios
  if (searchParams.financiacion === "true") {
    params.append("where[amenities.servicios][contains]", "financiacion");
  }
  if (searchParams.aceptaHipoteca === "true") {
    params.append("where[amenities.servicios][contains]", "apto_credito_hipotecario");
  }
  if (searchParams.recibePermuta === "true") {
    params.append("where[amenities.servicios][contains]", "recibe_permuta");
  }

  return params.toString();
}

async function getProperties(
  searchParams: SearchParams
): Promise<{
  properties: Property[];
  pagination: Omit<PropertiesResponse, "docs"> | null;
}> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

    if (!backendUri) {
      console.error("NEXT_PUBLIC_BACKEND_URI no está definido en .env");
      return { properties: [], pagination: null };
    }

    const queryString = buildQueryString(searchParams);
    const url = `${backendUri}/propiedades?${queryString}`;

    const res = await fetch(url, {
      cache: "no-store", // Siempre obtener datos frescos
    });

    if (!res.ok) {
      console.error(`Error al obtener propiedades: ${res.status}`);
      return { properties: [], pagination: null };
    }

    const data: PropertiesResponse = await res.json();

    // Transformar las propiedades al formato esperado
    const transformedProperties = data.docs.map(transformProperty);

    // Datos de paginación
    const pagination = {
      totalDocs: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages,
      page: data.page,
      pagingCounter: data.pagingCounter,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
    };

    return { properties: transformedProperties, pagination };
  } catch (error) {
    console.error("Error al hacer fetch de propiedades:", error);
    return { properties: [], pagination: null };
  }
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Await searchParams (required in Next.js 15+)
  const params = await searchParams;

  const { properties, pagination } = await getProperties(params);
  const currentPage = parseInt(params.page || "1");

  // Función helper para construir URL con nueva página manteniendo filtros
  const buildPageUrl = (page: number): string => {
    const urlParams = new URLSearchParams();

    // Copiar todos los searchParams excepto 'page'
    Object.entries(params).forEach(([key, value]) => {
      if (key !== "page" && value) {
        urlParams.set(key, value);
      }
    });

    // Agregar el nuevo número de página
    urlParams.set("page", String(page));

    const queryString = urlParams.toString();
    return queryString ? `/propiedades?${queryString}` : "/propiedades";
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 mt-20">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR FILTROS - Client Component */}
        <PropertyFiltersClient searchParams={params} />

        {/* CONTENIDO PRINCIPAL */}
        <div className="w-full lg:w-3/4 xl:w-4/5">
          {/* Título */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Propiedades en Mendoza</h1>
            {pagination && (
              <p className="text-gray-600">
                {pagination.totalDocs} propiedades encontradas
              </p>
            )}
          </div>

          {/* Grid de Propiedades */}
          {properties.length > 0 ? (
            <>
              <PropertyGrid properties={properties} />

              {/* Paginación */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12">
                  <div className="flex justify-center gap-2">
                    {/* Página anterior */}
                    {pagination.hasPrevPage && (
                      <Link
                        href={buildPageUrl(currentPage - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Anterior
                      </Link>
                    )}

                    {/* Números de página */}
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Link
                            key={pageNum}
                            href={buildPageUrl(pageNum)}
                            className={`px-4 py-2 border rounded-lg transition-colors ${
                              pageNum === currentPage
                                ? "bg-accent text-white border-accent"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </Link>
                        );
                      }
                    )}

                    {/* Página siguiente */}
                    {pagination.hasNextPage && (
                      <Link
                        href={buildPageUrl(currentPage + 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Siguiente
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No se encontraron propiedades con los filtros seleccionados
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
