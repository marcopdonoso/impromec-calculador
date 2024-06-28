import Carousel from '@/components/Carousel'

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
]

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center gap-3 px-3 py-2">
      <Carousel images={images} />
    </div>
  )
}
