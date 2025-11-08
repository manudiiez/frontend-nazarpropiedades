'use client'

import { useState } from 'react'
import PropertyFilters from '@/components/listings/PropertyFilters'
import PropertyGrid from '@/components/listings/PropertyGrid'
import Pagination from '@/components/listings/Pagination'
import { featuredProperties, recentProperties } from '@/data/properties'

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Combinar todas las propiedades para el listado
  const allProperties = [...featuredProperties, ...recentProperties]
  const totalPages = 8 // En una app real, esto vendría del backend

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters)
    // Aquí implementarías la lógica de filtrado
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 mt-20">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR FILTROS DESKTOP */}
        {showFilters && (
          <aside className="hidden lg:block w-1/4 xl:w-1/4">
            <div className="sticky top-22 bg-gray-ui rounded-md p-6">
              <PropertyFilters onFilterChange={handleFilterChange} />
              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Ocultar Filtros
              </button>
            </div>
          </aside>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <div
          className={`w-full ${
            showFilters ? 'lg:w-3/4 xl:w-4/5' : 'lg:w-full'
          } transition-all duration-300`}
        >
          {/* Botón Mostrar Filtros (cuando están ocultos) */}
          {!showFilters && (
            <button
              onClick={() => setShowFilters(true)}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
            >
              <span className="material-symbols-outlined">filter_list</span>
              Mostrar Filtros
            </button>
          )}

          {/* Botón Filtros Móviles */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors w-full justify-center"
          >
            <span className="material-symbols-outlined">filter_list</span>
            Filtros
          </button>

          {/* Título */}
          <h1 className="text-3xl font-bold mb-8">Propiedades en Mendoza</h1>

          {/* Grid de Propiedades */}
          <PropertyGrid properties={allProperties} />

          {/* Paginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* SIDEBAR FILTROS MÓVIL */}
      {showMobileFilters && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 bottom-0 w-[75%] max-w-sm bg-white z-[60] overflow-y-auto lg:hidden p-6">
            <PropertyFilters
              isMobile
              onClose={() => setShowMobileFilters(false)}
              onFilterChange={handleFilterChange}
            />
          </div>
        </>
      )}
    </main>
  )
}
