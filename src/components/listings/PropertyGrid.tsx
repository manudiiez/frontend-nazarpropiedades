"use client";

import { useState } from "react";
import type { Property } from "@/types";
import PropertyCardCompact from "./PropertyCardCompact";
import PropertyCardMedium from "./PropertyCardMedium";
import PropertyCardWide from "./PropertyCardWide";
import CustomSelectInput from "@/components/ui/CustomSelectInput";

interface PropertyGridProps {
  properties: Property[];
}

type LayoutType = 1 | 2 | 3;

const PropertyGrid = ({ properties }: PropertyGridProps) => {
  const [layout, setLayout] = useState<LayoutType>(3);
  const [sortBy, setSortBy] = useState("price-desc");
  console.log("Properties in Grid:", properties);
  const getGridClasses = () => {
    switch (layout) {
      case 3:
        return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6";
      case 2:
        return "grid grid-cols-1 md:grid-cols-2 gap-6";
      case 1:
        return "grid grid-cols-1 gap-6";
      default:
        return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6";
    }
  };

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price-desc":
        return b.price - a.price;
      case "price-asc":
        return a.price - b.price;
      case "newest":
        return 0; // En una app real, usarías una fecha
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Layout Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setLayout(3)}
            className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
              layout === 3
                ? "bg-accent text-white border-accent"
                : "border-gray-border hover:bg-gray-ui"
            }`}
            aria-label="Vista de 2 columnas"
          >
            <span className="material-symbols-outlined">view_module</span>
          </button>
          <button
            onClick={() => setLayout(2)}
            className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
              layout === 2
                ? "bg-accent text-white border-accent"
                : "border-gray-border hover:bg-gray-ui"
            }`}
            aria-label="Vista de 3 columnas"
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button
            onClick={() => setLayout(1)}
            className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
              layout === 1
                ? "bg-accent text-white border-accent"
                : "border-gray-border hover:bg-gray-ui"
            }`}
            aria-label="Vista de lista"
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <CustomSelectInput
            label="Ordenar por:"
            options={[
              { value: "price-desc", label: "Precio (Mayor-Menor)" },
              { value: "price-asc", label: "Precio (Menor-Mayor)" },
              { value: "newest", label: "Más Recientes" },
            ]}
            value={sortBy}
            onChange={setSortBy}
            labelClassName="text-sm font-medium"
            buttonClassName="text-sm rounded-md"
          />
        </div>
      </div>

      {/* Grid */}
      <div className={getGridClasses()}>
        {sortedProperties.map((property) => {
          if (layout === 3) {
            return (
              <PropertyCardCompact key={property.id} property={property} />
            );
          } else if (layout === 2) {
            return <PropertyCardMedium key={property.id} property={property} />;
          } else {
            return <PropertyCardWide key={property.id} property={property} />;
          }
        })}
      </div>
    </div>
  );
};

export default PropertyGrid;
