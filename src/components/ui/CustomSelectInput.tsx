'use client'

import { useState, useRef, useEffect } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface CustomSelectInputProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  containerClassName?: string
  buttonClassName?: string
  dropdownClassName?: string
  optionClassName?: string
  selectedOptionClassName?: string
  labelClassName?: string
  iconClassName?: string
  error?: string
  errorClassName?: string
}

const CustomSelectInput = ({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  label,
  disabled = false,
  className = '',
  containerClassName = '',
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  selectedOptionClassName = '',
  labelClassName = '',
  iconClassName = '',
  error,
  errorClassName = '',
}: CustomSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Encontrar la opción seleccionada
  const selectedOption = options.find((opt) => opt.value === value)

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`relative ${containerClassName}`} ref={containerRef}>
      {/* Label */}
      {label && (
        <label
          className={`block text-sm font-medium mb-2 ${labelClassName}`}
        >
          {label}
        </label>
      )}

      {/* Select Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-1
          text-left bg-white border border-gray-300 rounded-lg
          hover:border-gray-400 focus:outline-none focus:ring-2
          focus:ring-accent focus:border-accent
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${buttonClassName}
          ${className}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={
            selectedOption ? 'text-gray-900' : 'text-gray-500'
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Icon */}
        <span
          className={`material-symbols-outlined transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${iconClassName}`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute z-50 w-full mt-2
            bg-white border border-gray-300 rounded-lg
            shadow-lg max-h-60 overflow-auto
            ${dropdownClassName}
          `}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-4 py-2.5 text-left
                  hover:bg-gray-100 transition-colors
                  flex items-center justify-between
                  ${isSelected ? 'bg-accent/10 text-accent font-medium' : 'text-gray-900'}
                  ${isSelected ? selectedOptionClassName : optionClassName}
                `}
                role="option"
                aria-selected={isSelected}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-accent">
                    check
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className={`mt-1 text-sm text-red-500 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default CustomSelectInput
