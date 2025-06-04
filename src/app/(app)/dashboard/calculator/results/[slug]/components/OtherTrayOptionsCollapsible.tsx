import TrayRecommendationCard, {
  TrayRecommendationCardProps,
} from '@/components/TrayRecommendationCard'
import { useProjectStore } from '@/store/useProjectStore'
import { Results } from '@/models/project.model'
import { Tray } from '@/models/tray.model'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useCallback, useEffect, useState } from 'react'

// Importar la variable global desde SectorsListbox
import { activeSectorGlobal } from './SectorsListbox'

export default function OtherTrayOptionsCollapsible() {
  const { currentProject } = useProjectStore()
  const [isOpen, setIsOpen] = useState(false)
  const [otherRecommendedOptions, setOtherRecommendedOptions] = useState<Tray[]>([])  

  // Función para verificar y actualizar las opciones alternativas de bandejas
  const updateOtherOptions = useCallback(() => {
    let options: Tray[] = [];
    
    // Si hay un sector activo con resultados, mostrar sus opciones alternativas
    if (activeSectorGlobal && activeSectorGlobal.results && activeSectorGlobal.results.otherRecommendedOptions) {
      options = activeSectorGlobal.results.otherRecommendedOptions;
      // Mostrando opciones alternativas para el sector activo
    } 
    // Si no hay sector activo pero el proyecto tiene sectores, buscar uno con resultados
    else if (currentProject && currentProject.hasSectors && currentProject.sectors) {
      // Buscar un sector con resultados
      const sectorWithResults = currentProject.sectors.find(sector => 
        sector.results && sector.results.otherRecommendedOptions && sector.results.otherRecommendedOptions.length > 0
      );
      
      if (sectorWithResults && sectorWithResults.results && sectorWithResults.results.otherRecommendedOptions) {
        options = sectorWithResults.results.otherRecommendedOptions;
        // Mostrando opciones alternativas para el primer sector con resultados
      }
    }
    // Si es un proyecto sin sectores, usar sus opciones alternativas
    else if (currentProject && !currentProject.hasSectors && currentProject.results && currentProject.results.otherRecommendedOptions) {
      options = currentProject.results.otherRecommendedOptions;
      // Mostrando opciones alternativas para el proyecto sin sectores
    }
    
    setOtherRecommendedOptions(options);
  }, [currentProject]);
  
  // Ejecutar la verificación cuando cambia el proyecto
  useEffect(() => {
    updateOtherOptions();
    
    // Establecer un intervalo para verificar cambios en el sector activo
    const intervalId = setInterval(() => {
      updateOtherOptions();
    }, 500); // Verificar cada 500ms
    
    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [updateOtherOptions]);

  // Convertir las opciones de bandejas a props para TrayRecommendationCard
  const otherRecommendedOptionsCards: TrayRecommendationCardProps[] | null =
    otherRecommendedOptions &&
    otherRecommendedOptions.map((tray) => {
      return {
        title: `Bandeja Recta ${tray.trayCategory?.toUpperCase() || ''} (${tray.technicalDetails?.heightInMM || 0} mm x ${tray.technicalDetails?.widthInMM || 0} mm)`,
        subtitle: `Hasta ${tray.technicalDetails?.loadResistanceInKgM || 0} kg/ml`,
        description: `${tray.technicalDetails?.thicknessInMM || 0} mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2.`,
        height: tray.technicalDetails?.heightInMM || 0,
        width: tray.technicalDetails?.widthInMM || 0,
        image: `/img/${tray.trayType}.png`,
        alt: `bandeja portacable de tipo ${tray.trayType}`,
      }
    })

  if (!otherRecommendedOptionsCards || otherRecommendedOptionsCards.length === 0) return null

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
          {otherRecommendedOptionsCards.map((tray) => {
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
