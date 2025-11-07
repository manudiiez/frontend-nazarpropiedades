'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isInicioOpen, setIsInicioOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-md' : ''
      }`}
    >
      <div className="max-w-container mx-auto px-6">
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
          <div className="hidden md:flex items-center space-x-8">
            {/* Dropdown Inicio */}
            <div className="relative group">
              <button className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors">
                Inicio
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/index"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/index2"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Inicio 2
                  </Link>
                  <Link
                    href="/index3"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Inicio 3
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/propiedades"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Propiedades
            </Link>
            <Link
              href="#servicios"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="#contacto"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contacto
            </Link>
          </div>

          <button className="hidden md:block bg-accent-red hover:bg-red-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors">
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
        <div className="md:hidden bg-white border-t border-gray-border">
          <div className="px-6 py-4 space-y-3">
            {/* Dropdown Inicio Mobile */}
            <div>
              <button
                onClick={() => setIsInicioOpen(!isInicioOpen)}
                className="w-full text-left text-gray-900 font-medium flex items-center justify-between"
              >
                Inicio
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isInicioOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isInicioOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/index" className="block text-gray-600 py-1">
                    Inicio
                  </Link>
                  <Link href="/index2" className="block text-gray-600 py-1">
                    Inicio 2
                  </Link>
                  <Link href="/index3" className="block text-gray-600 py-1">
                    Inicio 3
                  </Link>
                </div>
              )}
            </div>
            <Link href="/propiedades" className="block text-gray-600">
              Propiedades
            </Link>
            <Link href="#servicios" className="block text-gray-600">
              Servicios
            </Link>
            <Link href="#contacto" className="block text-gray-600">
              Contacto
            </Link>
            <button className="w-full bg-accent-red text-white px-4 py-2 text-sm font-medium rounded-lg mt-4">
              Publicar mi propiedad
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
