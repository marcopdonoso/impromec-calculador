'use client'
import Button from '@/components/Button'
import CalcResultProductCard from '@/components/CalcResultProductCard'
import MyListbox from '@/components/MyListbox'
import SelectedItemCard from '@/components/SelectedItemCard'
import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  PencilIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AddedCablesTable from '../../components/AddedCablesTable'
import ProjectOverviewContent from '../../components/ProjectOverviewContent'

export default function ResultsPage() {
  const [isOpen, setIsOpen] = useState(false)

  const sectorsList = [
    { text: '[Sector 1: Sala de servidores]', value: '[0]' },
    { text: '[Sector 2: Sala de máquinas]', value: '[1]' },
  ]

  return (
    <section className="flex min-h-screen flex-col px-4 pb-20 pt-12">
      <Image
        src={'/svg/Logo_text.svg'}
        alt="Logo_Impromec"
        width={258}
        height={218}
        className="mb-6 h-24 w-auto"
      />

      <div className="mb-8 flex w-full flex-col items-center gap-2">
        <h4 className="body_medium_medium text-center">
          ¡Hemos calculado tu bandeja ideal!
        </h4>
        <p className="body_small_regular text-center">
          Podrás revisar el resumen de tu proyecto junto a las recomendaciones
          de acuerdo al resultado
        </p>
      </div>

      <div className="mb-6 flex w-full justify-end">
        <Link href={'/dashboard/calculator/projects-list'}>
          <Button
            variant="icon_right"
            icon={<ChevronRightIcon />}
            className="max-w-52"
          >
            Mis proyectos
          </Button>
        </Link>
      </div>

      <div className="mb-7 w-full">
        <div className="body_small_medium mb-6 flex rounded-lg bg-gray-text_alt px-5 py-3 text-gray-white">
          Resumen de tu proyecto ([2 sectores])
        </div>
        <ProjectOverviewContent />
      </div>

      <div className="mb-6">
        <MyListbox options={sectorsList} backgroundColor="bg-gray-background" />
      </div>

      <div className="mb-6 w-full">
        <SelectedItemCard
          image="/img/escalerilla.png"
          primaryText="[Bandeja tipo Escalerilla]"
          secondaryText="20% de reserva"
        />
      </div>

      <div className="mb-8 w-full">
        <AddedCablesTable />
      </div>

      <div className="mb-4 w-full rounded-lg bg-gray-input p-4">
        <p className="body_small_medium">Resultado</p>
        <p className="body_medium_medium">Carga total: [0.12] kg/ml</p>
        <p className="body_medium_medium">Área total: [5000] mm²</p>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Image
          src={'/svg/star-fill.svg'}
          alt="yellow_star_icon"
          width={24}
          height={24}
          className="h-6 w-auto rounded-full border"
        />
        <p className="body_small_medium">Opción más conveniente</p>
      </div>

      <CalcResultProductCard
        title="Bandeja Recta Liviana (60 mm x 100 mm)"
        subtitle="Hasta 96.33 kg/ml"
        image="/img/escalerilla.png"
        alt="bandeja_portacable_tipo_escalerilla"
        description="1 mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2."
        height={60}
        width={100}
        firstOption
      />

      <hr className="my-6 text-gray-placeholder" />

      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="mb-4">
        <Collapsible.Trigger className="mb-6 flex w-full items-center justify-between">
          <p className="body_small_medium">Otras opciones recomendadas</p>
          {isOpen ? (
            <ChevronUpIcon className="w-5" />
          ) : (
            <ChevronDownIcon className="w-5" />
          )}
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className="flex flex-col gap-4">
            <CalcResultProductCard
              title="Bandeja Recta Liviana (60 mm x 100 mm)"
              subtitle="Hasta 96.33 kg/ml"
              image="/img/escalerilla.png"
              alt="bandeja_portacable_tipo_escalerilla"
              description="1 mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2."
              height={60}
              width={100}
            />
            <CalcResultProductCard
              title="Bandeja Recta Liviana (60 mm x 100 mm)"
              subtitle="Hasta 96.33 kg/ml"
              image="/img/escalerilla.png"
              alt="bandeja_portacable_tipo_escalerilla"
              description="1 mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2."
              height={60}
              width={100}
            />
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      <div className="flex w-full flex-col gap-4">
        <Button variant="secondary" icon={<ArrowDownTrayIcon />}>
          Descargar
        </Button>

        <Button icon={<PhoneIcon />}>Solicitar Cotización del Proyecto</Button>
      </div>

      <hr className="my-6 text-gray-placeholder" />

      <div className="flex w-full flex-col gap-4">
        <Button variant="add" icon={<PencilIcon />}>
          Editar
        </Button>
        <Button variant="destructive">Eliminar Proyecto</Button>
      </div>
    </section>
  )
}
