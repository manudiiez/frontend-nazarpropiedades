"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Verificar posición inicial al cargar/recargar la página
    const checkInitialScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Ejecutar inmediatamente para capturar la posición al reload
    checkInitialScroll();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Overlay oscuro para mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "shadow-lg bg-white/95 backdrop-blur-md"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="text-xl font-semibold text-gray-900">
              <Image
                src="/imagenes/brand.png"
                alt="Nazar Propiedades Logo"
                width={180}
                height={70}
                className=" inline-block mr-2"
              />
            </Link>

            {/* Zona de Búsqueda (Centro) */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/propiedades?condition=venta"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Comprar
              </Link>
              <Link
                href="/propiedades?condition=alquiler"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Alquilar
              </Link>
              <Link
                href="/nosotros?servicio=tasacion#contacto"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tasaciones
              </Link>
            </nav>

            {/* Zona de Conversión & Confianza (Derecha) */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/nosotros"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Nosotros
              </Link>
              <Link
                href="/nosotros#contacto"
                className="bg-accent hover:bg-red-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                QUIERO VENDER
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-border relative z-50 px-6 py-6">
            {/* Sección: Buscar Propiedad */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Buscar Propiedad
              </h3>
              <div className="space-y-1">
                <Link
                  href="/propiedades?condition=venta"
                  className="block text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Comprar
                </Link>
                <Link
                  href="/propiedades?condition=alquiler"
                  className="block text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Alquilar
                </Link>
              </div>
            </div>

            {/* Sección: Información */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Información
              </h3>
              <div className="space-y-1">
                <Link
                  href="/nosotros"
                  className="block text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link
                  href="/nosotros?servicio=tasacion#contacto"
                  className="block text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tasaciones
                </Link>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/nosotros#contacto"
              className="block w-full bg-accent text-white px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-red-700 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              QUIERO VENDER O PONER EN ALQUILER
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
