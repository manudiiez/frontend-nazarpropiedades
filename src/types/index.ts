export interface Property {
  id: string
  title: string
  location: string
  neighborhood?: string
  price: number
  currency?: string
  bedrooms: number
  bathrooms: number
  area: number
  coveredArea?: number
  garages?: number
  garageType?: string
  image: string
  type: String
  condition: String
  features?: string[]
  barrioPrivado?: string
  orientation?: string
  petFriendly?: boolean
}

export interface PropertyDetail extends Property {
  images: string[]
  fullAddress: string
  description: string
  detailedDescription: string
  legalInfo: string
  landArea?: number
  garages?: number
  yearBuilt?: number
  pricePerSqm?: number
  monthlyExpenses?: number
  annualTax?: number
  heating?: string
  cooling?: string
  flooring?: string
  windows?: string
  amenities?: string[]
  nearbyPlaces?: {
    schools?: string
    hospitals?: string
    shopping?: string
    parks?: string
    transport?: string
  }
  mapImage?: string
  videoUrl?: string
  agent?: Agent
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

export interface Agent {
  name: string
  role: string
  photo: string
  phone?: string
  email?: string
}
