interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-app_background-mobile bg-cover bg-fixed md:bg-center lg:bg-app_background-desktop">
      {children}
    </div>
  )
}
