"use client";

import { GoogleMap, useJsApiLoader, Marker, Circle } from "@react-google-maps/api";
import { useMemo } from "react";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  locationPrivacy?: "exact" | "approximate" | "hidden";
  approximateRadius?: number; // Radio en metros
}

export default function PropertyMap({
  latitude,
  longitude,
  title,
  locationPrivacy = "exact",
  approximateRadius = 500,
}: PropertyMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);

  // Configurar zoom según el tipo de privacidad
  const initialZoom = useMemo(() => {
    if (locationPrivacy === "approximate") {
      if (approximateRadius >= 1000) {
        return 13;
      } else if (approximateRadius >= 500) {
        return 14;
      } else {
        return 15;
      }
    }
    return 15;
  }, [locationPrivacy, approximateRadius]);

  const mapOptions = useMemo(() => ({
    mapTypeControl: true,
    streetViewControl: locationPrivacy === "exact",
    fullscreenControl: true,
    zoomControl: true,
  }), [locationPrivacy]);

  const circleOptions = useMemo(() => ({
    strokeColor: "#d24e3b",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#d24e3b",
    fillOpacity: 0.2,
  }), []);

  const approximateMarkerIcon = useMemo(() => ({
    path: google?.maps?.SymbolPath?.CIRCLE || 0,
    scale: 8,
    fillColor: "#d24e3b",
    fillOpacity: 0.8,
    strokeColor: "#ffffff",
    strokeWeight: 2,
  }), []);

  if (loadError) {
    return (
      <div className="w-full h-[400px] rounded-sm bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Error al cargar el mapa</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] rounded-sm bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[400px] rounded-sm"
      mapContainerStyle={{ minHeight: "400px" }}
      center={center}
      zoom={initialZoom}
      options={mapOptions}
    >
      {locationPrivacy === "exact" && (
        <Marker
          position={center}
          title={title || "Ubicación de la propiedad"}
        />
      )}

      {locationPrivacy === "approximate" && (
        <>
          <Circle
            center={center}
            radius={approximateRadius}
            options={circleOptions}
          />
          <Marker
            position={center}
            title="Área aproximada"
            icon={approximateMarkerIcon}
          />
        </>
      )}
    </GoogleMap>
  );
}
