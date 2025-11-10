'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
    { id: 0, title: 'Fachada principal' },
    { id: 1, title: 'Dormitorio principal' },
    { id: 2, title: 'Cocina integrada' },
    { id: 3, title: 'Jardín minimalista' },
    { id: 4, title: 'Living comedor' },
    { id: 5, title: 'Baño principal' },
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
  const params = useParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockProperty.images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessMessage(true)
    ;(e.target as HTMLFormElement).reset()
    setTimeout(() => setShowSuccessMessage(false), 4000)
  }

  return (
    <main className="bg-gray-50 mt-20">
      {/* Gallery Section */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div
            className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm overflow-hidden cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {mockProperty.images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-600 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                  home
                </span>
                <div className="text-gray-600 font-medium">{image.title}</div>

                {/* Zoom indicator */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-base">
                    search
                  </span>
                </div>
              </div>
            ))}

            {/* Navigation dots */}
            <div className="absolute bottom-8 left-8 flex gap-2">
              {mockProperty.images.map((_, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentSlide(index)
                  }}
                  className={`h-2 rounded-full cursor-pointer transition-all ${
                    currentSlide === index
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-8 right-8 text-white text-sm font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
              {currentSlide + 1} / {mockProperty.images.length}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
              {mockProperty.title}
            </h1>
            <div className="text-lg text-gray-600">{mockProperty.location}</div>
            <div className="text-4xl font-semibold text-gray-900">
              {mockProperty.currency} {mockProperty.price.toLocaleString()}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 my-8">
              <div className="text-center py-6 border-t border-gray-200">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {mockProperty.bedrooms}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  Dormitorios
                </div>
              </div>
              <div className="text-center py-6 border-t border-gray-200">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {mockProperty.bathrooms}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  Baños
                </div>
              </div>
              <div className="text-center py-6 border-t border-gray-200">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {mockProperty.area}m²
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  Superficie
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="bg-accent text-white px-8 py-4 rounded-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5">
                Consultar por esta propiedad
              </button>
              {/* <button className="bg-transparent text-gray-900 px-8 py-4 rounded-sm font-medium border border-gray-200 hover:border-gray-900 transition-all hover:-translate-y-0.5">
                Ver detalles
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left column - Details */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            <h2 className="text-3xl font-semibold text-gray-900">Detalles</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {mockProperty.description}
            </p>

            {/* Medidas */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Medidas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Superficie total</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.superficieTotal} m²
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Superficie cubierta</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.superficieCubierta} m²
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Superficie terreno</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.superficieTerreno} m²
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Metros de frente</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.metrosFrente} m
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Metros de fondo</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.metrosFondo} m
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Superficie balcón</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.superficieBalcon} m²
                  </span>
                </div>
              </div>
            </div>

            {/* Ambientes */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Ambientes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Dormitorios</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.dormitorios}
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Baños</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.banos}
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Ambientes</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.ambientes}
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Cocheras</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.cocheras} cubiertas
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Tipo cochera</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.tipoCochera}
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Amoblado</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.amoblado}
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Año construcción</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.anoConstruccion}
                  </span>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-gray-50">
                  <span className="text-gray-600">Estado</span>
                  <span className="text-gray-900 font-semibold">
                    {mockProperty.specs.estado}
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Amenities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProperty.amenities.map((amenity, index) => (
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

            {/* Zonas Cercanas */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Zonas cercanas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProperty.nearbyPlaces.map((place, index) => (
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
          </div>

          {/* Right column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-sm p-8 sticky top-32">
              {/* Agent info */}
              <div className="text-center mb-8 pb-8 border-b border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-600 text-2xl">
                    person
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {mockProperty.agent.name}
                </div>
                <div className="text-sm text-gray-600">
                  {mockProperty.agent.role}
                </div>
              </div>

              {/* Success message */}
              {showSuccessMessage && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center text-sm mb-6">
                  Mensaje enviado correctamente. Te contactaremos pronto.
                </div>
              )}

              {/* Contact form */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900">
                    Mensaje
                  </label>
                  <textarea
                    required
                    placeholder="Me interesa conocer más detalles..."
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm min-h-[100px] resize-y focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-accent text-white py-3 rounded-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5"
                >
                  Enviar consulta
                </button>
              </form>

              {/* Contact info */}
              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <div className="font-semibold text-gray-900 mb-1">
                  {mockProperty.agent.phone}
                </div>
                <div className="text-sm text-gray-600">Llamada directa</div>
              </div>
            </div>
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
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12">
          Propiedades similares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProperties.map((property) => (
            <Link
              key={property.id}
              href={`/propiedades/${property.id}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-400 text-4xl">
                  home
                </span>
              </div>
              <div className="p-6">
                <div className="text-base font-semibold text-gray-900 mb-2">
                  {property.title}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {property.location}
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {property.currency} {property.price.toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Modal for enlarged images */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center p-8"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-[90%] max-h-[90%] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
              <span className="material-symbols-outlined text-gray-400 mb-8"style={{ fontSize: '80px' }}>
                home
              </span>
              <div className="text-gray-600 text-2xl font-medium">
                {mockProperty.images[currentSlide].title}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
