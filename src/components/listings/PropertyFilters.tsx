'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import CustomSelectInput from '@/components/ui/CustomSelectInput'
import DualRangeSlider from '@/components/ui/DualRangeSlider'

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
  barrioPrivado?: string
  cochera?: string
  financiacion?: string
  aceptaHipoteca?: string
  recibePermuta?: string
}

interface PropertyFiltersProps {
  onFilterChange?: (filters: any) => void
  isMobile?: boolean
  onClose?: () => void
  searchParams?: SearchParams
}

const PropertyFilters = ({
  onFilterChange,
  isMobile = false,
  onClose,
  searchParams,
}: PropertyFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState(searchParams?.search || '')
  const [propertyType, setPropertyType] = useState(searchParams?.type || 'any')
  const [condition, setCondition] = useState(searchParams?.condition || 'any')
  const [currency, setCurrency] = useState<'ARS' | 'USD' | null>(
    searchParams?.currency ? (searchParams.currency.toUpperCase() as 'ARS' | 'USD') : null
  )
  const [priceMin, setPriceMin] = useState(
    searchParams?.priceMin ? Number(searchParams.priceMin) : 500000
  )
  const [priceMax, setPriceMax] = useState(
    searchParams?.priceMax ? Number(searchParams.priceMax) : 1000000000
  )
  const [bedroomsMin, setBedroomsMin] = useState(
    searchParams?.bedroomsMin ? Number(searchParams.bedroomsMin) : 0
  )
  const [bedroomsMax, setBedroomsMax] = useState(
    searchParams?.bedroomsMax ? Number(searchParams.bedroomsMax) : 10
  )
  const [bathroomsMin, setBathroomsMin] = useState(
    searchParams?.bathroomsMin ? Number(searchParams.bathroomsMin) : 0
  )
  const [bathroomsMax, setBathroomsMax] = useState(
    searchParams?.bathroomsMax ? Number(searchParams.bathroomsMax) : 10
  )
  const [totalAreaMin, setTotalAreaMin] = useState(
    searchParams?.totalAreaMin ? Number(searchParams.totalAreaMin) : 0
  )
  const [totalAreaMax, setTotalAreaMax] = useState(
    searchParams?.totalAreaMax ? Number(searchParams.totalAreaMax) : 1000
  )
  const [coveredAreaMin, setCoveredAreaMin] = useState(
    searchParams?.coveredAreaMin ? Number(searchParams.coveredAreaMin) : 0
  )
  const [coveredAreaMax, setCoveredAreaMax] = useState(
    searchParams?.coveredAreaMax ? Number(searchParams.coveredAreaMax) : 1000
  )
  const [floorsMin, setFloorsMin] = useState(
    searchParams?.floorsMin ? Number(searchParams.floorsMin) : 0
  )
  const [floorsMax, setFloorsMax] = useState(
    searchParams?.floorsMax ? Number(searchParams.floorsMax) : 30
  )
  const [roomsMin, setRoomsMin] = useState(
    searchParams?.roomsMin ? Number(searchParams.roomsMin) : 0
  )
  const [roomsMax, setRoomsMax] = useState(
    searchParams?.roomsMax ? Number(searchParams.roomsMax) : 30
  )
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Estados para checkboxes
  const [barrioPrivado, setBarrioPrivado] = useState(searchParams?.barrioPrivado === 'true')
  const [cochera, setCochera] = useState(searchParams?.cochera === 'true')
  const [financiacion, setFinanciacion] = useState(searchParams?.financiacion === 'true')
  const [aceptaHipoteca, setAceptaHipoteca] = useState(searchParams?.aceptaHipoteca === 'true')
  const [recibePermuta, setRecibePermuta] = useState(searchParams?.recibePermuta === 'true')

  // Rangos de precio según la moneda
  const priceRanges = {
    ARS: { min: 500000, max: 1000000000, step: 1000000 },
    USD: { min: 500, max: 1000000, step: 1000 }
  }

  // Actualizar rangos de precio cuando cambia la moneda
  useEffect(() => {
    if (currency) {
      const range = priceRanges[currency]
      setPriceMin(range.min)
      setPriceMax(range.max)
    }
  }, [currency])

  // Abrir filtros avanzados automáticamente en mobile
  useEffect(() => {
    if (isMobile) {
      setShowAdvancedFilters(true)
    }
  }, [isMobile])

  const handleApplyFilters = () => {
    onFilterChange?.({
      searchQuery: searchQuery || undefined,
      propertyType: propertyType !== 'any' ? propertyType : undefined,
      condition: condition !== 'any' ? condition : undefined,
      // Solo enviar currency si está seleccionada
      currency: currency || undefined,
      // Solo enviar priceMin si hay moneda y tiene un valor
      priceMin: currency && priceMin && priceMin > 0 ? priceMin : undefined,
      // Solo enviar priceMax si hay moneda y tiene un valor
      priceMax: currency && priceMax && priceMax > 0 ? priceMax : undefined,
      // No enviar bedroomsMin si está en 0
      bedroomsMin: bedroomsMin > 0 ? bedroomsMin : undefined,
      // No enviar bedroomsMax si está en el extremo superior (10 o más)
      bedroomsMax: bedroomsMax < 10 ? bedroomsMax : undefined,
      // No enviar bathroomsMin si está en 0
      bathroomsMin: bathroomsMin > 0 ? bathroomsMin : undefined,
      // No enviar bathroomsMax si está en el extremo superior (10 o más)
      bathroomsMax: bathroomsMax < 10 ? bathroomsMax : undefined,
      // No enviar totalAreaMin si está en 0
      totalAreaMin: totalAreaMin > 0 ? totalAreaMin : undefined,
      // No enviar totalAreaMax si está en el máximo (1000)
      totalAreaMax: totalAreaMax < 1000 ? totalAreaMax : undefined,
      // No enviar coveredAreaMin si está en 0
      coveredAreaMin: coveredAreaMin > 0 ? coveredAreaMin : undefined,
      // No enviar coveredAreaMax si está en el máximo (1000)
      coveredAreaMax: coveredAreaMax < 1000 ? coveredAreaMax : undefined,
      // No enviar floorsMin si está en 0
      floorsMin: floorsMin > 0 ? floorsMin : undefined,
      // No enviar floorsMax si está en el máximo (30)
      floorsMax: floorsMax < 30 ? floorsMax : undefined,
      // No enviar roomsMin si está en 0
      roomsMin: roomsMin > 0 ? roomsMin : undefined,
      // No enviar roomsMax si está en el máximo (30)
      roomsMax: roomsMax < 30 ? roomsMax : undefined,
      // Solo enviar checkboxes si están marcados
      barrioPrivado: barrioPrivado || undefined,
      cochera: cochera || undefined,
      financiacion: financiacion || undefined,
      aceptaHipoteca: aceptaHipoteca || undefined,
      recibePermuta: recibePermuta || undefined,
    })
    if (isMobile && onClose) {
      onClose()
    }
  }

  // Handler para el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const oldValue = searchQuery

    setSearchQuery(newValue)

    // Disparar búsqueda cuando se escribe un espacio (detectar que se agregó un espacio)
    if (newValue.length > oldValue.length && newValue.endsWith(' ')) {
      // Usar setTimeout para esperar a que el estado se actualice
      setTimeout(() => handleApplyFilters(), 0)
    }

    // Disparar búsqueda cuando se borra todo el texto
    if (newValue === '' && oldValue !== '') {
      setTimeout(() => handleApplyFilters(), 0)
    }
  }

  // Handler para el evento keyDown en el input de búsqueda
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyFilters()
    }
  }

  const handleReset = () => {
    setSearchQuery('')
    setPropertyType('any')
    setCondition('any')
    setCurrency(null)
    setPriceMin(500000)
    setPriceMax(1000000000)
    setBedroomsMin(0)
    setBedroomsMax(10)
    setBathroomsMin(0)
    setBathroomsMax(10)
    setTotalAreaMin(0)
    setTotalAreaMax(1000)
    setCoveredAreaMin(0)
    setCoveredAreaMax(1000)
    setFloorsMin(0)
    setFloorsMax(30)
    setRoomsMin(0)
    setRoomsMax(30)
    // Resetear checkboxes
    setBarrioPrivado(false)
    setCochera(false)
    setFinanciacion(false)
    setAceptaHipoteca(false)
    setRecibePermuta(false)

    // Aplicar filtros vacíos automáticamente
    onFilterChange?.({})
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      {/* <div className="flex items-center justify-between">
        <div>
          <h3 className="text-md font-bold">Filtrar Propiedades</h3>
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
      </div> */}

      {/* Búsqueda por ubicación */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Buscar por ubicación
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Ej: Godoy Cruz, Luján de Cuyo..."
            className="w-full px-4 py-2  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
          />
          {/* <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            search
          </span> */}
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
            { value: 'lote', label: 'Lote' },
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
      <div>
        <label className="block text-sm font-medium mb-3">Rango de Precio</label>

        {/* Selector de Moneda */}
        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => setCurrency(currency === 'ARS' ? null : 'ARS')}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors border border-gray-border  ${
              currency === 'ARS'
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ARS
          </button>
          <button
            type="button"
            onClick={() => setCurrency(currency === 'USD' ? null : 'USD')}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors border border-gray-border ${
              currency === 'USD'
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            USD
          </button>
        </div>

        {/* OPCIÓN 1: Dual Range Slider - COMENTADO PARA PROBAR INPUT NUMBERS */}
        {/* {currency && (
          <DualRangeSlider
            label="Precio"
            min={currency === 'USD' ? 500 : 500000}
            max={currency === 'USD' ? 1000000 : 1000000000}
            step={currency === 'USD' ? 1000 : 1000000}
            valueMin={priceMin}
            valueMax={priceMax}
            onMinChange={setPriceMin}
            onMaxChange={setPriceMax}
            formatValue={(val) => {
              const currentRange = priceRanges[currency]

              // Si está en el extremo inferior, mostrar 0
              if (val <= currentRange.min) {
                return '0'
              }

              // Para ARS: mostrar "+1000 Millo" para 1,000,000,000
              if (currency === 'ARS' && val >= 1000000000) {
                return '+1000 Millo'
              }

              // Para USD: mostrar "+1.000.000" para 1,000,000
              if (currency === 'USD' && val >= 1000000) {
                return `+${val.toLocaleString('es-AR')}`
              }

              // Para USD: mostrar formato normal
              if (currency === 'USD') {
                return val.toLocaleString('es-AR')
              }

              // Para ARS: mostrar en millones si es >= 1,000,000
              if (val >= 1000000) {
                return `${(val / 1000000).toFixed(0)} Millo`
              }
              return val.toLocaleString('es-AR')
            }}
          />
        )} */}

        {/* OPCIÓN 2: Input Numbers - NUEVA VERSIÓN PARA PROBAR */}
        {currency && (
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Mín"
                value={priceMin || ''}
                onChange={(e) => setPriceMin(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
              />
            </div>
            <div className="flex items-center text-gray-500">-</div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Máx"
                value={priceMax || ''}
                onChange={(e) => setPriceMax(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
              />
            </div>
          </div>
        )}
      </div>

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
          className="w-full bg-accent hover:bg-accent-hover text-white py-1.5 rounded-sm font-medium transition-colors text-sm cursor-pointer"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={() => setShowAdvancedFilters(true)}
          className="w-full border border-accent text-accent hover:bg-accent hover:text-white py-1.5 rounded-sm font-medium transition-colors text-sm cursor-pointer"
        >
          Filtros Avanzados
        </button>
        <button
          onClick={handleReset}
          className="w-full border border-gray-border hover:bg-gray-ui-hover py-1.5 rounded-sm font-medium transition-colors text-sm cursor-pointer"
        >
          Reiniciar
        </button>
      </div>

      {/* Modal Filtros Avanzados */}
      {showAdvancedFilters && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 9998 }}
            onClick={() => {
              setShowAdvancedFilters(false)
              if (isMobile && onClose) {
                onClose()
              }
            }}
          />

          {/* Modal */}
          <div className="fixed right-0 top-0 bottom-0 w-[75%] max-w-sm bg-white overflow-y-auto p-6" style={{ zIndex: 9999 }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              
              <h3 className="text-xl font-bold">Todos los Filtros</h3>
              <button
                onClick={() => {
                  setShowAdvancedFilters(false)
                  if (isMobile && onClose) {
                    onClose()
                  }
                }}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Cerrar filtros avanzados"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Todos los filtros */}
            <div className="flex flex-col gap-4">
              {/* Búsqueda por ubicación */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Buscar por ubicación
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Ej: Godoy Cruz, Luján de Cuyo..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
                  />
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
                    { value: 'lote', label: 'Lote' },
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
              <div>
                <label className="block text-sm font-medium mb-3">Rango de Precio</label>
                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setCurrency(currency === 'ARS' ? null : 'ARS')}
                    className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors border border-gray-border ${
                      currency === 'ARS'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ARS
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency(currency === 'USD' ? null : 'USD')}
                    className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors border border-gray-border ${
                      currency === 'USD'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    USD
                  </button>
                </div>

                {/* OPCIÓN 1: Dual Range Slider - COMENTADO PARA PROBAR INPUT NUMBERS */}
                {/* {currency && (
                  <DualRangeSlider
                    label="Precio"
                    min={currency === 'USD' ? 500 : 500000}
                    max={currency === 'USD' ? 1000000 : 1000000000}
                    step={currency === 'USD' ? 1000 : 1000000}
                    valueMin={priceMin}
                    valueMax={priceMax}
                    onMinChange={setPriceMin}
                    onMaxChange={setPriceMax}
                    formatValue={(val) => {
                      const currentRange = priceRanges[currency]

                      // Si está en el extremo inferior, mostrar 0
                      if (val <= currentRange.min) {
                        return '0'
                      }

                      // Para ARS: mostrar "+1000 Millo" para 1,000,000,000
                      if (currency === 'ARS' && val >= 1000000000) {
                        return '+1000 Millo'
                      }

                      // Para USD: mostrar "+1.000.000" para 1,000,000
                      if (currency === 'USD' && val >= 1000000) {
                        return `+${val.toLocaleString('es-AR')}`
                      }

                      // Para USD: mostrar formato normal
                      if (currency === 'USD') {
                        return val.toLocaleString('es-AR')
                      }

                      // Para ARS: mostrar en millones si es >= 1,000,000
                      if (val >= 1000000) {
                        return `${(val / 1000000).toFixed(0)} Millo`
                      }
                      return val.toLocaleString('es-AR')
                    }}
                  />
                )} */}

                {/* OPCIÓN 2: Input Numbers - NUEVA VERSIÓN PARA PROBAR */}
                {currency && (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Mín"
                        value={priceMin || ''}
                        onChange={(e) => setPriceMin(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
                      />
                    </div>
                    <div className="flex items-center text-gray-500">-</div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Máx"
                        value={priceMax || ''}
                        onChange={(e) => setPriceMax(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

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

              {/* Superficie Total */}
              <DualRangeSlider
                min={0}
                max={1000}
                step={10}
                valueMin={totalAreaMin}
                valueMax={totalAreaMax}
                onMinChange={setTotalAreaMin}
                onMaxChange={setTotalAreaMax}
                label="Superficie Total (m²)"
                formatValue={(val) => `${val}`}
              />

              {/* Superficie Cubierta */}
              <DualRangeSlider
                min={0}
                max={1000}
                step={10}
                valueMin={coveredAreaMin}
                valueMax={coveredAreaMax}
                onMinChange={setCoveredAreaMin}
                onMaxChange={setCoveredAreaMax}
                label="Superficie Cubierta (m²)"
                formatValue={(val) => `${val}`}
              />

              {/* Plantas */}
              <DualRangeSlider
                min={0}
                max={30}
                step={1}
                valueMin={floorsMin}
                valueMax={floorsMax}
                onMinChange={setFloorsMin}
                onMaxChange={setFloorsMax}
                label="Plantas"
              />

              {/* Ambientes */}
              <DualRangeSlider
                min={0}
                max={30}
                step={1}
                valueMin={roomsMin}
                valueMax={roomsMax}
                onMinChange={setRoomsMin}
                onMaxChange={setRoomsMax}
                label="Ambientes"
              />

              {/* Características adicionales */}
              <div className="border-t border-gray-border pt-4">
                <label className="block text-sm font-medium mb-3">
                  Características adicionales
                </label>
                <div className="flex flex-col gap-3">
                  {/* Barrio Privado */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={barrioPrivado}
                      onChange={(e) => setBarrioPrivado(e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm">Barrio Privado</span>
                  </label>

                  {/* Cochera */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cochera}
                      onChange={(e) => setCochera(e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm">Cochera</span>
                  </label>

                  {/* Financiación */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={financiacion}
                      onChange={(e) => setFinanciacion(e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm">Financiación</span>
                  </label>

                  {/* Acepta Hipoteca */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceptaHipoteca}
                      onChange={(e) => setAceptaHipoteca(e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm">Acepta Hipoteca</span>
                  </label>

                  {/* Recibe Permuta */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={recibePermuta}
                      onChange={(e) => setRecibePermuta(e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm">¿Recibe Permuta?</span>
                  </label>
                </div>
              </div>

              {/* Botones del Modal */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-border sticky bottom-0 bg-white pb-4 z-10">
                <button
                  onClick={() => {
                    handleApplyFilters()
                    setShowAdvancedFilters(false)
                  }}
                  className="w-full bg-accent hover:bg-accent-hover text-white py-2.5 rounded-sm font-medium transition-colors text-sm cursor-pointer"
                >
                  Aplicar Filtros
                </button>
                <button
                  onClick={handleReset}
                  className="w-full border border-gray-border hover:bg-gray-ui-hover py-2.5 rounded-sm font-medium transition-colors text-sm cursor-pointer"
                >
                  Reiniciar
                </button>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  )
}

export default PropertyFilters
