'use client'

import { useState } from 'react'

interface PropertyDescriptionProps {
  description: string
  detailedDescription: string
  legalInfo: string
}

const PropertyDescription = ({
  description,
  detailedDescription,
  legalInfo,
}: PropertyDescriptionProps) => {
  const [isDetailedOpen, setIsDetailedOpen] = useState(false)
  const [isLegalOpen, setIsLegalOpen] = useState(false)

  return (
    <div className="py-6 space-y-4 leading-relaxed rounded-xl border border-gray-border p-6 mt-6 bg-white">
      <h3 className="text-2xl font-bold mb-3">Descripción</h3>
      <p className="text-text-secondary-light whitespace-pre-line">{description}</p>

      {/* Descripción Detallada */}
      <details
        className="rounded-lg border border-gray-border overflow-hidden"
        open={isDetailedOpen}
        onToggle={(e) => setIsDetailedOpen(e.currentTarget.open)}
      >
        <summary className="flex items-center justify-between p-4 cursor-pointer text-lg font-bold hover:bg-gray-ui transition-colors">
          <span>Descripción Detallada</span>
          <span
            className={`material-symbols-outlined transition-transform ${
              isDetailedOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </summary>
        <div className="p-4 border-t border-gray-border space-y-3 text-text-secondary-light">
          <p className="whitespace-pre-line">{detailedDescription}</p>
        </div>
      </details>

      {/* Información Legal */}
      <details
        className="rounded-lg border border-gray-border overflow-hidden"
        open={isLegalOpen}
        onToggle={(e) => setIsLegalOpen(e.currentTarget.open)}
      >
        <summary className="flex items-center justify-between p-4 cursor-pointer text-lg font-bold hover:bg-gray-ui transition-colors">
          <span>Información Legal</span>
          <span
            className={`material-symbols-outlined transition-transform ${
              isLegalOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </summary>
        <div className="p-4 border-t border-gray-border space-y-3 text-text-secondary-light">
          <p className="whitespace-pre-line">{legalInfo}</p>
        </div>
      </details>
    </div>
  )
}

export default PropertyDescription
