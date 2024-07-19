'use client'
import Footer from '@/components/Footer'
import HeaderMenu from '@/components/Menu/HeaderMenu'

const opciones = [
  { value: '1.5', text: '1.5 mm2' },
  { value: '2.5', text: '2.5 mm2' },
  { value: '4', text: '4 mm2' },
  { value: '6', text: '6 mm2' },
]

const items = [
  { label: 'Escalerilla', image: 'escalerilla' },
  { label: 'Canal', image: 'escalerilla' },
]

const images = [
  { src: '/img/escalerilla.png', alt: 'Escalerilla' },
  { src: '/img/curva.png', alt: 'Curva' },
  { src: '/img/escalerilla.png', alt: 'Escalerilla' },
]

const options = ['100mm', '200mm', '300mm', '400mm', '500mm', '600mm']

export interface Navlink {
  name: string
  path: string
}

export const navlinks: Navlink[] = [
  { name: 'Inicio', path: '/' },
  { name: 'Calculador', path: '/calculator' },
  { name: 'Productos', path: '/products' },
  { name: 'Nosotros', path: '/about' },
  { name: 'Contáctanos', path: '/contact' },
]

export type User = {
  id: string
  avatar: string | null
  name: string
  email: string
  company: string | null
  area: string
  phone: string
  location: string
  createdAt: string
  updatedAt: string
}

const user = {
  id: '1',
  avatar: null,
  name: 'Marco Perez Donoso',
  email: 'marcopdonoso@gmail.com',
  company: 'Impromec',
  area: 'Development',
  phone: '123456789',
  location: 'Mexico City',
  createdAt: '2021-09-01',
  updatedAt: '2021-09-01',
}

export const userFromStore: User | null = user

const onchage = () => {
  console.log('cambio')
}

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <header>
        <HeaderMenu />
      </header>
      <main className="grow">Principal</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
