import MyListbox, { Option } from '@/components/MyListbox'
import { useState } from 'react'

interface DateSortingListboxProps {
  setIsSortedByRecent: (isSortedByRecent: boolean) => void
}

export default function DateSortingListbox({
  setIsSortedByRecent,
}: DateSortingListboxProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const options: Option[] = [
    {
      text: 'Fecha (más reciente)',
      value: 'recent',
    },
    {
      text: 'Fecha (más antiguo)',
      value: 'ancient',
    },
  ]

  const handleSortChange = (option: Option) => {
    setSelectedOption(option)
    setIsSortedByRecent(option.value === 'recent')
  }

  return (
    <MyListbox
      label="Ordenar por:"
      variant="sorting"
      options={options}
      className="mb-6 justify-end"
      value={selectedOption}
      onChange={handleSortChange}
    />
  )
}
