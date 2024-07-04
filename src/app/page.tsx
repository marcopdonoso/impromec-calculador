'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

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

export default function Home() {
  const handleChange = (currPage: number) => {
    console.log(currPage)
  }

  return (
    <div className="flex h-full flex-col items-center gap-3 px-3 py-2">
      <Breadcrumbs />
      <div>
        <Link href={'/uno'}>uno</Link>
        <Link href={'/uno/dos'}>dos</Link>
      </div>
    </div>
  )
}
