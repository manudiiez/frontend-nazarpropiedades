"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Image {
  id: number;
  title: string;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides (solo si el usuario no ha interactuado)
  useEffect(() => {
    if (hasInteracted) return; // No hacer auto-advance si ya interactuó

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, hasInteracted]);

  // Scroll thumbnails to center current image
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnailWidth = 80; // ancho de cada thumbnail + gap
      const containerWidth = thumbnailsRef.current.offsetWidth;
      const scrollPosition =
        currentSlide * thumbnailWidth - containerWidth / 2 + thumbnailWidth / 2;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setHasInteracted(true); // Marcar que el usuario interactuó
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setHasInteracted(true); // Marcar que el usuario interactuó
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectSlide = (index: number) => {
    setHasInteracted(true); // Marcar que el usuario interactuó
    setCurrentSlide(index);
  };

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main Carousel */}
        <div className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm overflow-hidden mb-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-600 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 1400px) 100vw, 1400px"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
            aria-label="Imagen anterior"
          >
            <span className="material-symbols-outlined text-gray-900">
              chevron_left
            </span>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
            aria-label="Siguiente imagen"
          >
            <span className="material-symbols-outlined text-gray-900">
              chevron_right
            </span>
          </button>

          {/* Counter */}
          <div className="absolute top-8 right-8 text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
            {currentSlide + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails Navigation */}
        <div
          ref={thumbnailsRef}
          className="relative overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e0 #f7fafc",
          }}
        >
          <div className="flex gap-2 pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => selectSlide(index)}
                className={`relative min-w-[72px] h-16 rounded-sm overflow-hidden transition-all flex-shrink-0 ${
                  currentSlide === index
                    ? "ring-2 ring-accent scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  width={72}
                  height={64}
                  className="object-cover w-full h-full"
                />
                {currentSlide === index && (
                  <div className="absolute inset-0 border-2 border-accent pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
