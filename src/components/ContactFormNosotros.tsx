"use client";

import { useState } from "react";
import CustomSelectInput from "@/components/ui/CustomSelectInput";
import { propertyTypes } from "@/constants/propertyTypes";

export default function ContactFormNosotros({ n8nUri }: { n8nUri?: string }) {
  const [serviceType, setServiceType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const serviceOptions = [
    { value: "", label: "Selecciona un servicio" },
    { value: "comprar", label: "Comprar un inmueble" },
    { value: "vender", label: "Vender mi propiedad" },
    { value: "alquilar", label: "Alquilar un inmueble" },
    { value: "poner-alquiler", label: "Poner mi propiedad en alquiler" },
    { value: "tasacion", label: "Solicitar tasación" },
    { value: "administracion", label: "Administración de alquileres" },
    { value: "asesoria", label: "Asesoría legal inmobiliaria" },
    { value: "otro", label: "Otro servicio" },
  ];

  const propertyOptions = [
    { value: "", label: "Selecciona el tipo" },
    ...propertyTypes.filter((pt) => pt.value !== "any"),
  ];

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);

    const form = e.currentTarget;

    const formData = {
      desde: "nosotros",
      servicio: serviceType,
      tipoPropiedad: propertyType,
      nombre: (form.elements.namedItem("name") as HTMLInputElement).value,
      telefono: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      mensaje: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      if (!n8nUri) {
        throw new Error("n8nUri is not defined");
      }
      const response = await fetch(n8nUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        form.reset();
        setServiceType("");
        setPropertyType("");
        setTimeout(() => setShowSuccessMessage(false), 6000);
      } else {
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 6000);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Success message */}
      {showSuccessMessage && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center text-sm mb-6 border border-green-200">
          ✅ Mensaje enviado correctamente. Nos pondremos en contacto contigo
          pronto.
        </div>
      )}

      {/* Error message */}
      {showErrorMessage && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center text-sm mb-6 border border-red-200">
          ❌ Ocurrió un error al enviar el mensaje. Por favor, intenta
          nuevamente.
        </div>
      )}

      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-50 p-12 rounded-lg border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CustomSelectInput
            options={serviceOptions}
            value={serviceType}
            onChange={setServiceType}
            label="¿Qué necesitas?"
            placeholder="Selecciona un servicio"
            labelClassName="text-sm font-medium text-gray-900"
            buttonClassName="px-4 py-3 text-sm bg-white"
            disabled={isLoading}
          />

          <CustomSelectInput
            options={propertyOptions}
            value={propertyType}
            onChange={setPropertyType}
            label="Tipo de propiedad"
            placeholder="Selecciona el tipo"
            labelClassName="text-sm font-medium text-gray-900"
            buttonClassName="px-4 py-3 text-sm bg-white"
            searchable={true}
            searchPlaceholder="Buscar tipo de propiedad..."
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Tu nombre completo"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-900"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="+54 11 1234-5678"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="email" className="text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="tu@email.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-900"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white min-h-[120px] resize-y disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Cuéntanos más detalles sobre lo que necesitas: ubicación preferida, presupuesto, características específicas, etc."
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-accent-hover transition-all hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isLoading ? "Enviando..." : "Enviar consulta"}
        </button>

        {!showSuccessMessage && !showErrorMessage && (
          <div className="mt-6 bg-blue-50 text-blue-900 px-4 py-3 rounded-lg text-center text-sm font-medium border border-blue-100">
            📞 Nos pondremos en contacto contigo en menos de 24 horas
          </div>
        )}
      </form>
    </div>
  );
}
