'use client'

import { useState, useEffect } from 'react'
import PropertyCard from '@/components/ui/PropertyCard'
import type { Property } from '@/types'

interface PropertyCarouselProps {
  title: string
  subtitle: string
  properties: Property[]
  containerBgColor?: string
}

const PropertyCarousel = ({
  title,
  subtitle,
  properties,
  containerBgColor = 'bg-gray-ui',
}: PropertyCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const propertiesPerSlide = 3
  const totalSlides = Math.ceil(properties.length / propertiesPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play funcionalidad (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  // Obtener propiedades del slide actual
  const getCurrentProperties = () => {
    const start = currentSlide * propertiesPerSlide
    const end = start + propertiesPerSlide
    return properties.slice(start, end)
  }

  return (
    <section className={`py-24 px-6 ${containerBgColor}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 ">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={previousSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Anterior"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Slides */}
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {properties
                      .slice(
                        slideIndex * propertiesPerSlide,
                        (slideIndex + 1) * propertiesPerSlide
                      )
                      .map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Siguiente"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8 bg-accent'
                    : 'w-3 bg-gray-300'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyCarousel
