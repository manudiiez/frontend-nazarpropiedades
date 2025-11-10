import type { Measures, Features, Amenities, NearbyPlaces } from '@/types/property'

interface PropertyDetailsProps {
  description?: string
  measures?: Measures
  features?: Features
  amenities?: Amenities
  nearbyPlaces?: NearbyPlaces
}

export default function PropertyDetails({
  description,
  measures,
  features,
  amenities,
  nearbyPlaces,
}: PropertyDetailsProps) {
  // Convertir amenities object a array de strings para mostrar
  const amenitiesArray: string[] = []
  if (amenities) {
    if (amenities.gas) amenitiesArray.push('Gas natural')
    if (amenities.water) amenitiesArray.push('Agua corriente')
    if (amenities.electricity) amenitiesArray.push('Electricidad')
    if (amenities.sewer) amenitiesArray.push('Cloacas')
    if (amenities.internet) amenitiesArray.push('Internet')
    if (amenities.airConditioning) amenitiesArray.push('Aire acondicionado')
    if (amenities.centralHeating) amenitiesArray.push('Calefacción central')
    if (amenities.security24h) amenitiesArray.push('Seguridad 24hs')
    if (amenities.alarm) amenitiesArray.push('Alarma')
    if (amenities.cameras) amenitiesArray.push('Cámaras de seguridad')
    if (amenities.gatedCommunity) amenitiesArray.push('Barrio cerrado')
    if (amenities.pool) amenitiesArray.push('Piscina')
    if (amenities.gym) amenitiesArray.push('Gimnasio')
    if (amenities.sauna) amenitiesArray.push('Sauna')
    if (amenities.grill) amenitiesArray.push('Parrilla')
    if (amenities.garden) amenitiesArray.push('Jardín')
    if (amenities.terrace) amenitiesArray.push('Terraza')
    if (amenities.balcony) amenitiesArray.push('Balcón')
    if (amenities.laundry) amenitiesArray.push('Lavadero')
    if (amenities.storage) amenitiesArray.push('Baulera')
    if (amenities.petFriendly) amenitiesArray.push('Pet friendly')
  }

  // Convertir nearbyPlaces object a array de strings para mostrar
  const nearbyPlacesArray: string[] = []
  if (nearbyPlaces) {
    if (nearbyPlaces.schools) nearbyPlacesArray.push(...nearbyPlaces.schools)
    if (nearbyPlaces.universities) nearbyPlacesArray.push(...nearbyPlaces.universities)
    if (nearbyPlaces.hospitals) nearbyPlacesArray.push(...nearbyPlaces.hospitals)
    if (nearbyPlaces.supermarkets) nearbyPlacesArray.push(...nearbyPlaces.supermarkets)
    if (nearbyPlaces.shopping) nearbyPlacesArray.push(...nearbyPlaces.shopping)
    if (nearbyPlaces.parks) nearbyPlacesArray.push(...nearbyPlaces.parks)
    if (nearbyPlaces.publicTransport) nearbyPlacesArray.push(...nearbyPlaces.publicTransport)
  }
  return (
    <div className="lg:col-span-2 flex flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-900">Detalles</h2>
      {description && (
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      )}

      {/* Medidas */}
      {measures && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Medidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            {measures.uncoveredArea && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Superficie descubierta</span>
                <span className="text-gray-900 font-semibold">
                  {measures.uncoveredArea} m²
                </span>
              </div>
            )}
            {measures.terrainArea && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Superficie terreno</span>
                <span className="text-gray-900 font-semibold">
                  {measures.terrainArea} m²
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
            {measures.depthMeters && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Metros de fondo</span>
                <span className="text-gray-900 font-semibold">
                  {measures.depthMeters} m
                </span>
              </div>
            )}
            {measures.balconyArea && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Superficie balcón</span>
                <span className="text-gray-900 font-semibold">
                  {measures.balconyArea} m²
                </span>
              </div>
            )}
            {measures.floors && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Pisos</span>
                <span className="text-gray-900 font-semibold">
                  {measures.floors}
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
            Características
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
            {features.toilets && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Toilettes</span>
                <span className="text-gray-900 font-semibold">
                  {features.toilets}
                </span>
              </div>
            )}
            {features.rooms && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Ambientes</span>
                <span className="text-gray-900 font-semibold">
                  {features.rooms}
                </span>
              </div>
            )}
            {features.garages && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Cocheras</span>
                <span className="text-gray-900 font-semibold">
                  {features.garages} {features.garageType || ''}
                </span>
              </div>
            )}
            {features.furnished !== undefined && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Amoblado</span>
                <span className="text-gray-900 font-semibold">
                  {features.furnished ? 'Sí' : 'No'}
                </span>
              </div>
            )}
            {features.constructionYear && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Año construcción</span>
                <span className="text-gray-900 font-semibold">
                  {features.constructionYear}
                </span>
              </div>
            )}
            {features.condition && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Estado</span>
                <span className="text-gray-900 font-semibold">
                  {features.condition}
                </span>
              </div>
            )}
            {features.orientation && (
              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <span className="text-gray-600">Orientación</span>
                <span className="text-gray-900 font-semibold">
                  {features.orientation}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Amenities */}
      {amenitiesArray.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Amenities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {amenitiesArray.map((amenity, index) => (
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

      {/* Zonas Cercanas */}
      {nearbyPlacesArray.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Zonas cercanas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyPlacesArray.map((place, index) => (
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
    </div>
  )
}
