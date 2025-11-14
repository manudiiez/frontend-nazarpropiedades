import ImageGallery from "@/components/property-detail/ImageGallery";
import PropertyHero from "@/components/property-detail/PropertyHero";
import PropertyDetails from "@/components/property-detail/PropertyDetails";
import ContactForm from "@/components/property-detail/ContactForm";
import RelatedProperties from "@/components/property-detail/RelatedProperties";
import type { Agent, Property } from "@/types/property";
import { notFound } from "next/navigation";
import { getDepartmentLabel, getLocalityLabel } from "@/utils/propertyLabels";

interface TransformedImage {
  id: number;
  title?: string;
  url: string;
}

const agent: Agent = {
  name: "Nazar Propiedades",
  phone: "+54 9 261 123-4567",
  email: "nazarpropiedades217@gmail.com"
}

// Función para obtener la propiedad desde la API
async function getProperty(id: string): Promise<Property | null> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

    if (!backendUri) {
      console.error("NEXT_PUBLIC_BACKEND_URI no está definido en .env");
      return null;
    }

    const url = `${backendUri}/propiedades/${id}`;
    console.log("Fetching property from:", url);

    const res = await fetch(url, {
      cache: "no-store", // Siempre obtener datos frescos
    });

    if (!res.ok) {
      console.error(`Error al obtener propiedad: ${res.status}`);
      return null;
    }

    const data: Property = await res.json();
    console.log("Fetched property data:", data);
    return data;
  } catch (error) {
    console.error("Error al hacer fetch de la propiedad:", error);
    return null;
  }
}

// Función para transformar las imágenes de la API al formato del componente
function transformImages(apiImages: any): TransformedImage[] {
  const images: TransformedImage[] = [];

  // Agregar la imagen de portada (coverImage) desde watermark
  if (apiImages?.coverImage?.sizes?.watermark?.url) {
    images.push({
      id: 0,
      url: apiImages.coverImage.sizes.watermark.url,
      title: apiImages.coverImage.filename || "Imagen de portada",
    });
  }

  // Agregar las imágenes de la galería desde watermark
  apiImages?.gallery?.forEach((img: any, index: number) => {
    if (img?.sizes?.watermark?.url) {
      images.push({
        id: index + 1,
        url: img.sizes.watermark.url,
        title: img.filename || `Imagen ${index + 1}`,
      });
    }
  });

  return images;
}

// Función para transformar propiedades relacionadas
function transformRelatedProperty(apiProperty: any) {
  // Construir la ubicación usando las mismas utilidades que el listado
  const locationParts = [
    getLocalityLabel(apiProperty.ubication?.locality || ""),
    getDepartmentLabel(apiProperty.ubication?.department || ""),
    apiProperty.ubication?.province,
  ].filter(Boolean);

  // Eliminar duplicados si locality y department son iguales
  if (locationParts[0] === locationParts[1]) {
    locationParts.splice(0, 1);
  }

  const location = locationParts.join(", ");

  return {
    id: apiProperty.id,
    title: apiProperty.title,
    location: location,
    price: apiProperty.caracteristics?.price || 0,
    currency: apiProperty.caracteristics?.currency?.toUpperCase() || "USD",
  };
}

// Función para obtener propiedades relacionadas
async function getRelatedProperties(currentId: string): Promise<any[]> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

    if (!backendUri) {
      return [];
    }

    // Obtener 3 propiedades aleatorias excluyendo la actual
    const url = `${backendUri}/propiedades?limit=3&where[id][not_equals]=${currentId}&sort=-createdAt`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    // Transformar las propiedades al formato esperado
    return (data.docs || []).map(transformRelatedProperty);
  } catch (error) {
    console.error("Error al obtener propiedades relacionadas:", error);
    return [];
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params (required in Next.js 15+)
  const { id } = await params;

  // Obtener la propiedad desde la API
  const property = await getProperty(id);
  console.log("Property detail page for ID:", id, property);
  // Si no se encuentra la propiedad, mostrar página 404
  if (!property) {
    notFound();
  }

  // Obtener propiedades relacionadas
  const relatedPropertiesData = await getRelatedProperties(id);

  // Transformar las imágenes al formato esperado por ImageGallery
  const transformedImages = transformImages(property.images);

  return (
    <main className="bg-gray-50 mt-20">
      {/* Image Gallery */}
      <ImageGallery images={transformedImages} />

      {/* Hero Section */}
      <PropertyHero
        title={property.title}
        classification={property.classification}
        ubication={property.ubication}
        caracteristics={property.caracteristics}
        features={property.environments}
        measures={property.caracteristics}
        amenities={property.amenities}
      />

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left column - Details */}
          <PropertyDetails
            description={property?.aiContent?.description}
            measures={property.caracteristics}
            features={property.environments}
            amenities={property.amenities}
            nearbyPlaces={property.nearbyPlaces}
            extra={property.extra}
          />

          {/* Right column - Contact Card */}
          <div className="lg:col-span-1">
            <ContactForm agent={agent} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white border border-gray-200 rounded-sm p-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Ubicación
          </h2>
          <div className="h-[300px] bg-gray-50 rounded-sm flex flex-col items-center justify-center border border-dashed border-gray-300">
            <span className="material-symbols-outlined text-gray-400 text-4xl mb-4">
              location_on
            </span>
            <div className="text-gray-600 text-sm">Mapa interactivo</div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <RelatedProperties properties={relatedPropertiesData} />
    </main>
  );
}
