import { TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface TableProps {
  headers: string[]
  dataRows: Record<string, any>[]
  handleDelete?: (id: number) => void
  className?: string
}

export default function SelectedItemsTable({
  headers,
  dataRows,
  handleDelete,
  className,
}: TableProps) {
  return (
    <div className={clsx('w-full', className)}>
      <div className="mb-3 hidden px-10 lg:flex">
        {headers.map((h) => {
          return (
            <div key={h} className="flex-1 text-gray-placeholder">
              {h}
            </div>
          )
        })}
        {handleDelete && <div className="w-6" />}
      </div>
      <div className="flex flex-col items-center gap-8 lg:gap-2">
        {dataRows.map((dataRow, idx) => {
          const dataRowCopy = { ...dataRow }
          const dataRowIndex = idx
          delete dataRowCopy.id
          const entries = Object.values(dataRowCopy)
          return (
            <div
              key={idx}
              className="flex w-full flex-col rounded-2xl border border-gray-input bg-gray-white px-3 py-4 lg:h-16 lg:w-full lg:flex-row lg:items-center lg:px-10"
            >
              {entries.map((e, idx) => {
                return (
                  <div
                    className="flex justify-between border-b border-gray-input py-2 first:font-medium lg:flex-1 lg:border-none lg:first:font-bold"
                    key={idx}
                  >
                    <span className="text-sm font-normal text-gray-placeholder lg:hidden">
                      {headers[idx]}
                    </span>
                    <span className="text-sm text-gray-text lg:text-base">
                      {e}
                    </span>
                  </div>
                )
              })}
              {handleDelete && (
                <div className="mt-4 flex justify-end lg:m-0">
                  <TrashIcon
                    role="button"
                    onClick={() => handleDelete(dataRowIndex)}
                    className="w-6 text-red"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// flex lg:h-16 w-80 flex-col lg:flex-row rounded-2xl border border-gray-input px-3 lg:w-full lg:px-10 lg:items-center
