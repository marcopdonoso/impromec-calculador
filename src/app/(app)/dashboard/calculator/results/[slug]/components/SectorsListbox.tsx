import MyListbox, { Option } from '@/components/MyListbox'
import { Sector } from '@/models/project.model'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'

interface SectorsListboxProps {
  sectors: Sector[]
}

// Variable global para almacenar el sector activo actual
export let activeSectorGlobal: Sector | null = null;

export default function SectorsListbox({ sectors }: SectorsListboxProps) {
  // Crear un mapa para acceder rápidamente a los sectores por su ID
  const sectorMap = new Map<string, Sector>();
  sectors.forEach(sector => {
    sectorMap.set(sector.id || '', sector);
  });
  
  // Convertir sectores a opciones para el listbox
  const sectorOptions: Option[] = sectors.map((sector, index) => ({
    text: `Sector ${index + 1}: ${sector.sectorName}`,
    value: sector.id || `sector-${index}`
  }))

  const [selectedSector, setSelectedSector] = useState<Option | null>(null)

  // Inicializar con el primer sector cuando se carga el componente
  useEffect(() => {
    if (sectorOptions.length > 0 && !selectedSector) {
      setSelectedSector(sectorOptions[0])
      
      // También establecer este sector como activo globalmente
      if (sectors && sectors.length > 0) {
        activeSectorGlobal = sectors[0];
        console.log('Sector activo establecido:', activeSectorGlobal.sectorName);
      }
    }
  }, [sectorOptions, selectedSector, sectors])

  const handleSectorChange = (selectedOption: Option) => {
    setSelectedSector(selectedOption)
    
    // Establecer el sector seleccionado como el sector activo globalmente
    if (selectedOption && selectedOption.value) {
      const sectorId = selectedOption.value.toString();
      const selectedSectorObj = sectorMap.get(sectorId);
      
      if (selectedSectorObj) {
        activeSectorGlobal = selectedSectorObj;
        console.log('Sector activo cambiado a:', selectedSectorObj.sectorName);
      }
    }
  }

  return (
    <MyListbox
      options={sectorOptions}
      backgroundColor="bg-gray-background"
      value={selectedSector}
      onChange={handleSectorChange}
    />
  )
}
