'use client'

import { useState } from 'react'

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes implementar la lógica de búsqueda
    console.log('Buscando:', searchTerm)
  }

  return (
    <section id="inicio" className="pt-44 pb-24 px-6 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage:
            "url('https://www.construyehogar.com/wp-content/uploads/2014/07/Dsieño-de-sala-comedor-y-cocina-moderna.jpg')",
        }}
      />
      <div className="max-w-container mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Inmobiliaria en{' '}
          <span className="underline decoration-accent-red underline-offset-4">
            Mendoza.
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Encontrá la propiedad perfecta con el mejor acompañamiento profesional.
        </p>

        {/* Search Bar */}
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
              <button
                type="button"
                className="flex h-12 w-full shrink-0 items-center justify-between gap-x-2 rounded-md bg-neutral-light px-4 text-left"
              >
                <p className="text-sm font-medium text-primary">Tipo</p>
                <svg
                  className="w-5 h-5 text-gray-500"
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

              {/* Condición Dropdown */}
              <button
                type="button"
                className="flex h-12 w-full shrink-0 items-center justify-between gap-x-2 rounded-md bg-neutral-light px-4 text-left"
              >
                <p className="text-sm font-medium text-primary">Condición</p>
                <svg
                  className="w-5 h-5 text-gray-500"
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
      </div>
    </section>
  )
}

export default HeroSection
