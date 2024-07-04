'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import PageButtons from './PageButtons'
import PaginationButton from './PaginationButton'

interface PaginationProps {
  totalPages: number
  onChange: (currPage: number) => void
}

export default function Pagination({ totalPages, onChange }: PaginationProps) {
  const [currPage, setCurrPage] = useState<number>(1)

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1)

  const handlePrevClick = () => {
    setCurrPage((prev) => (prev === 1 ? prev : prev - 1))
  }

  const handleNextClick = () => {
    setCurrPage((prev) => (prev === totalPages ? prev : prev + 1))
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrPage(pageNumber)
  }

  useEffect(() => {
    onChange(currPage)
  }, [currPage, onChange])

  return (
    <div className="flex gap-2">
      <PaginationButton
        onClick={handlePrevClick}
        disabled={currPage === 1}
        icon={<ChevronLeftIcon className="w-3" />}
      />
      <PageButtons
        pages={pages}
        currPage={currPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
      <PaginationButton
        onClick={handleNextClick}
        disabled={currPage === totalPages}
        icon={<ChevronRightIcon className="w-3" />}
      />
    </div>
  )
}
