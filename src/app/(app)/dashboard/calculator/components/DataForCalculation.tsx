import { CableInTray } from '@/models/cable.model'
import { InstallationLayerType, Project, Sector } from '@/models/project.model'
import { TrayType } from '@/models/tray.model'
import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import Cables from './Cables'
import InstallationLayerSelector from './InstallationLayerSelector'
import Tray from './Tray'
import { 
  getDefaultSector, 
  updateSectorInstallationLayer, 
  updateSectorTrayType,
  updateSectorReservePercentage
} from '@/services/project.service'
import { useParams } from 'next/navigation'

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
  onReservePercentageChange
}: DataForCalculationProps) {
  const isProjectWithoutSectors = currentProject && !currentProject.hasSectors;
  
  const defaultTrayType = isProjectWithoutSectors
    ? (currentProject?.trayTypeSelection || 'escalerilla')
    : (currentSector?.trayTypeSelection || 'escalerilla');
  
  const defaultReservePercentage = isProjectWithoutSectors
    ? (currentProject?.reservePercentage || 30)
    : (currentSector?.reservePercentage || 30);
  
  const trayType = initialTrayType || defaultTrayType;
  const reservePercentage = initialReservePercentage || defaultReservePercentage;
  
  const [cables, setCables] = useState<CableInTray[]>([]);
  
  useEffect(() => {
    let updatedCables: CableInTray[] = [];
    
    if (isProjectWithoutSectors && currentProject?.cables) {
      updatedCables = [...currentProject.cables];
    } else if (currentSector?.cables) {
      updatedCables = [...currentSector.cables];
    } else if (currentSector?.cablesInTray) {
      updatedCables = [...currentSector.cablesInTray];
    }
    
    setCables(updatedCables);
  }, [currentProject, currentSector, isProjectWithoutSectors]);
  
  const [installationLayer, setInstallationLayer] = useState<InstallationLayerType | null>(
    isProjectWithoutSectors
      ? currentProject?.installationLayerSelection || 'singleLayer'
      : currentSector?.installationLayerSelection || 'singleLayer'
  );

  useEffect(() => {
    if (isProjectWithoutSectors) {
      setInstallationLayer(currentProject?.installationLayerSelection || 'singleLayer');
    } else {
      setInstallationLayer(currentSector?.installationLayerSelection || 'singleLayer');
    }
  }, [currentSector, currentProject, isProjectWithoutSectors]);

  const { updateProjectDataWithSector } = useProjectStore();

  const handleInstallationLayerChange = async (value: InstallationLayerType) => {
    setInstallationLayer(value); // Optimistically update local UI
    
    let sectorIdToUpdate: string | undefined;
    let projectIdForUpdate: string | undefined = currentProject?.id;

    if (isProjectWithoutSectors && currentProject?.defaultSector?.id) {
      sectorIdToUpdate = currentProject.defaultSector.id;
    } else if (currentSector?.id) {
      sectorIdToUpdate = currentSector.id;
    }

    if (projectIdForUpdate && sectorIdToUpdate) {
      try {
        const updateResponse = await updateSectorInstallationLayer(
          projectIdForUpdate,
          sectorIdToUpdate,
          value
        );
        if (updateResponse.success && updateResponse.sector) {
          console.log('Sector installation layer updated successfully in backend, sector data:', updateResponse.sector);
          // Sanitize trayTypeSelection before passing to store
          const rawTrayType = updateResponse.sector.trayTypeSelection;
          let sanitizedTrayType: TrayType | null | undefined = null;
          if (rawTrayType === 'escalerilla' || rawTrayType === 'canal') {
            sanitizedTrayType = rawTrayType;
          } else if (rawTrayType === null || rawTrayType === undefined) {
            sanitizedTrayType = rawTrayType;
          } else {
            console.warn(`[DataForCalculation] Invalid trayTypeSelection ('${rawTrayType}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`);
            sanitizedTrayType = null;
          }
          const rawInstallLayer = updateResponse.sector.installationLayerSelection;
          let sanitizedInstallLayer: InstallationLayerType | null | undefined = null;
          if (rawInstallLayer === 'singleLayer' || rawInstallLayer === 'multiLayer') {
            sanitizedInstallLayer = rawInstallLayer;
          } else if (rawInstallLayer === null || rawInstallLayer === undefined) {
            sanitizedInstallLayer = rawInstallLayer;
          } else {
            console.warn(`[DataForCalculation] Invalid installationLayerSelection ('${rawInstallLayer}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`);
            sanitizedInstallLayer = null;
          }

          const sectorUpdateForStore = {
            ...updateResponse.sector,
            trayTypeSelection: sanitizedTrayType,
            installationLayerSelection: sanitizedInstallLayer,
          };
          updateProjectDataWithSector(sectorUpdateForStore);
          console.log('[DataForCalc] Installation layer updated and store synced for sector:', updateResponse.sector.id);
        } else {
          console.error('[DataForCalc] Error updating installation layer via service:', updateResponse.message);
          // Potentially revert optimistic UI update here if needed
        }
      } catch (error) {
        console.error('[DataForCalc] Failed to call updateSectorInstallationLayer service:', error);
        // Potentially revert optimistic UI update here if needed
      }
    } else {
      console.error('[DataForCalc] Cannot update installation layer: Project ID or Sector ID is missing.');
    }
  };

  const handleTrayTypeChange = async (newType: TrayType) => {
    // Optimistically update UI via onTrayTypeChange callback, which should update parent state
    onTrayTypeChange && onTrayTypeChange(newType);

    let sectorIdToUpdate: string | undefined;
    let projectIdForUpdate: string | undefined = currentProject?.id;

    if (isProjectWithoutSectors && currentProject?.defaultSector?.id) {
      sectorIdToUpdate = currentProject.defaultSector.id;
    } else if (currentSector?.id) {
      sectorIdToUpdate = currentSector.id;
    }

    if (projectIdForUpdate && sectorIdToUpdate) {
      try {
        const updateResponse = await updateSectorTrayType(
          projectIdForUpdate,
          sectorIdToUpdate,
          newType
        );
        if (updateResponse.success && updateResponse.sector) {
          console.log('Sector tray type updated successfully in backend, sector data:', updateResponse.sector);
          const rawTrayType = updateResponse.sector.trayTypeSelection;
          let sanitizedTrayType: TrayType | null | undefined = null;
          if (rawTrayType === 'escalerilla' || rawTrayType === 'canal') {
            sanitizedTrayType = rawTrayType;
          } else if (rawTrayType === null || rawTrayType === undefined) {
            sanitizedTrayType = rawTrayType;
          } else {
            console.warn(`[DataForCalculation] Invalid trayTypeSelection ('${rawTrayType}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`);
            sanitizedTrayType = null;
          }
          const rawInstallLayer = updateResponse.sector.installationLayerSelection;
          let sanitizedInstallLayer: InstallationLayerType | null | undefined = null;
          if (rawInstallLayer === 'singleLayer' || rawInstallLayer === 'multiLayer') {
            sanitizedInstallLayer = rawInstallLayer;
          } else if (rawInstallLayer === null || rawInstallLayer === undefined) {
            sanitizedInstallLayer = rawInstallLayer;
          } else {
            console.warn(`[DataForCalculation] Invalid installationLayerSelection ('${rawInstallLayer}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`);
            sanitizedInstallLayer = null;
          }

          const sectorUpdateForStore = {
            ...updateResponse.sector,
            trayTypeSelection: sanitizedTrayType,
            installationLayerSelection: sanitizedInstallLayer,
          };
          updateProjectDataWithSector(sectorUpdateForStore);
          console.log('[DataForCalc] Tray type updated and store synced for sector:', updateResponse.sector.id);
        } else {
          console.error('[DataForCalc] Error updating tray type via service:', updateResponse.message);
          // Potentially revert optimistic UI update here if needed
        }
      } catch (error) {
        console.error('[DataForCalc] Failed to call updateSectorTrayType service:', error);
        // Potentially revert optimistic UI update here if needed
      }
    } else {
      console.error('[DataForCalc] Cannot update tray type: Project ID or Sector ID is missing.');
    }
  };

  const handleReservePercentageChange = async (newValue: number) => {
    // Optimistically update UI via onReservePercentageChange callback
    onReservePercentageChange && onReservePercentageChange(newValue);

    let sectorIdToUpdate: string | undefined;
    let projectIdForUpdate: string | undefined = currentProject?.id;

    if (isProjectWithoutSectors && currentProject?.defaultSector?.id) {
      sectorIdToUpdate = currentProject.defaultSector.id;
    } else if (currentSector?.id) {
      sectorIdToUpdate = currentSector.id;
    }

    if (projectIdForUpdate && sectorIdToUpdate) {
      try {
        const updateResponse = await updateSectorReservePercentage(
          projectIdForUpdate,
          sectorIdToUpdate,
          newValue
        );
        if (updateResponse.success && updateResponse.sector) {
          console.log('Sector reserve percentage updated successfully in backend, sector data:', updateResponse.sector);
          // Sanitize trayTypeSelection before passing to store
          const rawTrayType = updateResponse.sector.trayTypeSelection;
          let sanitizedTrayType: TrayType | null | undefined = null;
          if (rawTrayType === 'escalerilla' || rawTrayType === 'canal') {
            sanitizedTrayType = rawTrayType;
          } else if (rawTrayType === null || rawTrayType === undefined) {
            sanitizedTrayType = rawTrayType;
          } else {
            console.warn(`[DataForCalculation] Invalid trayTypeSelection ('${rawTrayType}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`);
            sanitizedTrayType = null;
          }
          const rawInstallLayer = updateResponse.sector.installationLayerSelection;
          let sanitizedInstallLayer: InstallationLayerType | null | undefined = null;
          if (rawInstallLayer === 'singleLayer' || rawInstallLayer === 'multiLayer') {
            sanitizedInstallLayer = rawInstallLayer;
          } else if (rawInstallLayer === null || rawInstallLayer === undefined) {
            sanitizedInstallLayer = rawInstallLayer;
          } else {
            console.warn(`[DataForCalculation] Invalid installationLayerSelection ('${rawInstallLayer}') received from backend for sector ${updateResponse.sector.id}. Defaulting to null.`);
            sanitizedInstallLayer = null;
          }

          const sectorUpdateForStore = {
            ...updateResponse.sector,
            trayTypeSelection: sanitizedTrayType,
            installationLayerSelection: sanitizedInstallLayer,
          };
          updateProjectDataWithSector(sectorUpdateForStore);
          console.log('[DataForCalc] Reserve percentage updated and store synced for sector:', updateResponse.sector.id);
        } else {
          console.error('[DataForCalc] Error updating reserve percentage via service:', updateResponse.message);
          // Potentially revert optimistic UI update here if needed
        }
      } catch (error) {
        console.error('[DataForCalc] Failed to call updateSectorReservePercentage service:', error);
        // Potentially revert optimistic UI update here if needed
      }
    } else {
      console.error('[DataForCalc] Cannot update reserve percentage: Project ID or Sector ID is missing.');
    }
  };

  const componentKey = isProjectWithoutSectors 
  ? `project-${currentProject?.id}`
  : `sector-${currentSector?.id}`; // Correct placement of componentKey

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
