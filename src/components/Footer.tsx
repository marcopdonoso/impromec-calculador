'use client'
import Logo from './Menu/Logo'
import Navbar from './Menu/Navbar'

export default function Footer() {
  return (
    <section className="bg-gray-button_primary px-4 pb-4 pt-8 lg:px-28 lg:pb-8 lg:pt-14">
      <div className="lg:flex lg:justify-between">
        <div className="lg:flex lg:flex-col lg:justify-start">
          <div className="mb-8 h-14 lg:flex lg:w-24 lg:justify-start">
            <Logo />
          </div>
          <p className="mb-14 text-justify text-sm text-gray-white lg:mb-20 lg:w-[25vw] lg:text-base">
            Contamos con mas de 30 años de experiencia en el mercado, nos hemos
            consolidado como líder en la fabricación de bandejas portacables y
            soportería general en Bolivia.
          </p>
        </div>
        <div className="lg:flex lg:h-14 lg:items-center">
          <Navbar className="hidden lg:flex" footer />
        </div>
      </div>
      <hr className="text-gray-white" />
      <p className="mt-4 text-center text-sm text-gray-white lg:mt-8 lg:text-lg">
        © Todos los derechos reservados
      </p>
    </section>
  )
}
