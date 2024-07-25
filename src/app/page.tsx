import AboutusSection from '@/components/landing/AboutusSection'
import CalculatorSection from '@/components/landing/CalculatorSection'
import ProductsSection from '@/components/landing/ProductsSection'
import TopSection from '@/components/landing/TopSection'

export default function Home() {
  return (
    <section className="flex flex-col items-center pt-16 lg:pt-20">
      <TopSection />
      <CalculatorSection />
      <ProductsSection />
      <AboutusSection />
      <section>
        <h4>Contáctanos</h4>
        <p>
          ¿Tienes alguna pregunta, comentario o necesitas más información?
          Completa el formulario a continuación y nos pondremos en contacto
          contigo lo antes posible.
        </p>
      </section>
    </section>
  )
}
