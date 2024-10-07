'use client'
import Button from '@/components/Button'
import MyListbox from '@/components/MyListbox'
import NavigableItemsTable from '@/components/NavigableItemsTable'
import { cables } from '@/constants/cables.constants'
import { appLinks } from '@/constants/links.constants'
import { Option } from '@/models/listbox.model'
import { Project } from '@/models/project.model'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectsListPage() {
  const [isSortedByRecent, setIsSortedByRecent] = useState(true)
  const options: Option[] = [
    {
      text: 'Fecha (más reciente)',
      value: 'recent',
    },
    {
      text: 'Fecha (más antiguo)',
      value: 'ancient',
    },
  ]

  // TODO: delete mock data
  const projects: Project[] = [
    {
      id: '1-1-1-1-1',
      projectName: 'Instalación Electrobol de su planta de azucar yeah',
      company: 'Electrobol S.A',
      projectLocation: 'La Paz',
      sectors: [
        {
          name: 'Sala de servidores',
          trayTypeSelection: 'escalerilla',
          reservePercentage: 40,
          installationLayerSelection: 'singleLayer',
          cablesInTray: [
            { cable: cables[0], quantity: 20, arrangement: 'clover' },
          ],
          results: {
            moreConvenientOption: {
              trayType: 'escalerilla',
              thicknessInMM: 2,
              widthInMM: 100,
              heightInMM: 60,
              usefulAreaInMM2: 5400,
              loadResistanceInKgM: 150,
            },
            otherRecommendedOptions: [
              {
                trayType: 'escalerilla',
                thicknessInMM: 2,
                widthInMM: 100,
                heightInMM: 100,
                usefulAreaInMM2: 5400,
                loadResistanceInKgM: 160,
              },
            ],
          },
        },
      ],
      createdAt: '2022/05/31',
    },
    {
      id: '2-2-2-2-2',
      projectName: 'Instalación YPFB porque si muy bonito todo yeah',
      company: 'YPFB',
      projectLocation: 'Cochabamba',
      sectors: [
        {
          name: 'Sala de máquinas',
          trayTypeSelection: 'canal',
          reservePercentage: 40,
          installationLayerSelection: 'singleLayer',
          cablesInTray: [
            { cable: cables[0], quantity: 20, arrangement: 'clover' },
          ],
          results: {
            moreConvenientOption: {
              trayType: 'escalerilla',
              thicknessInMM: 2,
              widthInMM: 100,
              heightInMM: 60,
              usefulAreaInMM2: 5400,
              loadResistanceInKgM: 150,
            },
            otherRecommendedOptions: [
              {
                trayType: 'escalerilla',
                thicknessInMM: 2,
                widthInMM: 100,
                heightInMM: 100,
                usefulAreaInMM2: 5400,
                loadResistanceInKgM: 160,
              },
            ],
          },
        },
      ],
      createdAt: '2021/10/6',
    },
  ]

  interface dataRow {
    projectName: string
    sectorsNumber?: string | null
    createdAt: string
  }

  const dataRows: dataRow[] = projects.map((project) => {
    return {
      projectName: project.projectName,
      sectorsNumber: `${project.sectors?.length ?? 0} Sectores`,
      createdAt: project.createdAt,
    }
  })

  const dataRowsSortedByDate: dataRow[] = dataRows.sort((a, b) => {
    if (isSortedByRecent) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
  })

  const handleNavigate = (dataRowIndex: number) => {
    const projectId = projects[dataRowIndex].id
    console.log(projectId)
  }

  const handleSortChange = (option: Option) => {
    setIsSortedByRecent(option.value === 'recent')
  }

  return (
    <section className="flex min-h-screen w-full flex-col items-center px-2 pb-20 pt-8 lg:px-28">
      <div className="flex w-full flex-col lg:max-w-4xl lg:flex-row lg:items-end">
        <div className="mb-4 w-full rounded-lg bg-gray-white p-3">
          <h6 className="hidden lg:heading_h6 lg:block">Mis proyectos</h6>
          <p className="body_small_regular text-center lg:body_medium_regular lg:text-start lg:text-gray-text_inactive">
            Encuentra aquí todos los proyectos que has calculado en{' '}
            <span className="body_small_medium">Impromec Calculador</span>
          </p>
        </div>
        <Link
          href={appLinks.calculatorNewProject.path}
          className="mb-8 w-full min-w-52 px-2 lg:flex-1"
        >
          <Button variant="add" icon={<PlusCircleIcon />}>
            Agregar proyecto
          </Button>
        </Link>
      </div>

      <div className="w-full rounded-2xl border border-gray-placeholder bg-gray-white px-5 pb-11 pt-6 lg:px-28 lg:pb-16 lg:pt-10">
        <MyListbox
          label="Ordenar por:"
          variant="sorting"
          options={options}
          className="mb-6 w-full justify-end"
          onChange={handleSortChange}
        />
        <NavigableItemsTable
          dataRows={dataRowsSortedByDate}
          title="Proyecto"
          handleNavigate={handleNavigate}
        />
      </div>
    </section>
  )
}
