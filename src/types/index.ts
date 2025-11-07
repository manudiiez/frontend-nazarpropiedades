export interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  type: 'Casa' | 'Apartamento' | 'Terreno' | 'Local'
  condition: 'Venta' | 'Alquiler'
  features?: string[]
}

export interface NavLink {
  label: string
  href: string
}

export interface Service {
  icon: string
  title: string
  description: string
}

export interface Benefit {
  icon: string
  title: string
  subtitle: string
}
