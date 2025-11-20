import Link from "next/link";

const Footer = () => {

  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Nazar Propiedades</h3>
            <p className="text-gray-400 leading-relaxed">
              Con más de 15 años de experiencia en el mercado inmobiliario
              mendocino, somos tu mejor opción para comprar, vender o alquilar
              propiedades en Mendoza.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/propiedades?condition=venta"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Comprar
                </Link>
              </li>
              <li>
                <Link
                  href="/propiedades?condition=alquiler"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Alquilar
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros#contacto"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-accent">
                  phone
                </span>
                <span>+54 9 261 419-7323</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-accent">
                  mail
                </span>
                <span>nazarpropiedades217@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-accent">
                  location_on
                </span>
                <span>Av. San Martín Sur 2875, Mendoza.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Nazar Propiedades. Todos los derechos reservados.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
