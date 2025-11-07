import type { Benefit } from '@/types'

const benefits: Benefit[] = [
  {
    icon: 'group',
    title: '+100',
    subtitle: 'clientes',
  },
  {
    icon: 'bolt',
    title: 'Gestión',
    subtitle: 'ágil',
  },
  {
    icon: 'shield',
    title: 'Confianza',
    subtitle: 'sólida',
  },
  {
    icon: 'location_on',
    title: '+100',
    subtitle: 'propiedades',
  },
]

const BenefitsStrip = () => {
  return (
    <section className="py-16 px-6 border-t border-b border-gray-border bg-gray-ui">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <span className="material-symbols-outlined text-accent-red text-5xl">
                  {benefit.icon}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsStrip
