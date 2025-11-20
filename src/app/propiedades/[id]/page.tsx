import ImageGallery from "@/components/property-detail/ImageGallery";
import PropertyHero from "@/components/property-detail/PropertyHero";
import PropertyDetails from "@/components/property-detail/PropertyDetails";
import ContactForm from "@/components/property-detail/ContactForm";
import RelatedProperties from "@/components/property-detail/RelatedProperties";
import PropertyMap from "@/components/property-detail/PropertyMap";
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
  phone: "+54 9 261 419-7323",
  email: "nazarpropiedades217@gmail.com",
};

// Función para obtener la propiedad desde la API
async function getProperty(id: string): Promise<Property | null> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

    if (!backendUri) {
      console.error("NEXT_PUBLIC_BACKEND_URI no está definido en .env");
      return null;
    }

    const url = `${backendUri}/propiedades/${id}`;

    const res = await fetch(url, {
      cache: "no-store", // Siempre obtener datos frescos
    });

    if (!res.ok) {
      console.error(`Error al obtener propiedad: ${res.status}`);
      return null;
    }

    const data: Property = await res.json();
    return data;
  } catch (error) {
    console.error("Error al hacer fetch de la propiedad:", error);
    return null;
  }
}

// Función para transformar las imágenes de la API al formato del componente
function transformImages(apiImages: any): TransformedImage[] {
  const images: TransformedImage[] = [];

  // Verificar si hay imágenes en coverImage y gallery
  const hasCoverImage = apiImages?.coverImage?.sizes?.watermark?.url;
  const hasGallery = apiImages?.gallery && apiImages.gallery.length > 0;

  // Si hay coverImage o gallery, usar esas imágenes
  if (hasCoverImage || hasGallery) {
    // Agregar la imagen de portada (coverImage) desde watermark
    if (hasCoverImage) {
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
  } else {
    // Si no hay coverImage ni gallery, usar imagenesExtra
    apiImages?.imagenesExtra?.forEach((img: any, index: number) => {
      if (img?.url) {
        images.push({
          id: index,
          url: img.url,
          title: `Imagen ${index + 1}`,
        });
      }
    });
  }

  return images;
}

// Función para transformar las thumbnails de la API
function transformThumbnails(apiImages: any): TransformedImage[] {
  const thumbnails: TransformedImage[] = [];

  // Verificar si hay imágenes en coverImage y gallery
  const hasCoverImage = apiImages?.coverImage?.sizes?.thumbnail?.url;
  const hasGallery = apiImages?.gallery && apiImages.gallery.length > 0;

  // Si hay coverImage o gallery, usar esas imágenes
  if (hasCoverImage || hasGallery) {
    // Agregar la imagen de portada (coverImage) desde thumbnail
    if (hasCoverImage) {
      thumbnails.push({
        id: 0,
        url: apiImages.coverImage.sizes.thumbnail.url,
        title: apiImages.coverImage.filename || "Imagen de portada",
      });
    }

    // Agregar las imágenes de la galería desde thumbnail
    apiImages?.gallery?.forEach((img: any, index: number) => {
      if (img?.sizes?.thumbnail?.url) {
        thumbnails.push({
          id: index + 1,
          url: img.sizes.thumbnail.url,
          title: img.filename || `Imagen ${index + 1}`,
        });
      }
    });
  } else {
    // Si no hay coverImage ni gallery, usar imagenesExtra
    apiImages?.imagenesExtra?.forEach((img: any, index: number) => {
      if (img?.url) {
        thumbnails.push({
          id: index,
          url: img.url,
          title: `Imagen ${index + 1}`,
        });
      }
    });
  }

  return thumbnails;
}

// Función para transformar propiedades relacionadas
function transformRelatedProperty(apiProperty: any) {
  // Construir la ubicación usando las mismas utilidades que el listado
  const locationParts = [
    apiProperty.ubication?.neighborhood,
    getLocalityLabel(apiProperty.ubication?.locality || ""),
    getDepartmentLabel(apiProperty.ubication?.department || ""),
    apiProperty.ubication?.province,
  ].filter(Boolean);

  if (
    apiProperty.ubication.neighborhood &&
    locationParts[1] === locationParts[2]
  ) {
    locationParts.splice(1, 1);
  } else if (
    !apiProperty.ubication.neighborhood &&
    locationParts[0] === locationParts[1]
  ) {
    locationParts.splice(0, 1);
  }
  const location = locationParts.join(", ");

  // Obtener la imagen usando la misma lógica que en el listado
  const image =
    apiProperty.images?.coverImage?.sizes?.thumbnail?.url ||
    apiProperty.images?.imagenesExtra?.[0]?.url ||
    "/imagenes/home.jpg";

  return {
    id: apiProperty.id,
    title: `${apiProperty.classification.type} en ${apiProperty.classification.condition}`,
    location: location,
    price: apiProperty.caracteristics?.price || 0,
    currency: apiProperty.caracteristics?.currency?.toUpperCase() || "USD",
    image: image,
  };
}

// Función para obtener propiedades relacionadas
async function getRelatedProperties(
  currentId: string,
  type: string,
  condition: string,
  department: string
): Promise<any[]> {
  try {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

    if (!backendUri) {
      return [];
    }

    // Obtener 3 propiedades aleatorias excluyendo la actual
    const url = `${backendUri}/propiedades?limit=3&where[id][not_equals]=${currentId}&sort=-createdAt&where[classification.type][equals]=${type}&where[classification.condition][equals]=${condition}&where[ubication.department][equals]=${department}`;

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
  const { id } = await params;
  const n8nUri = process.env.N8NFORM_URI;

  // Obtener la propiedad desde la API
  const property = await getProperty(id);
  // Si no se encuentra la propiedad, mostrar página 404
  if (!property) {
    notFound();
  }

  // Obtener propiedades relacionadas
  const relatedPropertiesData = await getRelatedProperties(
    id,
    property.classification.type,
    property.classification.condition,
    property.ubication?.department || "any"
  );

  // Transformar las imágenes al formato esperado por ImageGallery
  const transformedImages = transformImages(property.images);
  const transformedThumbnails = transformThumbnails(property.images);

  return (
    <main className="bg-gray-50 mt-20">
      {/* Image Gallery */}
      <ImageGallery
        images={transformedImages}
        thumbnails={transformedThumbnails}
      />

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
            <ContactForm agent={agent} property={property} n8nUri={n8nUri} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      {property.ubication?.mapLocation &&
        property.ubication?.locationPrivacy !== "hidden" && (
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="bg-white border border-gray-200 rounded-sm p-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                Ubicación
              </h2>
              <PropertyMap
                latitude={
                  property.ubication.mapLocation.lat ||
                  property.ubication.mapLocation.latitude ||
                  0
                }
                longitude={
                  property.ubication.mapLocation.lng ||
                  property.ubication.mapLocation.longitude ||
                  0
                }
                title={property.title}
                locationPrivacy={property.ubication.locationPrivacy}
                approximateRadius={property.ubication.approximateRadius}
              />
            </div>
          </section>
        )}

      {/* Related Properties */}
      <RelatedProperties properties={relatedPropertiesData} />
    </main>
  );
}
