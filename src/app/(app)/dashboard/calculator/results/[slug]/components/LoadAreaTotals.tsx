import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'

// Función auxiliar para formatear los números con un máximo de 2 decimales
const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-'
  return value.toFixed(1).replace(/\.0$/, '') // Elimina .0 si termina en .0
}

interface LoadAreaTotalsProps {
  activeSectorId: string | null;
}

export default function LoadAreaTotals({ activeSectorId }: LoadAreaTotalsProps) {
  const { currentProject } = useProjectStore()
  const [loadResistance, setLoadResistance] = useState<number | undefined>(
    undefined
  )
  const [totalArea, setTotalArea] = useState<number | undefined>(undefined)

  // Actualizar datos cuando cambie el proyecto o el sector activo
  useEffect(() => {
    // Función para obtener los datos del sector activo o del proyecto
    const updateData = () => {
      if (!currentProject) return

      let activeSector = null;
      if (activeSectorId && currentProject.sectors) {
        activeSector = currentProject.sectors.find(sector => sector.id === activeSectorId);
      }

      // Si hay un sector activo con resultados, usar sus datos
      if (activeSector && activeSector.results) {
        setLoadResistance(activeSector.results.calculatedLoadInKgM || 0)
        setTotalArea(activeSector.results.calculatedAreaInMM2 || 0)
        // Usando datos del sector activo
      }
      // Si no hay sector activo pero el proyecto tiene sectores, buscar uno con resultados
      else if (
        currentProject.hasSectors &&
        currentProject.sectors &&
        currentProject.sectors.length > 0
      ) {
        const sectorWithResults =
          currentProject.sectors.find((sector) => sector.results) ||
          currentProject.sectors[0]

        if (sectorWithResults.results) {
          setLoadResistance(sectorWithResults.results.calculatedLoadInKgM || 0)
          setTotalArea(sectorWithResults.results.calculatedAreaInMM2 || 0)
          // Usando datos del primer sector con resultados
        }
      }
      // Proyecto sin sectores
      else if (currentProject.results) {
        setLoadResistance(currentProject.results.calculatedLoadInKgM || 0)
        setTotalArea(currentProject.results.calculatedAreaInMM2 || 0)
      }
    }

    // Ejecutar al montar el componente
    updateData()
  }, [currentProject, activeSectorId])

  // La función updateData se ha movido dentro del useEffect para evitar dependencias cambiantes

  return (
    <div className="mb-4 flex w-full flex-col rounded-lg bg-gray-input p-4 lg:flex-row lg:items-center lg:justify-between lg:px-5 lg:py-3">
      <p className="body_small_medium lg:body_medium_medium">Resultado</p>
      <div className="flex flex-col items-end">
        <p className="body_medium_medium lg:body_large_semibold">
          Carga total: {formatNumber(loadResistance)} kg/ml
        </p>
        <p className="body_medium_medium lg:body_large_semibold">
          Área total: {formatNumber(totalArea)} mm²
        </p>
      </div>
    </div>
  )
}
