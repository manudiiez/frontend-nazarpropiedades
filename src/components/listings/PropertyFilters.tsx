'use client'

import { useState } from 'react'
import CustomSelectInput from '@/components/ui/CustomSelectInput'
import DualRangeSlider from '@/components/ui/DualRangeSlider'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('any')
  const [condition, setCondition] = useState('any')
  const [priceMin, setPriceMin] = useState(50000)
  const [priceMax, setPriceMax] = useState(500000)
  const [bedroomsMin, setBedroomsMin] = useState(0)
  const [bedroomsMax, setBedroomsMax] = useState(10)
  const [bathroomsMin, setBathroomsMin] = useState(0)
  const [bathroomsMax, setBathroomsMax] = useState(10)

  const handleApplyFilters = () => {
    onFilterChange?.({
      searchQuery,
      propertyType,
      condition,
      priceMin,
      priceMax,
      bedroomsMin,
      bedroomsMax,
      bathroomsMin,
      bathroomsMax,
    })
    if (isMobile && onClose) {
      onClose()
    }
  }

  const handleReset = () => {
    setSearchQuery('')
    setPropertyType('any')
    setCondition('any')
    setPriceMin(50000)
    setPriceMax(500000)
    setBedroomsMin(0)
    setBedroomsMax(10)
    setBathroomsMin(0)
    setBathroomsMax(10)
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

      {/* Búsqueda por ubicación */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Buscar por ubicación
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ej: Godoy Cruz, Luján de Cuyo..."
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            search
          </span>
        </div>
      </div>

      {/* Tipo de Propiedad */}
      <div>
        <CustomSelectInput
          label="Tipo de Propiedad"
          options={[
            { value: 'any', label: 'Cualquiera' },
            { value: 'casa', label: 'Casa' },
            { value: 'departamento', label: 'Departamento' },
            { value: 'terreno', label: 'Terreno' },
            { value: 'local', label: 'Local Comercial' },
          ]}
          value={propertyType}
          onChange={setPropertyType}
          labelClassName="text-sm font-medium"
          buttonClassName="text-sm rounded-md"
        />
      </div>

      {/* Condición */}
      <div>
        <CustomSelectInput
          label="Condición"
          options={[
            { value: 'any', label: 'Cualquiera' },
            { value: 'venta', label: 'Venta' },
            { value: 'alquiler', label: 'Alquiler' },
          ]}
          value={condition}
          onChange={setCondition}
          labelClassName="text-sm font-medium"
          buttonClassName="text-sm rounded-md"
        />
      </div>

      {/* Rango de Precio */}
      <DualRangeSlider
        min={50000}
        max={500000}
        step={10000}
        valueMin={priceMin}
        valueMax={priceMax}
        onMinChange={setPriceMin}
        onMaxChange={setPriceMax}
        label="Rango de Precio"
        formatValue={(val) => `$${val.toLocaleString('es-AR')}`}
      />

      {/* Habitaciones */}
      <DualRangeSlider
        min={0}
        max={10}
        step={1}
        valueMin={bedroomsMin}
        valueMax={bedroomsMax}
        onMinChange={setBedroomsMin}
        onMaxChange={setBedroomsMax}
        label="Habitaciones"
      />

      {/* Baños */}
      <DualRangeSlider
        min={0}
        max={10}
        step={1}
        valueMin={bathroomsMin}
        valueMax={bathroomsMax}
        onMinChange={setBathroomsMin}
        onMaxChange={setBathroomsMax}
        label="Baños"
      />

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
