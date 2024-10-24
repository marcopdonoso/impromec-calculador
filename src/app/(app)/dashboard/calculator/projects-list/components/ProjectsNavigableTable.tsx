import NavigableItemsTable from '@/components/NavigableItemsTable'
import { cables } from '@/constants/cables.constants'
import { Project } from '@/models/project.model'
import NoProjectsYet from './NoProjectsYet'

interface ProjectsNavigableTableProps {
  isSortedByRecent: boolean
}
export default function ProjectsNavigableTable({
  isSortedByRecent,
}: ProjectsNavigableTableProps) {
  // TODO: delete mock data
  const projects: Project[] = [
    {
      id: '1-1-1-1-1',
      projectName: 'Instalación Electrobol de su planta de azucar yeah',
      projectCompany: 'Electrobol S.A',
      projectLocation: 'La Paz',
      sectors: [
        {
          sectorName: 'Sala de servidores',
          trayTypeSelection: 'escalerilla',
          reservePercentage: 40,
          installationLayerSelection: 'singleLayer',
          cablesInTray: [
            { cable: cables[0], quantity: 20, arrangement: 'clover' },
          ],
          results: {
            moreConvenientOption: {
              id: '1-1-1-1-1',
              trayName: 'Curva horizontal 90° (300 mm)',
              trayDescription:
                'Curva horizontal 90º. Radio = 300 mm.  Permite conducir  el cableado a través de un cambio de dirección ortogonal. El radio interno de esta curva es ideal  para instalaciones con cables de secciones menores, tanto en baja tensión como en ultra baja  tensión.',
              trayType: 'escalerilla',
              technicalDetails: {
                thicknessInMM: 2,
                widthInMM: 100,
                heightInMM: 60,
                usefulAreaInMM2: 5400,
                loadResistanceInKgM: 150,
              },
            },
            otherRecommendedOptions: [
              {
                id: '2-2-2-2-2',
                trayName: 'Curva horizontal 90° (600 mm)',
                trayDescription:
                  'Curva horizontal 90º. Radio = 600 mm.  Permite conducir  el cableado a través de un cambio de dirección ortogonal. El radio interno de esta curva es ideal  para instalaciones con cables de secciones menores, tanto en baja tensión como en ultra baja  tensión.',
                trayType: 'escalerilla',
                technicalDetails: {
                  thicknessInMM: 2,
                  widthInMM: 100,
                  heightInMM: 100,
                  usefulAreaInMM2: 8000,
                  loadResistanceInKgM: 150,
                },
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
      projectCompany: 'YPFB',
      projectLocation: 'Cochabamba',
      sectors: [
        {
          sectorName: 'Sala de máquinas',
          trayTypeSelection: 'canal',
          reservePercentage: 40,
          installationLayerSelection: 'singleLayer',
          cablesInTray: [
            { cable: cables[0], quantity: 20, arrangement: 'clover' },
          ],
          results: {
            moreConvenientOption: {
              id: '1-1-1-1-1',
              trayName: 'Curva horizontal 90° (300 mm)',
              trayDescription:
                'Curva horizontal 90º. Radio = 300 mm.  Permite conducir  el cableado a través de un cambio de dirección ortogonal. El radio interno de esta curva es ideal  para instalaciones con cables de secciones menores, tanto en baja tensión como en ultra baja  tensión.',
              trayType: 'escalerilla',
              technicalDetails: {
                thicknessInMM: 2,
                widthInMM: 100,
                heightInMM: 60,
                usefulAreaInMM2: 5400,
                loadResistanceInKgM: 150,
              },
            },
            otherRecommendedOptions: [
              {
                id: '2-2-2-2-2',
                trayName: 'Curva horizontal 90° (600 mm)',
                trayDescription:
                  'Curva horizontal 90º. Radio = 600 mm.  Permite conducir  el cableado a través de un cambio de dirección ortogonal. El radio interno de esta curva es ideal  para instalaciones con cables de secciones menores, tanto en baja tensión como en ultra baja  tensión.',
                trayType: 'escalerilla',
                technicalDetails: {
                  thicknessInMM: 2,
                  widthInMM: 100,
                  heightInMM: 100,
                  usefulAreaInMM2: 8000,
                  loadResistanceInKgM: 150,
                },
              },
            ],
          },
        },
      ],
      createdAt: '2021/10/6',
    },
  ]
  const noProjects: Project[] = []

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
  return dataRowsSortedByDate.length !== 0 ? (
    <NavigableItemsTable
      dataRows={dataRowsSortedByDate}
      title="Proyecto"
      handleNavigate={handleNavigate}
    />
  ) : (
    <NoProjectsYet />
  )
}
