'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import SectorsListItemOptions from './SectorsListItemOptions'

interface SectorsListItemProps {
  sectorNumber: number
  sectorName: string
}

export default function SectorsListItem({
  sectorNumber,
  sectorName,
}: SectorsListItemProps) {
  const [canEdit, setCanEdit] = useState(false)
  const [isOptionsVisible, setisOptionsVisible] = useState(false)

  const optionsVisibilityToggler = () => {
    setisOptionsVisible(!isOptionsVisible)
  }

  return (
    <div className="mb-7 lg:mb-6">
      <div className="flex items-end gap-2 lg:gap-6">
        <Input
          label={`Nombre del Sector ${sectorNumber}`}
          value={sectorName}
          className="flex-1"
          disabled={!canEdit}
        />
        <div className="relative w-12">
          <Button
            variant="tertiary"
            icon={<EllipsisVerticalIcon />}
            iconClassName={'w-8'}
            onClick={optionsVisibilityToggler}
          />
          <div
            className={clsx('absolute right-0 top-14 w-fit', {
              hidden: !isOptionsVisible,
            })}
          >
            <SectorsListItemOptions
              setCanEdit={setCanEdit}
              setisOptionsVisible={setisOptionsVisible}
            />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'mt-16 flex flex-col gap-4 lg:mt-6 lg:flex-row-reverse lg:gap-9',
          {
            hidden: !canEdit,
          }
        )}
      >
        <Button>Guardar</Button>
        <Button
          variant="secondary"
          onClick={() => {
            {
              setCanEdit(false)
              setisOptionsVisible(false)
            }
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
