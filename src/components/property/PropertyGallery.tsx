'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[550px] overflow-hidden rounded-xl bg-surface-light group">
      <div className="flex h-full w-full">
        <div className="relative w-full h-full">
          <Image
            src={images[currentImage]}
            alt={`${title} - Imagen ${currentImage + 1}`}
            fill
            className="object-cover"
            priority={currentImage === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1280px"
          />
        </div>
      </div>

      {/* Botón Anterior */}
      <button
        onClick={previousImage}
        className="absolute top-1/2 left-4 -translate-y-1/2 size-10 rounded-full bg-white/70 text-gray-900 flex items-center justify-center shadow-md hover:bg-white transition-colors"
        aria-label="Imagen anterior"
      >
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 -translate-y-1/2 size-10 rounded-full bg-white/70 text-gray-900 flex items-center justify-center shadow-md hover:bg-white transition-colors"
        aria-label="Imagen siguiente"
      >
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`size-2 rounded-full transition-opacity ${
              currentImage === index ? 'bg-white opacity-100' : 'bg-white opacity-50'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PropertyGallery
