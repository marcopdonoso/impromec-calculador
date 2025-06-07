import MyListbox, { Option } from '@/components/MyListbox'
import { Sector } from '@/models/project.model'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'

interface SectorsListboxProps {
  sectors: Sector[];
  activeSectorId: string | null; // ID of the currently active sector
  onSectorChange: (selectedSector: Sector) => void; // Callback to notify parent of change
}

export default function SectorsListbox({ sectors, activeSectorId, onSectorChange }: SectorsListboxProps) {
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

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    let currentOption: Option | undefined;
    if (activeSectorId) {
      currentOption = sectorOptions.find(opt => opt.value === activeSectorId);
    }
    
    if (!currentOption && sectorOptions.length > 0) {
      currentOption = sectorOptions[0]; // Default to first if activeSectorId not found or not provided
    }

    if (currentOption) {
      setSelectedOption(currentOption);
      // Notify parent about the initial/default selection if it wasn't explicitly set via activeSectorId
      // This ensures parent is aware of the active sector if it defaults
      const initialSectorObject = sectorMap.get(currentOption.value.toString());
      if (initialSectorObject && (!activeSectorId || activeSectorId !== initialSectorObject.id)) {
         // console.log('[SectorsListbox] Initializing/defaulting active sector:', initialSectorObject);
         // onSectorChange(initialSectorObject); // Be cautious with this, might cause loops if parent isn't ready
      }
    } else {
      setSelectedOption(null); // No options or no match
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectorId, sectors]); // Rerun when activeSectorId from parent changes or sectors list changes
  // Note: sectorMap and sectorOptions are derived from sectors, so sectors is the key dependency here.

  const handleSectorChange = (newlySelectedOption: Option) => {
    setSelectedOption(newlySelectedOption);
    
    if (newlySelectedOption && newlySelectedOption.value) {
      const sectorId = newlySelectedOption.value.toString();
      const selectedSectorObject = sectorMap.get(sectorId);
      
      if (selectedSectorObject) {
        // console.log('[SectorsListbox] User selected sector:', selectedSectorObject);
        onSectorChange(selectedSectorObject); // Notify parent component
      }
    }
  };

  return (
    <MyListbox
      options={sectorOptions}
      backgroundColor="bg-gray-background"
      value={selectedOption}
      onChange={handleSectorChange}
    />
  )
}
