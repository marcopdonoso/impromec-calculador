import clsx from 'clsx'

interface PageButtonProps {
  pageNumber: number
  currPage: number
  onPageClick: (pageNumber: number) => void
}

export default function PageButton({
  pageNumber,
  currPage,
  onPageClick,
}: PageButtonProps) {
  return (
    <button
      onClick={() => onPageClick(pageNumber)}
      disabled={currPage === pageNumber}
      className={clsx(
        'flex size-6 items-center justify-center rounded-md text-sm sm:text-base',
        {
          'text-gray-text_inactive': pageNumber !== currPage,
          'bg-gray-button_primary text-gray-white': pageNumber === currPage,
        }
      )}
    >
      {pageNumber}
    </button>
  )
}
