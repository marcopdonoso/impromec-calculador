import { Bars3Icon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

export default function CollapsedHeaderMenu({
  handleClick,
}: {
  handleClick: () => void
}) {
  const pathname = usePathname()

  const currPageName = pathname.split('/').slice(-1)[0] || 'Inicio'
  return (
    <div className="flex w-screen p-4 shadow-md">
      <Bars3Icon
        role="button"
        onClick={handleClick}
        className="w-7 basis-7 text-gray-text"
      />
      <p className="grow text-center font-medium text-gray-text">
        {currPageName}
      </p>
      <div className="basis-7"></div>
    </div>
  )
}
