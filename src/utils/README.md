# Utilidades para Property Labels

Este archivo contiene funciones helper para convertir los valores de la API (como `'el_peral'`, `'godoy_cruz'`, etc.) a sus labels legibles (como `'El Peral'`, `'Godoy Cruz'`, etc.).

## Uso básico

```typescript
import {
  getPropertyTypeLabel,
  getConditionLabel,
  getDepartmentLabel,
  getLocalityLabel,
  getCurrencyLabel,
  formatPrice,
} from '@/utils/propertyLabels'

// Ejemplo: Transformar datos de la API
const property = {
  classification: {
    type: 'casa',
    condition: 'venta'
  },
  ubication: {
    department: 'godoy_cruz',
    locality: 'el_peral'
  },
  caracteristics: {
    price: 250000,
    currency: 'usd'
  }
}

// Obtener labels legibles
const typeLabel = getPropertyTypeLabel(property.classification.type)
// → 'Casa'

const conditionLabel = getConditionLabel(property.classification.condition)
// → 'Venta'

const departmentLabel = getDepartmentLabel(property.ubication.department)
// → 'Godoy Cruz'

const localityLabel = getLocalityLabel(property.ubication.locality)
// → 'El Peral'

const priceFormatted = formatPrice(
  property.caracteristics.price,
  property.caracteristics.currency
)
// → 'USD 250.000'
```

## Funciones disponibles

### Clasificación
- `getPropertyTypeLabel(value)` - Tipo de propiedad (casa, departamento, lote, etc.)
- `getConditionLabel(value)` - Condición (venta, alquiler, alquiler_temporario, permuta)

### Ubicación
- `getDepartmentLabel(value)` - Departamento de Mendoza
- `getLocalityLabel(value)` - Localidad/zona
- `getLocationPrivacyLabel(value)` - Privacidad de ubicación (exact, approximate, hidden)

### Características
- `getCurrencyLabel(value)` - Moneda (usd, ars)
- `getConservationStatusLabel(value)` - Estado de conservación
- `getOrientationLabel(value)` - Orientación (norte, sur, este, oeste, etc.)
- `getGarageTypeLabel(value)` - Tipo de cochera (cubierta, descubierta, semicubierta)
- `getFurnishedLabel(value)` - Amoblado (si, no)
- `getAntiguedadLabel(value)` - Antigüedad

### Amenities
- `getAmenityServiceLabel(value)` - Servicios (aire_acondicionado, piscina, etc.)
- `getAmenityEnvironmentLabel(value)` - Ambientes (balcon, terraza, etc.)
- `getAmenityNearbyZoneLabel(value)` - Zonas cercanas (supermercados, escuelas, etc.)

### Otros
- `getAccessLabel(value)` - Tipo de acceso (asfalto, tierra, ripio, etc.)
- `getDisposicionLabel(value)` - Disposición (contrafrente, frente, interno, lateral)
- `getDisposicionLoteLabel(value)` - Disposición del lote
- `getAccesoCocheraLabel(value)` - Acceso a cochera
- `getTipoCampoLabel(value)` - Tipo de campo
- `getCheckinTimeLabel(value)` - Hora de check-in

### Utilidades
- `formatPrice(amount, currency)` - Formatea un precio con su moneda
- `getMultipleLabels(values, getLabelFn)` - Convierte múltiples valores a labels
- `capitalizeWords(text)` - Capitaliza la primera letra de cada palabra

## Ejemplo completo en un componente

```typescript
import {
  getPropertyTypeLabel,
  getConditionLabel,
  getDepartmentLabel,
  getLocalityLabel,
  formatPrice,
} from '@/utils/propertyLabels'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Construir el título
  const title = `${getPropertyTypeLabel(property.classification.type)} en ${getConditionLabel(property.classification.condition)}`

  // Construir la ubicación
  const location = `${getLocalityLabel(property.ubication.locality)}, ${getDepartmentLabel(property.ubication.department)}`

  // Formatear el precio
  const price = formatPrice(
    property.caracteristics.price,
    property.caracteristics.currency
  )

  return (
    <div>
      <h3>{title}</h3>
      <p>{location}</p>
      <p>{price}</p>
    </div>
  )
}
```

## Notas importantes

1. **Fallback**: Si no se encuentra un label para un valor, la función devuelve el valor original
2. **Case insensitive**: Los valores deben coincidir exactamente con los definidos en `propertyLabels.ts`
3. **Importación**: Todas las funciones se importan desde `@/utils/propertyLabels`
