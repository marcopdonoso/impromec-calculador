'use client'
import Button from '@/components/Button'
import MyListbox from '@/components/MyListbox'
import SelectedItemCard from '@/components/SelectedItemCard'
import TrayRecommendationCard from '@/components/TrayRecommendationCard'
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
    <section className="flex min-h-screen flex-col items-center px-4 pb-20 pt-12 lg:px-28">
      <div className="flex w-full max-w-4xl flex-col">
        <Image
          src={'/svg/Logo_text.svg'}
          alt="Logo_Impromec"
          width={258}
          height={218}
          className="mb-6 h-24 w-auto lg:mb-10 lg:h-28"
        />

        <div className="mb-8 flex w-full flex-col items-center gap-2 lg:mb-16">
          <h4 className="body_medium_medium text-center lg:heading_h4">
            ¡Hemos calculado tu bandeja ideal!
          </h4>
          <p className="body_small_regular text-center lg:body_large_regular">
            Podrás revisar el resumen de tu proyecto junto a las recomendaciones
            de acuerdo al resultado
          </p>
        </div>

        <div className="mb-6 flex w-full justify-end">
          <Link href={'/dashboard/calculator/projects-list'}>
            <Button
              variant="icon_right"
              icon={<ChevronRightIcon />}
              className="max-w-52 lg:w-52"
            >
              Mis proyectos
            </Button>
          </Link>
        </div>

        <div className="lg:-mx-20 lg:mb-12 lg:rounded-2xl lg:border lg:border-gray-placeholder lg:px-20 lg:py-20">
          <div className="mb-7 w-full lg:mb-6">
            <div className="body_small_medium mb-6 flex rounded-lg bg-gray-text_alt px-5 py-3 text-gray-white lg:body_medium_medium">
              Resumen de tu proyecto ([2 sectores])
            </div>
            <ProjectOverviewContent />
          </div>

          <div className="mb-6 w-full">
            <MyListbox
              options={sectorsList}
              backgroundColor="bg-gray-background"
            />
          </div>

          <div className="mb-6 w-full">
            <SelectedItemCard
              image="/img/escalerilla.png"
              primaryText="[Bandeja tipo Escalerilla]"
              secondaryText="20% de reserva"
            />
          </div>

          <div className="mb-8 w-full lg:mb-16">
            <AddedCablesTable />
          </div>

          <div className="mb-4 flex w-full flex-col rounded-lg bg-gray-input p-4 lg:flex-row lg:items-center lg:justify-between lg:px-5 lg:py-3">
            <p className="body_small_medium lg:body_medium_medium">Resultado</p>
            <div>
              <p className="body_medium_medium lg:body_large_semibold">
                Carga total: [0.12] kg/ml
              </p>
              <p className="body_medium_medium lg:body_large_semibold">
                Área total: [5000] mm²
              </p>
            </div>
          </div>

          <div className="mb-4 flex w-full items-center gap-2">
            <Image
              src={'/svg/star-fill.svg'}
              alt="yellow_star_icon"
              width={24}
              height={24}
              className="h-6 w-auto rounded-full border"
            />
            <p className="body_small_medium lg:body_medium_medium">
              Opción más conveniente
            </p>
          </div>

          <TrayRecommendationCard
            title="Bandeja Recta Liviana (60 mm x 100 mm)"
            subtitle="Hasta 96.33 kg/ml"
            image="/img/escalerilla.png"
            alt="bandeja_portacable_tipo_escalerilla"
            description="1 mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2."
            height={60}
            width={100}
            firstOption
          />

          <hr className="my-6 text-gray-placeholder lg:my-12" />

          <Collapsible.Root
            open={isOpen}
            onOpenChange={setIsOpen}
            className="mb-4 w-full"
          >
            <Collapsible.Trigger className="mb-6 flex w-full items-center justify-between">
              <p className="body_small_medium lg:body_medium_medium">
                Otras opciones recomendadas
              </p>
              {isOpen ? (
                <ChevronUpIcon className="w-5" />
              ) : (
                <ChevronDownIcon className="w-5" />
              )}
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div className="flex flex-col gap-4">
                <TrayRecommendationCard
                  title="Bandeja Recta Liviana (60 mm x 100 mm)"
                  subtitle="Hasta 96.33 kg/ml"
                  image="/img/escalerilla.png"
                  alt="bandeja_portacable_tipo_escalerilla"
                  description="1 mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2."
                  height={60}
                  width={100}
                />
                <TrayRecommendationCard
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
        </div>

        <div className="flex w-full flex-col gap-4 lg:mb-14 lg:flex-row lg:gap-10">
          <Button variant="secondary" icon={<ArrowDownTrayIcon />}>
            Descargar
          </Button>

          <Button icon={<PhoneIcon />}>
            Solicitar Cotización del Proyecto
          </Button>
        </div>

        <hr className="my-6 w-full text-gray-placeholder lg:hidden" />

        <div className="flex w-full flex-col gap-4">
          <Button variant="add" icon={<PencilIcon />}>
            Editar
          </Button>
          <Button variant="destructive">Eliminar Proyecto</Button>
        </div>
      </div>
    </section>
  )
}
