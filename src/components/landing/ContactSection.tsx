import Image from 'next/image'
import IconTextFeature from '../IconTextFeature'
import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section
      className="w-full px-4 pb-11 pt-12 lg:relative lg:flex lg:gap-24 lg:px-28 lg:py-28"
      id="contact"
    >
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
          <IconTextFeature icon="/svg/Icon_location.svg" alt="location">
            Av. López 003, ½ cuadra al norte de Av. Villarroel, Cochabamba,
            Bolivia.
            <a
              href="https://maps.app.goo.gl/vbLiHMKQ1d8re5SR8"
              target="_blank"
              className="block text-gray-button_primary underline"
            >
              Ver Mapa
            </a>
          </IconTextFeature>
          <IconTextFeature icon="/svg/Icon_phone.svg" alt="phone">
            Llámanos ahora: 72216766 - 65342591 - 72287592
          </IconTextFeature>
          <IconTextFeature icon="/svg/Icon_letter.svg" alt="email">
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
  )
}
