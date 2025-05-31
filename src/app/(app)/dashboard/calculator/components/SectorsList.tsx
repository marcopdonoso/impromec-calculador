import Button from '@/components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Sector } from '@/models/project.model'
import SectorsListItem from './SectorsListItem'
import { appLinks } from '@/constants/links.constants'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface SectorsListProps {
  sectors: Sector[]
  onSectorChange?: (sector: Sector) => void
  initialActiveSector?: Sector | null
}

export default function SectorsList({ sectors, onSectorChange, initialActiveSector }: SectorsListProps) {
  const router = useRouter();
  const { slug: projectId } = useParams();
  
  // Estado para mantener el sector activo
  const [activeSector, setActiveSector] = useState<Sector | null>(initialActiveSector || null);
  
  // Actualizar el sector activo cuando cambia initialActiveSector (prop externo)
  useEffect(() => {
    if (initialActiveSector) {
      console.log('SectorsList: Actualizando sector activo desde prop externo:', initialActiveSector.sectorName);
      setActiveSector(initialActiveSector);
    }
  }, [initialActiveSector]);
  
  // Inicializar el sector activo cuando se cargan los sectores y no hay uno activo
  useEffect(() => {
    if (sectors && sectors.length > 0 && !activeSector) {
      console.log('SectorsList: Inicializando primer sector como activo');
      setActiveSector(sectors[0]);
      if (onSectorChange) onSectorChange(sectors[0]);
    }
  }, [sectors, activeSector, onSectorChange]);
  
  // Manejar el cambio de sector activo
  const handleSectorChange = (sector: Sector) => {
    setActiveSector(sector);
    if (onSectorChange) onSectorChange(sector);
  };
  
  // Manejar la redirección a la página de agregar sector
  const handleAddSector = () => {
    router.push(`${appLinks.calculatorAddSector.path}?projectId=${projectId}`);
  }

  return (
    <div className="px-2 lg:px-0">
      {sectors.map((sector, index) => (
        <SectorsListItem 
          key={sector.id || index}
          sectorId={sector.id || ''}
          sectorName={sector.sectorName || ''} 
          sectorNumber={index + 1}
          isActive={activeSector?.id === sector.id}
          onClick={() => handleSectorChange(sector)}
        />
      ))}
      <Button 
        variant="add" 
        icon={<PlusCircleIcon />} 
        onClick={handleAddSector}
      >
        Agregar sector
      </Button>
      <hr className="my-8 text-gray-placeholder lg:my-10" />
      {activeSector && (
        <h4 className="body_large_semibold text-center lg:heading_h6">
          Sector {sectors.findIndex(s => s.id === activeSector.id) + 1}: {activeSector.sectorName}
        </h4>
      )}
    </div>
  )
}
