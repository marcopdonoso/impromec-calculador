import { TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface TableProps {
  headers: string[]
  dataRows: Record<string, any>[]
  handleDelete: () => void
  className?: string
}

export default function TableWithHeaders({
  headers,
  dataRows,
  handleDelete,
  className,
}: TableProps) {
  return (
    <div className={clsx('w-[66vw] min-w-80', className)}>
      <div className="mb-3 hidden px-10 md:flex">
        {headers.map((h) => {
          return (
            <div key={h} className="flex-1 text-gray-placeholder">
              {h}
            </div>
          )
        })}
        <div className="w-6"></div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {dataRows.map((dataRow, index) => {
          const entries = Object.values(dataRow)
          return (
            <div
              key={index}
              className="flex w-80 flex-col rounded-2xl border border-gray-input px-3 py-4 md:h-16 md:w-full md:flex-row md:items-center md:px-10"
            >
              {entries.map((e, index) => {
                return (
                  <div
                    className="flex justify-between border-b border-gray-input py-2 first:font-medium md:flex-1 md:border-none md:first:font-bold"
                    key={index}
                  >
                    <span className="text-sm font-normal text-gray-placeholder md:hidden">
                      {headers[index]}
                    </span>
                    <span className="text-sm text-gray-text md:text-base">
                      {e}
                    </span>
                  </div>
                )
              })}
              <div className="mt-4 flex justify-end md:m-0">
                <TrashIcon
                  role="button"
                  onClick={handleDelete}
                  className="w-6 text-red"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// flex md:h-16 w-80 flex-col md:flex-row rounded-2xl border border-gray-input px-3 md:w-full md:px-10 md:items-center
