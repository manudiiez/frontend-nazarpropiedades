import ImageGallery from '@/components/property-detail/ImageGallery'
import PropertyHero from '@/components/property-detail/PropertyHero'
import PropertyDetails from '@/components/property-detail/PropertyDetails'
import ContactForm from '@/components/property-detail/ContactForm'
import RelatedProperties from '@/components/property-detail/RelatedProperties'

// Datos de ejemplo - En producción vendría de una API
const mockProperty = {
  id: 1,
  title: 'Casa Minimalista Palermo',
  location: 'Palermo, Buenos Aires',
  price: 850000,
  currency: 'USD',
  bedrooms: 4,
  bathrooms: 3,
  area: 320,
  description:
    'Arquitectura contemporánea que abraza la simplicidad. Espacios amplios, líneas limpias y materiales nobles crean un ambiente sereno y sofisticado. Cada detalle ha sido cuidadosamente pensado para maximizar la funcionalidad sin comprometer la estética minimalista.',
  images: [
    { id: 0, title: 'Fachada principal', url: '/imagenes/home.jpg' },
    { id: 1, title: 'Dormitorio principal', url: '/imagenes/home2.jpg' },
    { id: 2, title: 'Cocina integrada', url: '/imagenes/home.jpg' },
    { id: 3, title: 'Jardín minimalista', url: '/imagenes/home2.jpg' },
    { id: 4, title: 'Living comedor', url: '/imagenes/home.jpg' },
    { id: 5, title: 'Baño principal', url: '/imagenes/home2.jpg' },
  ],
  specs: {
    superficieTotal: 320,
    superficieCubierta: 280,
    superficieTerreno: 400,
    metrosFrente: 12,
    metrosFondo: 33,
    superficieBalcon: 25,
    dormitorios: 4,
    banos: 3,
    ambientes: 8,
    cocheras: 2,
    tipoCochera: 'Cubierta',
    amoblado: 'No',
    anoConstruccion: 2022,
    estado: 'Excelente',
  },
  amenities: [
    'Cocina integrada',
    'Piscina',
    'Dormitorio en suite',
    'Balcón',
    'Sauna',
    'Jardín privado',
    'Aire acondicionado',
    'Calefacción central',
    'Domótica',
    'Seguridad 24hs',
    'Pisos de hormigón pulido',
    'Ventanales de piso a techo',
  ],
  nearbyPlaces: [
    'Colegio San Patricio (500m)',
    'Universidad de Palermo (1.2km)',
    'Club Atlético Palermo (800m)',
    'Shopping Palermo (600m)',
    'Estación Palermo (400m)',
    'Parque Tres de Febrero (300m)',
    'Hospital Italiano (1km)',
    'Supermercado Jumbo (200m)',
  ],
  agent: {
    name: 'María González',
    role: 'Agente inmobiliario',
    phone: '+54 11 1234-5678',
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
        location={mockProperty.location}
        price={mockProperty.price}
        currency={mockProperty.currency}
        bedrooms={mockProperty.bedrooms}
        bathrooms={mockProperty.bathrooms}
        area={mockProperty.area}
      />

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left column - Details */}
          <PropertyDetails
            description={mockProperty.description}
            specs={mockProperty.specs}
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
