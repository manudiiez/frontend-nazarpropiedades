'use client'

import { useEffect, useRef, useState } from 'react'

interface DualRangeSliderProps {
  min: number
  max: number
  valueMin: number
  valueMax: number
  step?: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
  label?: string
  formatValue?: (value: number) => string
}

const DualRangeSlider = ({
  min,
  max,
  valueMin,
  valueMax,
  step = 1,
  onMinChange,
  onMaxChange,
  label,
  formatValue = (val) => val.toString(),
}: DualRangeSliderProps) => {
  const [isDraggingMin, setIsDraggingMin] = useState(false)
  const [isDraggingMax, setIsDraggingMax] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }

  const handleMouseDown = (isMin: boolean) => {
    if (isMin) {
      setIsDraggingMin(true)
    } else {
      setIsDraggingMax(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderRef.current || (!isDraggingMin && !isDraggingMax)) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const value = Math.round((percentage / 100) * (max - min) + min)
    const steppedValue = Math.round(value / step) * step

    if (isDraggingMin) {
      const newValue = Math.min(steppedValue, valueMax)
      onMinChange(newValue)
    } else if (isDraggingMax) {
      const newValue = Math.max(steppedValue, valueMin)
      onMaxChange(newValue)
    }
  }

  const handleMouseUp = () => {
    setIsDraggingMin(false)
    setIsDraggingMax(false)
  }

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDraggingMin, isDraggingMax, valueMin, valueMax])

  const minPercent = getPercentage(valueMin)
  const maxPercent = getPercentage(valueMax)

  // Determinar el display para mínimo y máximo
  const formattedMin = formatValue(valueMin)
  const formattedMax = formatValue(valueMax)

  const displayMin = formattedMin
  // Si el valor máximo está en el extremo y NO tiene "+" o "Más" ya incluido, agregar " o Más"
  const displayMax = valueMax >= max && !formattedMax.includes('+') && !formattedMax.includes('Más')
    ? `${formattedMax} o Más`
    : formattedMax

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">{label}</label>
          <span className="text-sm font-medium text-accent">
            {displayMin} - {displayMax}
          </span>
        </div>
      )}

      <div className="relative py-2">
        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-lg cursor-pointer"
        >
          {/* Active Range */}
          <div
            className="absolute h-full bg-accent rounded-lg"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          {/* Min Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-accent rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform z-10"
            style={{ left: `${minPercent}%`, marginLeft: '-8px' }}
            onMouseDown={() => handleMouseDown(true)}
          />

          {/* Max Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-accent rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform z-10"
            style={{ left: `${maxPercent}%`, marginLeft: '-8px' }}
            onMouseDown={() => handleMouseDown(false)}
          />
        </div>

        {/* Min/Max Labels */}
        <div className="flex justify-between text-xs text-text-secondary-light mt-2">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  )
}

export default DualRangeSlider
