'use client'

import { useState } from 'react'
import type { Agent } from '@/types/property'

interface ContactFormProps {
  agent?: Agent
}

export default function ContactForm({ agent }: ContactFormProps) {
  // Si no hay agente, no mostrar el componente
  if (!agent) return null
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessMessage(true)
    ;(e.target as HTMLFormElement).reset()
    setTimeout(() => setShowSuccessMessage(false), 4000)
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

      {/* Contact form */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Nombre</label>
          <input
            type="text"
            required
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            required
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Teléfono</label>
          <input
            type="tel"
            required
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Mensaje</label>
          <textarea
            required
            placeholder="Me interesa conocer más detalles..."
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm min-h-[100px] resize-y focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-accent text-white py-3 rounded-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5"
        >
          Enviar consulta
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
