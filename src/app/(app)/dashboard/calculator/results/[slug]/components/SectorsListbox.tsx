import MyListbox from '@/components/MyListbox'

export default function SectorsListbox() {
  // TODO: Delete mockup data
  const sectorsList = [
    { text: '[Sector 1: Sala de servidores]', value: '[0]' },
    { text: '[Sector 2: Sala de máquinas]', value: '[1]' },
  ]

  return (
    <MyListbox options={sectorsList} backgroundColor="bg-gray-background" />
  )
}
