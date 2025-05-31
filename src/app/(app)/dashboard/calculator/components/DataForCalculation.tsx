import { CableInTray } from '@/models/cable.model'
import { InstallationLayerType, Project, Sector } from '@/models/project.model'
import { useState, useEffect } from 'react'
import Cables from './Cables'
import InstallationLayerSelector from './InstallationLayerSelector'
import Tray from './Tray'
import { getDefaultSector, updateSectorInstallationLayer } from '@/services/project.service'
import { useParams } from 'next/navigation'
import { useProjectStore } from '@/store/useProjectStore'

interface DataForCalculationProps {
  currentSector?: Sector | null
  currentProject?: Project | null
}

export default function DataForCalculation({ currentSector, currentProject }: DataForCalculationProps) {
  // Logs para depuración
  console.log('DataForCalculation - Sector activo:', {
    id: currentSector?.id,
    name: currentSector?.sectorName
  });
  
  // Determinar si estamos trabajando con un sector o directamente con el proyecto
  const isProjectWithoutSectors = currentProject && !currentProject.hasSectors;
  
  // Obtener los cables según el caso
  // Ahora el backend devuelve 'cables' en lugar de 'cablesInTray'
  // Usamos useState para mantener un estado local de los cables
  const [cables, setCables] = useState<CableInTray[]>([]);
  
  // Este efecto se ejecutará cada vez que cambie el proyecto, el sector o sus cables
  useEffect(() => {
    console.log('DataForCalculation - Actualización de cables');
    
    // Determinar la fuente de datos de cables según el tipo de proyecto
    let updatedCables: CableInTray[] = [];
    
    if (isProjectWithoutSectors && currentProject?.cables) {
      // Proyecto sin sectores: usar cables del proyecto
      updatedCables = [...currentProject.cables];
      console.log('Usando cables del proyecto:', updatedCables.length);
    } else if (currentSector?.cables) {
      // Proyecto con sectores: usar cables del sector activo
      updatedCables = [...currentSector.cables];
      console.log('Usando cables del sector:', updatedCables.length);
    } else if (currentSector?.cablesInTray) {
      // Compatibilidad con la propiedad anterior
      updatedCables = [...currentSector.cablesInTray];
      console.log('Usando cablesInTray del sector:', updatedCables.length);
    }
    
    // Actualizar el estado local
    setCables(updatedCables);
  }, [currentProject, currentSector, isProjectWithoutSectors]);
    
  // Agregar logs detallados para depuración
  console.log('DataForCalculation - Cables:', {
    isProjectWithoutSectors,
    currentSectorId: currentSector?.id,
    currentSectorName: currentSector?.sectorName,
    cablesCount: cables.length,
    cables
  });
  
  // Logs adicionales para depurar el problema de los cables
  console.log('DataForCalculation - Detalles del sector activo:', {
    sectorId: currentSector?.id,
    sectorName: currentSector?.sectorName,
    // Mostrar tanto la propiedad antigua como la nueva
    cablesInTray: currentSector?.cablesInTray,
    cables: currentSector?.cables,
    cablesCount: currentSector?.cablesCount,
    // Verificar la estructura de los datos
    cablesInTrayLength: currentSector?.cablesInTray?.length || 0,
    cablesLength: currentSector?.cables?.length || 0,
    cablesInTrayIsArray: Array.isArray(currentSector?.cablesInTray),
    cablesIsArray: Array.isArray(currentSector?.cables)
  });
  
  // Si hay un proyecto, mostrar detalles de todos los sectores
  if (currentProject && currentProject.hasSectors && currentProject.sectors) {
    console.log('DataForCalculation - Todos los sectores:', 
      currentProject.sectors.map(s => ({
        id: s.id,
        name: s.sectorName,
        // Mostrar tanto la propiedad antigua como la nueva
        cablesInTray: s.cablesInTray,
        cables: s.cables,
        // Mostrar el contador que viene del backend
        cablesCount: s.cablesCount,
        // Calcular la cantidad de cables según las propiedades disponibles
        cablesInTrayLength: s.cablesInTray?.length || 0,
        cablesLength: s.cables?.length || 0
      }))
    );
  }
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

  const handleInstallationLayerChange = async (value: InstallationLayerType) => {
    setInstallationLayer(value);
    
    try {
      if (isProjectWithoutSectors && currentProject) {
        // Para proyectos sin sectores, primero obtener el ID del sector por defecto
        const defaultSectorResponse = await getDefaultSector(currentProject.id);
        
        if (defaultSectorResponse.success && defaultSectorResponse.defaultSector) {
          // Luego actualizar el tipo de instalación del sector por defecto
          await updateSectorInstallationLayer(
            currentProject.id,
            defaultSectorResponse.defaultSector.id,
            value
          );
        }
      } else if (currentSector && currentSector.id && currentProject) {
        // Para proyectos con sectores, actualizar directamente el tipo de instalación del sector activo
        await updateSectorInstallationLayer(
          currentProject.id,
          currentSector.id,
          value
        );
      }
    } catch (error) {
      console.error('Error al actualizar el tipo de instalación:', error);
    }
  };
  // Generar una key única basada en el sector activo o el proyecto
  const componentKey = isProjectWithoutSectors 
    ? `project-${currentProject?.id}`
    : `sector-${currentSector?.id}`;

  return (
    // Usar la key única para forzar la recreación completa del componente cuando cambia el sector
    <div key={componentKey} className="flex flex-col gap-6 lg:gap-16">
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
        key={`cables-${currentSector?.id || 'project'}`}
        cablesInTray={cables}
        installationLayerType={installationLayer}
        currentSectorId={currentSector?.id}
      />
    </div>
  )
}
