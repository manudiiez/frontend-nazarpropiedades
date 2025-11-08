import Image from 'next/image'

interface PropertyVideoProps {
  videoUrl?: string
  thumbnail?: string
}

const PropertyVideo = ({ videoUrl, thumbnail }: PropertyVideoProps) => {
  if (!videoUrl && !thumbnail) return null

  return (
    <div className="mt-8 rounded-xl border border-gray-border bg-white p-6">
      <h3 className="text-2xl font-bold mb-4">Video Tour</h3>
      <div className="aspect-video w-full rounded-xl bg-surface-light overflow-hidden border border-gray-border relative">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="Video tour de la propiedad"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          thumbnail && (
            <Image
              src={thumbnail}
              alt="Video tour placeholder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          )
        )}
      </div>
    </div>
  )
}

export default PropertyVideo
