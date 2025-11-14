export interface PropertyTypeOption {
  value: string
  label: string
}

export const propertyTypes: PropertyTypeOption[] = [
  { value: 'any', label: 'Cualquiera' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'lote', label: 'Lote' },
  { value: 'bodega', label: 'Bodega' },
  { value: 'bodega_con_vinedo', label: 'Bodega con Viñedo' },
  { value: 'cabaña', label: 'Cabaña' },
  { value: 'campo', label: 'Campo' },
  { value: 'chalet', label: 'Chalet' },
  { value: 'cochera', label: 'Cochera' },
  { value: 'condominio', label: 'Condominio' },
  { value: 'deposito', label: 'Depósito' },
  { value: 'duplex', label: 'Dúplex' },
  { value: 'edificio', label: 'Edificio' },
  { value: 'estacion_de_servicio', label: 'Estación de Servicio' },
  { value: 'fábrica', label: 'Fábrica' },
  { value: 'finca', label: 'Finca' },
  { value: 'fondo_de_comercio', label: 'Fondo de Comercio' },
  { value: 'fraccionamiento', label: 'Fraccionamiento' },
  { value: 'galpon', label: 'Galpón' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'industria', label: 'Industria' },
  { value: 'local_comercial', label: 'Local Comercial' },
  { value: 'loft', label: 'Loft' },
  { value: 'loteo', label: 'Loteo' },
  { value: 'negocio', label: 'Negocio' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'ph', label: 'PH (Propiedad Horizontal)' },
  { value: 'piso', label: 'Piso' },
  { value: 'playa_de_estacionamiento', label: 'Playa de Estacionamiento' },
  { value: 'quinta', label: 'Quinta' },
  { value: 'semipiso', label: 'Semipiso' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'triplex', label: 'Triplex' },
  { value: 'vinedo', label: 'Viñedo' },
]

export const conditionTypes: PropertyTypeOption[] = [
  { value: 'any', label: 'Cualquiera' },
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'alquiler_temporario', label: 'Alquiler Temporario' },
  { value: 'permuta', label: 'Permuta' },
]
