import { CableInTray } from '@/models/cable.model'
import { InstallationLayerType, Project, Sector } from '@/models/project.model'
import { TrayType } from '@/models/tray.model'
import { useState, useEffect } from 'react'
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
import { useProjectStore } from '@/store/useProjectStore'

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

  const handleInstallationLayerChange = async (value: InstallationLayerType) => {
    setInstallationLayer(value);
    
    try {
      if (isProjectWithoutSectors && currentProject) {
        if (currentProject.defaultSector && currentProject.defaultSector.id) {
          const updateResponse = await updateSectorInstallationLayer(
            currentProject.id,
            currentProject.defaultSector.id,
            value
          );
          
          if (!updateResponse.success) {
            // Manejar error si es necesario
          }
        }
      } else if (currentSector && currentSector.id && currentProject) {
        const updateResponse = await updateSectorInstallationLayer(
          currentProject.id,
          currentSector.id,
          value
        );
      }
    } catch (error) {
      // Manejo de error
    }
  };

  const componentKey = isProjectWithoutSectors 
    ? `project-${currentProject?.id}`
    : `sector-${currentSector?.id}`;

  const handleTrayTypeChange = async (newType: TrayType) => {
    try {
      if (isProjectWithoutSectors && currentProject) {
        if (currentProject.defaultSector && currentProject.defaultSector.id) {
          const updateResponse = await updateSectorTrayType(
            currentProject.id,
            currentProject.defaultSector.id,
            newType
          );
          
          if (updateResponse.success) {
            onTrayTypeChange && onTrayTypeChange(newType);
          }
        }
      } else if (currentSector && currentSector.id && currentProject) {
        const updateResponse = await updateSectorTrayType(
          currentProject.id,
          currentSector.id,
          newType
        );
        
        if (updateResponse.success) {
          onTrayTypeChange && onTrayTypeChange(newType);
        }
      }
    } catch (error) {
      // Manejo de error
    }
  };

  const handleReservePercentageChange = async (newValue: number) => {
    try {
      if (isProjectWithoutSectors && currentProject) {
        if (currentProject.defaultSector && currentProject.defaultSector.id) {
          const updateResponse = await updateSectorReservePercentage(
            currentProject.id,
            currentProject.defaultSector.id,
            newValue
          );
          
          if (updateResponse.success) {
            onReservePercentageChange && onReservePercentageChange(newValue);
          }
        }
      } else if (currentSector && currentSector.id && currentProject) {
        const updateResponse = await updateSectorReservePercentage(
          currentProject.id,
          currentSector.id,
          newValue
        );
        
        if (updateResponse.success) {
          onReservePercentageChange && onReservePercentageChange(newValue);
        }
      }
    } catch (error) {
      // Manejo de error
    }
  };

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
