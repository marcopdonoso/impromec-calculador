import { CableInTray } from '@/models/cable.model'
import { InstallationLayerType, Project, Sector } from '@/models/project.model'
import { useState, useEffect } from 'react'
import Cables from './Cables'
import InstallationLayerSelector from './InstallationLayerSelector'
import Tray from './Tray'

interface DataForCalculationProps {
  currentSector?: Sector | null
  currentProject?: Project | null
}

export default function DataForCalculation({ currentSector, currentProject }: DataForCalculationProps) {
  // Determinar si estamos trabajando con un sector o directamente con el proyecto
  const isProjectWithoutSectors = currentProject && !currentProject.hasSectors;
  
  // Obtener los cables según el caso
  const cables: CableInTray[] = isProjectWithoutSectors
    ? currentProject.cables || []
    : currentSector?.cablesInTray || [];
  const [installationLayer, setInstallationLayer] = useState<InstallationLayerType | null>(
    isProjectWithoutSectors
      ? currentProject?.installationLayerSelection || 'singleLayer'
      : currentSector?.installationLayerSelection || 'singleLayer'
  );

  // Actualizar el estado cuando cambia el sector o el proyecto
  useEffect(() => {
    if (isProjectWithoutSectors) {
      setInstallationLayer(currentProject?.installationLayerSelection || 'singleLayer');
    } else {
      setInstallationLayer(currentSector?.installationLayerSelection || 'singleLayer');
    }
  }, [currentSector, currentProject, isProjectWithoutSectors]);

  const handleInstallationLayerChange = (value: InstallationLayerType) => {
    setInstallationLayer(value);
    console.log('Tipo de instalación cambiado a:', value);
  };
  return (
    <div className="flex flex-col gap-6 lg:gap-16">
      <Tray 
        trayType={isProjectWithoutSectors ? currentProject?.trayTypeSelection : currentSector?.trayTypeSelection} 
        reservePercentage={isProjectWithoutSectors ? currentProject?.reservePercentage : currentSector?.reservePercentage} 
      />
      <InstallationLayerSelector 
        installationLayerType={installationLayer} 
        hasCables={cables.length > 0}
        onInstallationLayerChange={handleInstallationLayerChange}
      />
      <Cables 
        cablesInTray={cables} 
        installationLayerType={installationLayer}
      />
    </div>
  )
}
