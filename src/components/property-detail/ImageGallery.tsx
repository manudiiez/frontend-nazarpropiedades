"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Image {
  id: number;
  title?: string;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  thumbnails: Image[];
}

export default function ImageGallery({ images, thumbnails }: ImageGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlide, setModalSlide] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const modalThumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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

  // Funciones para el modal
  const openModal = (index: number) => {
    setModalSlide(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevenir scroll del body
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ""; // Restaurar scroll
  };

  const nextModalSlide = () => {
    setModalSlide((prev) => (prev + 1) % images.length);
  };

  const prevModalSlide = () => {
    setModalSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectModalSlide = (index: number) => {
    setModalSlide(index);
  };

  // Scroll thumbnails del modal
  useEffect(() => {
    if (modalThumbnailsRef.current && isModalOpen) {
      const thumbnailWidth = 80;
      const containerWidth = modalThumbnailsRef.current.offsetWidth;
      const scrollPosition =
        modalSlide * thumbnailWidth - containerWidth / 2 + thumbnailWidth / 2;

      modalThumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [modalSlide, isModalOpen]);

  // Handlers para touch/swipe en el modal
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - siguiente imagen
      nextModalSlide();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right - imagen anterior
      prevModalSlide();
    }
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isModalOpen]);

  // Navegación con flechas del teclado en el modal
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "ArrowLeft") {
        prevModalSlide();
      } else if (e.key === "ArrowRight") {
        nextModalSlide();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleArrowKeys);
      return () => document.removeEventListener("keydown", handleArrowKeys);
    }
  }, [isModalOpen, modalSlide]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid principal con imagen grande y previsualizaciones */}
        <div className="grid grid-cols-1  lg:grid-cols-[900px_1fr] gap-3 mb-4">
          {/* Imagen principal */}
          <div
            className="relative h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm overflow-hidden cursor-pointer group"
            onClick={() => openModal(currentSlide)}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-600 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.title || `Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="700px"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Overlay para indicar que es clickeable */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-900">
                  zoom_in
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Ver en grande
                </span>
              </div>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-gray-900 text-xl">
                chevron_left
              </span>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
              aria-label="Siguiente imagen"
            >
              <span className="material-symbols-outlined text-gray-900 text-xl">
                chevron_right
              </span>
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 text-white text-sm font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
              {currentSlide + 1} / {images.length}
            </div>
          </div>

          {/* Previsualizaciones a la derecha - solo en desktop */}
          <div className="hidden md:grid grid-rows-2 gap-3">
            {/* Primera previsualización */}
            {thumbnails[(currentSlide + 1) % thumbnails.length] && (
              <div
                onClick={() => selectSlide((currentSlide + 1) % images.length)}
                className="relative h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src={thumbnails[(currentSlide + 1) % thumbnails.length].url}
                  alt={thumbnails[(currentSlide + 1) % thumbnails.length].title || "Vista previa"}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            )}
            {/* Segunda previsualización */}
            {thumbnails[(currentSlide + 2) % thumbnails.length] && (
              <div
                onClick={() => selectSlide((currentSlide + 2) % images.length)}
                className="relative h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src={thumbnails[(currentSlide + 2) % thumbnails.length].url}
                  alt={thumbnails[(currentSlide + 2) % thumbnails.length].title || "Vista previa"}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            )}
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
            {thumbnails.map((thumbnail, index) => (
              <button
                key={thumbnail.id}
                onClick={() => selectSlide(index)}
                className={`relative min-w-[72px] h-16 rounded-sm overflow-hidden transition-all flex-shrink-0 ${
                  currentSlide === index
                    ? "ring-2 ring-accent scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={thumbnail.url}
                  alt={thumbnail.title || `Imagen ${index + 1}`}
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
        {/* Modal de imagen en grande */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            onClick={closeModal}
            style={{ zIndex: 9998 }}
          >
            {/* Header del modal */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
              <div className="text-white text-lg font-medium">
                {modalSlide + 1} / {images.length}
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors pointer-events-auto"
                aria-label="Cerrar"
              >
                <span className="material-symbols-outlined text-white">
                  close
                </span>
              </button>
            </div>

            {/* Contenedor de la imagen */}
            <div className="w-full max-w-7xl mx-auto h-full relative flex items-center justify-center p-4 md:p-8 pointer-events-none">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`transition-opacity duration-300 ${
                    modalSlide === index
                      ? "opacity-100"
                      : "opacity-0 absolute pointer-events-none"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.title || `Imagen ${index + 1}`}
                    className="max-w-full max-h-[80vh] w-auto h-auto object-contain pointer-events-auto cursor-default"
                    style={{
                      objectFit: "contain",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  />
                </div>
              ))}
            </div>

            {/* Thumbnails del modal */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={modalThumbnailsRef}
                className="overflow-x-auto scroll-smooth overflow-y-hidden"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(255,255,255,0.3) transparent",
                }}
              >
                <div className="flex gap-2 justify-center">
                  {thumbnails.map((thumbnail, index) => (
                    <button
                      key={thumbnail.id}
                      onClick={() => selectModalSlide(index)}
                      className={`relative min-w-[72px] h-16 rounded-sm overflow-hidden transition-all flex-shrink-0 ${
                        modalSlide === index
                          ? "ring-2 ring-white scale-105 opacity-100"
                          : "opacity-50 hover:opacity-80"
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <Image
                        src={thumbnail.url}
                        alt={thumbnail.title || `Imagen ${index + 1}`}
                        width={72}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
