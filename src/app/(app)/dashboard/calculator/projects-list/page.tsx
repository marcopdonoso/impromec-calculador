'use client'
import { useState } from 'react'
import AddProjectLinkButton from './components/AddProjectLinkButton'
import DateSortingListbox from './components/DateSortingListbox'
import ProjectsListHeader from './components/ProjectsListHeader'
import ProjectsNavigableTable from './components/ProjectsNavigableTable'

export default function ProjectsListPage() {
  const [isSortedByRecent, setIsSortedByRecent] = useState(true)

  return (
    <section className="flex min-h-screen w-full flex-col items-center px-2 pb-20 pt-8 lg:px-28">
      <div className="mb-8 flex w-full flex-col lg:mb-10 lg:max-w-4xl lg:flex-row lg:items-end">
        <ProjectsListHeader />
        <AddProjectLinkButton />
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
