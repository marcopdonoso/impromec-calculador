import AboutusSection from '@/components/landing/AboutusSection'
import CalculatorSection from '@/components/landing/CalculatorSection'
import ContactForm from '@/components/landing/ContactForm'
import IconTextFeature from '@/components/landing/IconTextFeature'
import ProductsSection from '@/components/landing/ProductsSection'
import TopSection from '@/components/landing/TopSection'
import Image from 'next/image'

export default function Home() {
  return (
    <section className="flex flex-col items-center pt-16 lg:pt-20">
      <TopSection />
      <CalculatorSection />
      <ProductsSection />
      <AboutusSection />
      <section className="w-full px-4 pb-11 pt-12 lg:relative lg:flex lg:gap-24 lg:px-28 lg:py-28">
        <div className="lg:flex lg:w-1/2 lg:flex-col lg:justify-center">
          <h4 className="body_large_semibold mb-2 lg:heading_h4 lg:mb-6">
            Contáctanos
          </h4>
          <p className="body_small_regular mb-8 text-justify lg:body_large_regular lg:mb-12">
            ¿Tienes alguna pregunta, comentario o necesitas más información?
            Completa el formulario a continuación y nos pondremos en contacto
            contigo lo antes posible.
          </p>

          <div className="mb-8 flex flex-col gap-8">
            <IconTextFeature icon="/svg/Icon_location.svg" alt="">
              Estamos en Planta Industrial &ldquo;El Abra&rdquo; Av. Cristo de
              la Concordia esq. Fairos, 1/2 cuadra al Norte Cochabamba - Bolivia
            </IconTextFeature>
            <IconTextFeature icon="/svg/Icon_phone.svg" alt="">
              Llámanos ahora: 4061219 - 72216766 - 67400666 - 65342591
              {/* TODO REEMPLAZAR POR TELEFONOS DEFINITIVOS */}
            </IconTextFeature>
            <IconTextFeature icon="/svg/Icon_letter.svg" alt="">
              Escríbenos a nuestro correo: contacto@impromec.com
            </IconTextFeature>
          </div>
        </div>
        <div className="lg:relative lg:w-1/2">
          <ContactForm />
          <Image
            src={'/svg/circulo_logo.svg'}
            alt=""
            width={500}
            height={500}
            className="absolute -bottom-20 -left-20 -z-10 hidden h-auto w-72 lg:block"
          />
        </div>
        <Image
          src={'/svg/circulo_logo_esquina.svg'}
          alt=""
          width={500}
          height={500}
          className="absolute left-0 top-0 hidden h-auto w-52 lg:block"
        />
      </section>
    </section>
  )
}
