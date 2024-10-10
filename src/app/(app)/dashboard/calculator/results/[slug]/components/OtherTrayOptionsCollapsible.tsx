import TrayRecommendationCard from '@/components/TrayRecommendationCard'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

export default function OtherTrayOptionsCollapsible() {
  const [isOpen, setIsOpen] = useState(false)

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
  )
}
