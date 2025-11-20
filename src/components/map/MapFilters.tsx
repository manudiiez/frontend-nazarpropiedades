"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomSelectInput from "@/components/ui/CustomSelectInput";
import { propertyTypes } from "@/constants/propertyTypes";
import {
  departmentOptions,
  getLocalitiesByDepartment,
} from "@/data/propertyLabels";

interface Filters {
  department: string;
  locality: string;
  type: string;
  condition: string;
}

interface MapFiltersProps {
  filters: Filters;
}

export default function MapFilters({ filters }: MapFiltersProps) {
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  // Opciones de condición
  const conditionOptions = [
    { value: "", label: "Todas las condiciones" },
    { value: "venta", label: "Venta" },
    { value: "alquiler", label: "Alquiler" },
  ];

  // Opciones de tipo de propiedad
  const typeOptions = [
    { value: "", label: "Todos los tipos" },
    ...propertyTypes.filter((pt) => pt.value !== "any"),
  ];

  // Opciones de departamento
  const departmentSelectOptions = [
    { value: "", label: "Todos los departamentos" },
    ...departmentOptions.map((dept) => ({
      value: dept.value,
      label: dept.label,
    })),
  ];

  // Opciones de localidad basadas en el departamento seleccionado
  const localityOptions = [
    { value: "", label: "Todas las localidades" },
    ...(localFilters.department
      ? getLocalitiesByDepartment(localFilters.department).map((loc) => ({
          value: loc.value,
          label: loc.label,
        }))
      : []),
  ];

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...localFilters, [key]: value };

    // Si cambia el departamento, resetear la localidad
    if (key === "department") {
      newFilters.locality = "";
    }

    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // Construir query params para la URL
    const params = new URLSearchParams();

    if (localFilters.department) {
      params.set("department", localFilters.department);
    }
    if (localFilters.locality) {
      params.set("locality", localFilters.locality);
    }
    if (localFilters.type) {
      params.set("type", localFilters.type);
    }
    if (localFilters.condition) {
      params.set("condition", localFilters.condition);
    }

    // Navegar con los nuevos params
    router.push(`/mapa?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const clearedFilters: Filters = {
      department: "",
      locality: "",
      type: "",
      condition: "",
    };
    setLocalFilters(clearedFilters);

    // Navegar sin params
    router.push("/mapa");
  };

  return (
    <div className="bg-white border-b border-gray-200 py-6 px-6">
      <div className="max-w-[1920px] mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Buscar propiedades en el mapa
        </h2>

        {/* Grid de filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Filtro de Condición */}
          <CustomSelectInput
            options={conditionOptions}
            value={localFilters.condition}
            onChange={(value) => handleFilterChange("condition", value)}
            label="Condición"
            placeholder="Todas las condiciones"
            labelClassName="text-sm font-medium text-gray-900"
            buttonClassName="px-4 py-3 text-sm bg-white"
          />

          {/* Filtro de Tipo */}
          <CustomSelectInput
            options={typeOptions}
            value={localFilters.type}
            onChange={(value) => handleFilterChange("type", value)}
            label="Tipo de propiedad"
            placeholder="Todos los tipos"
            labelClassName="text-sm font-medium text-gray-900"
            buttonClassName="px-4 py-3 text-sm bg-white"
            searchable={true}
            searchPlaceholder="Buscar tipo..."
          />

          {/* Filtro de Departamento */}
          <CustomSelectInput
            options={departmentSelectOptions}
            value={localFilters.department}
            onChange={(value) => handleFilterChange("department", value)}
            label="Departamento"
            placeholder="Todos los departamentos"
            labelClassName="text-sm font-medium text-gray-900"
            buttonClassName="px-4 py-3 text-sm bg-white"
            searchable={true}
            searchPlaceholder="Buscar departamento..."
          />

          {/* Filtro de Localidad */}
          <CustomSelectInput
            options={localityOptions}
            value={localFilters.locality}
            onChange={(value) => handleFilterChange("locality", value)}
            label="Localidad"
            placeholder="Todas las localidades"
            labelClassName="text-sm font-medium text-gray-900"
            buttonClassName="px-4 py-3 text-sm bg-white"
            searchable={true}
            searchPlaceholder="Buscar localidad..."
            disabled={!localFilters.department}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            onClick={handleApplyFilters}
            className="bg-accent hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Aplicar filtros
          </button>
          <button
            onClick={handleClearFilters}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
