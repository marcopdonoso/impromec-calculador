import MyListbox, { Option } from '@/components/MyListbox'
import { useState } from 'react'

export default function SectorsListbox() {
  // TODO: Delete mockup data
  const sectorsList = [
    { text: '[Sector 1: Sala de servidores]', value: '[0]' },
    { text: '[Sector 2: Sala de máquinas]', value: '[1]' },
  ]

  const [selectedSector, setSelectedSector] = useState<Option | null>(null)

  const handleSectorChange = (selectedOption: Option) => {
    setSelectedSector(selectedOption)
  }

  return (
    <MyListbox
      options={sectorsList}
      backgroundColor="bg-gray-background"
      value={selectedSector}
      onChange={handleSectorChange}
    />
  )
}
