interface PropertyHeaderProps {
  title: string
  price: number
  condition: string
}

const PropertyHeader = ({ title, price, condition }: PropertyHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between gap-4 items-start border-b border-gray-border pb-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-1 text-left lg:text-right">
        <p className="text-accent text-3xl font-bold">
          ${price.toLocaleString('es-AR')}
        </p>
        <p className="text-text-secondary-light text-base font-normal">
          En {condition}
        </p>
      </div>
    </div>
  )
}

export default PropertyHeader
