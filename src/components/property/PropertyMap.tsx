import Image from 'next/image'

interface PropertyMapProps {
  mapImage: string
  location: string
}

const PropertyMap = ({ mapImage, location }: PropertyMapProps) => {
  return (
    <div className="mt-8 rounded-xl border border-gray-border bg-white p-6">
      <h3 className="text-2xl font-bold mb-4">Mapa de Ubicación</h3>
      <div className="aspect-video w-full rounded-xl bg-surface-light overflow-hidden border border-gray-border relative">
        <Image
          src={mapImage}
          alt={`Mapa mostrando la ubicación en ${location}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
        />
      </div>
    </div>
  )
}

export default PropertyMap
