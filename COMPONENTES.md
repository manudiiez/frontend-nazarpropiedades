# Estructura de Componentes React - Nazar Propiedades

Este documento describe la estructura de componentes React creados para la aplicación de Next.js de Nazar Propiedades.

## Estructura de Archivos

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal con fuentes y metadata
│   │   ├── page.tsx             # Página principal (Home)
│   │   └── globals.css          # Estilos globales
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Barra de navegación con dropdown
│   │   │   ├── Footer.tsx       # Pie de página
│   │   │   └── WhatsAppButton.tsx # Botón flotante de WhatsApp
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx  # Sección hero con búsqueda
│   │   │   ├── PropertyCarousel.tsx # Carrusel de propiedades
│   │   │   ├── ServicesSection.tsx  # Sección de servicios
│   │   │   ├── BenefitsStrip.tsx    # Franja de beneficios
│   │   │   └── CTASection.tsx       # Call to action
│   │   └── ui/
│   │       └── PropertyCard.tsx     # Tarjeta de propiedad reutilizable
│   ├── data/
│   │   └── properties.ts        # Datos de ejemplo de propiedades
│   └── types/
│       └── index.ts             # TypeScript interfaces
├── public/
│   └── imagenes/
│       └── brand.png            # (Agregar logo aquí)
└── tailwind.config.ts           # Configuración de Tailwind CSS
```

## Componentes Creados

### Layout Components

#### 1. **Navbar** (`components/layout/Navbar.tsx`)
- Componente de navegación principal
- Características:
  - Menú responsive con versión móvil
  - Dropdown "Inicio" con múltiples opciones
  - Efecto de scroll que añade sombra
  - Logo clickeable
  - Botón CTA "Publicar mi propiedad"

**Props:** Ninguna

**Estado:**
- `isScrolled`: Detecta scroll para añadir efectos
- `isMobileMenuOpen`: Controla menú móvil
- `isInicioOpen`: Controla dropdown en mobile

#### 2. **Footer** (`components/layout/Footer.tsx`)
- Pie de página con información de contacto
- Características:
  - Grid responsive (1-4 columnas)
  - Información de la empresa
  - Enlaces de navegación
  - Datos de contacto con iconos
  - Links legales

**Props:** Ninguna

#### 3. **WhatsAppButton** (`components/layout/WhatsAppButton.tsx`)
- Botón flotante de WhatsApp
- Características:
  - Posición fija en esquina inferior derecha
  - Animación de pulse continua
  - Hover effect (scale)
  - Link directo a WhatsApp con mensaje predefinido
  - SVG icon integrado

**Props:** Ninguna

### Section Components

#### 4. **HeroSection** (`components/sections/HeroSection.tsx`)
- Sección hero principal con búsqueda
- Características:
  - Título destacado con decoración roja
  - Barra de búsqueda integrada
  - Filtros de tipo y condición
  - Fondo con imagen en baja opacidad
  - Responsive en todos los tamaños

**Props:** Ninguna

**Estado:**
- `searchTerm`: Estado del campo de búsqueda

#### 5. **PropertyCarousel** (`components/sections/PropertyCarousel.tsx`)
- Carrusel de propiedades con navegación
- Características:
  - Muestra 3 propiedades por slide
  - Navegación con botones prev/next
  - Indicadores de dots
  - Auto-play cada 5 segundos
  - Transiciones suaves
  - Responsive (1-3 columnas)

**Props:**
```typescript
{
  title: string          // Título de la sección
  subtitle: string       // Subtítulo descriptivo
  properties: Property[] // Array de propiedades a mostrar
}
```

**Estado:**
- `currentSlide`: Índice del slide actual

#### 6. **ServicesSection** (`components/sections/ServicesSection.tsx`)
- Sección de servicios de la inmobiliaria
- Características:
  - Grid de 3 servicios
  - Iconos Material Symbols
  - Cards con hover effect
  - Responsive (1-3 columnas)

**Props:** Ninguna

**Servicios incluidos:**
- Experiencia Local
- Servicio Confiable
- Atención Personalizada

#### 7. **BenefitsStrip** (`components/sections/BenefitsStrip.tsx`)
- Franja de beneficios/estadísticas
- Características:
  - Grid de 4 beneficios
  - Iconos Material Symbols
  - Responsive (2-4 columnas)

**Props:** Ninguna

**Beneficios incluidos:**
- +100 clientes
- Gestión ágil
- Confianza sólida
- +100 propiedades

#### 8. **CTASection** (`components/sections/CTASection.tsx`)
- Call to Action final
- Características:
  - Título grande y llamativo
  - Descripción del servicio
  - Botón CTA prominente
  - Centrado en la página

**Props:** Ninguna

### UI Components

#### 9. **PropertyCard** (`components/ui/PropertyCard.tsx`)
- Tarjeta de propiedad reutilizable
- Características:
  - Imagen responsive con Next.js Image
  - Precio formateado
  - Tipo y condición de propiedad
  - Ubicación
  - Íconos para habitaciones, baños y área
  - Hover effect (shadow)

**Props:**
```typescript
{
  property: Property  // Objeto con datos de la propiedad
}
```

## Types/Interfaces

### Property
```typescript
interface Property {
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
```

### Service
```typescript
interface Service {
  icon: string
  title: string
  description: string
}
```

### Benefit
```typescript
interface Benefit {
  icon: string
  title: string
  subtitle: string
}
```

## Datos de Ejemplo

Los datos de ejemplo están en `src/data/properties.ts`:
- `featuredProperties`: 6 propiedades destacadas
- `recentProperties`: 3 propiedades recientes

Puedes modificar estos arrays o conectarlos a una API.

## Configuración de Tailwind

El archivo `tailwind.config.ts` incluye:

### Colores Personalizados
- `primary`: #1f2937
- `accent`: #d90429
- `accent-red`: #CC3333
- `primary-red`: #E10600
- `gray-ui`: #F5F6F7
- Y más...

### Animaciones
- `pulse-whatsapp`: Para el botón de WhatsApp

### Max Width
- `container`: 1280px

## Fuentes

- **Manrope**: Fuente principal (pesos: 400, 500, 600, 700, 800)
- **Material Symbols Outlined**: Para iconos

## Cómo Usar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Agregar el logo
Coloca tu logo en `public/imagenes/brand.png`

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

### 4. Personalizar

#### Modificar propiedades:
Edita `src/data/properties.ts`

#### Modificar colores:
Edita `tailwind.config.ts`

#### Cambiar número de WhatsApp:
Edita el componente `WhatsAppButton.tsx` (línea 4)

#### Agregar nuevas secciones:
Crea nuevos componentes en `src/components/sections/`

## Características de Next.js Utilizadas

- **App Router**: Estructura moderna de Next.js
- **Server Components**: Por defecto (excepto los que tienen 'use client')
- **Client Components**: Marcados con 'use client' para interactividad
- **Next.js Image**: Para optimización automática de imágenes
- **TypeScript**: Tipado completo en toda la aplicación
- **Tailwind CSS v4**: Para estilos utility-first

## Mejoras Futuras Sugeridas

1. **API Integration**: Conectar con backend para propiedades dinámicas
2. **Formularios**: Implementar formularios de contacto funcionales
3. **Búsqueda Avanzada**: Implementar lógica de filtrado real
4. **SEO**: Agregar metadata dinámica por página
5. **Analytics**: Integrar Google Analytics o similar
6. **Performance**: Lazy loading para imágenes y componentes
7. **Accesibilidad**: Mejorar a11y con ARIA labels
8. **Tests**: Agregar tests unitarios y de integración

## Notas Importantes

- Los componentes con interactividad (state, eventos) usan `'use client'`
- Las imágenes usan URLs de ejemplo, reemplázalas con tus propias imágenes
- El logo debe estar en `public/imagenes/brand.png`
- Todos los componentes son responsive y mobile-first
- Los estilos siguen la convención de Tailwind CSS
