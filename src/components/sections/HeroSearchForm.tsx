'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const propertyTypes = [
  { value: '', label: 'Todos' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'galpon', label: 'Galpón' },
  { value: 'campo', label: 'Campo' },
]

const conditions = [
  { value: '', label: 'Todas' },
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'alquiler_temporario', label: 'Alquiler Temporario' },
]

export default function HeroSearchForm() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showConditionDropdown, setShowConditionDropdown] = useState(false)

  const typeDropdownRef = useRef<HTMLDivElement>(null)
  const conditionDropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false)
      }
      if (conditionDropdownRef.current && !conditionDropdownRef.current.contains(event.target as Node)) {
        setShowConditionDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Construir los query params
    const params = new URLSearchParams()

    if (searchTerm) {
      params.set('search', searchTerm)
    }

    if (selectedType) {
      params.set('type', selectedType)
    }

    if (selectedCondition) {
      params.set('condition', selectedCondition)
    }

    // Redirigir a /propiedades con los parámetros
    const queryString = params.toString()
    router.push(`/propiedades${queryString ? `?${queryString}` : ''}`)
  }

  const getTypeLabel = () => {
    const type = propertyTypes.find(t => t.value === selectedType)
    return type ? type.label : 'Tipo'
  }

  const getConditionLabel = () => {
    const condition = conditions.find(c => c.value === selectedCondition)
    return condition ? condition.label : 'Condición'
  }

  return (
    <div className="mt-8 mb-8 max-w-2xl mx-auto rounded-lg bg-background-light p-3">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          {/* Search Input */}
          <label className="flex flex-col w-full col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="relative flex w-full items-stretch">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full min-w-0 flex-1 rounded-md border-neutral-light bg-neutral-light pl-10 text-primary placeholder:text-gray-500 focus:border-accent focus:ring-accent focus:outline-none"
                placeholder="ej. 'Palmares', 'centro'"
              />
            </div>
          </label>

          {/* Tipo Dropdown */}
          <div className="relative" ref={typeDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setShowTypeDropdown(!showTypeDropdown)
                setShowConditionDropdown(false)
              }}
              className="flex h-12 w-full shrink-0 items-center justify-between gap-x-2 rounded-md bg-neutral-light px-4 text-left hover:bg-gray-100 transition-colors"
            >
              <p className="text-sm font-medium text-primary truncate">{getTypeLabel()}</p>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`}
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

            {showTypeDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      setSelectedType(type.value)
                      setShowTypeDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      selectedType === type.value ? 'bg-accent/10 text-accent font-medium' : 'text-gray-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Condición Dropdown */}
          <div className="relative" ref={conditionDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setShowConditionDropdown(!showConditionDropdown)
                setShowTypeDropdown(false)
              }}
              className="flex h-12 w-full shrink-0 items-center justify-between gap-x-2 rounded-md bg-neutral-light px-4 text-left hover:bg-gray-100 transition-colors"
            >
              <p className="text-sm font-medium text-primary truncate">{getConditionLabel()}</p>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showConditionDropdown ? 'rotate-180' : ''}`}
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

            {showConditionDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {conditions.map((condition) => (
                  <button
                    key={condition.value}
                    type="button"
                    onClick={() => {
                      setSelectedCondition(condition.value)
                      setShowConditionDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      selectedCondition === condition.value ? 'bg-accent/10 text-accent font-medium' : 'text-gray-700'
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md bg-accent px-6 text-base font-bold text-white transition-colors hover:bg-accent/90"
          >
            <span className="truncate">Buscar</span>
          </button>
        </div>
      </form>
    </div>
  )
}
