'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PropertyFilters from './PropertyFilters'

interface SearchParams {
  page?: string
  search?: string
  type?: string
  condition?: string
  currency?: string
  priceMin?: string
  priceMax?: string
  bedroomsMin?: string
  bedroomsMax?: string
  bathroomsMin?: string
  bathroomsMax?: string
  totalAreaMin?: string
  totalAreaMax?: string
  coveredAreaMin?: string
  coveredAreaMax?: string
  floorsMin?: string
  floorsMax?: string
  roomsMin?: string
  roomsMax?: string
}

interface PropertyFiltersClientProps {
  searchParams: SearchParams
}

export default function PropertyFiltersClient({ searchParams }: PropertyFiltersClientProps) {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleFilterChange = (filters: any) => {
    // Construir los query params basados en los filtros
    const params = new URLSearchParams()

    // Solo agregar los filtros que tienen valor
    if (filters.searchQuery) params.set('search', filters.searchQuery)
    if (filters.propertyType && filters.propertyType !== 'any') params.set('type', filters.propertyType)
    if (filters.condition && filters.condition !== 'any') params.set('condition', filters.condition)
    if (filters.currency) params.set('currency', filters.currency)
    if (filters.priceMin) params.set('priceMin', String(filters.priceMin))
    if (filters.priceMax) params.set('priceMax', String(filters.priceMax))
    if (filters.bedroomsMin) params.set('bedroomsMin', String(filters.bedroomsMin))
    if (filters.bedroomsMax) params.set('bedroomsMax', String(filters.bedroomsMax))
    if (filters.bathroomsMin) params.set('bathroomsMin', String(filters.bathroomsMin))
    if (filters.bathroomsMax) params.set('bathroomsMax', String(filters.bathroomsMax))
    if (filters.totalAreaMin) params.set('totalAreaMin', String(filters.totalAreaMin))
    if (filters.totalAreaMax) params.set('totalAreaMax', String(filters.totalAreaMax))
    if (filters.coveredAreaMin) params.set('coveredAreaMin', String(filters.coveredAreaMin))
    if (filters.coveredAreaMax) params.set('coveredAreaMax', String(filters.coveredAreaMax))
    if (filters.floorsMin) params.set('floorsMin', String(filters.floorsMin))
    if (filters.floorsMax) params.set('floorsMax', String(filters.floorsMax))
    if (filters.roomsMin) params.set('roomsMin', String(filters.roomsMin))
    if (filters.roomsMax) params.set('roomsMax', String(filters.roomsMax))

    // Resetear la página a 1 cuando se cambian los filtros
    params.set('page', '1')

    // Navegar con los nuevos query params
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <>
      {/* SIDEBAR FILTROS DESKTOP */}
      {showFilters && (
        <aside className="hidden lg:block w-1/4 xl:w-1/4">
          <div className="sticky top-22 bg-gray-ui rounded-md p-6 z-49">
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
    </>
  )
}
