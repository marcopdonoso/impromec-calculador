'use client'
import Button from '@/components/Button'
import { appLinks } from '@/constants/links.constants'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import DateSortingListbox from './components/DateSortingListbox'
import ProjectsNavigableTable from './components/ProjectsNavigableTable'

export default function ProjectsListPage() {
  const [isSortedByRecent, setIsSortedByRecent] = useState(true)

  return (
    <section className="flex min-h-screen w-full flex-col items-center px-2 pb-20 pt-8 lg:px-28">
      <div className="mb-8 flex w-full flex-col lg:mb-10 lg:max-w-4xl lg:flex-row lg:items-end">
        <div className="mb-4 w-full rounded-lg bg-gray-white p-3 lg:mb-0">
          <h6 className="hidden lg:heading_h6 lg:block">Mis proyectos</h6>

          <p className="body_small_regular text-center lg:body_medium_regular lg:text-start lg:text-gray-text_inactive">
            Encuentra aquí todos los proyectos que has calculado en{' '}
            <span className="body_small_medium">Impromec Calculador</span>
          </p>
        </div>

        <Link
          href={appLinks.calculatorNewProject.path}
          className="w-full min-w-52 px-2 lg:flex-1"
        >
          <Button variant="add" icon={<PlusCircleIcon />}>
            Agregar proyecto
          </Button>
        </Link>
      </div>

      <div className="w-full rounded-2xl border border-gray-placeholder bg-gray-white px-5 pb-11 pt-6 lg:px-28 lg:pb-16 lg:pt-10">
        <div className="mx-auto w-full lg:max-w-4xl">
          <DateSortingListbox setIsSortedByRecent={setIsSortedByRecent} />
          <ProjectsNavigableTable isSortedByRecent={isSortedByRecent} />
        </div>
      </div>
    </section>
  )
}
