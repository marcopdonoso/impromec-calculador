import TrayRecommendationCard, {
  TrayRecommendationCardProps,
} from '@/components/TrayRecommendationCard'
import { Results } from '@/models/project.model'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

export default function OtherTrayOptionsCollapsible() {
  const [isOpen, setIsOpen] = useState(false)

  // TODO: Borrar data mockeada
  const results: Results = {
    moreConvenientOption: {
      id: '1-1-1-1-1',
      trayName: 'Curva horizontal 90° (300 mm)',
      trayDescription:
        'Curva horizontal 90º. Radio = 300 mm.  Permite conducir  el cableado a través de un cambio de dirección ortogonal. El radio interno de esta curva es ideal  para instalaciones con cables de secciones menores, tanto en baja tensión como en ultra baja  tensión.',
      trayType: 'escalerilla',
      technicalDetails: {
        thicknessInMM: 2,
        widthInMM: 100,
        heightInMM: 60,
        usefulAreaInMM2: 5400,
        loadResistanceInKgM: 150,
      },
    },
    otherRecommendedOptions: [
      {
        id: '2-2-2-2-2',
        trayName: 'Curva horizontal 90° (600 mm)',
        trayDescription:
          'Curva horizontal 90º. Radio = 600 mm.  Permite conducir  el cableado a través de un cambio de dirección ortogonal. El radio interno de esta curva es ideal  para instalaciones con cables de secciones menores, tanto en baja tensión como en ultra baja  tensión.',
        trayType: 'escalerilla',
        technicalDetails: {
          thicknessInMM: 2,
          widthInMM: 100,
          heightInMM: 100,
          usefulAreaInMM2: 8000,
          loadResistanceInKgM: 150,
        },
      },
    ],
  }

  const otherRecommendedOptions: TrayRecommendationCardProps[] | null =
    results.otherRecommendedOptions &&
    results.otherRecommendedOptions.map((tray) => {
      return {
        title: tray.trayName,
        subtitle: `Hasta ${tray.technicalDetails.loadResistanceInKgM} kg/ml`,
        description: `${tray.technicalDetails.thicknessInMM} mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2.`,
        height: tray.technicalDetails.heightInMM,
        width: tray.technicalDetails.widthInMM,
        image: `/img/${tray.trayType}.png`,
        alt: `bandeja portacable de tipo ${tray.trayType}`,
      }
    })

  if (otherRecommendedOptions === null) return

  return (
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
          {otherRecommendedOptions.map((tray) => {
            return (
              <TrayRecommendationCard
                key={tray.title}
                title={tray.title}
                subtitle={tray.subtitle}
                image={tray.image}
                alt={tray.alt}
                description={tray.description}
                height={tray.height}
                width={tray.width}
              />
            )
          })}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
