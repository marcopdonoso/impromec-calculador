import CalculatorSection from '@/components/landing/CalculatorSection'
import ProductsSection from '@/components/landing/ProductsSection'
import TopSection from '@/components/landing/TopSection'

export default function Home() {
  return (
    <section className="flex flex-col items-center pt-16 lg:pt-20">
      <TopSection />
      <CalculatorSection />
      <ProductsSection />
    </section>
  )
}
