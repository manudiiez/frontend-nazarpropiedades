"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInicioOpen, setIsInicioOpen] = useState(false);

  useEffect(() => {
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
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
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

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Dropdown Inicio */}
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Inicio
              </Link>

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
                href="#contacto"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Vender
              </Link>
            </nav>

            <button className="hidden md:block bg-accent hover:bg-red-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors">
              Publicar mi propiedad
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600"
              aria-label="Toggle menu"
            >
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
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-border relative z-50">
            <Link href="/" className="block text-gray-600">
              Inicio
            </Link>
            <Link href="/propiedades?condition=venta" className="block text-gray-600">
              Comprar
            </Link>
            <Link href="/propiedades?condition=alquiler" className="block text-gray-600">
              Alquilar
            </Link>
            <Link href="#contacto" className="block text-gray-600">
              Vender
            </Link>
            <button className="w-full bg-accent text-white px-4 py-2 text-sm font-medium rounded-lg mt-4">
              Publicar mi propiedad
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
