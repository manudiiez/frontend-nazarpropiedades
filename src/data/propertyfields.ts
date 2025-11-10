



type ExtendedOption = {
  label: string;
  value: string;
  type?: string[]; // <- tus metadatos
  condition?: string[]; // <- tus metadatos
};

// Este archivo es solo para referencia de Payload CMS
// No se usa en el frontend, solo se usa para generar los tipos
/*
export const Propiedades: CollectionConfig = {
  slug: "propiedades",
  // versions: { drafts: true }, // Eliminamos versiones/drafts
  labels: {
    singular: "Inmueble",
    plural: "Propiedades",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "images.coverImage",
      "title",
      "ubication.address",
      "status",
      "owner",
    ],
    // Configuración de campos de búsqueda global
    listSearchableFields: [
      "title",
      "aiContent.title",
      "aiContent.description",
      "ubication.department",
      "ubication.locality",
      "ubication.neighborhood",
      "ubication.address",
      "classification.type",
    ],
    components: {
      views: {
        edit: {
          detalles: {
            Component: "@/views/PropertyDetailsView#default", // tu vista
            path: "/detalles", // ruta dentro del doc
            tab: {
              label: "Detalles", // texto del tab
              href: "/detalles", // ruta dentro del doc
              order: 100,
            },
          },
        },
        list: {
          Component: "@/views/PropertiesListView#default", // tu vista
        },
      },
    },
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Sincronizar aiContent.title con title solo al momento de enviar/guardar
        if (data?.aiContent?.title) {
          data.title = data.aiContent.title;
        }
        return data;
      },
      ({ data, operation, originalDoc }) => {
        // Detectar duplicación: es una creación pero tiene datos de portales
        // (los documentos nuevos no deberían tener estos campos poblados)
        const isDuplicate =
          operation === "create" &&
          (data.inmoup?.externalId || data.mercadolibre?.externalId);
        if (isDuplicate) {
          console.log(
            "Documento duplicado detectado, limpiando campos de portales..."
          );

          // Limpiar información de Inmoup
          if (data.inmoup) {
            data.inmoup = {
              status: null,
              uploaded: false,
              externalId: null,
              externalUrl: null,
              lastSyncAt: null,
              lastError: null,
            };
          }

          // Limpiar información de MercadoLibre
          if (data.mercadolibre) {
            data.mercadolibre = {
              status: null,
              uploaded: false,
              externalId: null,
              externalUrl: null,
              lastSyncAt: null,
              lastError: null,
            };
          }
        }

        return data;
      },
      ({ data, originalDoc, operation }) => {
        // Solo para actualizaciones (no creaciones)
        if (operation === "update" && originalDoc) {
          // Campos a ignorar para no marcar como desactualizado
          const fieldsToIgnore = [
            "inmoup.lastSyncAt",
            "inmoup.lastError",
            "inmoup.status",
            "inmoup.uploaded",
            "inmoup.externalId",
            "inmoup.externalUrl",
            "mercadolibre.lastSyncAt",
            "mercadolibre.lastError",
            "mercadolibre.status",
            "mercadolibre.uploaded",
            "mercadolibre.externalId",
            "mercadolibre.externalUrl",
            "notes",
            "updatedAt",
            "createdAt",
            "status",
          ];

          // Verificar si hay cambios significativos comparando data vs originalDoc
          const hasSignificantChanges = Object.keys(data).some((key) => {
            if (fieldsToIgnore.some((field) => field.startsWith(key))) {
              return false;
            }
            // Comparación profunda simplificada para detectar cambios
            return (
              JSON.stringify(data[key]) !== JSON.stringify(originalDoc[key])
            );
          });

          if (hasSignificantChanges) {
            console.log(
              "Cambios significativos detectados, marcando como desactualizado..."
            );

            // Verificar si Inmoup está publicado (status: 'ok') y marcarlo como desactualizado
            if (originalDoc.inmoup?.status === "ok") {
              if (!data.inmoup) {
                data.inmoup = { ...originalDoc.inmoup };
              }
              data.inmoup.status = "desactualizado";
              data.inmoup.lastSyncAt = new Date().toISOString();
            }

            // Verificar si MercadoLibre está publicado (status: 'ok') y marcarlo como desactualizado
            if (originalDoc.mercadolibre?.status === "ok") {
              if (!data.mercadolibre) {
                data.mercadolibre = { ...originalDoc.mercadolibre };
              }
              data.mercadolibre.status = "desactualizado";
              data.mercadolibre.lastSyncAt = new Date().toISOString();
            }
          }
        }
        return data;
      },
    ],
  },
  fields: [
    // Campo título oculto para useAsTitle (se sincroniza con aiContent.title)
    {
      name: "title",
      type: "text",
      label: "Título",
      admin: {
        hidden: true,
      },
      // Eliminamos el hook beforeChange problemático
      // La sincronización la haremos desde el componente AIContentGenerator
    },
    // Campo de estado de la propiedad
    {
      name: "status",
      type: "select",
      label: "Estado de la Propiedad",
      defaultValue: "activa",
      required: true,
      options: [
        { label: "Borrador", value: "borrador" },
        { label: "Activa", value: "activa" },
        { label: "Reservada", value: "reservada" },
        { label: "Vendido / Alquilado", value: "terminada" },
      ],
      admin: {
        description:
          'Estado actual de la propiedad. "Terminada" se establece automáticamente al crear un contrato.',
      },
      index: true, // Para filtros en listado
    },
    {
      name: "classification",
      label: "Tipo y operación",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "type",
              label: "Tipo de propiedad",
              type: "select",
              options: propertySelectOptions.type,
              admin: {
                placeholder: "Selecciona el tipo de propiedad",
              },
              required: true,
              index: true, // Hace que aparezca automáticamente en los filtros
            },
            {
              name: "condition",
              label: "Condición",
              type: "select",
              options: propertySelectOptions.condition,
              admin: {
                placeholder: "Selecciona la condición de la propiedad",
              },
              required: true,
              index: true, // Hace que aparezca automáticamente en los filtros
            },
          ],
        },
      ],
    },
    {
      name: "ubication",
      label: "Ubicación de la propiedad",
      type: "group",
      fields: [
        // 2) Provincia (primero y fijo)
        {
          type: "row",
          fields: [
            {
              name: "province",
              type: "text",
              label: "Provincia",
              defaultValue: "Mendoza",
              admin: {
                readOnly: true,
                width: "50%",
                description: "Provincia fija: Mendoza",
              },
            },

            // 3) Departamento
            {
              name: "department",
              type: "select",
              label: "Departamento",
              required: true,
              options: propertySelectOptions.department,
              admin: {
                placeholder: "Selecciona el departamento de Mendoza",
                width: "50%",
              },
              index: true, // Hace que aparezca automáticamente en los filtros
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "locality",
              type: "select",
              label: "Localidad / Zona",
              options: propertySelectOptions.locality,
              filterOptions: ({ options, data }) => {
                const dep = data?.ubication.department;
                if (!dep) return options;
                return getLocalitiesByDepartment(dep);
              },
              admin: {
                description:
                  "Selecciona la localidad según el departamento elegido",
                width: "50%",
                placeholder: "Selecciona el departamento primero",
                components: {
                  Field: "@/components/fields/LocalitySelect/LocalitySelect",
                },
              },
              index: true, // Hace que aparezca automáticamente en los filtros
            },

            // 5) Barrio/Complejo
            {
              name: "neighborhood",
              type: "text",
              label: "Barrio / Edificio / Complejo / Calle",
              admin: {
                description:
                  "Nombre específico del barrio, edificio o complejo",
                placeholder: "ej: Barrio Palmares o Edificio Gutierrez, etc.",
                width: "50%",
              },
            },
          ],
        },
        // 4) Localidad/Zona (filtra por departamento)
        {
          name: "address",
          label: "Domicilio",
          type: "text",
          required: true,
          admin: {
            description: "Dirección completa de la propiedad",
            placeholder: "ej: Calle Falsa, Godoy Cruz, Mendoza",
          },
        },
        // 6) Mapa interactivo de Google Maps personalizado
        {
          name: "mapLocation",
          type: "json",
          label: "Ubicación en el Mapa",
          admin: {
            components: {
              Field: "@/components/fields/GoogleMapField/GoogleMapField",
            },
            description:
              "Busca la dirección específica en el mapa o haz clic para marcar la ubicación exacta.",
          },
        },

        // 7) Configuración de privacidad de ubicación
        {
          name: "locationPrivacy",
          type: "radio",
          label: "Mostrar ubicación en el sitio web",
          options: propertySelectOptions.locationPrivacy,
          defaultValue: "exact",
          admin: {
            description:
              "Controla qué tan precisa será la ubicación mostrada en el sitio web",
            layout: "horizontal",
          },
        },

        // 8) Radio de aproximación (solo si es aproximada)
        {
          name: "approximateRadius",
          type: "number",
          label: "Radio de aproximación (metros)",
          min: 100,
          max: 1500,
          defaultValue: 300,
          admin: {
            description:
              "Distancia en metros para el área aproximada de la ubicación",
            step: 100,
            condition: (data, siblingData) => {
              return siblingData?.locationPrivacy === "approximate";
            },
          },
        },
      ],
    },
    {
      name: "caracteristics",
      type: "group",
      label: "Características de la propiedad",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "price",
              type: "number",
              label: "Precio",
              admin: {
                description: "Precio de la propiedad",
                placeholder: "Ingresa el valor del precio",
                width: "50%",
              },
              required: true,
              index: true, // Hace que aparezca automáticamente en los filtros
            },
            {
              name: "currency",
              type: "select",
              label: "Moneda",
              options: propertySelectOptions.currency,
              defaultValue: "usd",
              required: true,
              admin: {
                placeholder: "Selecciona la moneda del precio",
                width: "50%",
              },
              index: true, // Hace que aparezca automáticamente en los filtros
            },
            {
              name: "hasExpenses",
              type: "radio",
              label: "¿Tiene expensas?",
              options: ["Si", "No"],
              admin: {
                width: "100%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "bodega" &&
                    data?.classification.type !== "cabaña" &&
                    data?.classification.type !== "chalet" &&
                    data?.classification.type !== "deposito" &&
                    data?.classification.type !== "estacion_de_servicio" &&
                    data?.classification.type !== "edificio" &&
                    data?.classification.type !== "fábrica" &&
                    data?.classification.type !== "finca" &&
                    data?.classification.type !== "hotel" &&
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "playa_de_estacionamiento" &&
                    data?.classification.type !== "vinedo"
                  );
                },
              },
              validate: validateHasExpenses,
            },
            {
              name: "expenses",
              type: "number",
              label: "Valor de Expensas",
              required: true,
              admin: {
                placeholder: "Ingresa el valor de las expensas",
                width: "50%",
                condition: (data, siblingData) => {
                  return siblingData.hasExpenses === "Si";
                },
              },
            },
            {
              name: "expensesCurrency",
              type: "select",
              label: "Moneda de expensas",
              options: propertySelectOptions.expensesCurrency,
              required: true,
              admin: {
                placeholder: "Selecciona la moneda de las expensas",
                width: "50%",
                condition: (data, siblingData) => {
                  return siblingData.hasExpenses === "Si";
                },
              },
            },
            {
              type: "group",
              label: "Tasación",
              admin: {
                description:
                  "Este campo es de uso interno y no se mostrará en el sitio web",
                width: "100%",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "appraisal",
                      type: "number",
                      label: "Valor de la Tasación",
                      admin: {
                        placeholder: "Ingresa el valor de la tasación",
                        width: "50%",
                      },
                    },
                    {
                      name: "appraisalCurrency",
                      type: "select",
                      label: "Moneda de tasación",
                      options: propertySelectOptions.appraisalCurrency,
                      admin: {
                        placeholder: "Selecciona la moneda de la tasación",
                        width: "50%",
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "coveredArea",
              type: "number",
              label: "Área cubierta en m²",
              admin: {
                placeholder: "Selecciona el área cubierta",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "lote" &&
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "terreno"
                  );
                },
              },
              validate: validateCoveredArea,
            },
            {
              name: "totalArea",
              type: "number",
              label: "Área total en m²",
              admin: {
                placeholder: "Selecciona el área total",
                width: "50%",
                condition: (data, siblingData) => {
                  return data?.classification.type !== "negocio";
                },
              },
              validate: validateTotalArea,
            },
            {
              name: "landArea",
              type: "number",
              label: "Área de terreno en m²",
              admin: {
                placeholder: "Selecciona el área de terreno",
                width: "50%",
                description:
                  "Este campo es importante para la calidad de Mercado Libre",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "cochera" &&
                    data?.classification.type !== "deposito" &&
                    data?.classification.type !== "galpon" &&
                    data?.classification.type !== "departamento" &&
                    data?.classification.type !== "fondo_de_comercio" &&
                    data?.classification.type !== "local_comercial" &&
                    data?.classification.type !== "oficina" &&
                    data?.classification.type !== "ph" &&
                    data?.classification.type !== "piso" &&
                    data?.classification.type !== "semipiso" &&
                    data?.classification.type !== "lote"
                  );
                },
              },
            },
            {
              name: "pricePerSquareMeterArs",
              type: "number",
              label: "Precio por m² (ARS)",
              admin: {
                placeholder: "Selecciona el precio por m²",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "campo" ||
                    data?.classification.type === "lote"
                  );
                },
              },
            },
            {
              name: "pricePerSquareMeterUsd",
              type: "number",
              label: "Precio por m² (USD)",
              admin: {
                placeholder: "Selecciona el precio por m²",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "campo" ||
                    data?.classification.type === "lote"
                  );
                },
              },
            },
            {
              name: "orientation",
              type: "select",
              label: "Orientación",
              options: propertySelectOptions.orientation,
              admin: {
                placeholder: "Selecciona la orientación",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "playa_de_estacionamiento" &&
                    data?.classification.type !== "deposito" &&
                    data?.classification.type !== "galpon" &&
                    data?.classification.type !== "cochera"
                  );
                },
              },
            },
            {
              name: "frontMeters",
              type: "number",
              label: "Metros de frente",
              admin: {
                placeholder: "Ingresa los metros de frente",
                width: "50%",
                condition: (data, siblingData) => {
                  return data?.classification.type !== "negocio";
                },
              },
            },
            {
              name: "deepMeters",
              type: "number",
              label: "Metros de largo/fondo",
              admin: {
                placeholder: "Ingresa los metros de largo/fondo",
                width: "50%",
                condition: (data, siblingData) => {
                  return data?.classification.type !== "negocio";
                },
              },
            },
            {
              name: "antiquity",
              type: "select",
              label: "Antigüedad",
              options: propertySelectOptions.antiquity,
              admin: {
                placeholder: "Selecciona la antigüedad",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "terreno" &&
                    data?.classification.type !== "lote"
                  );
                },
              },
              validate: validateAntiquity,
            },
            {
              name: "conservationStatus",
              type: "select",
              label: "Estado de Conservación",
              options: propertySelectOptions.conservationStatus,
              admin: {
                placeholder: "Selecciona el estado",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "lote" &&
                    data?.classification.type !== "loteo" &&
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "terreno"
                  );
                },
              },
              validate: validateConservationStatus,
            },
          ],
        },
      ],
    },
    {
      name: "environments",
      type: "group",
      label: "Ambientes",
      admin: {
        condition: (data, siblingData) => {
          return (
            data?.classification.type !== "lote" &&
            data?.classification.type !== "fraccionamiento" &&
            data?.classification.type !== "terreno"
          );
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "bedrooms",
              label: "Habitaciones",
              type: "number",
              admin: {
                placeholder: "Cantidad de habitaciones",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "cochera" &&
                    data?.classification.type !== "deposito" &&
                    data?.classification.type !== "fondo_de_comercio" &&
                    data?.classification.type !== "galpon" &&
                    data?.classification.type !== "industria" &&
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "oficina" &&
                    data?.classification.type !== "playa_de_estacionamiento"
                  );
                },
              },
              validate: validateBedrooms,
              index: true,
            },
            {
              name: "bathrooms",
              label: "Baños",
              type: "number",
              // Campo aparece en más tipos (menos exclusiones)
              admin: {
                placeholder: "Cantidad de baños",
                width: "50%",
                condition: (data, siblingData) => {
                  return data?.classification.type !== "negocio";
                },
              },
              validate: validateBathrooms,
              index: true, // Hace que aparezca automáticamente en los filtros
            },
            {
              name: "garageType",
              label: "Tipo de cochera",
              admin: {
                placeholder: "Selecciona el tipo de cochera",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "bodega" &&
                    data?.classification.type !== "bodega_con_vinedo" &&
                    data?.classification.type !== "cochera" &&
                    data?.classification.type !== "fábrica" &&
                    data?.classification.type !== "estacion_de_servicio" &&
                    data?.classification.type !== "finca" &&
                    data?.classification.type !== "hotel" &&
                    data?.classification.type !== "industria" &&
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "playa_de_estacionamiento" &&
                    data?.classification.type !== "semipiso" &&
                    data?.classification.type !== "vinedo"
                  );
                },
              },
              type: "select",
              options: propertySelectOptions.garageType,
              validate: validateGarageType,
            },
            {
              name: "garages",
              label: "¿Cuantos autos entran?",
              required: true,
              admin: {
                placeholder: "Cantidad de espacios de cochera",
                description: "Este campo es importanten para mercado libre",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    siblingData?.garageType &&
                    siblingData?.garageType !== "sin_cochera"
                  );
                },
              },
              type: "number",
            },
            {
              name: "plantas",
              type: "number",
              label: "Cantidad de Plantas",
              admin: {
                width: "50%",
                placeholder: "Ingresa la cantidad de plantas",
              },
            },
            {
              name: "ambientes",
              type: "number",
              label: "Cantidad de Ambientes",
              admin: {
                width: "50%",
                placeholder: "Ingresa la cantidad de ambientes",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "cochera" &&
                    data?.classification.type !== "playa_de_estacionamiento"
                  );
                },
              },
              validate: validateAmbientes,
            },
            {
              name: "furnished",
              label: "Amueblado",
              type: "radio",
              options: propertySelectOptions.furnished,
              admin: {
                layout: "horizontal",
                width: "50%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "cochera" &&
                    data?.classification.type !== "finca" &&
                    data?.classification.type !== "galpon" &&
                    data?.classification.type !== "hotel" &&
                    data?.classification.type !== "industria" &&
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "playa_de_estacionamiento" &&
                    data?.classification.type !== "vinedo"
                  );
                },
              },
            },
          ],
        },
      ],
    },
    // Amenities con select múltiple nativo de Payload
    {
      name: "amenities",
      type: "group",
      label: "servicios y Amenities",
      fields: [
        // Servicios
        {
          type: "row",
          fields: [
            {
              name: "mascotas",
              type: "select",
              label: "¿Aceptan Mascotas?",
              options: ["Si", "No"],
              admin: {
                width: "50%",
                placeholder: "Indistinto",
                condition: (data, siblingData) => {
                  return (
                    !(
                      data?.classification.type === "casa" &&
                      data?.classification.condition === "venta"
                    ) &&
                    data?.classification.type !== "lote" &&
                    data?.classification.type !== "bodega" &&
                    data?.classification.type !== "bodega_con_vinedo" &&
                    data?.classification.type !== "campo" &&
                    data?.classification.type !== "deposito" &&
                    data?.classification.type !== "cochera" &&
                    data?.classification.type !== "edificio" &&
                    data?.classification.type !== "estacion_de_servicio" &&
                    data?.classification.type !== "fábrica" &&
                    data?.classification.type !== "finca" &&
                    data?.classification.type !== "fondo_de_comercio" &&
                    data?.classification.type !== "fraccionamiento" &&
                    data?.classification.type !== "galpon" &&
                    data?.classification.type !== "hotel" &&
                    data?.classification.type !== "industria" &&
                    data?.classification.type !== "local_comercial" &&
                    data?.classification.type !== "loteo" &&
                    data?.classification.type !== "negocio" &&
                    data?.classification.type !== "playa_de_estacionamiento" &&
                    data?.classification.type !== "terreno" &&
                    data?.classification.type !== "vinedo"
                  );
                },
              },
              validate: validateMascotas,
            },
            {
              type: "select",
              name: "barrioPrivado",
              label: "Barrio Privado",
              options: ["Si", "No", "Semi Privado"],
              admin: {
                width: "50%",
                placeholder: "Indistinto",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "casa" ||
                    data?.classification.type === "lote" ||
                    data?.classification.type === "terreno"
                  );
                },
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "agua",
              type: "radio",
              label: "Agua",
              options: ["Si", "No"],
              required: true,
              admin: {
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "lote" ||
                    data?.classification.type === "fraccionamiento" ||
                    data?.classification.type === "loteo" ||
                    data?.classification.type === "terreno" ||
                    data?.classification.type === "campo" ||
                    data?.classification.type === "fábrica" ||
                    data?.classification.type === "finca" ||
                    data?.classification.type === "vinedo"
                  );
                },
              },
            },
            {
              name: "cloacas",
              type: "radio",
              label: "Cloacas",
              options: ["Si", "No"],
              required: true,
              admin: {
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "lote" ||
                    data?.classification.type === "fraccionamiento" ||
                    data?.classification.type === "loteo" ||
                    data?.classification.type === "terreno"
                  );
                },
              },
            },
            {
              name: "gas",
              type: "radio",
              label: "Gas",
              options: ["Si", "No"],
              required: true,
              admin: {
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "lote" ||
                    data?.classification.type === "fraccionamiento" ||
                    data?.classification.type === "loteo" ||
                    data?.classification.type === "terreno" ||
                    data?.classification.type === "cabaña" ||
                    data?.classification.type === "campo" ||
                    data?.classification.type === "chalet" ||
                    data?.classification.type === "fábrica" ||
                    data?.classification.type === "finca" ||
                    data?.classification.type === "vinedo"
                  );
                },
              },
            },
            {
              name: "luz",
              type: "radio",
              label: "Luz Eléctrica",
              options: ["Si", "No"],
              required: true,
              admin: {
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "lote" ||
                    data?.classification.type === "fraccionamiento" ||
                    data?.classification.type === "loteo" ||
                    data?.classification.type === "terreno" ||
                    data?.classification.type === "campo" ||
                    data?.classification.type === "finca" ||
                    data?.classification.type === "vinedo"
                  );
                },
              },
            },
          ],
        },
        {
          name: "estrellas",
          type: "number",
          label: "Cantidad de Estrellas",
          admin: {
            width: "50%",
            placeholder: "Ingresa la cantidad de estrellas",
            condition: (data, siblingData) => {
              return data?.classification.type === "hotel";
            },
          },
        },
        {
          name: "servicios",
          type: "select",
          label: "Servicios",
          hasMany: true,
          admin: {
            placeholder: "Selecciona los servicios relevantes",
            description:
              "Primero debes seleccionar el tipo de propiedad y condición",
          },
          options: propertySelectOptions.amenityServices,
          filterOptions: ({ options, data }) => {
            const t = data?.classification?.type as string | undefined;
            const c = data?.classification?.condition as string | undefined;
            if (!t || !c) return []; // o `options` si querés mostrar todo

            return options.filter((o): o is ExtendedOption => {
              // descartar strings y quedarnos con objetos
              if (typeof o === "string") return false;
              const opt = o as ExtendedOption;
              return (
                (opt.type?.includes(t) ?? false) &&
                (opt.condition?.includes(c) ?? false)
              );
            });
          },
        },
        // Ambientes
        {
          name: "ambientes",
          type: "select",
          label: "Ambientes y Espacios",
          hasMany: true,
          admin: {
            placeholder: "Selecciona los ambientes y espacios relevantes",
          },
          options: propertySelectOptions.amenityEnvironments,
        },
        // Zonas cercanas
        {
          name: "zonasCercanas",
          type: "select",
          label: "Zonas Cercanas",
          hasMany: true,
          admin: {
            placeholder: "Selecciona las zonas cercanas relevantes",
          },
          options: propertySelectOptions.amenityNearbyZones,
        },
      ],
    },
    {
      name: "extra",
      type: "group",
      label: "Campos extra para otros portales",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "number",
              name: "bauleras",
              label: "Cantidad de Bauleras",
              admin: {
                width: "25%",
                description: "Este campo solo sera visible para mercado libre",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type !== "campo" &&
                    data?.classification.type !== "cochera" &&
                    data?.classification.type !== "deposito" &&
                    data?.classification.type !== "galpon" &&
                    data?.classification.type !== "lote"
                  );
                },
              },
            },
            {
              type: "text",
              name: "numeroCasa",
              label: "Número de casa o departamento",
              admin: {
                width: "25%",
                description:
                  "Este campo no sera visible pero es importante para la calidad de mercado libre",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "casa" ||
                    data?.classification.type === "chalet" ||
                    data?.classification.type === "cabaña" ||
                    data?.classification.type === "duplex" ||
                    data?.classification.type === "triplex" ||
                    data?.classification.type === "departamento"
                  );
                },
              },
            },
            {
              type: "number",
              name: "pisoDepartamento",
              label: "Número de piso de la unidad",
              admin: {
                width: "25%",
                placeholder: "Ingresa el número de piso",
                description: "Este campo solo sera visible para mercado libre",
                condition: (data, siblingData) => {
                  return (
                    (data?.classification.type === "departamento" &&
                      data?.classification.condition ===
                        "alquiler_temporario") ||
                    data?.classification.type === "oficina" ||
                    data?.classification.type === "ph"
                  );
                },
              },
            },
            {
              name: "acceso",
              type: "select",
              label: "Acceso",
              options: propertySelectOptions.access,
              required: true,
              admin: {
                width: "25%",
                placeholder: "Selecciona el tipo de acceso",
                description: "Este campo solo sera visible para mercado libre",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "campo" ||
                    data?.classification.type === "quinta" ||
                    data?.classification.type === "lote" ||
                    data?.classification.type === "loteo" ||
                    data?.classification.type === "terreno"
                  );
                },
              },
            },
            {
              name: "guests",
              label: "Cantidad de Huéspedes",
              type: "number",
              required: true,
              admin: {
                placeholder: "Ingresa la cantidad máxima de huéspedes",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.condition === "alquiler_temporario"
                  );
                },
              },
            },
            {
              name: "minimumStay",
              label: "Estadia Mínima (en noches)",
              type: "number",
              required: true,
              admin: {
                placeholder: "Ingresa la estadia minima en noches",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.condition === "alquiler_temporario"
                  );
                },
              },
            },
            {
              name: "camas",
              label: "Cantidad de camas",
              type: "number",
              required: true,
              admin: {
                placeholder: "Ingresa la cantidad de camas",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.condition === "alquiler_temporario"
                  );
                },
              },
            },
            {
              name: "checkinTime",
              label: "Hora de check-in",
              type: "select",
              required: true,
              admin: {
                placeholder: "Seleccione la hora de check-in",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.condition === "alquiler_temporario"
                  );
                },
              },
              options: propertySelectOptions.checkinTimeOptions,
            },
            {
              name: "checkoutTime",
              label: "Hora de check-out",
              type: "select",
              required: true,
              admin: {
                placeholder: "Seleccione la hora de check-out",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.condition === "alquiler_temporario"
                  );
                },
              },
              options: propertySelectOptions.checkinTimeOptions,
            },
            {
              name: "pisosEdificio",
              label: "Cantidad de pisos del edificio",
              type: "number",
              admin: {
                placeholder: "Ingresa la cantidad de pisos del edificio",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    (data?.classification.type === "departamento" &&
                      data?.classification.condition === "venta") ||
                    (data?.classification.type === "departamento" &&
                      data?.classification.condition === "alquiler")
                  );
                },
              },
            },
            {
              name: "departamentosPorPiso",
              label: "Cantidad de unidades por piso",
              type: "number",
              admin: {
                placeholder: "Ingresa la cantidad de unidades por piso",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    (data?.classification.type === "departamento" &&
                      data?.classification.condition === "venta") ||
                    (data?.classification.type === "departamento" &&
                      data?.classification.condition === "alquiler") ||
                    data?.classification.type === "oficina"
                  );
                },
              },
            },
            {
              name: "superficieBalcon",
              label: "Superficie del balcon",
              type: "number",
              admin: {
                placeholder: "Ingresa la superficie del balcon",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    (data?.classification.type === "departamento" &&
                      data?.classification.condition === "venta") ||
                    (data?.classification.type === "departamento" &&
                      data?.classification.condition === "alquiler")
                  );
                },
              },
            },
            {
              name: "disposicion",
              label: "Disposición",
              type: "select",
              options: propertySelectOptions.disposition,
              admin: {
                placeholder: "Selecciona la disposición",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "departamento" ||
                    data?.classification.type === "oficina" ||
                    data?.classification.type === "ph"
                  );
                },
              },
            },
            {
              name: "disposicionTerreno",
              label: "Disposición del lote",
              type: "select",
              options: propertySelectOptions.dispositionLote,
              admin: {
                placeholder: "Selecciona la disposición del lote",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "lote";
                },
              },
            },
            {
              name: "formaTerreno",
              label: "Forma del terreno",
              type: "select",
              options: [
                { value: "regular", label: "Regular" },
                { value: "irregular", label: "Irregular" },
                { value: "plano", label: "Plano" },
              ],
              admin: {
                placeholder: "Selecciona la forma del terreno",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "lote";
                },
              },
            },
            {
              name: "tipoCampo",
              label: "Tipo de campo",
              type: "select",
              options: propertySelectOptions.tipoCampo,
              admin: {
                placeholder: "Selecciona el tipo de campo",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "campo";
                },
              },
            },
            {
              name: "accesoCochera",
              label: "Acceso a cochera",
              type: "select",
              options: propertySelectOptions.accesoCochera,
              admin: {
                placeholder: "Selecciona el acceso a cochera",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "cochera";
                },
              },
            },
            {
              name: "tipoCochera",
              label: "Tipo de cochera",
              type: "select",
              options: [
                {
                  value: "fija",
                  label: "Fija",
                },
                {
                  value: "movil",
                  label: "Móvil",
                },
              ],
              admin: {
                placeholder: "Selecciona el tipo de cochera",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "cochera";
                },
              },
            },
            {
              name: "tipoCoverturaCochera",
              label: "Tipo de covertura de cochera",
              type: "select",
              options: [
                {
                  value: "semi_cubierta",
                  label: "Semi cubierta",
                },
                {
                  value: "cubierta",
                  label: "Cubierta",
                },
                {
                  value: "descubierta",
                  label: "Descubierta",
                },
              ],
              admin: {
                placeholder: "Selecciona el tipo de covertura de cochera",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "cochera";
                },
              },
            },
            {
              name: "alturaDeposito",
              label: "Altura del deposito/galpon en m",
              type: "number",
              admin: {
                placeholder: "Ingresa la altura del deposito/galpon",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return (
                    data?.classification.type === "deposito" ||
                    data?.classification.type === "galpon"
                  );
                },
              },
            },
            {
              name: "banosPiso",
              label: "Cantidad de baños por piso",
              type: "number",
              admin: {
                placeholder: "Ingresa la cantidad de baños por piso",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "oficina";
                },
              },
            },
            {
              name: "cantidadOficinas",
              label: "Cantidad de oficinas",
              type: "number",
              admin: {
                placeholder: "Ingresa la cantidad de oficinas",
                description: "Este campo solo sera visible para mercado libre",
                width: "25%",
                condition: (data, siblingData) => {
                  return data?.classification.type === "oficina";
                },
              },
            },
            // {
            //   name: 'monoambiente',
            //   label: '¿Es Monoambiente?',
            //   type: 'radio',
            //   options: ['Si', 'No'],
            //   admin: {
            //     description: 'Este campo solo sera visible para mercado libre',
            //     width: '25%',
            //     layout: 'horizontal',
            //     condition: (data, siblingData) => {
            //       return data?.classification.type === 'departamento'
            //     },
            //   },
            // },
          ],
        },
      ],
    },

    // Generador de título y descripción con IA
    {
      name: "aiContent",
      type: "group",
      label: "Título y Descripción",
      admin: {
        description:
          "Genera automáticamente el título y descripción usando IA, o edítalos manualmente.",
      },
      fields: [
        {
          name: "aiGenerator",
          type: "ui",
          admin: {
            components: {
              Field:
                "@/components/fields/AiTitleAndDescriptionGenerator/AiTitleAndDescriptionGenerator",
            },
          },
        },
        {
          name: "title",
          type: "text",
          label: "Título de la propiedad",
          required: true,
          admin: {
            description:
              "Puedes generar automáticamente o escribir tu propio título",
            placeholder: "ej: Casa moderna de 3 dormitorios en Godoy Cruz",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Descripción de la propiedad",
          admin: {
            description: "Descripción detallada que aparecerá en el sitio web",
            placeholder:
              "Describe las características principales, ubicación y beneficios de la propiedad...",
            rows: 6,
          },
        },
      ],
    },
    {
      type: "group",
      name: "images",
      label: "Imágenes",
      fields: [
        {
          name: "imagenesExtra",
          label: "Imágenes extra (URLs)",
          type: "array",
          admin: {
            hidden: true,
          },
          labels: { singular: "Imagen", plural: "Imágenes" },
          fields: [
            {
              name: "url",
              type: "text",
              admin: { placeholder: "https://..." },
            },
            {
              name: "orden",
              type: "number",
            },
          ],
        },
        {
          name: "coverImage",
          label: "Imagen de Portada",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: {
            components: {
              Cell: "@/components/cells/ImageCell/ImageCell",
            },
            description:
              "Imagen principal que aparecerá como portada. No repetir esta imagen en la galería.",
          },
        },
        // Imágenes con orden y principal (array de objetos)
        {
          name: "gallery",
          label: "Galería de Imágenes",
          type: "upload",
          relationTo: "media",
          hasMany: true, // 👈 habilita multi-selección / drag&drop múltiple
          admin: {
            description:
              "Arrastrá varias imágenes a la vez; podés reordenarlas con drag & drop.",
          },
          validate: (val) =>
            Array.isArray(val) && val.length <= 29
              ? true
              : "Máximo 30 imágenes",
        },
        {
          type: "row",
          fields: [
            {
              name: "videoUrl",
              type: "text",
              label: "URL de Video",
              admin: {
                width: "50%",
                description:
                  "Enlace a un video de la propiedad (YouTube, Vimeo, etc.). Se mostrará un botón en la ficha.",
                placeholder: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
              },
            },
            {
              name: "virtualTourUrl",
              type: "text",
              label: "URL de Tour Virtual 3D",
              admin: {
                width: "50%",
                description:
                  "Enlace a un tour virtual 3D (ej: Matterport). Se mostrará un botón en la ficha.",
                placeholder: "https://my.matterport.com/show/?m=XXXXXXXXXXX",
              },
            },
          ],
        },
      ],
    },
    // Imagen de portada

    // Relaciones
    {
      name: "owner",
      label: "Propietario",
      type: "relationship",
      relationTo: "clientes",
      admin: {
        placeholder: "Selecciona el propietario de la propiedad",
      },
      required: true,
    },
    {
      name: "notes",
      label: "Notas internas",
      type: "textarea",
      admin: {
        description:
          "Notas o comentarios internos sobre la propiedad (no se muestran en el sitio)",
        placeholder: "Notas internas sobre la propiedad",
        rows: 4,
      },
    },
    {
      name: "inmoup",
      label: "Configuración de Inmoup",
      admin: { hidden: true },
      type: "group",
      fields: [
        { name: "name", type: "text", defaultValue: "Inmoup" },
        { name: "uploaded", type: "checkbox", defaultValue: false },
        { name: "externalId", type: "text" },
        { name: "externalUrl", type: "text" },
        {
          name: "status",
          type: "select",
          defaultValue: "not_sent",
          options: [
            { label: "No enviado", value: "not_sent" },
            { label: "En cola", value: "queued" },
            { label: "OK", value: "ok" },
            { label: "Error", value: "error" },
            { label: "Desactualizado", value: "desactualizado" },
          ],
        },
        { name: "lastSyncAt", type: "date" },
        { name: "lastError", type: "textarea" },
      ],
    },
    {
      name: "mercadolibre",
      label: "Configuración de MercadoLibre",
      admin: { hidden: true },
      type: "group",
      fields: [
        { name: "name", type: "text", defaultValue: "MercadoLibre" },
        { name: "uploaded", type: "checkbox", defaultValue: false },
        { name: "externalId", type: "text" },
        { name: "externalUrl", type: "text" },
        {
          name: "status",
          type: "select",
          defaultValue: "not_sent",
          options: [
            { label: "No enviado", value: "not_sent" },
            { label: "En cola", value: "queued" },
            { label: "OK", value: "ok" },
            { label: "Error", value: "error" },
            { label: "Desactualizado", value: "desactualizado" },
          ],
        },
        { name: "lastSyncAt", type: "date" },
        { name: "lastError", type: "textarea" },
      ],
    },
  ],
};


// Opciones centralizadas para los campos select de propiedades

export interface SelectOption {
  label: string
  value: string
  type?: string[]
  condition?: string[]
  id?: string
}

// Condiciones de operación
export const conditionOptions: SelectOption[] = [
  { label: 'Venta', value: 'venta' },
  { label: 'Alquiler', value: 'alquiler' },
  { label: 'Alquiler Temporario', value: 'alquiler_temporario' },
  { label: 'Permuta', value: 'permuta' },
]

// accesso
export const accessOptions: SelectOption[] = [
  {
    id: '245049',
    value: 'Tierra',
    label: 'Tierra',
  },
  {
    id: '245045',
    value: 'Arena',
    label: 'Arena',
  },
  {
    id: '245046',
    value: 'Asfalto',
    label: 'Asfalto',
  },
  {
    id: '245047',
    value: 'Otro',
    label: 'Otro',
  },
  {
    id: '245048',
    value: 'Ripio',
    label: 'Ripio',
  },
]

// disposicion
export const disposicionOptions: SelectOption[] = [
  {
    label: 'Contrafrente',
    value: 'contrafrente',
  },
  {
    label: 'Frente',
    value: 'frente',
  },
  {
    label: 'Interno',
    value: 'interno',
  },
  {
    label: 'Lateral',
    value: 'lateral',
  },
]
// disposicion lote
export const disposicionLoteOptions: SelectOption[] = [
  { value: 'otro', label: 'Otro' },
  { value: 'perimetral', label: 'Perimetral' },
  { value: 'a_rio', label: 'A río' },
  { value: 'a_laguna', label: 'A laguna' },
  { value: 'interno', label: 'Interno' },
]
// disposicion
export const accesoCocheraOptions: SelectOption[] = [
  {
    value: 'rampa_fija',
    label: 'Rampa fija',
  },
  {
    value: 'rampa_movil',
    label: 'Rampa móvil',
  },
  {
    value: 'ascensor',
    label: 'Ascensor',
  },
  {
    value: 'horizontal',
    label: 'Horizontal',
  },
]
// tipo de campo
export const tipoCampoOptions: SelectOption[] = [
  {
    value: 'otro',
    label: 'Otro',
  },
  {
    value: 'fruticola',
    label: 'Frutícola',
  },
  {
    value: 'agricola',
    label: 'Agrícola',
  },
  {
    value: 'chacra',
    label: 'Chacra',
  },
  {
    value: 'criadero',
    label: 'Criadero',
  },
  {
    value: 'tambero',
    label: 'Tambero',
  },
  {
    value: 'floricultura',
    label: 'Floricultura',
  },
  {
    value: 'forestal',
    label: 'Forestal',
  },
  {
    value: 'ganadero',
    label: 'Ganadero',
  },
  {
    value: 'haras',
    label: 'Haras',
  },
]

// Monedas
export const currencyOptions: SelectOption[] = [
  { label: 'USD', value: 'usd' },
  { label: 'ARS', value: 'ars' },
]

// Estados de conservación
export const conservationStatusOptions: SelectOption[] = [
  { label: 'Excelente', value: 'excelente' },
  { label: 'Muy Bueno', value: 'muy_bueno' },
  { label: 'Bueno', value: 'bueno' },
  { label: 'Regular', value: 'regular' },
]

// Orientaciones
export const orientationOptions: SelectOption[] = [
  { label: 'Norte', value: 'norte' },
  { label: 'Sur', value: 'sur' },
  { label: 'Este', value: 'este' },
  { label: 'Oeste', value: 'oeste' },
  // { label: 'Noreste', value: 'noreste' },
  // { label: 'Noroeste', value: 'noroeste' },
  // { label: 'Sureste', value: 'sureste' },
  // { label: 'Suroeste', value: 'suroeste' },
]

// Tipos de cochera
export const garageTypeOptions: SelectOption[] = [
  { label: 'Garage', value: 'garage' },
  { label: 'Garage/Cochera', value: 'garage_cochera' },
  { label: 'Garage Doble', value: 'garage_doble' },
  { label: 'Cochera Pasante', value: 'cochera_pasante' },
  { label: 'Sin Cochera', value: 'sin_cochera' },
]

// Privacidad de ubicación
export const locationPrivacyOptions: SelectOption[] = [
  { label: 'Ubicación exacta', value: 'exact' },
  { label: 'Ubicación aproximada', value: 'approximate' },
  { label: 'No mostrar ubicación', value: 'hidden' },
]

// Amueblado
export const furnishedOptions: SelectOption[] = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
]

// Amueblado
export const checkinTimeOptions: SelectOption[] = [
  { label: '00:00', value: '00:00' },
  { label: '01:00', value: '01:00' },
  { label: '02:00', value: '02:00' },
  { label: '03:00', value: '03:00' },
  { label: '04:00', value: '04:00' },
  { label: '05:00', value: '05:00' },
  { label: '06:00', value: '06:00' },
  { label: '07:00', value: '07:00' },
  { label: '08:00', value: '08:00' },
  { label: '09:00', value: '09:00' },
  { label: '10:00', value: '10:00' },
  { label: '11:00', value: '11:00' },
  { label: '12:00', value: '12:00' },
  { label: '13:00', value: '13:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
  { label: '18:00', value: '18:00' },
  { label: '19:00', value: '19:00' },
  { label: '20:00', value: '20:00' },
  { label: '21:00', value: '21:00' },
  { label: '22:00', value: '22:00' },
  { label: '23:00', value: '23:00' },
]

// Convertir arrays existentes a formato estándar
export const antiguedadOptions: SelectOption[] = [
  { label: 'A Estrenar', value: 'a_estrenar' },
  { label: '6 Meses', value: '6_meses' },
  { label: '1 Año', value: '1_ano' },
  { label: '1 Año y medio', value: '1_ano_y_medio' },
  { label: '2 Años', value: '2_anos' },
  { label: '3 Años', value: '3_anos' },
  { label: '4 Años', value: '4_anos' },
  { label: '5 Años', value: '5_anos' },
  { label: '6 Años', value: '6_anos' },
  { label: '7 Años', value: '7_anos' },
  { label: '8 Años', value: '8_anos' },
  { label: '9 Años', value: '9_anos' },
  { label: '10 Años', value: '10_anos' },
  { label: '11 Años', value: '11_anos' },
  { label: '12 Años', value: '12_anos' },
  { label: '13 Años', value: '13_anos' },
  { label: '14 Años', value: '14_anos' },
  { label: '15 Años', value: '15_anos' },
  { label: '16 Años', value: '16_anos' },
  { label: '17 Años', value: '17_anos' },
  { label: '18 Años', value: '18_anos' },
  { label: '19 Años', value: '19_anos' },
  { label: '20 Años', value: '20_anos' },
  { label: '21 Años', value: '21_anos' },
  { label: '22 Años', value: '22_anos' },
  { label: '23 Años', value: '23_anos' },
  { label: '24 Años', value: '24_anos' },
  { label: '25 Años', value: '25_anos' },
  { label: '26 Años', value: '26_anos' },
  { label: '27 Años', value: '27_anos' },
  { label: '28 Años', value: '28_anos' },
  { label: '29 Años', value: '29_anos' },
  { label: '30 Años', value: '30_anos' },
  { label: '31 Años', value: '31_anos' },
  { label: '32 Años', value: '32_anos' },
  { label: '33 Años', value: '33_anos' },
  { label: '34 Años', value: '34_anos' },
  { label: '35 Años', value: '35_anos' },
  { label: '36 Años', value: '36_anos' },
  { label: '37 Años', value: '37_anos' },
  { label: '38 Años', value: '38_anos' },
  { label: '39 Años', value: '39_anos' },
  { label: '40 Años', value: '40_anos' },
  { label: '41 Años', value: '41_anos' },
  { label: '42 Años', value: '42_anos' },
  { label: '43 Años', value: '43_anos' },
  { label: '44 Años', value: '44_anos' },
  { label: '45 Años', value: '45_anos' },
  { label: '46 Años', value: '46_anos' },
  { label: '47 Años', value: '47_anos' },
  { label: '48 Años', value: '48_anos' },
  { label: '49 Años', value: '49_anos' },
  { label: '50 Años', value: '50_anos' },
  { label: 'Mas de 50 Años', value: 'mas_de_50_anos' },
]

export const tiposPropiedad: SelectOption[] = [
  { label: 'Casa', value: 'casa' },
  { label: 'Departamento', value: 'departamento' },
  { label: 'Lote', value: 'lote' },
  { label: 'Bodega', value: 'bodega' },
  { label: 'Bodega con Viñedo', value: 'bodega_con_vinedo' },
  { label: 'Cabaña', value: 'cabaña' },
  { label: 'Campo', value: 'campo' },
  { label: 'Chalet', value: 'chalet' },
  { label: 'Cochera', value: 'cochera' },
  { label: 'Condominio', value: 'condominio' },
  { label: 'Depósito', value: 'deposito' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Edificio', value: 'edificio' },
  { label: 'Estación de Servicio', value: 'estacion_de_servicio' },
  { label: 'Fábrica', value: 'fábrica' },
  { label: 'Finca', value: 'finca' },
  { label: 'Fondo de Comercio', value: 'fondo_de_comercio' },
  { label: 'Fraccionamiento', value: 'fraccionamiento' },
  { label: 'Galpón', value: 'galpon' },
  { label: 'Hotel', value: 'hotel' },
  { label: 'Industria', value: 'industria' },
  { label: 'Local Comercial', value: 'local_comercial' },
  { label: 'Loft', value: 'loft' },
  { label: 'Loteo', value: 'loteo' },
  { label: 'Negocio', value: 'negocio' },
  { label: 'Oficina', value: 'oficina' },
  { label: 'P.H.', value: 'ph' },
  { label: 'Piso', value: 'piso' },
  { label: 'Playa de Estacionamiento', value: 'playa_de_estacionamiento' },
  { label: 'Casa Quinta', value: 'quinta' },
  { label: 'Semipiso', value: 'semipiso' },
  { label: 'Terreno', value: 'terreno' },
  { label: 'Triplex', value: 'triplex' },
  { label: 'Viñedo', value: 'vinedo' },
]

// === OPCIONES DE AMENITIES ===

// Servicios y características
// export const amenityServicesOptions: SelectOption[] = [
//   { label: 'Barrio abierto', value: 'barrio_abierto' },
//   { label: 'Barrio privado', value: 'barrio_privado' },
//   { label: 'Aire acondicionado', value: 'aire_acondicionado' },
//   { label: 'Internet/Wifi', value: 'internet_wifi' },
//   { label: 'Financiación', value: 'financiacion' },
//   { label: 'Piscina', value: 'piscina' },
//   { label: 'Jacuzzi', value: 'jacuzzi' },
//   { label: 'Apto Crédito Hipotecario', value: 'apto_credito_hipotecario' },
//   { label: 'Cable TV', value: 'cable_tv' },
//   { label: 'Calefacción Central', value: 'calefaccion_central' },
//   { label: 'Permite mascotas', value: 'permite_mascotas' },
//   { label: 'Ofrece financiación', value: 'ofrece_financiacion' },
//   { label: 'Teléfono', value: 'telefono' },
//   { label: 'Uso comercial', value: 'uso_comercial' },
//   { label: 'Agua corriente', value: 'agua_corriente' },
//   { label: 'Alumbrado público', value: 'alumbrado_publico' },
//   { label: 'Cisterna', value: 'cisterna' },
//   { label: 'Desagüe cloacal', value: 'desague_cloacal' },
//   { label: 'Energía solar', value: 'energia_solar' },
//   { label: 'Gas natural', value: 'gas_natural' },
//   { label: 'Luz', value: 'luz' },
//   { label: 'Cámaras CCTV', value: 'camaras_cctv' },
//   { label: 'Alarma', value: 'alarma' },
// ]

export const amenityServicesOptions: SelectOption[] = [
  {
    label: 'Aire Acondicionado',
    value: 'aire_acondicionado',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Servicio de Desayuno',
    value: 'servicio_de_desayuno',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['alquiler_temporario'],
  },
  {
    label: 'Servicio de limpieza',
    value: 'servicio_de_limpieza',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['alquiler_temporario'],
  },
  {
    label: 'Financiación',
    value: 'financiacion',
    type: [
      'casa',
      'departamento',
      'lote',
      'bodega',
      'cabaña',
      'campo',
      'quinta',
      'cochera',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'fábrica',
      'finca',
      'fondo_de_comercio',
      'fraccionamiento',
      'galpon',
      'hotel',
      'industria',
      'local_comercial',
      'loft',
      'loteo',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'terreno',
      'triplex',
      'vinedo',
      'chalet',
      'deposito',
    ],
    condition: ['venta', 'permuta'],
  },
  {
    label: 'Internet',
    value: 'internet',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'deposito',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Piscina',
    value: 'piscina',
    type: [
      'casa',
      'departamento',
      'lote',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'finca',
      'hotel',
      'local_comercial',
      'loft',
      'ph',
      'piso',
      'semipiso',
      'terreno',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Apto Crédito Hipotecario',
    value: 'apto_credito_hipotecario',
    type: [
      'casa',
      'departamento',
      'quinta',
      'condominio',
      'duplex',
      'fraccionamiento',
      'loft',
      'ph',
      'piso',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta'],
  },
  {
    label: 'Cable TV',
    value: 'cable_tv',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Teléfono',
    value: 'telefono',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'lote',
      'campo',
      'quinta',
      'condominio',
      'deposito',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'fábrica',
      'finca',
      'fondo_de_comercio',
      'fraccionamiento',
      'galpon',
      'hotel',
      'industria',
      'local_comercial',
      'loft',
      'loteo',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'terreno',
      'triplex',
      'vinedo',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Calefacción Central',
    value: 'calefaccion_central',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'fábrica',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'industria',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Gas',
    value: 'gas',
    type: ['industria', 'chalet'],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Agua',
    value: 'agua',
    type: ['industria', 'chalet'],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Luz Eléctrica',
    value: 'luz_electrica',
    type: ['industria', 'chalet'],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Recibe Permuta',
    value: 'recibe_permuta',
    type: [
      'casa',
      'departamento',
      'lote',
      'bodega',
      'bodega_con_vinedo',
      'cabaña',
      'campo',
      'quinta',
      'cochera',
      'condominio',
      'deposito',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'fábrica',
      'finca',
      'fondo_de_comercio',
      'fraccionamiento',
      'galpon',
      'hotel',
      'industria',
      'local_comercial',
      'loft',
      'loteo',
      'negocio',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'terreno',
      'triplex',
      'vinedo',
      'chalet',
    ],
    condition: ['venta', 'permuta'],
  },
  {
    label: 'Caldera',
    value: 'caldera',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Cisterna',
    value: 'cisterna',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Energía Solar',
    value: 'energia_solar',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Conexión para lavarropas',
    value: 'conexion_para_lavarropas',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Alarma',
    value: 'alarma',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
  {
    label: 'Seguridad',
    value: 'seguridad',
    type: [
      'casa',
      'departamento',
      'bodega',
      'cabaña',
      'quinta',
      'condominio',
      'duplex',
      'edificio',
      'estacion_de_servicio',
      'finca',
      'fondo_de_comercio',
      'hotel',
      'local_comercial',
      'loft',
      'oficina',
      'ph',
      'piso',
      'playa_de_estacionamiento',
      'semipiso',
      'triplex',
      'chalet',
    ],
    condition: ['venta', 'permuta', 'alquiler', 'alquiler_temporario'],
  },
]

// Ambientes y espacios
export const amenityEnvironmentsOptions: SelectOption[] = [
  { label: 'Parrilla', value: 'parrilla' },
  { label: 'Balcón', value: 'balcon' },
  { label: 'Patio', value: 'patio' },
  { label: 'Desayunador', value: 'desayunador' },
  { label: 'Cocina', value: 'cocina' },
  { label: 'Dormitorio en suite', value: 'dormitorio_en_suite' },
  { label: 'Escritorio', value: 'escritorio' },
  { label: 'Estudio', value: 'estudio' },
  { label: 'Comedor', value: 'comedor' },
  { label: 'Living', value: 'living' },
  { label: 'Living comedor', value: 'living_comedor' },
  { label: 'Cowork', value: 'cowork' },
  { label: 'Gimnasio', value: 'gimnasio' },
  { label: 'Ascensor', value: 'ascensor' },
  { label: 'Club House', value: 'club_house' },
  { label: 'Quincho', value: 'quincho' },
  { label: 'Área de cine', value: 'area_de_cine' },
  { label: 'Área de juegos infantiles', value: 'area_de_juegos_infantiles' },
  { label: 'Área verde', value: 'area_verde' },
  { label: 'Chimenea', value: 'chimenea' },
  { label: 'Dependencia de servicio', value: 'dependencia_de_servicio' },
  { label: 'Estacionamiento para visitantes', value: 'estacionamiento_para_visitantes' },
  { label: 'Portón automático', value: 'porton_automatico' },
  { label: 'Rampa para silla de ruedas', value: 'rampa_para_silla_de_ruedas' },
  { label: 'Salón de usos múltiples', value: 'salon_de_usos_multiples' },
  { label: 'Sauna', value: 'sauna' },
  { label: 'Terraza', value: 'terraza' },
  { label: 'Jacuzzi', value: 'jacuzzi' },
  { label: 'Vestidor', value: 'vestidor' },
  { label: 'Toilette', value: 'toilette' },
  { label: 'Placards', value: 'placards' },
  { label: 'Cancha de padel', value: 'cancha_de_padel' },
  { label: 'Cancha de tenis', value: 'cancha_de_tenis' },
  { label: 'Cancha de basquet', value: 'cancha_de_basquet' },
  { label: 'Cancha de futbol', value: 'cancha_de_futbol' },
  { label: 'Cancha polideportiva', value: 'cancha_polideportiva' },
]

// Zonas cercanas
export const amenityNearbyZonesOptions: SelectOption[] = [
  { label: 'Colegios', value: 'colegios' },
  { label: 'Universidades', value: 'universidades' },
  { label: 'Guarderías', value: 'guarderias' },
  { label: 'Hospitales', value: 'hospitales' },
  { label: 'Centros de salud', value: 'centros_de_salud' },
  { label: 'Centro comercial', value: 'centro_comercial' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Supermercados', value: 'supermercados' },
  { label: 'Club deportivo', value: 'club_deportivo' },
  { label: 'Zona deportiva', value: 'zona_deportiva' },
  { label: 'Ciclovía', value: 'ciclovia' },
  { label: 'Paradas de colectivo', value: 'paradas_de_colectivo' },
  { label: 'Estación de tren', value: 'estacion_de_tren' },
  { label: 'Estación de subte', value: 'estacion_de_subte' },
  { label: 'Parque', value: 'parque' },
  { label: 'Plaza', value: 'plaza' },
]

// === OPCIONES DE UBICACIÓN ===

// Departamentos de Mendoza
export const departmentOptions: SelectOption[] = [
  { label: 'Capital', value: 'capital' },
  { label: 'Godoy Cruz', value: 'godoy_cruz' },
  { label: 'Guaymallén', value: 'guaymallen' },
  { label: 'Las Heras', value: 'las_heras' },
  { label: 'Luján de Cuyo', value: 'lujan_de_cuyo' },
  { label: 'Maipú', value: 'maipu' },
  { label: 'San Martín', value: 'san_martin' },
  { label: 'Rivadavia', value: 'rivadavia' },
  { label: 'Junín', value: 'junin' },
  { label: 'San Rafael', value: 'san_rafael' },
  { label: 'General Alvear', value: 'general_alvear' },
  { label: 'Malargüe', value: 'malargue' },
  { label: 'Tupungato', value: 'tupungato' },
  { label: 'Tunuyán', value: 'tunuyan' },
  { label: 'San Carlos', value: 'san_carlos' },
  { label: 'Lavalle', value: 'lavalle' },
  { label: 'Santa Rosa', value: 'santa_rosa' },
  { label: 'La Paz', value: 'la_paz' },
]

// Localidades/Zonas de Mendoza con departamento
export interface LocalityOption extends SelectOption {
  department: string
}

export const localityOptions: LocalityOption[] = [
  // Capital
  { label: '1ª Sección Parque Central', value: '1a_seccion_parque_central', department: 'capital' },
  { label: '2ª Sección Barrio Cívico', value: '2a_seccion_barrio_civico', department: 'capital' },
  {
    label: "3ª Sección Parque O'Higgins",
    value: '3a_seccion_parque_ohiggins',
    department: 'capital',
  },
  {
    label: '4ª Sección Área Fundacional',
    value: '4a_seccion_area_fundacional',
    department: 'capital',
  },
  {
    label: '5ª Sección Residencial Sur',
    value: '5a_seccion_residencial_sur',
    department: 'capital',
  },
  {
    label: '6ª Sección Residencial Norte',
    value: '6a_seccion_residencial_norte',
    department: 'capital',
  },
  {
    label: '7ª Sección Residencial Parque',
    value: '7a_seccion_residencial_parque',
    department: 'capital',
  },
  { label: '8ª Sección Aeroparque', value: '8a_seccion_aeroparque', department: 'capital' },
  {
    label: '9ª Sección Parque General San Martín',
    value: '9a_seccion_parque_general_san_martin',
    department: 'capital',
  },
  {
    label: '10ª Sección Residencial Los Cerros',
    value: '10a_seccion_residencial_los_cerros',
    department: 'capital',
  },
  { label: '11ª Sección San Agustín', value: '11a_seccion_san_agustin', department: 'capital' },
  { label: '12ª Sección Piedemonte', value: '12a_seccion_piedemonte', department: 'capital' },

  // Godoy Cruz
  { label: 'Godoy Cruz', value: 'godoy_cruz_city', department: 'godoy_cruz' },
  { label: 'Gobernador Benegas', value: 'gobernador_benegas', department: 'godoy_cruz' },
  { label: 'Las Tortugas', value: 'las_tortugas', department: 'godoy_cruz' },
  { label: 'Presidente Sarmiento', value: 'presidente_sarmiento', department: 'godoy_cruz' },
  {
    label: 'San Francisco del Monte',
    value: 'san_francisco_del_monte_gc',
    department: 'godoy_cruz',
  },
  { label: 'Trapiche', value: 'trapiche', department: 'godoy_cruz' },
  { label: 'Villa Marini', value: 'villa_marini', department: 'godoy_cruz' },
  { label: 'Villa Hipódromo', value: 'villa_hipodromo', department: 'godoy_cruz' },
  { label: 'Villa del Parque', value: 'villa_del_parque', department: 'godoy_cruz' },

  // Guaymallén
  { label: 'Guaymallén (Villa Nueva)', value: 'guaymallen_villa_nueva', department: 'guaymallen' },
  { label: 'Villa Nueva', value: 'villa_nueva', department: 'guaymallen' },
  { label: 'La Primavera', value: 'la_primavera', department: 'guaymallen' },
  { label: 'Los Corralitos', value: 'los_corralitos', department: 'guaymallen' },
  { label: 'Puente de Hierro', value: 'puente_de_hierro', department: 'guaymallen' },
  { label: 'El Bermejo', value: 'el_bermejo', department: 'guaymallen' },
  { label: 'Buena Nueva', value: 'buena_nueva', department: 'guaymallen' },
  { label: 'Capilla del Rosario', value: 'capilla_del_rosario', department: 'guaymallen' },
  { label: 'Colonia Segovia', value: 'colonia_segovia', department: 'guaymallen' },
  { label: 'Colonia Molina', value: 'colonia_molina', department: 'guaymallen' },
  { label: 'Dorrego', value: 'dorrego', department: 'guaymallen' },
  { label: 'El Sauce', value: 'el_sauce', department: 'guaymallen' },
  { label: 'Jesús Nazareno', value: 'jesus_nazareno', department: 'guaymallen' },
  { label: 'Kilómetro 8', value: 'kilometro_8', department: 'guaymallen' },
  { label: 'Kilómetro 11', value: 'kilometro_11', department: 'guaymallen' },
  { label: 'Las Cañas', value: 'las_canas', department: 'guaymallen' },
  { label: 'Nueva Ciudad', value: 'nueva_ciudad', department: 'guaymallen' },
  { label: 'Pedro Molina', value: 'pedro_molina', department: 'guaymallen' },
  { label: 'Rodeo de la Cruz', value: 'rodeo_de_la_cruz', department: 'guaymallen' },
  {
    label: 'San Francisco del Monte',
    value: 'san_francisco_del_monte_gm',
    department: 'guaymallen',
  },
  { label: 'San José', value: 'san_jose_gm', department: 'guaymallen' },
  { label: 'Belgrano', value: 'belgrano_gm', department: 'guaymallen' },

  // Las Heras
  { label: 'Blanco Encalada', value: 'blanco_encalada', department: 'las_heras' },
  { label: 'Jocolí', value: 'jocoli_lh', department: 'las_heras' },
  { label: 'El Algarrobal', value: 'el_algarrobal', department: 'las_heras' },
  { label: 'El Borbollón', value: 'el_borbollon', department: 'las_heras' },
  { label: 'El Challao', value: 'el_challao', department: 'las_heras' },
  { label: 'El Pastal', value: 'el_pastal', department: 'las_heras' },
  { label: 'El Plumerillo', value: 'el_plumerillo', department: 'las_heras' },
  { label: 'El Resguardo', value: 'el_resguardo', department: 'las_heras' },
  { label: 'La Cieneguita', value: 'la_cieneguita', department: 'las_heras' },
  { label: 'Las Cuevas', value: 'las_cuevas', department: 'las_heras' },
  { label: 'Las Heras', value: 'las_heras_city', department: 'las_heras' },
  { label: 'Los Penitentes', value: 'los_penitentes', department: 'las_heras' },
  { label: 'Panquehua', value: 'panquehua', department: 'las_heras' },
  { label: 'Polvaredas', value: 'polvaredas', department: 'las_heras' },
  { label: 'Puente del Inca', value: 'puente_del_inca', department: 'las_heras' },
  { label: 'Punta de Vacas', value: 'punta_de_vacas', department: 'las_heras' },
  { label: 'Uspallata', value: 'uspallata', department: 'las_heras' },

  // Luján de Cuyo
  { label: 'Agrelo', value: 'agrelo', department: 'lujan_de_cuyo' },
  { label: 'Barrio Perdriel IV', value: 'barrio_perdriel_iv', department: 'lujan_de_cuyo' },
  { label: 'Carrodilla', value: 'carrodilla', department: 'lujan_de_cuyo' },
  { label: 'Cacheuta', value: 'cacheuta', department: 'lujan_de_cuyo' },
  { label: 'Chacras de Coria', value: 'chacras_de_coria', department: 'lujan_de_cuyo' },
  { label: 'Costa Flores', value: 'costa_flores', department: 'lujan_de_cuyo' },
  { label: 'El Carrizal', value: 'el_carrizal', department: 'lujan_de_cuyo' },
  { label: 'El Salto', value: 'el_salto', department: 'lujan_de_cuyo' },
  { label: 'Mayor Drummond', value: 'mayor_drummond', department: 'lujan_de_cuyo' },
  { label: 'La Puntilla', value: 'la_puntilla', department: 'lujan_de_cuyo' },
  { label: 'Las Compuertas', value: 'las_compuertas', department: 'lujan_de_cuyo' },
  { label: 'Las Vegas', value: 'las_vegas', department: 'lujan_de_cuyo' },
  { label: 'Luján de Cuyo', value: 'lujan_de_cuyo_city', department: 'lujan_de_cuyo' },
  { label: 'Perdriel', value: 'perdriel', department: 'lujan_de_cuyo' },
  { label: 'Potrerillos', value: 'potrerillos', department: 'lujan_de_cuyo' },
  { label: 'Vistalba', value: 'vistalba', department: 'lujan_de_cuyo' },
  { label: 'Ugarteche', value: 'ugarteche', department: 'lujan_de_cuyo' },
  {
    label: 'Vertientes del Pedemonte',
    value: 'vertientes_del_pedemonte',
    department: 'lujan_de_cuyo',
  },

  // Maipú
  { label: 'Barrancas', value: 'barrancas', department: 'maipu' },
  { label: 'Barrio Jesús de Nazaret', value: 'barrio_jesus_de_nazaret', department: 'maipu' },
  { label: 'Coquimbito', value: 'coquimbito', department: 'maipu' },
  { label: 'Cruz de Piedra', value: 'cruz_de_piedra', department: 'maipu' },
  { label: 'El Pedregal', value: 'el_pedregal', department: 'maipu' },
  { label: 'Fray Luis Beltrán', value: 'fray_luis_beltran', department: 'maipu' },
  { label: 'General Gutiérrez', value: 'general_gutierrez', department: 'maipu' },
  { label: 'General Ortega', value: 'general_ortega', department: 'maipu' },
  { label: 'Maipú', value: 'maipu_city', department: 'maipu' },
  { label: 'Lunlunta', value: 'lunlunta', department: 'maipu' },
  { label: 'Luzuriaga', value: 'luzuriaga', department: 'maipu' },
  { label: 'Rodeo del Medio', value: 'rodeo_del_medio', department: 'maipu' },
  { label: 'Russell', value: 'russell', department: 'maipu' },
  { label: 'San Roque', value: 'san_roque', department: 'maipu' },
  { label: 'Villa Teresa', value: 'villa_teresa', department: 'maipu' },

  // San Martín
  { label: 'Alto Verde', value: 'alto_verde_sm', department: 'san_martin' },
  { label: 'Barrio Emanuel', value: 'barrio_emanuel', department: 'san_martin' },
  { label: 'Barrio La Estación', value: 'barrio_la_estacion', department: 'san_martin' },
  { label: 'Barrio Los Charabones', value: 'barrio_los_charabones', department: 'san_martin' },
  {
    label: 'Barrio Nuestra Señora de Fátima',
    value: 'barrio_nuestra_senora_de_fatima',
    department: 'san_martin',
  },
  { label: 'Chapanay', value: 'chapanay', department: 'san_martin' },
  { label: 'Chivilcoy', value: 'chivilcoy', department: 'san_martin' },
  { label: 'El Espino', value: 'el_espino', department: 'san_martin' },
  { label: 'El Central', value: 'el_central', department: 'san_martin' },
  { label: 'El Divisadero', value: 'el_divisadero', department: 'san_martin' },
  { label: 'El Ramblón', value: 'el_ramblon', department: 'san_martin' },
  { label: 'Montecaseros', value: 'montecaseros', department: 'san_martin' },
  {
    label: 'Nueva California (Est. Moluches)',
    value: 'nueva_california_est_moluches',
    department: 'san_martin',
  },
  { label: 'Palmira', value: 'palmira', department: 'san_martin' },
  { label: 'San Martín', value: 'san_martin_city', department: 'san_martin' },
  { label: 'Tres Porteñas', value: 'tres_portenas', department: 'san_martin' },

  // Rivadavia
  { label: 'Andrade', value: 'andrade', department: 'rivadavia' },
  {
    label: 'Barrio Cooperativa Los Campamentos',
    value: 'barrio_cooperativa_los_campamentos',
    department: 'rivadavia',
  },
  { label: 'Barrio Rivadavia', value: 'barrio_rivadavia', department: 'rivadavia' },
  { label: 'El Mirador', value: 'el_mirador', department: 'rivadavia' },
  { label: 'La Central', value: 'la_central', department: 'rivadavia' },
  { label: 'La Esperanza', value: 'la_esperanza', department: 'rivadavia' },
  { label: 'La Florida', value: 'la_florida', department: 'rivadavia' },
  { label: 'La Libertad', value: 'la_libertad', department: 'rivadavia' },
  { label: 'Los Árboles', value: 'los_arboles', department: 'rivadavia' },
  { label: 'Los Campamentos', value: 'los_campamentos', department: 'rivadavia' },
  { label: 'Medrano', value: 'medrano_riv', department: 'rivadavia' },
  { label: 'Mundo Nuevo', value: 'mundo_nuevo_riv', department: 'rivadavia' },
  { label: 'Reducción de Abajo', value: 'reduccion_de_abajo', department: 'rivadavia' },
  { label: 'Rivadavia', value: 'rivadavia_city', department: 'rivadavia' },
  { label: 'Santa María de Oro', value: 'santa_maria_de_oro', department: 'rivadavia' },

  // Junín
  { label: 'Junín Centro', value: 'junin_centro', department: 'junin' },
  { label: 'Los Barriales', value: 'los_barriales', department: 'junin' },
  { label: 'Philipps', value: 'philipps', department: 'junin' },
  { label: 'Medrano', value: 'medrano_jun', department: 'junin' },
  { label: 'Algarrobo Grande', value: 'algarrobo_grande', department: 'junin' },
  { label: 'La Colonia', value: 'la_colonia', department: 'junin' },
  { label: 'Alto Verde', value: 'alto_verde_jun', department: 'junin' },
  { label: 'Rodríguez Peña', value: 'rodriguez_pena', department: 'junin' },
  { label: 'Ingeniero Giagnoni', value: 'inge_giagnoni', department: 'junin' },

  // San Rafael
  {
    label: '25 de Mayo (Villa Veinticinco de Mayo)',
    value: '25_de_mayo_villa_veinticinco_de_mayo',
    department: 'san_rafael',
  },
  {
    label: 'Barrio Campos El Toledano',
    value: 'barrio_campos_el_toledano',
    department: 'san_rafael',
  },
  { label: 'Barrio El Nevado', value: 'barrio_el_nevado', department: 'san_rafael' },
  {
    label: 'Barrio Empleados de Comercio',
    value: 'barrio_empleados_de_comercio',
    department: 'san_rafael',
  },
  { label: 'Barrio Intendencia', value: 'barrio_intendencia', department: 'san_rafael' },
  { label: 'Capitán Montoya', value: 'capitan_montoya', department: 'san_rafael' },
  { label: 'Cuadro Benegas', value: 'cuadro_benegas', department: 'san_rafael' },
  { label: 'El Nihuil', value: 'el_nihuil', department: 'san_rafael' },
  { label: 'El Sosneado', value: 'el_sosneado_sr', department: 'san_rafael' },
  { label: 'El Tropezón', value: 'el_tropezon', department: 'san_rafael' },
  { label: 'Goudge', value: 'goudge', department: 'san_rafael' },
  { label: 'Jaime Prats', value: 'jaime_prats_sr', department: 'san_rafael' },
  { label: 'La Llave Nueva', value: 'la_llave_nueva', department: 'san_rafael' },
  { label: 'Las Malvinas', value: 'las_malvinas', department: 'san_rafael' },
  { label: 'Los Reyunos', value: 'los_reyunos', department: 'san_rafael' },
  { label: 'Monte Comán', value: 'monte_coman', department: 'san_rafael' },
  { label: 'Pobre Diablo', value: 'pobre_diablo', department: 'san_rafael' },
  { label: 'Punta del Agua', value: 'punta_del_agua', department: 'san_rafael' },
  { label: 'Rama Caída', value: 'rama_caida', department: 'san_rafael' },
  { label: 'Real del Padre', value: 'real_del_padre', department: 'san_rafael' },
  { label: 'Salto de las Rosas', value: 'salto_de_las_rosas', department: 'san_rafael' },
  { label: 'San Rafael', value: 'san_rafael_city', department: 'san_rafael' },
  { label: 'Villa Atuel', value: 'villa_atuel', department: 'san_rafael' },

  // General Alvear
  { label: 'General Alvear', value: 'general_alvear', department: 'general_alvear' },
  { label: 'Bowen', value: 'bowen', department: 'general_alvear' },
  { label: 'Carmensa', value: 'carmensa', department: 'general_alvear' },
  { label: 'San Pedro del Atuel', value: 'san_pedro_del_atuel', department: 'general_alvear' },
  { label: 'Colonia Alvear Oeste', value: 'colonia_alvear_oeste', department: 'general_alvear' },
  { label: 'Los Compartos', value: 'los_compartos', department: 'general_alvear' },

  // Malargüe
  { label: 'Agua Escondida', value: 'agua_escondida', department: 'malargue' },
  { label: 'Las Leñas', value: 'las_lenas', department: 'malargue' },
  { label: 'Río Grande', value: 'rio_grande', department: 'malargue' },
  { label: 'Malargüe', value: 'malargue_city', department: 'malargue' },

  // Tupungato
  { label: 'Anchoris', value: 'anchoris', department: 'tupungato' },
  { label: 'Barrio Belgrano Norte', value: 'barrio_belgrano_norte', department: 'tupungato' },
  { label: 'Cordón del Plata', value: 'cordon_del_plata', department: 'tupungato' },
  { label: 'El Peral', value: 'el_peral', department: 'tupungato' },
  { label: 'El Zampal', value: 'el_zampal', department: 'tupungato' },
  { label: 'La Arboleda', value: 'la_arboleda', department: 'tupungato' },
  { label: 'San José', value: 'san_jose_tup', department: 'tupungato' },
  { label: 'Tupungato', value: 'tupungato_city', department: 'tupungato' },
  { label: 'Villa Bastías', value: 'villa_bastias', department: 'tupungato' },

  // Tunuyán
  { label: 'Barrio San Cayetano', value: 'barrio_san_cayetano', department: 'tunuyan' },
  { label: 'Campo Los Andes', value: 'campo_los_andes', department: 'tunuyan' },
  { label: 'Colonia Las Rosas', value: 'colonia_las_rosas', department: 'tunuyan' },
  { label: 'El Manzano', value: 'el_manzano', department: 'tunuyan' },
  { label: 'Los Sauces', value: 'los_sauces', department: 'tunuyan' },
  { label: 'Tunuyán', value: 'tunuyan_city', department: 'tunuyan' },
  { label: 'Vista Flores', value: 'vista_flores', department: 'tunuyan' },

  // San Carlos
  { label: 'Barrio Carrasco', value: 'barrio_carrasco', department: 'san_carlos' },
  { label: 'Barrio El Cepillo', value: 'barrio_el_cepillo', department: 'san_carlos' },
  { label: 'Chilecito', value: 'chilecito', department: 'san_carlos' },
  { label: 'Eugenio Bustos', value: 'eugenio_bustos', department: 'san_carlos' },
  { label: 'La Consulta', value: 'la_consulta', department: 'san_carlos' },
  { label: 'Pareditas', value: 'pareditas_sc', department: 'san_carlos' },
  { label: 'San Carlos', value: 'san_carlos_city', department: 'san_carlos' },

  // Lavalle
  { label: '3 de Mayo', value: '3_de_mayo', department: 'lavalle' },
  { label: 'Barrio Alto del Olvido', value: 'barrio_alto_del_olvido', department: 'lavalle' },
  { label: 'Barrio Jocolí II', value: 'barrio_jocoli_ii', department: 'lavalle' },
  {
    label: 'Barrio Lagunas de Bartoluzzi',
    value: 'barrio_lagunas_de_bartoluzzi',
    department: 'lavalle',
  },
  { label: 'Barrio La Palmera', value: 'barrio_la_palmera', department: 'lavalle' },
  { label: 'Barrio La Pega', value: 'barrio_la_pega', department: 'lavalle' },
  { label: 'Barrio Los Jarilleros', value: 'barrio_los_jarilleros', department: 'lavalle' },
  { label: 'Barrio Los Olivos', value: 'barrio_los_olivos', department: 'lavalle' },
  { label: 'Barrio Virgen del Rosario', value: 'barrio_virgen_del_rosario', department: 'lavalle' },
  { label: 'Costa de Araujo', value: 'costa_de_araujo', department: 'lavalle' },
  { label: 'El Paramillo', value: 'el_paramillo', department: 'lavalle' },
  { label: 'El Vergel', value: 'el_vergel', department: 'lavalle' },
  { label: 'Ingeniero Gustavo André', value: 'ingeniero_gustavo_andre', department: 'lavalle' },
  { label: 'Jocolí', value: 'jocoli_lav', department: 'lavalle' },
  { label: 'Jocolí Viejo', value: 'jocoli_viejo', department: 'lavalle' },
  { label: 'Las Violetas', value: 'las_violetas', department: 'lavalle' },
  { label: 'Villa Tulumaya', value: 'villa_tulumaya', department: 'lavalle' },

  // Santa Rosa
  { label: 'Barrio 12 de Octubre', value: 'barrio_12_de_octubre', department: 'santa_rosa' },
  {
    label: 'Barrio María Auxiliadora',
    value: 'barrio_maria_auxiliadora',
    department: 'santa_rosa',
  },
  { label: 'Barrio Molina Cabrera', value: 'barrio_molina_cabrera', department: 'santa_rosa' },
  { label: 'La Dormida', value: 'la_dormida', department: 'santa_rosa' },
  { label: 'Las Catitas', value: 'las_catitas', department: 'santa_rosa' },
  { label: 'Santa Rosa', value: 'santa_rosa_city', department: 'santa_rosa' },

  // La Paz
  { label: 'Desaguadero', value: 'desaguadero', department: 'la_paz' },
  { label: 'La Paz', value: 'la_paz_city', department: 'la_paz' },
  { label: 'Villa Antigua', value: 'villa_antigua', department: 'la_paz' },
]

// Funciones para convertir formatos legacy a formato estándar
export function convertToSelectOptions(items: string[] | SelectOption[]): SelectOption[] {
  return items.map((item) => {
    if (typeof item === 'string') {
      return {
        label: item,
        value: item
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[áàäâ]/g, 'a')
          .replace(/[éèëê]/g, 'e')
          .replace(/[íìïî]/g, 'i')
          .replace(/[óòöô]/g, 'o')
          .replace(/[úùüû]/g, 'u')
          .replace(/ñ/g, 'n')
          .replace(/[^a-z0-9_]/g, ''),
      }
    }
    return item
  })
}

// Todas las opciones en un objeto para fácil acceso
export const propertySelectOptions = {
  condition: conditionOptions,
  currency: currencyOptions,
  expensesCurrency: currencyOptions,
  appraisalCurrency: currencyOptions,
  conservationStatus: conservationStatusOptions,
  orientation: orientationOptions,
  garageType: garageTypeOptions,
  locationPrivacy: locationPrivacyOptions,
  furnished: furnishedOptions,
  antiquity: antiguedadOptions,
  type: tiposPropiedad,
  department: departmentOptions,
  locality: localityOptions,
  access: accessOptions,
  amenityServices: amenityServicesOptions,
  amenityEnvironments: amenityEnvironmentsOptions,
  amenityNearbyZones: amenityNearbyZonesOptions,
  checkinTimeOptions: checkinTimeOptions,
  disposition: disposicionOptions,
  dispositionLote: disposicionLoteOptions,
  tipoCampo: tipoCampoOptions,
  accesoCochera: accesoCocheraOptions,
}

// Función helper para obtener localidades por departamento
export function getLocalitiesByDepartment(departmentValue: string): SelectOption[] {
  return localityOptions
    .filter((locality) => locality.department === departmentValue)
    .map(({ label, value }) => ({ label, value }))
}
*/
