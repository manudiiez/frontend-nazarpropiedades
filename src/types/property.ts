// Tipos completos para las propiedades basados en Payload CMS
export interface PropertyImage {
  id: number;
  title?: string;
  url: string;
  alt?: string;
  coverImage?: {
    sizes?: {
      thumbnail?: {
        url?: string;
      };
    };
  };
  imagenesExtra?: Array<{
    url?: string;
  }>;
}
export interface Classification {
  type: string; // 'casa' | 'departamento' | 'terreno' | 'local' | etc
  condition: string; // 'venta' | 'alquiler' | 'temporario'
}

export interface Ubication {
  province?: string;
  department?: string;
  locality?: string;
  neighborhood?: string;
  address: string;
  mapLocation?: {
    lat: number;
    lng: number;
  };
  locationPrivacy?: "exact" | "approximate" | "hidden";
  approximateRadius?: number;
}

export interface Caracteristics {
  price: number;
  currency: "usd" | "ars";
  hasExpenses?: "Si" | "No";
  expenses?: number;
  expensesCurrency?: "usd" | "ars";
  appraisal?: number;
  appraisalCurrency?: "usd" | "ars";
  totalArea?: number;
  coveredArea?: number;
  uncoveredArea?: number;
  terrainArea?: number;
  frontMeters?: number;
  depthMeters?: number;
  balconyArea?: number;

  // Para departamentos/edificios
  floor?: number;
  totalFloors?: number;
  unitsPerFloor?: number;

  // Para casas/lotes
  floors?: number;
}

// Interfaz para medidas (separada para retrocompatibilidad)
export interface Measures {
  totalArea?: number;
  coveredArea?: number;
  uncoveredArea?: number;
  terrainArea?: number;
  frontMeters?: number;
  depthMeters?: number;
  balconyArea?: number;
  floor?: number;
  totalFloors?: number;
  unitsPerFloor?: number;
  floors?: number;
}

export interface Environments {
  // Espacios
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  rooms?: number;
  livingRooms?: number;
  diningRooms?: number;
  kitchens?: number;

  // Estacionamiento
  garages?: number;
  garageType?: "cubierta" | "descubierta" | "semicubierta";

  // Estado y características
  age?: number;
  constructionYear?: number;
  condition?:
    | "excelente"
    | "muy-bueno"
    | "bueno"
    | "a-refaccionar"
    | "a-estrenar";
  furnished?: boolean;
  orientation?:
    | "norte"
    | "sur"
    | "este"
    | "oeste"
    | "noreste"
    | "noroeste"
    | "sureste"
    | "suroeste";
}

// Alias para retrocompatibilidad
export type Features = Environments;

export interface Amenities {
  // Campos especiales de la API
  barrioPrivado?: string; // 'si' | 'no' | 'semiprivado'
  services?: string[]; // Array de servicios: ['financiacion', 'aceptaHipoteca', 'recibePermuta', etc.]
  nearBy?: string[]; // Array de lugares cercanos

  // Servicios básicos
  gas?: boolean;
  water?: boolean;
  electricity?: boolean;
  sewer?: boolean;
  phone?: boolean;
  internet?: boolean;

  // Climatización
  airConditioning?: boolean;
  heating?: boolean;
  centralHeating?: boolean;

  // Seguridad
  security24h?: boolean;
  alarm?: boolean;
  cameras?: boolean;
  gatedCommunity?: boolean;

  // Espacios comunes
  pool?: boolean;
  gym?: boolean;
  sauna?: boolean;
  jacuzzi?: boolean;
  playroom?: boolean;
  grill?: boolean;
  garden?: boolean;
  terrace?: boolean;
  balcony?: boolean;

  // Otros
  elevator?: boolean;
  laundry?: boolean;
  storage?: boolean;
  petFriendly?: boolean;
  accessibility?: boolean;
}

export interface NearbyPlaces {
  schools?: string[];
  universities?: string[];
  hospitals?: string[];
  supermarkets?: string[];
  shopping?: string[];
  parks?: string[];
  publicTransport?: string[];
  other?: string[];
}

export interface Agent {
  name: string;
  role?: string;
  phone: string;
  email?: string;
  photo?: string;
}

export interface Property {
  id: number | string;
  title: string;
  status?: "borrador" | "activa" | "reservada" | "terminada";

  // Clasificación
  classification: Classification;

  // Ubicación
  ubication: Ubication;

  // Características (incluye precio)
  caracteristics: Caracteristics;

  // Medidas (opcional, para retrocompatibilidad)
  measures?: Measures;

  // Características adicionales (opcionales según tipo)
  environments?: Environments;

  // Alias para retrocompatibilidad con código existente
  features?: Features;

  // Amenities (opcionales)
  amenities?: Amenities;

  // Descripción e imágenes
  description?: string;
  images: any;

  // Lugares cercanos (opcional)
  nearbyPlaces?: NearbyPlaces;

  // Agente responsable
  agent?: Agent;

  // Metadata
  createdAt?: string;
  updatedAt?: string;
}
