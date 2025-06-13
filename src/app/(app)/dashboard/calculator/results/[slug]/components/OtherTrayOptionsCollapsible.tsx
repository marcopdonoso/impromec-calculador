import TrayRecommendationCard, {
  TrayRecommendationCardProps,
} from '@/components/TrayRecommendationCard'
import { useProjectStore } from '@/store/useProjectStore'
import { Tray } from '@/models/tray.model'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useCallback, useEffect, useState } from 'react'

interface OtherTrayOptionsCollapsibleProps {
  activeSectorId: string | null;
}

export default function OtherTrayOptionsCollapsible({ activeSectorId }: OtherTrayOptionsCollapsibleProps) {
  const { currentProject } = useProjectStore()
  const [isOpen, setIsOpen] = useState(false)
  const [otherRecommendedOptions, setOtherRecommendedOptions] = useState<Tray[]>([])  

  // Función para verificar y actualizar las opciones alternativas de bandejas
  const updateOtherOptions = useCallback(() => {
    if (!currentProject) {
      setOtherRecommendedOptions([]);
      return;
    }

    // Reset options
    setOtherRecommendedOptions([]);
    
    // Si es un proyecto con sectores
    if (currentProject.hasSectors && currentProject.sectors?.length) {
      // Si hay un sector activo
      if (activeSectorId) {
        const activeSector = currentProject.sectors.find(sector => sector.id === activeSectorId);
        
        // Solo mostrar opciones si el sector tiene resultados
        if (activeSector?.results?.otherRecommendedOptions?.length) {
          setOtherRecommendedOptions(activeSector.results.otherRecommendedOptions);
        }
      }
    } 
    // Si es un proyecto sin sectores
    else if (currentProject.results?.otherRecommendedOptions?.length) {
      setOtherRecommendedOptions(currentProject.results.otherRecommendedOptions);
    }
  }, [currentProject, activeSectorId]);
  
  // Ejecutar la verificación cuando cambia el proyecto o el sector activo
  useEffect(() => {
    updateOtherOptions();
  }, [updateOtherOptions]);

  // Convertir las opciones de bandejas a props para TrayRecommendationCard
  const otherRecommendedOptionsCards: TrayRecommendationCardProps[] =
    otherRecommendedOptions.map((tray) => ({
      title: `Bandeja Recta ${tray.trayCategory?.toUpperCase() || ''} (${tray.technicalDetails?.heightInMM || 0} mm x ${tray.technicalDetails?.widthInMM || 0} mm)`,
      subtitle: `Hasta ${tray.technicalDetails?.loadResistanceInKgM || 0} kg/ml`,
      description: `${tray.technicalDetails?.thicknessInMM || 0} mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2.`,
      height: tray.technicalDetails?.heightInMM || 0,
      width: tray.technicalDetails?.widthInMM || 0,
      image: `/img/${tray.trayType}.png`,
      alt: `bandeja portacable de tipo ${tray.trayType}`,
    }));

  // No mostrar el componente si no hay opciones para mostrar
  if (otherRecommendedOptionsCards.length === 0) {
    return null;
  }

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
          {otherRecommendedOptionsCards.map((tray) => (
            <TrayRecommendationCard
              key={tray.title}
              title={tray.title}
              subtitle={tray.subtitle}
              description={tray.description}
              height={tray.height}
              width={tray.width}
              image={tray.image}
              alt={tray.alt}
            />
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
