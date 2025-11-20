"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import MapFilters from "./MapFilters";
import PropertyGridItem from "./PropertyGridItem";

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

interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface Filters {
  department: string;
  locality: string;
  type: string;
  condition: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Centro inicial: Mendoza, Argentina
const defaultCenter = {
  lat: -32.8895,
  lng: -68.8458,
};

export default function MapView() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentBounds, setCurrentBounds] = useState<Bounds | null>(null);
  const [filters, setFilters] = useState<Filters>({
    department: "",
    locality: "",
    type: "",
    condition: "",
  });

  // Ref para evitar múltiples llamadas simultáneas
  const fetchingRef = useRef(false);

  // Función para buscar propiedades en el viewport actual
  const searchPropertiesInViewport = useCallback(
    async (bounds: Bounds, currentFilters: Filters) => {
      // Evitar múltiples llamadas simultáneas
      if (fetchingRef.current) return;

      fetchingRef.current = true;
      setLoading(true);

      try {
        const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
        if (!backendUri) {
          console.error("NEXT_PUBLIC_BACKEND_URI no está definido");
          return;
        }

        // Construir query params en formato Payload API
        const queryParams = new URLSearchParams();

        // Límite de resultados
        queryParams.append("limit", "100");
        queryParams.append("depth", "2");

        // Filtro: solo propiedades activas
        queryParams.append("where[status][equals]", "activa");

        // Filtros de viewport - latitud
        queryParams.append("where[ubication.mapLocation.lat][greater_than_equal]", bounds.south.toString());
        queryParams.append("where[ubication.mapLocation.lat][less_than_equal]", bounds.north.toString());

        // Filtros de viewport - longitud
        queryParams.append("where[ubication.mapLocation.lng][greater_than_equal]", bounds.west.toString());
        queryParams.append("where[ubication.mapLocation.lng][less_than_equal]", bounds.east.toString());

        // Agregar filtros adicionales si están definidos
        if (currentFilters.department) {
          queryParams.append("where[ubication.department][equals]", currentFilters.department);
        }
        if (currentFilters.locality) {
          queryParams.append("where[ubication.locality][equals]", currentFilters.locality);
        }
        if (currentFilters.type) {
          queryParams.append("where[classification.type][equals]", currentFilters.type);
        }
        if (currentFilters.condition) {
          queryParams.append("where[classification.condition][equals]", currentFilters.condition);
        }

        const response = await fetch(
          `${backendUri}/api/propiedades?${queryParams}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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

        setProperties(transformedProperties);
        setCurrentBounds(bounds);
      } catch (error) {
        console.error("Error al buscar propiedades:", error);
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    },
    []
  );

  // Handler cuando el mapa cambia de posición o zoom
  const handleBoundsChanged = useCallback(() => {
    if (!map) return;

    const bounds = map.getBounds();
    if (!bounds) return;

    const newBounds: Bounds = {
      north: bounds.getNorthEast().lat(),
      south: bounds.getSouthWest().lat(),
      east: bounds.getNorthEast().lng(),
      west: bounds.getSouthWest().lng(),
    };

    // Solo buscar si los bounds han cambiado significativamente
    if (
      !currentBounds ||
      Math.abs(newBounds.north - currentBounds.north) > 0.01 ||
      Math.abs(newBounds.south - currentBounds.south) > 0.01 ||
      Math.abs(newBounds.east - currentBounds.east) > 0.01 ||
      Math.abs(newBounds.west - currentBounds.west) > 0.01
    ) {
      searchPropertiesInViewport(newBounds, filters);
    }
  }, [map, currentBounds, filters, searchPropertiesInViewport]);

  // Cuando el mapa está listo
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Buscar propiedades iniciales cuando el mapa esté cargado
  useEffect(() => {
    if (map && !currentBounds) {
      handleBoundsChanged();
    }
  }, [map, currentBounds, handleBoundsChanged]);

  // Buscar cuando cambien los filtros
  const handleFiltersChange = useCallback(
    (newFilters: Filters) => {
      setFilters(newFilters);
      if (map && currentBounds) {
        searchPropertiesInViewport(currentBounds, newFilters);
      }
    },
    [map, currentBounds, searchPropertiesInViewport]
  );

  // Handler para centrar el mapa en una propiedad
  const handlePropertyClick = useCallback(
    (property: Property) => {
      setSelectedProperty(property);
      if (map) {
        map.panTo(property.location);
        map.setZoom(16);
      }
    },
    [map]
  );

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error al cargar el mapa</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filtros */}
      <MapFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Contenedor del mapa y grid */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-240px)] gap-4 p-6 max-w-[1920px] mx-auto">
        {/* Columna izquierda: Mapa (40%) */}
        <div className="w-full lg:w-[40%] h-[400px] lg:h-full relative bg-gray-100 rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={12}
            onLoad={onMapLoad}
            onBoundsChanged={handleBoundsChanged}
            options={{
              mapTypeControl: true,
              streetViewControl: false,
              fullscreenControl: true,
              zoomControl: true,
            }}
          >
            {/* Markers de propiedades */}
            {properties.map((property) => (
              <Marker
                key={property.id}
                position={property.location}
                onClick={() => setSelectedProperty(property)}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor:
                    selectedProperty?.id === property.id ? "#d24e3b" : "#3b82f6",
                  fillOpacity: 0.9,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                }}
              />
            ))}
          </GoogleMap>

          {/* Contador de propiedades en el mapa */}
          <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md z-10">
            <p className="text-sm font-medium text-gray-900">
              {loading ? (
                "Buscando..."
              ) : (
                <>
                  {properties.length}{" "}
                  {properties.length === 1 ? "propiedad" : "propiedades"}
                </>
              )}
            </p>
          </div>

          {/* Botón para buscar en esta área */}
          <button
            onClick={handleBoundsChanged}
            disabled={loading}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-accent hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Buscando..." : "Buscar en esta área"}
          </button>
        </div>

        {/* Columna derecha: Grid de propiedades (60%) */}
        <div className="w-full lg:w-[60%] h-full overflow-y-auto">
          {loading && properties.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Cargando propiedades...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-500 mb-2">
                  No se encontraron propiedades en esta área
                </p>
                <p className="text-sm text-gray-400">
                  Intenta mover el mapa o ajustar los filtros
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map((property) => (
                <PropertyGridItem
                  key={property.id}
                  property={property}
                  isSelected={selectedProperty?.id === property.id}
                  onClick={() => handlePropertyClick(property)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
