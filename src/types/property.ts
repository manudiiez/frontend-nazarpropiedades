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
    lat?: number;
    lng?: number;
    latitude?: number;
    longitude?: number;
    [key: string]: any;
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
  landArea?: number; // Campo importante para Mercado Libre (puede ser alias de terrainArea)
  frontMeters?: number;
  depthMeters?: number;
  deepMeters?: number; // Alias para depthMeters (retrocompatibilidad)
  balconyArea?: number;

  // Campos adicionales de la API
  orientation?: "norte" | "sur" | "este" | "oeste";
  antiquity?: string; // Valores como "a_estrenar", "1_ano", "2_anos", etc.
  conservationStatus?: "excelente" | "muy_bueno" | "bueno" | "regular";
  pricePerSquareMeterArs?: number;
  pricePerSquareMeterUsd?: number;

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
  landArea?: number; // Campo importante para Mercado Libre
  frontMeters?: number;
  depthMeters?: number;
  deepMeters?: number; // Alias para depthMeters (retrocompatibilidad)
  balconyArea?: number;
  floor?: number;
  totalFloors?: number;
  unitsPerFloor?: number;
  hasExpenses?: "Si" | "No";
  floors?: number;

  // Campos adicionales de caracteristics
  orientation?: "norte" | "sur" | "este" | "oeste";
  antiquity?: string; // Valores como "a_estrenar", "1_ano", "2_anos", etc.
  conservationStatus?: "excelente" | "muy_bueno" | "bueno" | "regular";
  pricePerSquareMeterArs?: number;
  pricePerSquareMeterUsd?: number;
}

// Interfaz para campos extra (específicos para integraciones como Mercado Libre)
export interface Extra {
  bauleras?: number;
  numeroCasa?: string;
  pisoDepartamento?: number;
  acceso?: "Tierra" | "Arena" | "Asfalto" | "Otro" | "Ripio";
  guests?: number;
  minimumStay?: number;
  camas?: number;
  checkinTime?: string;
  checkoutTime?: string;
  pisosEdificio?: number;
  departamentosPorPiso?: number;
  superficieBalcon?: number;
  disposicion?: "contrafrente" | "frente" | "interno" | "lateral";
  disposicionTerreno?: "otro" | "perimetral" | "a_rio" | "a_laguna" | "interno";
  formaTerreno?: "regular" | "irregular" | "plano";
  tipoCampo?: "otro" | "fruticola" | "agricola" | "chacra" | "criadero" | "tambero" | "floricultura" | "forestal" | "ganadero" | "haras";
  accesoCochera?: "rampa_fija" | "rampa_movil" | "ascensor" | "horizontal";
  tipoCochera?: "fija" | "movil";
  tipoCoverturaCochera?: "semi_cubierta" | "cubierta" | "descubierta";
  alturaDeposito?: number;
  banosPiso?: number;
  cantidadOficinas?: number;
}

export interface Environments {
  // Espacios (según propertyReadyType.ts)
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  garageType?: "garage" | "garage_cochera" | "garage_doble" | "cochera_pasante" | "sin_cochera";
  plantas?: number; // Número de plantas/pisos
  ambientes?: number; // Número de ambientes
  furnished?: "si" | "no" | boolean; // API usa "si"/"no" pero soportamos boolean para retrocompatibilidad

  // Legacy: Espacios adicionales (para retrocompatibilidad)
  toilets?: number;
  rooms?: number;
  livingRooms?: number;
  diningRooms?: number;
  kitchens?: number;

  // Legacy: Estado y características (para retrocompatibilidad)
  age?: number;
  constructionYear?: number;
  condition?:
    | "excelente"
    | "muy-bueno"
    | "bueno"
    | "a-refaccionar"
    | "a-estrenar";
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
  // Campos especiales de la API (nuevo formato)
  mascotas?: "Si" | "No";
  barrioPrivado?: "si" | "no" | "semi_privado";
  agua?: "Si" | "No";
  cloacas?: "Si" | "No";
  gas?: "Si" | "No";
  luz?: "Si" | "No";
  estrellas?: number;

  // Arrays de servicios, ambientes y zonas cercanas (nuevo formato)
  servicios?: string[]; // Array de servicios: ['aire_acondicionado', 'financiacion', 'piscina', etc.]
  ambientes?: string[]; // Array de ambientes: ['parrilla', 'balcon', 'patio', 'gimnasio', etc.]
  zonasCercanas?: string[]; // Array de zonas cercanas: ['colegios', 'hospitales', 'shopping', etc.]

  // Legacy: para retrocompatibilidad con código existente
  services?: string[];
  nearBy?: string[];

  // Legacy: Servicios básicos (boolean)
  water?: boolean;
  electricity?: boolean;
  sewer?: boolean;
  phone?: boolean;
  internet?: boolean;

  // Legacy: Climatización
  airConditioning?: boolean;
  heating?: boolean;
  centralHeating?: boolean;

  // Legacy: Seguridad
  security24h?: boolean;
  alarm?: boolean;
  cameras?: boolean;
  gatedCommunity?: boolean;

  // Legacy: Espacios comunes
  pool?: boolean;
  gym?: boolean;
  sauna?: boolean;
  jacuzzi?: boolean;
  playroom?: boolean;
  grill?: boolean;
  garden?: boolean;
  terrace?: boolean;
  balcony?: boolean;

  // Legacy: Otros
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

  // Campos extra (para integraciones como Mercado Libre)
  extra?: Extra;

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
  aiContent?: {
    description?: string;
  };
}
