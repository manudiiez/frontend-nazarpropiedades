import HeroSearchForm from './HeroSearchForm'

const HeroSection = () => {
  return (
    <section id="inicio" className="pt-44 pb-24 px-6 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage:
            "url('https://www.construyehogar.com/wp-content/uploads/2014/07/Dsieño-de-sala-comedor-y-cocina-moderna.jpg')",
        }}
      />
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Inmobiliaria en{' '}
          <span className="underline decoration-accent underline-offset-4">
            Mendoza...
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Encontrá la propiedad perfecta con el mejor acompañamiento profesional.
        </p>

        {/* Search Bar */}
        <HeroSearchForm />
      </div>
    </section>
  )
}

export default HeroSection
