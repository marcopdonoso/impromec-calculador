'use client'
import CalcResultProductCard from '@/components/CalcResultProductCard'
import CatalogProductCard from '@/components/CatalogProductCard'
import SelectedItemCard from '@/components/SelectedItemCard'

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

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center gap-3 py-2">
      <SelectedItemCard
        image="/img/escalerilla.png"
        alt="Escalerilla"
        primaryText="Bandeja tipo Escalerrila"
        secondaryText="20% de reserva"
      />
      <CalcResultProductCard
        title="Bandeja Recta Liviana (60 mm x 100 mm)"
        subtitle="Hasta 96.33 kg/ml"
        image="/img/escalerilla.png"
        alt="escalerilla"
        description="1 mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2."
        height={60}
        width={100}
        firstOption
      />
      <CatalogProductCard
        primaryText="Curva horizontal 90° (300)"
        secondaryText="Tipo escalerilla"
        image="/img/escalerilla.png"
        id="loco"
        onClick={(id) => alert('hola ' + id)}
      />
    </div>
  )
}
