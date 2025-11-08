'use client'

import { useState } from 'react'

interface PropertyFiltersProps {
  onFilterChange?: (filters: any) => void
  isMobile?: boolean
  onClose?: () => void
}

const PropertyFilters = ({
  onFilterChange,
  isMobile = false,
  onClose,
}: PropertyFiltersProps) => {
  const [priceMin, setPriceMin] = useState(50000)
  const [priceMax, setPriceMax] = useState(500000)
  const [propertyTypes, setPropertyTypes] = useState({
    casa: true,
    apartamento: false,
    terreno: false,
  })
  const [bedrooms, setBedrooms] = useState('any')
  const [bathrooms, setBathrooms] = useState('any')

  const handleApplyFilters = () => {
    onFilterChange?.({
      priceMin,
      priceMax,
      propertyTypes,
      bedrooms,
      bathrooms,
    })
    if (isMobile && onClose) {
      onClose()
    }
  }

  const handleReset = () => {
    setPriceMin(50000)
    setPriceMax(500000)
    setPropertyTypes({ casa: false, apartamento: false, terreno: false })
    setBedrooms('any')
    setBathrooms('any')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Filtrar Propiedades</h3>
          {!isMobile && (
            <p className="text-sm text-text-secondary-light mt-1">
              Encuentra tu hogar perfecto
            </p>
          )}
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Cerrar filtros"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {/* Rango de Precio */}
      <div>
        <label className="block text-sm font-medium mb-3">Rango de Precio</label>
        <div className="space-y-4">
          <input
            type="range"
            min="50000"
            max="500000"
            step="10000"
            value={priceMin}
            onChange={(e) => setPriceMin(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>${priceMin.toLocaleString('es-AR')}</span>
            <span>${priceMax.toLocaleString('es-AR')}</span>
          </div>
          <input
            type="range"
            min="50000"
            max="500000"
            step="10000"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Tipo de Propiedad */}
      <div>
        <label className="block text-sm font-medium mb-3">Tipo de Propiedad</label>
        <div className="space-y-2">
          {Object.entries(propertyTypes).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setPropertyTypes({ ...propertyTypes, [key]: e.target.checked })
                }
                className="rounded border-gray-300 text-accent focus:ring-accent"
              />
              <span className="text-sm capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Habitaciones y Baños */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Habitaciones</label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full rounded-md border-gray-300 text-sm focus:border-accent focus:ring-accent"
          >
            <option value="any">Cualquiera</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Baños</label>
          <select
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full rounded-md border-gray-300 text-sm focus:border-accent focus:ring-accent"
          >
            <option value="any">Cualquiera</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-border">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-lg font-medium transition-colors"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleReset}
          className="w-full border border-gray-border hover:bg-gray-ui py-3 rounded-lg font-medium transition-colors"
        >
          Reiniciar
        </button>
      </div>
    </div>
  )
}

export default PropertyFilters
