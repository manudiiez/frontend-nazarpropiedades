'use client'

import { useState } from 'react'
import CustomSelectInput from '@/components/ui/CustomSelectInput'
import { propertyTypes } from '@/constants/propertyTypes'

export default function Nosotros() {
  const [serviceType, setServiceType] = useState('')
  const [propertyType, setPropertyType] = useState('')

  const serviceOptions = [
    { value: '', label: 'Selecciona un servicio' },
    { value: 'comprar', label: 'Comprar un inmueble' },
    { value: 'vender', label: 'Vender mi propiedad' },
    { value: 'alquilar', label: 'Alquilar un inmueble' },
    { value: 'poner-alquiler', label: 'Poner mi propiedad en alquiler' },
    { value: 'tasacion', label: 'Solicitar tasación' },
    { value: 'administracion', label: 'Administración de alquileres' },
    { value: 'asesoria', label: 'Asesoría legal inmobiliaria' },
    { value: 'otro', label: 'Otro servicio' },
  ]

  const propertyOptions = [
    { value: '', label: 'Selecciona el tipo' },
    ...propertyTypes.filter(pt => pt.value !== 'any')
  ]
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="mt-20 pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Especialistas en propiedades minimalistas y contemporáneas con más
            de 15 años de experiencia en el mercado inmobiliario
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-8">
                Nuestra Experiencia
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Somos una empresa inmobiliaria especializada en propiedades de
                diseño contemporáneo y minimalista. Nuestro equipo de
                profesionales altamente capacitados se dedica a brindar un
                servicio personalizado y de excelencia, acompañando a nuestros
                clientes en cada paso del proceso inmobiliario.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                Creemos que cada propiedad tiene una historia única y cada
                cliente merece una atención excepcional. Por eso, nos enfocamos
                en entender las necesidades específicas de cada persona para
                ofrecer soluciones inmobiliarias que superen sus expectativas.
              </p>

            </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    500+
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    Propiedades Vendidas
                  </div>
                </div>
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    15
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    Años de Experiencia
                  </div>
                </div>
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    Clientes Satisfechos
                  </div>
                </div>
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    24h
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    Tiempo de Respuesta
                  </div>
                </div>
              </div>

            {/* <div className="h-96 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
              <svg className="w-16 h-16 fill-gray-400 mb-4" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="text-gray-600 text-center">
                Equipo profesional especializado
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-gray-900 text-center mb-12">
            Nuestros Servicios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Compra de Propiedades */}
            <div className="bg-white p-12 rounded-lg text-center border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg
                className="w-12 h-12 fill-accent mx-auto mb-6"
                viewBox="0 0 24 24"
              >
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Compra de Propiedades
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Te ayudamos a encontrar la propiedad perfecta según tus
              necesidades y presupuesto. Asesoramiento completo desde la
              búsqueda hasta la escrituración.
              </p>
            </div>

            {/* Venta de Propiedades */}
            <div className="bg-white p-12 rounded-lg text-center border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg
                className="w-12 h-12 fill-accent mx-auto mb-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Venta de Propiedades
              </h3>
              <p className="text-gray-600 leading-relaxed">
                 Maximizamos el valor de tu propiedad con estrategias de marketing
              efectivas, tasaciones profesionales y negociación experta.
              </p>
            </div>

            {/* Alquiler de Propiedades */}
            <div className="bg-white p-12 rounded-lg text-center border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg
                className="w-12 h-12 fill-accent mx-auto mb-6"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Alquiler de Propiedades
              </h3>
              <p className="text-gray-600 leading-relaxed">
                 Encontramos el alquiler ideal para ti. Verificación de
              documentación, contratos legales y acompañamiento durante todo el
              proceso.
              </p>
            </div>

            {/* Administraci�n de Alquileres */}
            <div className="bg-white p-12 rounded-lg text-center border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg
                className="w-12 h-12 fill-accent mx-auto mb-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Administración de Alquileres
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Gestionamos tu propiedad en alquiler de forma integral. Búsqueda
              de inquilinos, cobros, mantenimiento y administración completa.
              </p>
            </div>

            {/* Tasaciones Profesionales */}
            <div className="bg-white p-12 rounded-lg text-center border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg
                className="w-12 h-12 fill-accent mx-auto mb-6"
                viewBox="0 0 24 24"
              >
                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c0-1.1-.9-2-2-2H6z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tasaciones Profesionales
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Valuaciones precisas y actualizadas de propiedades para compra,
              venta, seguros o fines legales con certificación profesional.
              </p>
            </div>

            {/* Asesoramiento Legal */}
            <div className="bg-white p-12 rounded-lg text-center border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <svg
                className="w-12 h-12 fill-accent mx-auto mb-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Asesoramiento Legal
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Acompañamiento legal completo en todas las operaciones
              inmobiliarias. Revisión de contratos, escrituras y trámites
              legales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white" id='contacto'>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              ¿Como podemos ayudarte?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Completa el formulario y nos pondremos en contacto contigo en
              menos de 24 horas para brindarte la mejor asesoría inmobiliaria.
            </p>
          </div>

          <form className="bg-gray-50 p-12 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CustomSelectInput
                options={serviceOptions}
                value={serviceType}
                onChange={setServiceType}
                label="¿Qué necesitas?"
                placeholder="Selecciona un servicio"
                labelClassName="text-sm font-medium text-gray-900"
                buttonClassName="px-4 py-3 text-sm bg-white"
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
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white"
                  placeholder="Tu nombre completo"
                  required
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
                  className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white"
                  placeholder="+54 11 1234-5678"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white"
                placeholder="tu@email.com"
                required
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
                className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 bg-white min-h-[120px] resize-y"
                placeholder="Cuéntanos más detalles sobre lo que necesitas: ubicación preferida, presupuesto, características específicas, etc."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-accent-hover transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Enviar consulta
            </button>

            <div className="mt-6 bg-blue-50 text-blue-900 px-4 py-3 rounded-lg text-center text-sm font-medium border border-blue-100">
            📞 Nos pondremos en contacto contigo en menos de 24 horas
            </div>
          </form>

          <div className="mt-16 text-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              También puedes contactarnos directamente
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4 fill-gray-900" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>+54 9 261 419-7323</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4 fill-gray-900" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>nazarpropiedades217@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
