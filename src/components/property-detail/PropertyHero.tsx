import type {
  Classification,
  Ubication,
  Caracteristics,
  Features,
  Measures,
} from "@/types/property";
import { getDepartmentLabel, getLocalityLabel } from "@/utils/propertyLabels";

interface PropertyHeroProps {
  title: string;
  classification: Classification;
  ubication: Ubication;
  caracteristics: Caracteristics;
  features?: Features;
  measures?: Measures;
  amenities?: any;
}

export default function PropertyHero({
  title,
  classification,
  ubication,
  caracteristics,
  features,
  measures,
  amenities,
}: PropertyHeroProps) {
  // Construir el string de ubicación
  const locationParts = [
    ubication.neighborhood,
    getLocalityLabel(ubication.locality || ""),
    getDepartmentLabel(ubication.department || ""),
    ubication.province,
  ].filter(Boolean);
  if (ubication.neighborhood && locationParts[1] === locationParts[2]) {
    locationParts.splice(1, 1);
  }else if (!ubication.neighborhood && locationParts[0] === locationParts[1]) {
    locationParts.splice(0, 1);
  }
  const location = locationParts.join(", ");
  const formattedPrice = `${
    caracteristics.currency.toUpperCase() === "USD" ? "US$" : "ARS$"
  } ${caracteristics.price.toLocaleString("es-AR")}`;
  // Obtener área (priorizar coveredArea, luego totalArea)
  const area = measures?.coveredArea || measures?.totalArea;

  const allFeatures = [
    {
      key: "bedrooms",
      value: features?.bedrooms,
      label: "DORMITORIOS",
    },
    {
      key: "bathrooms",
      value: features?.bedrooms,
      label: "BAÑOS",
    },
    {
      key: "totalArea",
      value: measures?.totalArea,
      extra: "m²",
      label: "SUPERFICIE TOTAL",
    },
    {
      key: "garage",
      value: features?.garages,
      label: "ESPACIO DE COCHERA",
    },
    {
      key: "coveredArea",
      value: measures?.coveredArea,
      extra: "m²",
      label: "SUPERFICIE CUBIERTA",
    },
    {
      key: "barrioPrivado",
      value: amenities?.barrioPrivado,
      label: "BARRIO PRIVADO",
    },
    {
      key: "expensas",
      value: measures?.hasExpenses,
      label: "TIENE EXPENSAS",
    },
  ];
  const visibleFeatures = allFeatures
    .filter((camp) => camp.value)
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900 capitalize">
            {classification.type} en {classification.condition}
          </h1>
          <div className="text-lg text-gray-600">{location}</div>
          <div className="text-4xl font-semibold text-gray-900">
            {formattedPrice}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 my-8">
            {visibleFeatures.map((feature) => (
              <div key={feature.key} className="text-center py-6 border-t border-gray-200">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {feature.value}{feature.extra || ""}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  {feature.label}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="bg-accent text-white px-8 py-4 rounded-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5">
              Consultar por esta propiedad
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
