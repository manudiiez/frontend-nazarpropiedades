import Link from 'next/link'

const CTASection = () => {
  return (
    <section id="contacto" className="my-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          ¿Listo para encontrar tu hogar en Mendoza?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Nuestro equipo de expertos está listo para ayudarte a encontrar la
          propiedad perfecta que se ajuste a tus necesidades y presupuesto.
        </p>
        <Link
          href="/nosotros#contacto"
          className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
        >
          Contáctanos
        </Link>
      </div>
    </section>
  )
}

export default CTASection
