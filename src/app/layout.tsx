import Footer from '@/components/Footer'
import HeaderMenu from '@/components/Menu/HeaderMenu'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Impromec Calculador',
  description:
    'Impromec Calculador te ayudará a determinar la bandeja portacables ideal para tu instalación. Ahorra tiempo, reduce errores y mejora la eficiencia de tus proyectos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="no-scrollbar">
      <body
        className={`${inter.className} flex min-h-screen flex-col text-gray-text`}
      >
        <header>
          <HeaderMenu />
        </header>
        <main className="grow">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
