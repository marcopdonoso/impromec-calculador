import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'

// Función auxiliar para formatear los números con un máximo de 2 decimales
const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'No data'
  return value.toFixed(1).replace(/\.0$/, '') // Elimina .0 si termina en .0
}

interface LoadAreaTotalsProps {
  activeSectorId: string | null;
}

export default function LoadAreaTotals({ activeSectorId }: LoadAreaTotalsProps) {
  const { currentProject } = useProjectStore()
  const [loadResistance, setLoadResistance] = useState<number | null>(null)
  const [totalArea, setTotalArea] = useState<number | null>(null)

  // Actualizar datos cuando cambie el proyecto o el sector activo
  useEffect(() => {
    // Resetear los valores
    setLoadResistance(null)
    setTotalArea(null)

    if (!currentProject) return

    // Si es un proyecto con sectores
    if (currentProject.hasSectors && currentProject.sectors?.length) {
      // Si hay un sector activo
      if (activeSectorId) {
        const activeSector = currentProject.sectors.find(sector => sector.id === activeSectorId)
        // Solo mostrar datos si el sector tiene resultados
        if (activeSector?.results) {
          setLoadResistance(activeSector.results.calculatedLoadInKgM ?? null)
          setTotalArea(activeSector.results.calculatedAreaInMM2 ?? null)
        }
      }
    } 
    // Si es un proyecto sin sectores
    else if (currentProject.results) {
      setLoadResistance(currentProject.results.calculatedLoadInKgM ?? null)
      setTotalArea(currentProject.results.calculatedAreaInMM2 ?? null)
    }
  }, [currentProject, activeSectorId])

  return (
    <div className="mb-4 flex w-full flex-col rounded-lg bg-gray-input p-4 lg:flex-row lg:items-center lg:justify-between lg:px-5 lg:py-3">
      <p className="body_small_medium lg:body_medium_medium">Resultado</p>
      <div className="flex flex-col items-end">
        <p className="body_medium_medium lg:body_large_semibold">
          Carga total: {formatNumber(loadResistance)} {loadResistance !== null ? 'kg/ml' : ''}
        </p>
        <p className="body_medium_medium lg:body_large_semibold">
          Área total: {formatNumber(totalArea)} {totalArea !== null ? 'mm²' : ''}
        </p>
      </div>
    </div>
  )
}
