import { Suspense } from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-app_background-mobile bg-cover bg-fixed md:bg-center lg:bg-app_background-desktop">
      <Suspense>{children}</Suspense>
    </div>
  )
}
