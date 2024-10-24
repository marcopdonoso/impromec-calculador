import CalculatorHeader from './components/CalculatorHeader'
import CalculatorMain from './components/CalculatorMain'

export default function CalculatorPage() {
  return (
    <section className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-4 py-12">
      <CalculatorHeader />
      <CalculatorMain />
    </section>
  )
}
