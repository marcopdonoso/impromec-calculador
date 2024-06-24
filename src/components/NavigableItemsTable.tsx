import { BriefcaseIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface TableProps {
  dataRows: Record<string, any>[]
  title?: string
  handleNavigate?: (id: string) => void
  className?: string
}

export default function NavigableItemsTable({
  dataRows,
  title,
  handleNavigate,
  className,
}: TableProps) {
  return (
    <div className={clsx('w-[66vw] min-w-80', className)}>
      <div className="flex flex-col items-center">
        {dataRows.map((dataRow, index) => {
          const createdAt = new Date(dataRow.createdAt).toLocaleDateString(
            'es-ES',
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }
          )
          const dataRowCopy = { ...dataRow }
          const dataRowID = dataRow.id
          delete dataRowCopy.id
          const entries = Object.values({
            ...dataRowCopy,
            createdAt: createdAt,
          })
          return (
            <div
              key={index}
              className="flex w-80 flex-col rounded-2xl border border-gray-input px-3 py-4 md:h-14 md:w-full md:flex-row md:items-center"
            >
              <BriefcaseIcon className="mr-4 w-6 text-gray-text" />
              {title && <h3 className="mr-1 font-medium">{title}:</h3>}
              {entries.map((e, index) => {
                return (
                  <div
                    className="flex justify-between border-b border-gray-input py-2 md:flex-1 md:border-none md:font-medium"
                    key={index}
                  >
                    <span className="text-sm text-gray-text md:text-base">
                      {e}
                    </span>
                  </div>
                )
              })}
              {handleNavigate && (
                <div className="mt-4 flex justify-end md:m-0">
                  <ChevronRightIcon
                    role="button"
                    className="w-5 text-gray-text"
                    onClick={() => handleNavigate(dataRowID)}
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
