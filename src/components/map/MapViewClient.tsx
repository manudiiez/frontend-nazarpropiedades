"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
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

interface MapViewClientProps {
  initialProperties: Property[];
  initialFilters: Filters;
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

export default function MapViewClient({
  initialProperties,
  initialFilters,
}: MapViewClientProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentBounds, setCurrentBounds] = useState<Bounds | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const router = useRouter();

  // Actualizar properties cuando cambien desde el servidor
  useEffect(() => {
    setProperties(initialProperties);
  }, [initialProperties]);

  // Actualizar filters cuando cambien desde el servidor
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

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

    // Solo actualizar si los bounds han cambiado significativamente
    if (
      !currentBounds ||
      Math.abs(newBounds.north - currentBounds.north) > 0.01 ||
      Math.abs(newBounds.south - currentBounds.south) > 0.01 ||
      Math.abs(newBounds.east - currentBounds.east) > 0.01 ||
      Math.abs(newBounds.west - currentBounds.west) > 0.01
    ) {
      setCurrentBounds(newBounds);

      // Actualizar URL con los nuevos bounds
      const params = new URLSearchParams();

      // Agregar bounds
      params.set("north", newBounds.north.toFixed(4));
      params.set("south", newBounds.south.toFixed(4));
      params.set("east", newBounds.east.toFixed(4));
      params.set("west", newBounds.west.toFixed(4));

      // Mantener los filtros existentes
      if (filters.department) params.set("department", filters.department);
      if (filters.locality) params.set("locality", filters.locality);
      if (filters.type) params.set("type", filters.type);
      if (filters.condition) params.set("condition", filters.condition);

      router.push(`/mapa?${params.toString()}`, { scroll: false });
    }
  }, [map, currentBounds, filters, router]);

  // Cuando el mapa está listo
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Inicializar bounds cuando el mapa esté cargado
  useEffect(() => {
    if (map && !currentBounds) {
      const bounds = map.getBounds();
      if (bounds) {
        setCurrentBounds({
          north: bounds.getNorthEast().lat(),
          south: bounds.getSouthWest().lat(),
          east: bounds.getNorthEast().lng(),
          west: bounds.getSouthWest().lng(),
        });
      }
    }
  }, [map, currentBounds]);

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
    <div className="flex flex-col lg:flex-row gap-4 p-6 max-w-[1920px] mx-auto">
      {/* Columna izquierda: Mapa (40%) - Sticky */}
      <div className="w-full lg:w-[40%] h-[400px] lg:h-[calc(100vh-140px)] lg:sticky lg:top-24 relative bg-gray-100 rounded-lg overflow-hidden">
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
            {properties.length}{" "}
            {properties.length === 1 ? "propiedad" : "propiedades"}
          </p>
        </div>

        {/* Botón para buscar en esta área */}
        <button
          onClick={handleBoundsChanged}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-accent hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium transition-colors text-sm"
        >
          Buscar en esta área
        </button>
      </div>

      {/* Columna derecha: Grid de propiedades (60%) */}
      <div className="w-full lg:w-[60%] h-full overflow-y-auto">
        {properties.length === 0 ? (
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
  );
}
