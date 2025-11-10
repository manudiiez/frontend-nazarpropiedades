import ImageGallery from '@/components/property-detail/ImageGallery'
import PropertyHero from '@/components/property-detail/PropertyHero'
import PropertyDetails from '@/components/property-detail/PropertyDetails'
import ContactForm from '@/components/property-detail/ContactForm'
import RelatedProperties from '@/components/property-detail/RelatedProperties'
import type { Property } from '@/types/property'

// Datos de ejemplo - En producción vendría de una API
const mockProperty: Property = {
  id: 1,
  title: 'Casa Minimalista en Palermo',
  status: 'activa',

  // Clasificación
  classification: {
    type: 'casa',
    condition: 'venta',
  },

  // Ubicación
  ubication: {
    province: 'Mendoza',
    department: 'Godoy Cruz',
    locality: 'Palermo',
    neighborhood: 'Barrio Privado Los Álamos',
    address: 'Av. San Martín 1234, Palermo, Godoy Cruz, Mendoza',
    mapLocation: {
      lat: -32.9175,
      lng: -68.8458,
    },
    locationPrivacy: 'approximate',
  },

  // Precio
  price: {
    amount: 850000,
    currency: 'USD',
    expenses: 15000,
    expensesCurrency: 'ARS',
  },

  // Medidas (para casa)
  measures: {
    totalArea: 320,
    coveredArea: 280,
    uncoveredArea: 40,
    terrainArea: 400,
    frontMeters: 12,
    depthMeters: 33,
    balconyArea: 25,
    floors: 2,
  },

  // Características
  features: {
    bedrooms: 4,
    bathrooms: 3,
    toilets: 1,
    rooms: 8,
    livingRooms: 2,
    diningRooms: 1,
    kitchens: 1,
    garages: 2,
    garageType: 'cubierta',
    constructionYear: 2022,
    condition: 'excelente',
    furnished: false,
    orientation: 'norte',
  },

  // Amenities
  amenities: {
    gas: true,
    water: true,
    electricity: true,
    sewer: true,
    internet: true,
    airConditioning: true,
    centralHeating: true,
    security24h: true,
    alarm: true,
    cameras: true,
    gatedCommunity: true,
    pool: true,
    gym: true,
    sauna: true,
    grill: true,
    garden: true,
    terrace: true,
    balcony: true,
    laundry: true,
    storage: true,
    petFriendly: true,
  },

  // Descripción
  description:
    'Arquitectura contemporánea que abraza la simplicidad. Espacios amplios, líneas limpias y materiales nobles crean un ambiente sereno y sofisticado. Cada detalle ha sido cuidadosamente pensado para maximizar la funcionalidad sin comprometer la estética minimalista. La propiedad cuenta con acabados de primera calidad, pisos de hormigón pulido, ventanales de piso a techo y sistema de domótica integrado.',

  // Imágenes
  images: [
    { id: 0, title: 'Fachada principal', url: '/imagenes/home.jpg' },
    { id: 1, title: 'Dormitorio principal', url: '/imagenes/home2.jpg' },
    { id: 2, title: 'Cocina integrada', url: '/imagenes/home.jpg' },
    { id: 3, title: 'Jardín minimalista', url: '/imagenes/home2.jpg' },
    { id: 4, title: 'Living comedor', url: '/imagenes/home.jpg' },
    { id: 5, title: 'Baño principal', url: '/imagenes/home2.jpg' },
    { id: 6, title: 'Dormitorio secundario', url: '/imagenes/home.jpg' },
    { id: 7, title: 'Baño de visitas', url: '/imagenes/home2.jpg' },
    { id: 8, title: 'Cocina vista 2', url: '/imagenes/home.jpg' },
    { id: 9, title: 'Terraza', url: '/imagenes/home2.jpg' },
    { id: 10, title: 'Piscina', url: '/imagenes/home.jpg' },
    { id: 11, title: 'Garaje', url: '/imagenes/home2.jpg' },
    { id: 12, title: 'Jardín trasero', url: '/imagenes/home.jpg' },
    { id: 13, title: 'Quincho', url: '/imagenes/home2.jpg' },
    { id: 14, title: 'Lavadero', url: '/imagenes/home.jpg' },
    { id: 15, title: 'Vestidor principal', url: '/imagenes/home2.jpg' },
    { id: 16, title: 'Balcón principal', url: '/imagenes/home.jpg' },
    { id: 17, title: 'Vista nocturna', url: '/imagenes/home2.jpg' },
    { id: 18, title: 'Entrada principal', url: '/imagenes/home.jpg' },
    { id: 19, title: 'Vista aérea', url: '/imagenes/home2.jpg' },
  ],

  // Lugares cercanos
  nearbyPlaces: {
    schools: ['Colegio San Patricio (500m)', 'Instituto Belgrano (800m)'],
    universities: ['Universidad de Palermo (1.2km)'],
    hospitals: ['Hospital Italiano (1km)', 'Clínica Cuyo (1.5km)'],
    supermarkets: ['Supermercado Jumbo (200m)', 'Carrefour Express (400m)'],
    shopping: ['Shopping Palermo (600m)'],
    parks: ['Parque Tres de Febrero (300m)', 'Plaza San Martín (500m)'],
    publicTransport: ['Estación Palermo (400m)', 'Parada de colectivo (100m)'],
  },

  // Agente responsable
  agent: {
    name: 'María González',
    role: 'Agente inmobiliario',
    phone: '+54 11 1234-5678',
    email: 'maria.gonzalez@nazarpropiedades.com',
  },
}

const relatedProperties = [
  {
    id: 2,
    title: 'Loft Moderno Belgrano',
    location: 'Belgrano, Buenos Aires',
    price: 620000,
    currency: 'USD',
  },
  {
    id: 3,
    title: 'Penthouse Minimalista',
    location: 'Puerto Madero, Buenos Aires',
    price: 1100000,
    currency: 'USD',
  },
  {
    id: 4,
    title: 'Casa Contemporánea',
    location: 'Recoleta, Buenos Aires',
    price: 780000,
    currency: 'USD',
  },
]

export default function PropertyDetailPage() {
  // En producción, aquí harías un fetch a tu API usando params.id
  // Example:
  // export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  //   const property = await fetch(`/api/properties/${params.id}`).then(res => res.json())

  return (
    <main className="bg-gray-50 mt-20">
      {/* Image Gallery */}
      <ImageGallery images={mockProperty.images} />

      {/* Hero Section */}
      <PropertyHero
        title={mockProperty.title}
        classification={mockProperty.classification}
        ubication={mockProperty.ubication}
        price={mockProperty.price}
        features={mockProperty.features}
        measures={mockProperty.measures}
      />

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left column - Details */}
          <PropertyDetails
            description={mockProperty.description}
            measures={mockProperty.measures}
            features={mockProperty.features}
            amenities={mockProperty.amenities}
            nearbyPlaces={mockProperty.nearbyPlaces}
          />

          {/* Right column - Contact Card */}
          <div className="lg:col-span-1">
            <ContactForm agent={mockProperty.agent} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white border border-gray-200 rounded-xl p-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Ubicación
          </h2>
          <div className="h-[300px] bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-300">
            <span className="material-symbols-outlined text-gray-400 text-4xl mb-4">
              location_on
            </span>
            <div className="text-gray-600 text-sm">Mapa interactivo</div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <RelatedProperties properties={relatedProperties} />
    </main>
  )
}
