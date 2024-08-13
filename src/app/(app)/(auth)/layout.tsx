interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="lg:bg-auth_background-desktop bg-app_background-mobile bg-cover bg-fixed md:bg-center">
      {children}
    </div>
  )
}
