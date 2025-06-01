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
  // Nuevos props para el tipo de bandeja y porcentaje de reserva
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
  // Logs para depuración
  console.log('DataForCalculation - Sector activo:', {
    id: currentSector?.id,
    name: currentSector?.sectorName
  });
  
  // Determinar si estamos trabajando con un sector o directamente con el proyecto
  const isProjectWithoutSectors = currentProject && !currentProject.hasSectors;
  
  // Usar los valores iniciales pasados como props, o valores por defecto del proyecto/sector
  const defaultTrayType = isProjectWithoutSectors
    ? (currentProject?.trayTypeSelection || 'escalerilla')
    : (currentSector?.trayTypeSelection || 'escalerilla');
  
  const defaultReservePercentage = isProjectWithoutSectors
    ? (currentProject?.reservePercentage || 30)
    : (currentSector?.reservePercentage || 30);
  
  // Usar los valores pasados como prop o los valores por defecto
  const trayType = initialTrayType || defaultTrayType;
  const reservePercentage = initialReservePercentage || defaultReservePercentage;
  
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
    // Actualizar installationLayer
    if (isProjectWithoutSectors) {
      setInstallationLayer(currentProject?.installationLayerSelection || 'singleLayer');
    } else {
      setInstallationLayer(currentSector?.installationLayerSelection || 'singleLayer');
    }
  }, [currentSector, currentProject, isProjectWithoutSectors]);

  const handleInstallationLayerChange = async (value: InstallationLayerType) => {
    setInstallationLayer(value);
    // Manejar cambio del tipo de instalación
    
    try {
      if (isProjectWithoutSectors && currentProject) {

        
        // Usar directamente el sector por defecto del proyecto
        if (currentProject.defaultSector && currentProject.defaultSector.id) {

          
          // Actualizar el tipo de instalación del sector por defecto
          const updateResponse = await updateSectorInstallationLayer(
            currentProject.id,
            currentProject.defaultSector.id,
            value
          );
          
          if (!updateResponse.success) {
            // Manejar error si es necesario
          }
        } else {
          // No se encontró sector por defecto
        }
      } else if (currentSector && currentSector.id && currentProject) {
        // Actualizar tipo de instalación para proyecto con sectores
        
        // Para proyectos con sectores, actualizar directamente el tipo de instalación del sector activo
        const updateResponse = await updateSectorInstallationLayer(
          currentProject.id,
          currentSector.id,
          value
        );
        
        if (updateResponse.success) {
          // Tipo de instalación actualizado correctamente en el backend
        } else {
          // Manejar error si es necesario
        }
      } else {
        // No se cumplen las condiciones para actualizar el tipo de instalación
      }
    } catch (error) {
      // Manejo de error
    }
  };
  // Generar una key única basada en el sector activo o el proyecto
  const componentKey = isProjectWithoutSectors 
    ? `project-${currentProject?.id}`
    : `sector-${currentSector?.id}`;

  
  // Manejador para actualizar el tipo de bandeja en el backend
  const handleTrayTypeChange = async (newType: TrayType) => {
    
    try {
      if (isProjectWithoutSectors && currentProject) {

        
        // Usar directamente el sector por defecto del proyecto
        if (currentProject.defaultSector && currentProject.defaultSector.id) {

          
          // Actualizar el tipo de bandeja del sector por defecto
          const updateResponse = await updateSectorTrayType(
            currentProject.id,
            currentProject.defaultSector.id,
            newType
          );
          
          if (updateResponse.success) {
            onTrayTypeChange && onTrayTypeChange(newType);
          } else {
            // Error al actualizar el tipo de bandeja
          }
        } else {
          // No se encontró sector por defecto
        }
      } else if (currentSector && currentSector.id && currentProject) {
        // Actualizar tipo de bandeja para proyecto con sectores
        // Para proyectos con sectores, actualizar directamente el tipo de bandeja del sector activo
        const updateResponse = await updateSectorTrayType(
          currentProject.id,
          currentSector.id,
          newType
        );
        
        if (updateResponse.success) {
          // Propagar el cambio al componente padre
          onTrayTypeChange && onTrayTypeChange(newType);
        } else {
          // Error al actualizar el tipo de bandeja
        }
      } else {
        // No se cumplen las condiciones para actualizar el tipo de bandeja
      }
    } catch (error) {
      // Manejo de error
    }
  };

  // Manejador para actualizar el porcentaje de reserva en el backend
  const handleReservePercentageChange = async (newValue: number) => {
    
    try {
      if (isProjectWithoutSectors && currentProject) {

        
        // Usar directamente el sector por defecto del proyecto
        if (currentProject.defaultSector && currentProject.defaultSector.id) {

          
          // Actualizar el porcentaje de reserva del sector por defecto
          const updateResponse = await updateSectorReservePercentage(
            currentProject.id,
            currentProject.defaultSector.id,
            newValue
          );
          
          if (updateResponse.success) {
            // Propagar el cambio al componente padre
            onReservePercentageChange && onReservePercentageChange(newValue);
          } else {
            // Error al actualizar el porcentaje de reserva
          }
        } else {
          // No se encontró sector por defecto
        }
      } else if (currentSector && currentSector.id && currentProject) {
        // Actualizar porcentaje de reserva para proyecto con sectores
        // Para proyectos con sectores, actualizar directamente el porcentaje de reserva del sector activo
        const updateResponse = await updateSectorReservePercentage(
          currentProject.id,
          currentSector.id,
          newValue
        );
        
        if (updateResponse.success) {
          // Propagar el cambio al componente padre
          onReservePercentageChange && onReservePercentageChange(newValue);
        } else {
          // Error al actualizar el porcentaje de reserva
        }
      } else {
        // No se cumplen las condiciones para actualizar el porcentaje de reserva
      }
    } catch (error) {
      // Manejo de error
    }
  };
  
  return (
    // Usar la key única para forzar la recreación completa del componente cuando cambia el sector
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
