'use client'

import { useState } from 'react'
import type { Agent, Property } from '@/types/property'
import {
  getPropertyTypeLabel,
  getConditionLabel,
  getDepartmentLabel,
  getLocalityLabel,
  getCurrencyLabel,
} from '@/utils/propertyLabels'

interface ContactFormProps {
  agent?: Agent
  property?: Property
}

interface FormData {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

export default function ContactForm({ agent, property }: ContactFormProps) {
  // Si no hay agente, no mostrar el componente
  if (!agent) return null

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setShowSuccessMessage(false)
    setShowErrorMessage(false)

    const form = e.currentTarget
    const formData: FormData = {
      nombre: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      mensaje: (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value,
    }

    // Convertir los valores a labels legibles
    const tipoLabel = property?.classification?.type
      ? getPropertyTypeLabel(property.classification.type)
      : ''
    const condicionLabel = property?.classification?.condition
      ? getConditionLabel(property.classification.condition)
      : ''
    const departamentoLabel = property?.ubication?.department
      ? getDepartmentLabel(property.ubication.department)
      : ''
    const localidadLabel = property?.ubication?.locality
      ? getLocalityLabel(property.ubication.locality)
      : ''
    const monedaLabel = property?.caracteristics?.currency
      ? getCurrencyLabel(property.caracteristics.currency)
      : ''

    // Construir la ubicación completa con labels
    const ubicacionParts = [
      property?.ubication?.neighborhood,
      localidadLabel,
      departamentoLabel,
      property?.ubication?.province,
    ].filter(Boolean)

    // Agregar información del agente y de la propiedad al envío
    const dataToSend = {
      ...formData,
      agente: {
        nombre: agent.name,
        telefono: agent.phone,
        rol: agent.role,
      },
      propiedad: {
        id: property?.id,
        titulo: property?.title,
        tipo: tipoLabel,
        condicion: condicionLabel,
        precio: property?.caracteristics?.price,
        moneda: monedaLabel,
        ubicacion: {
          completa: ubicacionParts.join(', '),
          barrio: property?.ubication?.neighborhood,
          localidad: localidadLabel,
          departamento: departamentoLabel,
          provincia: property?.ubication?.province,
          direccion: property?.ubication?.address,
        },
        caracteristicas: {
          dormitorios: property?.environments?.bedrooms,
          banos: property?.environments?.bathrooms,
          superficieTotal: property?.caracteristics?.totalArea,
          superficieCubierta: property?.caracteristics?.coveredArea,
        },
      },
    }

    try {
      const response = await fetch(
        'https://myn8n-n8n.jzdhpp.easypanel.host/webhook/92657ce7-8a99-4922-b320-fee467773dbe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        },
      )

      if (response.ok) {
        setShowSuccessMessage(true)
        form.reset()
        setTimeout(() => setShowSuccessMessage(false), 4000)
      } else {
        setShowErrorMessage(true)
        setTimeout(() => setShowErrorMessage(false), 4000)
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      setShowErrorMessage(true)
      setTimeout(() => setShowErrorMessage(false), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-8 sticky top-32">
      {/* Agent info */}
      <div className="text-center mb-8 pb-8 border-b border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-600 text-2xl">
            person
          </span>
        </div>
        <div className="text-lg font-semibold text-gray-900 mb-1">
          {agent.name}
        </div>
        {agent.role && <div className="text-sm text-gray-600">{agent.role}</div>}
      </div>

      {/* Success message */}
      {showSuccessMessage && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center text-sm mb-6">
          Mensaje enviado correctamente. Te contactaremos pronto.
        </div>
      )}

      {/* Error message */}
      {showErrorMessage && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center text-sm mb-6">
          Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.
        </div>
      )}

      {/* Contact form */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Nombre</label>
          <input
            type="text"
            name="nombre"
            required
            disabled={isLoading}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            required
            disabled={isLoading}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            required
            disabled={isLoading}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Mensaje</label>
          <textarea
            name="mensaje"
            required
            disabled={isLoading}
            placeholder="Me interesa conocer más detalles..."
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm min-h-[100px] resize-y focus:outline-none focus:border-gray-900 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-accent text-white py-3 rounded-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isLoading ? 'Enviando...' : 'Enviar consulta'}
        </button>
      </form>

      {/* Contact info */}
      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <div className="font-semibold text-gray-900 mb-1">{agent.phone}</div>
        <div className="text-sm text-gray-600">Llamada directa</div>
      </div>
    </div>
  )
}
