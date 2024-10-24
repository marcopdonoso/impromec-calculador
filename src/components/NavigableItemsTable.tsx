import { BriefcaseIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface TableProps {
  dataRows: Record<string, any>[]
  title?: string
  handleNavigate?: (id: number) => void
  className?: string
}

export default function NavigableItemsTable({
  dataRows,
  title,
  handleNavigate,
  className,
}: TableProps) {
  return (
    <div className={clsx('flex flex-col items-center', className)}>
      {dataRows.map((dataRow, idx) => {
        const createdAt = new Date(dataRow.createdAt).toLocaleDateString(
          'es-ES',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }
        )
        const dataRowCopy = { ...dataRow }
        const dataRowIndex = idx
        delete dataRowCopy.id
        const entries = Object.values({
          ...dataRowCopy,
          createdAt: createdAt,
        })
        return (
          <div
            role="button"
            key={idx}
            className="relative flex w-full flex-col border-y border-gray-input py-2 lg:min-h-14 lg:w-full lg:flex-row lg:items-center lg:font-medium"
            onClick={() => handleNavigate && handleNavigate(dataRowIndex)}
          >
            <div className="flex">
              <div className="lg:mr-4">
                <BriefcaseIcon className="absolute top-4 w-6 text-gray-text lg:static" />
              </div>
              {title && (
                <h3 className="mr-1 pl-10 text-sm font-medium lg:pl-0 lg:text-base">
                  {title}:
                </h3>
              )}
            </div>
            <div className="w-full pl-10 lg:flex lg:items-center lg:pl-0">
              {entries.map((e, idx) => {
                return (
                  <div
                    className="inline-block w-1/2 first:mb-3 first:w-full last:text-end lg:w-full lg:flex-1 lg:pl-3 lg:first:mb-0 lg:first:font-normal lg:last:text-start"
                    key={idx}
                  >
                    <span className="text-sm text-gray-text lg:text-base">
                      {e}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="absolute right-0 top-4 lg:static">
              <ChevronRightIcon className="w-4 text-gray-text" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
