'use client'

import { useState, useEffect } from 'react'
import PropertyFilters from '@/components/listings/PropertyFilters'
import PropertyGrid from '@/components/listings/PropertyGrid'
import Pagination from '@/components/listings/Pagination'
import type { Property } from '@/types'
import type { Property as ApiProperty } from '@/types/property'
import { getDepartmentLabel, getLocalityLabel } from '@/utils/propertyLabels'

interface PropertiesResponse {
  docs: ApiProperty[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

// Función para transformar la propiedad de la API al formato del PropertyCard
function transformProperty(apiProperty: ApiProperty): Property {
  // Obtener la primera imagen o una imagen por defecto
  const image = apiProperty.images?.coverImage?.sizes?.thumbnail?.url || apiProperty.images?.imagenesExtra?.[0]?.url || '/imagenes/home.jpg'

  // Construir la ubicación
  const locationParts = [
    apiProperty.ubication.neighborhood,
    getLocalityLabel(apiProperty.ubication.locality || ''),
    getDepartmentLabel(apiProperty.ubication.department || ''),
    apiProperty.ubication.province,
  ].filter(Boolean)

  if (locationParts[1] === locationParts[2]) {
    locationParts.splice(2, 1)
  }
  const location = locationParts.join(', ')

  // Obtener el área (priorizar totalArea)
  const area = apiProperty.caracteristics?.totalArea || 0

  return {
    id: String(apiProperty.id),
    title: apiProperty.title,
    location: location,
    price: apiProperty.caracteristics?.price || 0,
    bedrooms: apiProperty.environments?.bedrooms || 0,
    bathrooms: apiProperty.environments?.bathrooms || 0,
    area: area,
    coveredArea: apiProperty.caracteristics?.coveredArea,
    garages: apiProperty.environments?.garages,
    image: image,
    type: apiProperty.classification.type,
    condition: apiProperty.classification.condition,
  }
}

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [properties, setProperties] = useState<Property[]>([])
  const [paginationData, setPaginationData] = useState<Omit<PropertiesResponse, 'docs'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch properties cuando cambia la página
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI

        if (!backendUri) {
          console.error('NEXT_PUBLIC_BACKEND_URI no está definido en .env')
          setIsLoading(false)
          return
        }

        const res = await fetch(
          `${backendUri}/propiedades?sort=-createdAt&limit=20&page=${currentPage}`,
          {
            cache: 'no-store', // Siempre obtener datos frescos
          }
        )

        if (!res.ok) {
          console.error(`Error al obtener propiedades: ${res.status}`)
          setIsLoading(false)
          return
        }

        const data: PropertiesResponse = await res.json()

        // Transformar las propiedades al formato esperado
        const transformedProperties = data.docs.map(transformProperty)
        setProperties(transformedProperties)

        // Guardar datos de paginación
        setPaginationData({
          totalDocs: data.totalDocs,
          limit: data.limit,
          totalPages: data.totalPages,
          page: data.page,
          pagingCounter: data.pagingCounter,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
        })
      } catch (error) {
        console.error('Error al hacer fetch de propiedades:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [currentPage])

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

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-600">Cargando propiedades...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Grid de Propiedades */}
              <PropertyGrid properties={properties} />

              {/* Paginación */}
              {paginationData && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
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
