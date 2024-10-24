import useCurrentPageName from '@/hooks/useCurrentPageName'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction } from 'react'

export default function CollapsedHeaderMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}) {
  const currPageName = useCurrentPageName()

  return (
    <div className="flex w-screen bg-gray-white p-4 shadow-md">
      <Bars3Icon
        role="button"
        onClick={() => {
          setIsMenuOpen(true)
        }}
        className="w-7 basis-7 text-gray-text"
      />
      <p className="grow text-center font-medium text-gray-text">
        {currPageName}
      </p>
      <div className="basis-7"></div>
    </div>
  )
}
