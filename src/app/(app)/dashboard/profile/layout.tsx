import Breadcrumbs from '@/components/Breadcrumbs'
import { ReactNode } from 'react'

interface ProfileLayoutProps {
  children: ReactNode
}
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <Breadcrumbs />
      </div>
      <div className="px-2 pb-20 pt-14 lg:px-28 lg:pb-32 lg:pt-16">
        {children}
      </div>
    </div>
  )
}
