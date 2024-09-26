import Breadcrumbs from '@/components/Breadcrumbs'

interface CalculatorLayoutProps {
  children: React.ReactNode
}

export default function CalculatorLayout({ children }: CalculatorLayoutProps) {
  return (
    <div>
      <Breadcrumbs />
      <div className="flex justify-center">{children}</div>
    </div>
  )
}
