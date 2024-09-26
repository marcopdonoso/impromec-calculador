interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-app_background-mobile bg-cover bg-fixed md:bg-center lg:bg-auth_background-desktop">
      {children}
    </div>
  )
}
