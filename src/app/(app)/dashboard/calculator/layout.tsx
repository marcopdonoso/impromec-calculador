import Breadcrumbs from '@/components/Breadcrumbs'

interface CalculatorLayoutProps {
  children: React.ReactNode
}

export default function CalculatorLayout({ children }: CalculatorLayoutProps) {
  return (
    <div>
      <div className="flex h-16 items-center px-28">
        <Breadcrumbs />
      </div>
      {children}
    </div>
  )
}
