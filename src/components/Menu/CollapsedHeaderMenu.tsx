import useCurrentPageName from '@/hooks/useCurrentPageName'
import { capitalizeFirstLetter } from '@/utilities/capitalize-first-letter.utility'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function CollapsedHeaderMenu({
  handleClick,
}: {
  handleClick: () => void
}) {
  const currPageName = useCurrentPageName()
  const pageNameToShow = capitalizeFirstLetter(currPageName)

  return (
    <div className="flex w-screen bg-gray-white p-4 shadow-md">
      <Bars3Icon
        role="button"
        onClick={handleClick}
        className="w-7 basis-7 text-gray-text"
      />
      <p className="grow text-center font-medium text-gray-text">
        {pageNameToShow}
      </p>
      <div className="basis-7"></div>
    </div>
  )
}

// pathname.split('/').slice(-1)[0]
