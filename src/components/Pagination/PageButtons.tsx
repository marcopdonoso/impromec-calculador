import Ellipsis from './Ellipsis'
import PageButton from './PageButton'

interface PageButtonsProps {
  pages: number[]
  currPage: number
  totalPages: number
  onPageClick: (pageNumber: number) => void
}

export default function PageButtons({
  pages,
  currPage,
  totalPages,
  onPageClick,
}: PageButtonsProps) {
  const generatePageButtons = () => {
    if (totalPages < 8) {
      return pages.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          pageNumber={pageNumber}
          currPage={currPage}
          onPageClick={onPageClick}
        />
      ))
    }

    if (currPage < 5) {
      return (
        <>
          {pages.slice(0, 5).map((pageNumber) => (
            <PageButton
              key={pageNumber}
              pageNumber={pageNumber}
              currPage={currPage}
              onPageClick={onPageClick}
            />
          ))}
          <Ellipsis />
          <PageButton
            pageNumber={totalPages}
            currPage={currPage}
            onPageClick={onPageClick}
          />
        </>
      )
    }

    if (totalPages - currPage <= 3) {
      return (
        <>
          <PageButton
            pageNumber={1}
            currPage={currPage}
            onPageClick={onPageClick}
          />
          <Ellipsis />
          {pages.slice(totalPages - 5).map((pageNumber) => (
            <PageButton
              key={pageNumber}
              pageNumber={pageNumber}
              currPage={currPage}
              onPageClick={onPageClick}
            />
          ))}
        </>
      )
    }

    return (
      <>
        <PageButton
          pageNumber={1}
          currPage={currPage}
          onPageClick={onPageClick}
        />
        <Ellipsis />
        <PageButton
          pageNumber={currPage - 1}
          currPage={currPage}
          onPageClick={onPageClick}
        />
        <PageButton
          pageNumber={currPage}
          currPage={currPage}
          onPageClick={onPageClick}
        />
        <PageButton
          pageNumber={currPage + 1}
          currPage={currPage}
          onPageClick={onPageClick}
        />
        <Ellipsis />
        <PageButton
          pageNumber={totalPages}
          currPage={currPage}
          onPageClick={onPageClick}
        />
      </>
    )
  }

  return <>{generatePageButtons()}</>
}
