import { CableInTray } from '@/models/cable.model'
import { InstallationLayerType, Project, Sector } from '@/models/project.model'
import { TrayType } from '@/models/tray.model'
import {
  updateSectorInstallationLayer,
  updateSectorReservePercentage,
  updateSectorTrayType,
} from '@/services/project.service'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'
import Cables from './Cables'
import InstallationLayerSelector from './InstallationLayerSelector'
import Tray from './Tray'

interface DataForCalculationProps {
  currentSector?: Sector | null
  currentProject?: Project | null
  trayType?: TrayType
  reservePercentage?: number
  onTrayTypeChange?: (newType: TrayType) => void
  onReservePercentageChange?: (newValue: number) => void
}

export default function DataForCalculation({
  currentSector,
  currentProject,
  trayType: initialTrayType,
  reservePercentage: initialReservePercentage,
  onTrayTypeChange,
  onReservePercentageChange,
}: DataForCalculationProps) {
  const isProjectWithoutSectors = currentProject && !currentProject.hasSectors

  const defaultTrayType = isProjectWithoutSectors
    ? currentProject?.trayTypeSelection || 'escalerilla'
    : currentSector?.trayTypeSelection || 'escalerilla'

  const defaultReservePercentage = isProjectWithoutSectors
    ? currentProject?.reservePercentage || 30
    : currentSector?.reservePercentage || 30

  const trayType = initialTrayType || defaultTrayType
  const reservePercentage = initialReservePercentage || defaultReservePercentage

  const [cables, setCables] = useState<CableInTray[]>([])

  useEffect(() => {
    let updatedCables: CableInTray[] = []

    if (isProjectWithoutSectors && currentProject?.cables) {
      updatedCables = [...currentProject.cables]
    } else if (currentSector?.cables) {
      updatedCables = [...currentSector.cables]
    } else if (currentSector?.cablesInTray) {
      updatedCables = [...currentSector.cablesInTray]
    }

    setCables(updatedCables)
  }, [currentProject, currentSector, isProjectWithoutSectors])

  const [installationLayer, setInstallationLayer] =
    useState<InstallationLayerType | null>(
      isProjectWithoutSectors
        ? currentProject?.installationLayerSelection || 'singleLayer'
        : currentSector?.installationLayerSelection || 'singleLayer'
    )

  useEffect(() => {
    if (isProjectWithoutSectors) {
      setInstallationLayer(
        currentProject?.installationLayerSelection || 'singleLayer'
      )
    } else {
      setInstallationLayer(
        currentSector?.installationLayerSelection || 'singleLayer'
      )
    }
  }, [currentSector, currentProject, isProjectWithoutSectors])

  const { updateProjectDataWithSector } = useProjectStore()

  const handleInstallationLayerChange = async (
    value: InstallationLayerType
  ) => {
    setInstallationLayer(value) // Optimistically update local UI

    let sectorIdToUpdate: string | undefined
    let projectIdForUpdate: string | undefined = currentProject?.id

    if (isProjectWithoutSectors && currentProject?.defaultSector?.id) {
      sectorIdToUpdate = currentProject.defaultSector.id
    } else if (currentSector?.id) {
      sectorIdToUpdate = currentSector.id
    }

    if (projectIdForUpdate && sectorIdToUpdate) {
      try {
        const updateResponse = await updateSectorInstallationLayer(
          projectIdForUpdate,
          sectorIdToUpdate,
          value
        )
        if (updateResponse.success && updateResponse.sector) {
          console.log(
            'Sector installation layer updated successfully in backend, sector data:',
            updateResponse.sector
          )
          // Sanitize trayTypeSelection before passing to store
          const rawTrayType = updateResponse.sector.trayTypeSelection
          let sanitizedTrayType: TrayType | null | undefined = null
          if (rawTrayType === 'escalerilla' || rawTrayType === 'canal') {
            sanitizedTrayType = rawTrayType
          } else if (rawTrayType === null || rawTrayType === undefined) {
            sanitizedTrayType = rawTrayType
          } else {
            console.warn(
              `[DataForCalculation] Invalid trayTypeSelection ('${rawTrayType}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`
            )
            sanitizedTrayType = null
          }
          const rawInstallLayer =
            updateResponse.sector.installationLayerSelection
          let sanitizedInstallLayer: InstallationLayerType | null | undefined =
            null
          if (
            rawInstallLayer === 'singleLayer' ||
            rawInstallLayer === 'multiLayer'
          ) {
            sanitizedInstallLayer = rawInstallLayer
          } else if (
            rawInstallLayer === null ||
            rawInstallLayer === undefined
          ) {
            sanitizedInstallLayer = rawInstallLayer
          } else {
            console.warn(
              `[DataForCalculation] Invalid installationLayerSelection ('${rawInstallLayer}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`
            )
            sanitizedInstallLayer = null
          }

          const sectorUpdateForStore = {
            ...updateResponse.sector,
            trayTypeSelection: sanitizedTrayType,
            installationLayerSelection: sanitizedInstallLayer,
          }
          updateProjectDataWithSector(sectorUpdateForStore)
          console.log(
            '[DataForCalc] Installation layer updated and store synced for sector:',
            updateResponse.sector.id
          )
        } else {
          console.error(
            '[DataForCalc] Error updating installation layer via service:',
            updateResponse.message
          )
          // Potentially revert optimistic UI update here if needed
        }
      } catch (error) {
        console.error(
          '[DataForCalc] Failed to call updateSectorInstallationLayer service:',
          error
        )
        // Potentially revert optimistic UI update here if needed
      }
    } else {
      console.error(
        '[DataForCalc] Cannot update installation layer: Project ID or Sector ID is missing.'
      )
    }
  }

  const handleTrayTypeChange = async (newType: TrayType) => {
    // Optimistically update UI via onTrayTypeChange callback, which should update parent state
    onTrayTypeChange && onTrayTypeChange(newType)

    let sectorIdToUpdate: string | undefined
    let projectIdForUpdate: string | undefined = currentProject?.id

    if (!projectIdForUpdate) {
      console.error(
        '[DataForCalc] Cannot update tray type: Project ID is missing'
      )
      return
    }

    // Determine which sector to update based on project type
    if (isProjectWithoutSectors) {
      if (currentProject?.defaultSector?.id) {
        sectorIdToUpdate = currentProject.defaultSector.id
      } else {
        console.error(
          '[DataForCalc] Cannot update tray type: Default sector ID is missing'
        )
        return
      }
    } else if (currentSector?.id) {
      sectorIdToUpdate = currentSector.id
    } else {
      console.error(
        '[DataForCalc] Cannot update tray type: Sector ID is missing'
      )
      return
    }

    try {
      console.log(
        `[DataForCalc] Updating tray type to ${newType} for sector ${sectorIdToUpdate}`
      )
      const updateResponse = await updateSectorTrayType(
        projectIdForUpdate,
        sectorIdToUpdate,
        newType
      )

      if (!updateResponse.success) {
        console.error(
          '[DataForCalc] Error updating tray type:',
          updateResponse.message
        )
        return
      }

      console.log(
        '[DataForCalc] Tray type updated successfully in backend.'
      )

      // For projects without sectors, we don't need to update the store again
      // since we already did an optimistic update and the backend has confirmed the change
      if (!isProjectWithoutSectors && updateResponse.sector) {
        console.log(
          '[DataForCalc] Updating store with new sector data:',
          updateResponse.sector.id
        )
        
        // Sanitize and validate tray type
        const rawTrayType = updateResponse.sector.trayTypeSelection
        let sanitizedTrayType: TrayType | null | undefined = null
        if (rawTrayType === 'escalerilla' || rawTrayType === 'canal') {
          sanitizedTrayType = rawTrayType
        } else if (rawTrayType === null || rawTrayType === undefined) {
          sanitizedTrayType = rawTrayType
        } else {
          console.warn(
            `[DataForCalc] Invalid trayTypeSelection ('${rawTrayType}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`
          )
          sanitizedTrayType = null
        }

        // Update the store with the new sector data
        updateProjectDataWithSector({
          id: sectorIdToUpdate,
          trayTypeSelection: sanitizedTrayType,
        })
      }
    } catch (error) {
      console.error('[DataForCalc] Error updating tray type via service:', error)
      // Revert the UI change if there's an error
      onTrayTypeChange && onTrayTypeChange(initialTrayType || 'escalerilla')
    }
  }

  const handleReservePercentageChange = async (newValue: number) => {
    // Optimistically update UI via onReservePercentageChange callback
    onReservePercentageChange && onReservePercentageChange(newValue)

    let sectorIdToUpdate: string | undefined
    let projectIdForUpdate: string | undefined = currentProject?.id

    if (!projectIdForUpdate) {
      console.error(
        '[DataForCalc] Cannot update reserve percentage: Project ID is missing'
      )
      return
    }

    // Determine which sector to update based on project type
    if (isProjectWithoutSectors) {
      if (currentProject?.defaultSector?.id) {
        sectorIdToUpdate = currentProject.defaultSector.id
      } else {
        console.error(
          '[DataForCalc] Cannot update reserve percentage: Default sector ID is missing'
        )
        return
      }
    } else if (currentSector?.id) {
      sectorIdToUpdate = currentSector.id
    } else {
      console.error(
        '[DataForCalc] Cannot update reserve percentage: Sector ID is missing'
      )
      return
    }

    try {
      console.log(
        `[DataForCalc] Updating reserve percentage to ${newValue} for sector ${sectorIdToUpdate}`
      )
      const updateResponse = await updateSectorReservePercentage(
        projectIdForUpdate,
        sectorIdToUpdate,
        newValue
      )

      if (!updateResponse.success) {
        console.error(
          '[DataForCalc] Error updating reserve percentage:',
          updateResponse.message
        )
        // Revert the UI change if the update fails
        onReservePercentageChange && onReservePercentageChange(initialReservePercentage || 30)
        return
      }

      console.log(
        '[DataForCalc] Reserve percentage updated successfully in backend.'
      )

      // For projects without sectors, we don't need to update the store again
      // since we already did an optimistic update and the backend has confirmed the change
      if (!isProjectWithoutSectors && updateResponse.sector) {
        console.log(
          '[DataForCalc] Updating store with new sector data:',
          updateResponse.sector.id
        )
        
        // Update the store with the new sector data
        updateProjectDataWithSector({
          id: sectorIdToUpdate,
          reservePercentage: newValue,
        })
      }
    } catch (error) {
      console.error('[DataForCalc] Error updating reserve percentage via service:', error)
      // Revert the UI change if there's an error
      onReservePercentageChange && onReservePercentageChange(initialReservePercentage || 30)
    }
  }

  const componentKey = isProjectWithoutSectors
    ? `project-${currentProject?.id}`
    : `sector-${currentSector?.id}` // Correct placement of componentKey

  return (
    <div key={componentKey} className="flex flex-col gap-6 lg:gap-16">
      <Tray
        trayType={trayType}
        reservePercentage={reservePercentage}
        onTrayTypeChange={handleTrayTypeChange}
        onReservePercentageChange={handleReservePercentageChange}
      />
      <InstallationLayerSelector
        installationLayerType={installationLayer}
        hasCables={cables.length > 0}
        onInstallationLayerChange={handleInstallationLayerChange}
      />
      <Cables
        key={`cables-${currentSector?.id || 'project'}`}
        cablesInTray={cables}
        installationLayerType={installationLayer}
        currentSectorId={currentSector?.id}
      />
    </div>
  )
}
