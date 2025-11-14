import type {
  Measures,
  Features,
  Amenities,
  NearbyPlaces,
  Extra,
} from "@/types/property";

interface PropertyDetailsProps {
  description?: string;
  measures?: Measures;
  features?: Features;
  amenities?: Amenities;
  nearbyPlaces?: NearbyPlaces;
  extra?: Extra;
}

// Helper para formatear labels de servicios
const formatServiceLabel = (service: string): string => {
  const labels: Record<string, string> = {
    aire_acondicionado: "Aire acondicionado",
    servicio_de_desayuno: "Servicio de desayuno",
    servicio_de_limpieza: "Servicio de limpieza",
    financiacion: "Financiación",
    internet: "Internet",
    piscina: "Piscina",
    apto_credito_hipotecario: "Apto crédito hipotecario",
    cable_tv: "Cable TV",
    telefono: "Teléfono",
    calefaccion_central: "Calefacción central",
    gas: "Gas",
    agua: "Agua",
    luz_electrica: "Luz eléctrica",
    recibe_permuta: "Recibe permuta",
    caldera: "Caldera",
    cisterna: "Cisterna",
    energia_solar: "Energía solar",
    conexion_para_lavarropas: "Conexión para lavarropas",
    alarma: "Alarma",
    seguridad: "Seguridad",
  };
  return labels[service] || service;
};

// Helper para formatear labels de ambientes
const formatAmbienteLabel = (ambiente: string): string => {
  const labels: Record<string, string> = {
    parrilla: "Parrilla",
    balcon: "Balcón",
    patio: "Patio",
    desayunador: "Desayunador",
    cocina: "Cocina",
    dormitorio_en_suite: "Dormitorio en suite",
    escritorio: "Escritorio",
    estudio: "Estudio",
    comedor: "Comedor",
    living: "Living",
    living_comedor: "Living comedor",
    cowork: "Cowork",
    gimnasio: "Gimnasio",
    ascensor: "Ascensor",
    club_house: "Club house",
    quincho: "Quincho",
    area_de_cine: "Área de cine",
    area_de_juegos_infantiles: "Área de juegos infantiles",
    area_verde: "Área verde",
    chimenea: "Chimenea",
    dependencia_de_servicio: "Dependencia de servicio",
    estacionamiento_para_visitantes: "Estacionamiento para visitantes",
    porton_automatico: "Portón automático",
    rampa_para_silla_de_ruedas: "Rampa para silla de ruedas",
    salon_de_usos_multiples: "Salón de usos múltiples",
    sauna: "Sauna",
    terraza: "Terraza",
    jacuzzi: "Jacuzzi",
    vestidor: "Vestidor",
    toilette: "Toilette",
    placards: "Placards",
    cancha_de_padel: "Cancha de pádel",
    cancha_de_tenis: "Cancha de tenis",
    cancha_de_basquet: "Cancha de básquet",
    cancha_de_futbol: "Cancha de fútbol",
    cancha_polideportiva: "Cancha polideportiva",
  };
  return labels[ambiente] || ambiente;
};

// Helper para formatear labels de zonas cercanas
const formatZonaLabel = (zona: string): string => {
  const labels: Record<string, string> = {
    colegios: "Colegios",
    universidades: "Universidades",
    guarderias: "Guarderías",
    hospitales: "Hospitales",
    centros_de_salud: "Centros de salud",
    centro_comercial: "Centro comercial",
    shopping: "Shopping",
    supermercados: "Supermercados",
    club_deportivo: "Club deportivo",
    zona_deportiva: "Zona deportiva",
    ciclovia: "Ciclovía",
    paradas_de_colectivo: "Paradas de colectivo",
    estacion_de_tren: "Estación de tren",
    estacion_de_subte: "Estación de subte",
    parque: "Parque",
    plaza: "Plaza",
  };
  return labels[zona] || zona;
};

