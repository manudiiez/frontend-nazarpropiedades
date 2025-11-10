// Utilidades para convertir valores de la API a labels legibles

import {
  conditionOptions,
  accessOptions,
  disposicionOptions,
  disposicionLoteOptions,
  accesoCocheraOptions,
  tipoCampoOptions,
  currencyOptions,
  conservationStatusOptions,
  orientationOptions,
  garageTypeOptions,
  locationPrivacyOptions,
  furnishedOptions,
  checkinTimeOptions,
  antiguedadOptions,
  amenityServicesOptions,
  amenityEnvironmentsOptions,
  amenityNearbyZonesOptions,
  departmentOptions,
  localityOptions,
  tiposPropiedad,
} from '@/data/propertyLabels'

// Función genérica para buscar un label por value
function findLabel(options: Array<{ label: string; value: string }>, value: string): string {
  const option = options.find(opt => opt.value === value)
  return option?.label || value // Si no encuentra, devuelve el value original
}

// === Funciones específicas para cada tipo ===

/**
 * Convierte el valor de condición a su label
 * @example getConditionLabel('venta') // 'Venta'
 * @example getConditionLabel('alquiler_temporario') // 'Alquiler Temporario'
 */
export function getConditionLabel(value: string): string {
  return findLabel(conditionOptions, value)
}

/**
 * Convierte el valor de acceso a su label
 * @example getAccessLabel('asfalto') // 'Asfalto'
 */
export function getAccessLabel(value: string): string {
  return findLabel(accessOptions, value)
}

/**
 * Convierte el valor de disposición a su label
 * @example getDisposicionLabel('contrafrente') // 'Contrafrente'
 */
export function getDisposicionLabel(value: string): string {
  return findLabel(disposicionOptions, value)
}

/**
 * Convierte el valor de disposición de lote a su label
 * @example getDisposicionLoteLabel('a_rio') // 'A río'
 */
export function getDisposicionLoteLabel(value: string): string {
  return findLabel(disposicionLoteOptions, value)
}

/**
 * Convierte el valor de acceso a cochera a su label
 * @example getAccesoCocheraLabel('rampa_fija') // 'Rampa fija'
 */
export function getAccesoCocheraLabel(value: string): string {
  return findLabel(accesoCocheraOptions, value)
}

/**
 * Convierte el valor de tipo de campo a su label
 * @example getTipoCampoLabel('agricola') // 'Agrícola'
 */
export function getTipoCampoLabel(value: string): string {
  return findLabel(tipoCampoOptions, value)
}

/**
 * Convierte el valor de moneda a su label
 * @example getCurrencyLabel('usd') // 'Dólares'
 * @example getCurrencyLabel('ars') // 'Pesos argentinos'
 */
export function getCurrencyLabel(value: string): string {
  return findLabel(currencyOptions, value)
}

/**
 * Convierte el valor de estado de conservación a su label
 * @example getConservationStatusLabel('excelente') // 'Excelente'
 */
export function getConservationStatusLabel(value: string): string {
  return findLabel(conservationStatusOptions, value)
}

/**
 * Convierte el valor de orientación a su label
 * @example getOrientationLabel('norte') // 'Norte'
 * @example getOrientationLabel('noreste') // 'Noreste'
 */
export function getOrientationLabel(value: string): string {
  return findLabel(orientationOptions, value)
}

/**
 * Convierte el valor de tipo de cochera a su label
 * @example getGarageTypeLabel('cubierta') // 'Cubierta'
 */
export function getGarageTypeLabel(value: string): string {
  return findLabel(garageTypeOptions, value)
}

/**
 * Convierte el valor de privacidad de ubicación a su label
 * @example getLocationPrivacyLabel('exact') // 'Ubicación exacta'
 * @example getLocationPrivacyLabel('approximate') // 'Ubicación aproximada'
 */
export function getLocationPrivacyLabel(value: string): string {
  return findLabel(locationPrivacyOptions, value)
}

/**
 * Convierte el valor de amoblado a su label
 * @example getFurnishedLabel('si') // 'Sí'
 * @example getFurnishedLabel('no') // 'No'
 */
export function getFurnishedLabel(value: string): string {
  return findLabel(furnishedOptions, value)
}

/**
 * Convierte el valor de hora de checkin a su label
 * @example getCheckinTimeLabel('14_00') // '14:00'
 */
export function getCheckinTimeLabel(value: string): string {
  return findLabel(checkinTimeOptions, value)
}

/**
 * Convierte el valor de antigüedad a su label
 * @example getAntiguedadLabel('a_estrenar') // 'A estrenar'
 * @example getAntiguedadLabel('5_10_anos') // '5 a 10 años'
 */
export function getAntiguedadLabel(value: string): string {
  return findLabel(antiguedadOptions, value)
}

/**
 * Convierte el valor de servicio/amenity a su label
 * @example getAmenityServiceLabel('aire_acondicionado') // 'Aire acondicionado'
 */
export function getAmenityServiceLabel(value: string): string {
  return findLabel(amenityServicesOptions, value)
}

/**
 * Convierte el valor de ambiente/amenity a su label
 * @example getAmenityEnvironmentLabel('balcon') // 'Balcón'
 */
export function getAmenityEnvironmentLabel(value: string): string {
  return findLabel(amenityEnvironmentsOptions, value)
}

/**
 * Convierte el valor de zona cercana a su label
 * @example getAmenityNearbyZoneLabel('supermercados') // 'Supermercados'
 */
export function getAmenityNearbyZoneLabel(value: string): string {
  return findLabel(amenityNearbyZonesOptions, value)
}

/**
 * Convierte el valor de departamento a su label
 * @example getDepartmentLabel('godoy_cruz') // 'Godoy Cruz'
 * @example getDepartmentLabel('capital') // 'Capital'
 */
export function getDepartmentLabel(value: string): string {
  return findLabel(departmentOptions, value)
}

/**
 * Convierte el valor de localidad a su label
 * @example getLocalityLabel('el_peral') // 'El Peral'
 * @example getLocalityLabel('godoy_cruz_city') // 'Godoy Cruz (Ciudad)'
 */
export function getLocalityLabel(value: string): string {
  return findLabel(localityOptions, value)
}

/**
 * Convierte el valor de tipo de propiedad a su label
 * @example getPropertyTypeLabel('casa') // 'Casa'
 * @example getPropertyTypeLabel('departamento') // 'Departamento'
 * @example getPropertyTypeLabel('bodega_con_vinedo') // 'Bodega con Viñedo'
 */
export function getPropertyTypeLabel(value: string): string {
  return findLabel(tiposPropiedad, value)
}

// === Funciones de utilidad adicionales ===

/**
 * Convierte múltiples valores a labels separados por comas
 * @example getMultipleLabels(['norte', 'sur'], getOrientationLabel) // 'Norte, Sur'
 */
export function getMultipleLabels(
  values: string[],
  getLabelFn: (value: string) => string
): string {
  return values.map(getLabelFn).join(', ')
}

/**
 * Formatea un precio con su moneda
 * @example formatPrice(250000, 'usd') // 'USD 250.000'
 * @example formatPrice(500000, 'ars') // 'ARS 500.000'
 */
export function formatPrice(amount: number, currency: string): string {
  const currencySymbol = currency.toUpperCase()
  const formattedAmount = amount.toLocaleString('es-AR')
  return `${currencySymbol} ${formattedAmount}`
}

/**
 * Capitaliza la primera letra de cada palabra
 * @example capitalizeWords('casa en venta') // 'Casa En Venta'
 */
export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
