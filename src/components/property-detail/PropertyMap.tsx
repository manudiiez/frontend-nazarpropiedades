"use client";

import { useEffect, useRef } from "react";

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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Verificar que el API key esté disponible
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key no está configurada");
      return;
    }

    // Cargar el script de Google Maps si no está cargado
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current) return;

      const position = { lat: latitude, lng: longitude };

      // Configurar zoom según el tipo de privacidad
      let initialZoom = 15;
      if (locationPrivacy === "approximate") {
        // Ajustar zoom según el radio
        if (approximateRadius >= 1000) {
          initialZoom = 13;
        } else if (approximateRadius >= 500) {
          initialZoom = 14;
        } else {
          initialZoom = 15;
        }
      }

      // Crear el mapa
      const map = new google.maps.Map(mapRef.current, {
        zoom: initialZoom,
        center: position,
        mapTypeControl: true,
        streetViewControl: locationPrivacy === "exact", // Solo mostrar street view en ubicación exacta
        fullscreenControl: true,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      if (locationPrivacy === "exact") {
        // Mostrar marcador exacto
        new google.maps.Marker({
          position: position,
          map: map,
          title: title || "Ubicación de la propiedad",
        });
      } else if (locationPrivacy === "approximate") {
        // Mostrar círculo de área aproximada
        new google.maps.Circle({
          strokeColor: "#d24e3b",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#d24e3b",
          fillOpacity: 0.2,
          map: map,
          center: position,
          radius: approximateRadius, // Radio en metros
        });

        // Opcional: Agregar un marcador en el centro del círculo
        new google.maps.Marker({
          position: position,
          map: map,
          title: "Área aproximada",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#d24e3b",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });
      }
    }
  }, [latitude, longitude, title, locationPrivacy, approximateRadius]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-sm"
      style={{ minHeight: "400px" }}
    />
  );
}
