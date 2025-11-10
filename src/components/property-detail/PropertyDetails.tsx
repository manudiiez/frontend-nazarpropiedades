interface Specs {
  superficieTotal: number;
  superficieCubierta: number;
  superficieTerreno: number;
  metrosFrente: number;
  metrosFondo: number;
  superficieBalcon: number;
  dormitorios: number;
  banos: number;
  ambientes: number;
  cocheras: number;
  tipoCochera: string;
  amoblado: string;
  anoConstruccion: number;
  estado: string;
}

interface PropertyDetailsProps {
  description: string;
  specs: Specs;
  amenities: string[];
  nearbyPlaces: string[];
}

export default function PropertyDetails({
  description,
  specs,
  amenities,
  nearbyPlaces,
}: PropertyDetailsProps) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-900">Detalles</h2>
      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

      {/* Medidas */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
          Medidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Superficie total</span>
            <span className="text-gray-900 font-semibold">
              {specs.superficieTotal} m²
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Superficie cubierta</span>
            <span className="text-gray-900 font-semibold">
              {specs.superficieCubierta} m²
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Superficie terreno</span>
            <span className="text-gray-900 font-semibold">
              {specs.superficieTerreno} m²
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Metros de frente</span>
            <span className="text-gray-900 font-semibold">
              {specs.metrosFrente} m
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Metros de fondo</span>
            <span className="text-gray-900 font-semibold">
              {specs.metrosFondo} m
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Superficie balcón</span>
            <span className="text-gray-900 font-semibold">
              {specs.superficieBalcon} m²
            </span>
          </div>
        </div>
      </div>

      {/* Ambientes */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
          Ambientes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Dormitorios</span>
            <span className="text-gray-900 font-semibold">
              {specs.dormitorios}
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Baños</span>
            <span className="text-gray-900 font-semibold">{specs.banos}</span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Ambientes</span>
            <span className="text-gray-900 font-semibold">
              {specs.ambientes}
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Cocheras</span>
            <span className="text-gray-900 font-semibold">
              {specs.cocheras} cubiertas
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Tipo cochera</span>
            <span className="text-gray-900 font-semibold">
              {specs.tipoCochera}
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Amoblado</span>
            <span className="text-gray-900 font-semibold">
              {specs.amoblado}
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Año construcción</span>
            <span className="text-gray-900 font-semibold">
              {specs.anoConstruccion}
            </span>
          </div>
          <div className="flex justify-between items-center py-6 border-b border-gray-50">
            <span className="text-gray-600">Estado</span>
            <span className="text-gray-900 font-semibold">{specs.estado}</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
          Amenities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <span className="material-symbols-outlined text-gray-900 text-base">
                check_circle
              </span>
              <span className="text-gray-600 text-sm">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zonas Cercanas */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
          Zonas cercanas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyPlaces.map((place, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <span className="material-symbols-outlined text-gray-900 text-base">
                location_on
              </span>
              <span className="text-gray-600 text-sm">{place}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
          Descripción
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium veritatis, aspernatur sit aperiam non tempore provident molestiae minus asperiores beatae libero alias eius. Aperiam iste cumque facilis voluptas facere id quod necessitatibus excepturi ipsa a at harum aliquam debitis tempore vitae error, dolore, impedit omnis temporibus reiciendis. Minima sequi sunt illo architecto alias libero debitis aliquid assumenda hic dignissimos! Tempora ex dolorem, id vel magni sit quisquam nihil, dicta aut quas voluptates perferendis iusto, neque nemo fuga? Quos ducimus eligendi dolor iste doloribus odio ratione, accusamus harum sint ipsam ex, provident debitis tempore consequatur magnam quas optio placeat! Ex possimus qui voluptatem exercitationem nam sequi, maxime voluptas totam eveniet saepe fuga harum mollitia dolore corporis incidunt alias repellat quis assumenda velit? Vitae quaerat pariatur sapiente veniam reprehenderit aperiam dolor minima sequi maiores ea, expedita voluptatum eos veritatis ratione eius fugiat, fugit magni omnis dolorum itaque. Iusto assumenda in blanditiis, est adipisci eum minima porro tempore maxime veritatis accusantium hic explicabo facere ratione sint. Sed harum vitae similique officia earum sint, ducimus quaerat odit veritatis amet quasi ut, magnam quod nobis libero, minus ullam dolorem. Tempore facere ex repellat alias voluptatibus eum quam vitae excepturi. Culpa ipsam laborum, soluta blanditiis quis distinctio accusamus nulla libero! Asperiores nesciunt, ut optio porro rerum rem necessitatibus, deserunt voluptatibus cupiditate officiis laborum velit doloremque deleniti magnam provident minus tempora vero eius vel alias sed accusamus! Obcaecati minus a placeat numquam quia dolores accusamus, laudantium nostrum consequuntur harum neque commodi iure culpa officiis aut dignissimos! Maiores fugit debitis, consequuntur porro nostrum molestias, vitae ipsum dolor corporis sapiente enim cum soluta, tenetur non aperiam nemo natus qui. Deserunt laboriosam quis, nulla eos soluta accusantium optio dolor sapiente incidunt maiores maxime officiis. Dolorum nobis sint possimus dolore maiores illum eum quidem iure ipsa deserunt veniam, iusto ducimus minus quo, maxime dolores sed molestias ut quod magni qui blanditiis nulla! Pariatur ducimus, quisquam quibusdam dolores cupiditate aliquam ad, iure ut et aut assumenda nobis nesciunt quam. Quasi placeat reiciendis non atque quo quisquam quod fugiat, provident dolore voluptate minima vitae neque nesciunt quam alias quia a. Non totam odit minus animi sunt. Voluptatem ipsa asperiores vitae repellat, quae molestias id veniam, eos voluptas placeat illum dolore expedita magnam, dolorem minima sequi numquam velit ratione illo ut reiciendis laboriosam officiis in ullam. Et voluptatum dignissimos eaque cum expedita, magni dolore! Recusandae officiis corrupti commodi enim voluptatem expedita sint saepe nostrum.</p>
      </div>
    </div>
  );
}