export default function PropertyDetails({
  description,
  measures,
  features,
  amenities,
  nearbyPlaces,
  extra,
}: PropertyDetailsProps) {
  // Procesar servicios del array de amenities
  const serviciosArray: string[] = [];
  if (amenities?.servicios && Array.isArray(amenities.servicios)) {
    serviciosArray.push(...amenities.servicios.map(formatServiceLabel));
  }

  // Procesar ambientes del array de amenities
  const ambientesArray: string[] = [];
  if (amenities?.ambientes && Array.isArray(amenities.ambientes)) {
    ambientesArray.push(...amenities.ambientes.map(formatAmbienteLabel));
  }

  // Procesar zonas cercanas del array de amenities
  const zonasArray: string[] = [];
  if (amenities?.zonasCercanas && Array.isArray(amenities.zonasCercanas)) {
    zonasArray.push(...amenities.zonasCercanas.map(formatZonaLabel));
  }

  // Combinar servicios básicos con amenities adicionales
  const allAmenitiesArray: string[] = [...serviciosArray];

  // Agregar servicios básicos si existen
  if (amenities?.agua === "Si") allAmenitiesArray.push("Agua corriente");
  if (amenities?.cloacas === "Si") allAmenitiesArray.push("Cloacas");
  if (amenities?.gas === "Si") allAmenitiesArray.push("Gas natural");
  if (amenities?.luz === "Si") allAmenitiesArray.push("Luz eléctrica");
  if (amenities?.barrioPrivado === "si")
    allAmenitiesArray.push("Barrio privado");
  if (amenities?.barrioPrivado === "semi_privado")
    allAmenitiesArray.push("Barrio semi-privado");
  if (amenities?.mascotas === "Si") allAmenitiesArray.push("Acepta mascotas");
  if (amenities?.estrellas) {
    allAmenitiesArray.push(
      `${amenities.estrellas} ${
        amenities.estrellas === 1 ? "estrella" : "estrellas"
      }`
    );
  }

  // Convertir nearbyPlaces object a array de strings para mostrar (legacy)
  const nearbyPlacesArray: string[] = [];
  if (nearbyPlaces) {
    if (nearbyPlaces.schools) nearbyPlacesArray.push(...nearbyPlaces.schools);
    if (nearbyPlaces.universities)
      nearbyPlacesArray.push(...nearbyPlaces.universities);
    if (nearbyPlaces.hospitals)
      nearbyPlacesArray.push(...nearbyPlaces.hospitals);
    if (nearbyPlaces.supermarkets)
      nearbyPlacesArray.push(...nearbyPlaces.supermarkets);
    if (nearbyPlaces.shopping) nearbyPlacesArray.push(...nearbyPlaces.shopping);
    if (nearbyPlaces.parks) nearbyPlacesArray.push(...nearbyPlaces.parks);
    if (nearbyPlaces.publicTransport)
      nearbyPlacesArray.push(...nearbyPlaces.publicTransport);
  }

  // Combinar zonas cercanas del nuevo formato con las legacy
  const allZonasArray = [...zonasArray, ...nearbyPlacesArray];
  return (
    <div className="lg:col-span-2 flex flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-900">Detalles</h2>
      {/* {description && (
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      )} */}

      {/* Medidas */}
      {measures && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Datos de la propiedad
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {measures.hasExpenses && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Tiene expensas</span>
                <span className="text-gray-900 font-semibold">
                  {measures.hasExpenses}
                </span>
              </div>
            )}
            {measures.totalArea && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Superficie total</span>
                <span className="text-gray-900 font-semibold">
                  {measures.totalArea} m²
                </span>
              </div>
            )}
            {measures.coveredArea && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Superficie cubierta</span>
                <span className="text-gray-900 font-semibold">
                  {measures.coveredArea} m²
                </span>
              </div>
            )}
            {measures.pricePerSquareMeterArs && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Precio por m² (ARS)</span>
                <span className="text-gray-900 font-semibold">
                  ARS$ {measures.pricePerSquareMeterArs.toLocaleString("es-AR")}
                </span>
              </div>
            )}
            {measures.pricePerSquareMeterUsd && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Precio por m² (USD)</span>
                <span className="text-gray-900 font-semibold">
                  US$ {measures.pricePerSquareMeterUsd.toLocaleString("es-AR")}
                </span>
              </div>
            )}
            {(measures.landArea || measures.terrainArea) && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Superficie de terreno</span>
                <span className="text-gray-900 font-semibold">
                  {measures.landArea || measures.terrainArea} m²
                </span>
              </div>
            )}
            {measures.frontMeters && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Metros de frente</span>
                <span className="text-gray-900 font-semibold">
                  {measures.frontMeters} m
                </span>
              </div>
            )}
            {(measures.deepMeters || measures.depthMeters) && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Metros de fondo</span>
                <span className="text-gray-900 font-semibold">
                  {measures.deepMeters || measures.depthMeters} m
                </span>
              </div>
            )}
            {extra?.superficieBalcon && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Superficie de balcón</span>
                <span className="text-gray-900 font-semibold">
                  {extra.superficieBalcon} m²
                </span>
              </div>
            )}
            {measures.orientation && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Orientación</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {measures.orientation}
                </span>
              </div>
            )}
            {extra?.acceso && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Tipo de acceso</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.acceso}
                </span>
              </div>
            )}
            {measures.antiquity && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Antigüedad</span>
                <span className="text-gray-900 font-semibold">
                  {measures.antiquity.replace(/_/g, " ")}
                </span>
              </div>
            )}
            {measures.conservationStatus && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Estado de conservación</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {measures.conservationStatus.replace(/_/g, " ")}
                </span>
              </div>
            )}
            {features?.constructionYear && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Año construcción</span>
                <span className="text-gray-900 font-semibold">
                  {features.constructionYear}
                </span>
              </div>
            )}
            {extra?.alturaDeposito && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Altura del depósito</span>
                <span className="text-gray-900 font-semibold">
                  {extra.alturaDeposito} m
                </span>
              </div>
            )}
            {extra?.disposicion && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Disposición</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.disposicion}
                </span>
              </div>
            )}
            {extra?.disposicionTerreno && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Disposición del terreno</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.disposicionTerreno.replace(/_/g, " ")}
                </span>
              </div>
            )}
            {extra?.formaTerreno && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Forma del terreno</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.formaTerreno}
                </span>
              </div>
            )}
            {extra?.tipoCampo && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Tipo de campo</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.tipoCampo.replace(/_/g, " ")}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Características */}
      {features && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Ambientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.bedrooms && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Dormitorios</span>
                <span className="text-gray-900 font-semibold">
                  {features.bedrooms}
                </span>
              </div>
            )}
            {features.bathrooms && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Baños</span>
                <span className="text-gray-900 font-semibold">
                  {features.bathrooms}
                </span>
              </div>
            )}
            {extra?.camas && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Camas</span>
                <span className="text-gray-900 font-semibold">
                  {extra.camas}
                </span>
              </div>
            )}
            {features.toilets && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Toilettes</span>
                <span className="text-gray-900 font-semibold">
                  {features.toilets}
                </span>
              </div>
            )}
            {(features.ambientes || features.rooms) && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Ambientes</span>
                <span className="text-gray-900 font-semibold">
                  {features.ambientes || features.rooms}
                </span>
              </div>
            )}

            {features.garageType && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Tipo de cochera</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {features.garageType.replace(/_/g, " ")}
                </span>
              </div>
            )}
            {features.garages && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Espacios para autos</span>
                <span className="text-gray-900 font-semibold">
                  {features.garages}
                </span>
              </div>
            )}
            {extra?.accesoCochera && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Acceso a cochera</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.accesoCochera.replace(/_/g, " ")}
                </span>
              </div>
            )}
            {extra?.tipoCochera && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Tipo de cochera</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.tipoCochera}
                </span>
              </div>
            )}
            {extra?.tipoCoverturaCochera && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Cobertura de cochera</span>
                <span className="text-gray-900 font-semibold capitalize">
                  {extra.tipoCoverturaCochera.replace(/_/g, " ")}
                </span>
              </div>
            )}
            {features.plantas && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Plantas</span>
                <span className="text-gray-900 font-semibold">
                  {features.plantas}
                </span>
              </div>
            )}
            {features.furnished !== undefined &&
              features.furnished !== null && (
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Amoblado</span>
                  <span className="text-gray-900 font-semibold">
                    {features.furnished === "si" || features.furnished === true
                      ? "Sí"
                      : "No"}
                  </span>
                </div>
              )}
            {extra?.bauleras && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Bauleras</span>
                <span className="text-gray-900 font-semibold">
                  {extra.bauleras}
                </span>
              </div>
            )}
            {extra?.pisosEdificio && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Pisos del edificio</span>
                <span className="text-gray-900 font-semibold">
                  {extra.pisosEdificio}
                </span>
              </div>
            )}
            {extra?.departamentosPorPiso && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Departamentos por piso</span>
                <span className="text-gray-900 font-semibold">
                  {extra.departamentosPorPiso}
                </span>
              </div>
            )}
            {extra?.pisosEdificio && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Pisos del edificio</span>
                <span className="text-gray-900 font-semibold">
                  {extra.pisosEdificio}
                </span>
              </div>
            )}
            {extra?.banosPiso && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Baños por piso</span>
                <span className="text-gray-900 font-semibold">
                  {extra.banosPiso}
                </span>
              </div>
            )}
            {extra?.cantidadOficinas && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Cantidad de oficinas</span>
                <span className="text-gray-900 font-semibold">
                  {extra.cantidadOficinas}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Servicios y Amenidades */}
      {allAmenitiesArray.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Servicios y Amenidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allAmenitiesArray.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <span className="material-symbols-outlined text-gray-900 text-base">
                  check_circle
                </span>
                <span className="text-gray-600 text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ambientes */}
      {ambientesArray.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Ambientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ambientesArray.map((ambiente, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <span className="material-symbols-outlined text-gray-900 text-base">
                  home
                </span>
                <span className="text-gray-600 text-sm">{ambiente}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zonas Cercanas */}
      {allZonasArray.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Zonas cercanas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allZonasArray.map((place, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <span className="material-symbols-outlined text-gray-900 text-base">
                  location_on
                </span>
                <span className="text-gray-600 text-sm">{place}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información Adicional */}
      {extra &&
        (extra.guests ||
          extra.minimumStay ||
          extra.checkinTime ||
          extra.checkoutTime) && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
              Información adicional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {extra.guests && (
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Capacidad de huéspedes</span>
                  <span className="text-gray-900 font-semibold">
                    {extra.guests} {extra.guests === 1 ? "persona" : "personas"}
                  </span>
                </div>
              )}
              {extra.minimumStay && (
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Estadia mínima</span>
                  <span className="text-gray-900 font-semibold">
                    {extra.minimumStay}{" "}
                    {extra.minimumStay === 1 ? "noche" : "noches"}
                  </span>
                </div>
              )}

              {extra.checkinTime && (
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Horario de entrada</span>
                  <span className="text-gray-900 font-semibold">
                    {extra.checkinTime}
                  </span>
                </div>
              )}
              {extra.checkoutTime && (
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Horario de salida</span>
                  <span className="text-gray-900 font-semibold">
                    {extra.checkoutTime}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      {description && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Descripción
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
