"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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
  const [showModal, setShowModal] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index?: number) => {
    if (index !== undefined) {
      setCurrentSlide(index);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Gallery Section */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm overflow-hidden">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-600 cursor-pointer ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => openModal(index)}
              >
                {/* <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                  home
                </span>
                <div className="text-gray-600 font-medium">{image.title}</div> */}
                <Image
                  src={image.url}
                  alt={image.title}
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full"
                />

                {/* Zoom indicator */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-base">
                    search
                  </span>
                </div>
              </div>
            ))}

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-gray-900">
                chevron_left
              </span>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
              aria-label="Siguiente imagen"
            >
              <span className="material-symbols-outlined text-gray-900">
                chevron_right
              </span>
            </button>

            {/* Navigation dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  className={`h-2 rounded-full cursor-pointer transition-all ${
                    currentSlide === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-8 right-8 text-white text-sm font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
              {currentSlide + 1} / {images.length}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for enlarged images */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center p-8"
          onClick={closeModal}
        >
          <div
            className="relative max-w-[90%] max-h-[90%] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/70 transition-colors z-20"
              aria-label="Cerrar modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Previous Button Modal */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all z-20"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-gray-900 text-3xl">
                chevron_left
              </span>
            </button>

            {/* Next Button Modal */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all z-20"
              aria-label="Siguiente imagen"
            >
              <span className="material-symbols-outlined text-gray-900 text-3xl">
                chevron_right
              </span>
            </button>

            {/* Modal slides */}
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`flex flex-col items-center justify-center min-h-[400px] transition-opacity duration-300 ${
                  currentSlide === index ? "opacity-100" : "opacity-0 absolute"
                }`}
              >
                {/* <span
                  className="material-symbols-outlined text-gray-400 mb-8"
                  style={{ fontSize: '80px' }}
                >
                  home
                </span>
                <div className="text-gray-600 text-2xl font-medium">
                  {image.title}
                </div> */}
                <Image
                  src={image.url}
                  alt={image.title}
                  width={1200}
                  height={800}
                  className="object-cover max-w-full max-h-[80vh] rounded-sm"
                />
              </div>
            ))}

            {/* Counter Modal */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              {currentSlide + 1} / {images.length}
            </div>

            {/* Thumbnails navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90%] overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`min-w-[60px] h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center transition-all ${
                    currentSlide === index
                      ? "ring-2 ring-white scale-110"
                      : "opacity-50 hover:opacity-75"
                  }`}
                  aria-label={`Ver ${image.title}`}
                >
                  {/* <span className="material-symbols-outlined text-gray-600 text-sm">
                    home
                  </span> */}
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={80}
                    height={60}
                    className="object-cover w-full h-full rounded"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
