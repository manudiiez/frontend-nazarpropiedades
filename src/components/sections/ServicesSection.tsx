import type { Service } from '@/types'

const services: Service[] = [
  {
    icon: 'map',
    title: 'Experiencia Local',
    description:
      'Con más de 15 años de experiencia en el mercado inmobiliario mendocino, conocemos cada rincón de la provincia.',
  },
  {
    icon: 'verified_user',
    title: 'Servicio Confiable',
    description:
      'Tu confianza es nuestra prioridad. Trabajamos con total transparencia y compromiso en cada operación.',
  },
  {
    icon: 'support_agent',
    title: 'Atención Personalizada',
    description:
      'Te acompañamos en cada paso del proceso, brindándote el asesoramiento personalizado que necesitás.',
  },
]

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 px-6 bg-gray-ui">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Su asesor de confianza en bienes raíces
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos un servicio integral de asesoramiento inmobiliario con el
            respaldo de años de experiencia en el mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-red/10 rounded-lg">
                  <span className="material-symbols-outlined text-accent-red text-4xl">
                    {service.icon}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
