import MyListbox from '@/components/MyListbox'
import { Option } from '@/models/listbox.model'

interface DateSortingListboxProps {
  setIsSortedByRecent: (isSortedByRecent: boolean) => void
}

export default function DateSortingListbox({
  setIsSortedByRecent,
}: DateSortingListboxProps) {
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
    setIsSortedByRecent(option.value === 'recent')
  }

  return (
    <MyListbox
      label="Ordenar por:"
      variant="sorting"
      options={options}
      className="mb-6 w-full justify-end"
      onChange={handleSortChange}
    />
  )
}
