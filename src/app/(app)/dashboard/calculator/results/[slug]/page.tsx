'use client'
import Button from '@/components/Button'
import TrayRecommendationCard, {
  TrayRecommendationCardProps,
} from '@/components/TrayRecommendationCard'
import { Results } from '@/models/project.model'
import {
  ArrowDownTrayIcon,
  PencilIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import AddedCablesTable from '../../components/AddedCablesTable'
import ModalOverlay from '../../components/ModalOverlay'
import ProjectOverviewContent from '../../components/ProjectOverviewContent'
import CalcDataAndResultsHeader from './components/CalcDataAndResultsHeader'
import DeleteProjectModal from './components/DeleteProjectModal'
import LoadAreaTotals from './components/LoadAreaTotals'
import MostConvenientIconLabel from './components/MostConvenientIconLabel'
import MyProjectsLinkButton from './components/MyProjectsLinkButton'
import OtherTrayOptionsCollapsible from './components/OtherTrayOptionsCollapsible'
import ProjectOverviewTitle from './components/ProjectOverviewTitle'
import ResultsHeader from './components/ResultsHeader'
import SelectedTrayCard from './components/SelectedTrayCard'
import UnfinishedSectorsListMessages from './components/UnfinishedSectorsListMessages'

export default function ResultsPage() {
  const [isDeleteProjectModalVisible, setIsDeleteProjectModalVisible] =
    useState(false)

  // TODO: Borrar data mockeada
  const results: Results = {
    moreConvenientOption: {
      id: '1-1-1-1-1',
      trayName: 'Curva horizontal 90° (300 mm)',
      trayDescription:
        'Curva horizontal 90º. Radio = 300 mm.  Permite conducir  el cableado a través de un cambio de dirección ortogonal. El radio interno de esta curva es ideal  para instalaciones con cables de secciones menores, tanto en baja tensión como en ultra baja  tensión.',
      trayType: 'canal',
      technicalDetails: {
        thicknessInMM: 0.75,
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
  }

  const moreConvenientOptionToCard: TrayRecommendationCardProps | null =
    results.moreConvenientOption && {
      title: results.moreConvenientOption?.trayName,
      subtitle: `Hasta ${results.moreConvenientOption?.technicalDetails.loadResistanceInKgM} kg/ml`,
      description: `${results.moreConvenientOption.technicalDetails.thicknessInMM} mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2.`,
      height: results.moreConvenientOption.technicalDetails.heightInMM,
      width: results.moreConvenientOption.technicalDetails.widthInMM,
      image: `/img/${results.moreConvenientOption.trayType}.png`,
      alt: `bandeja portacable de tipo ${results.moreConvenientOption.trayType}`,
    }

  return (
    <section className="flex min-h-screen flex-col items-center px-4 pb-20 pt-12 lg:px-28">
      <div className="flex w-full max-w-4xl flex-col">
        <div className="mb-8 flex w-full flex-col gap-8 lg:mb-10 lg:gap-10">
          <ResultsHeader />
          <UnfinishedSectorsListMessages />
        </div>

        <div className="mb-6 flex w-full justify-end">
          <MyProjectsLinkButton />
        </div>

        <div className="lg:-mx-20 lg:mb-12 lg:rounded-2xl lg:border lg:border-gray-placeholder lg:px-20 lg:py-20">
          <div className="mb-7 w-full lg:mb-6">
            <ProjectOverviewTitle />
            <ProjectOverviewContent />
          </div>

          <div className="mb-6 w-full">
            <CalcDataAndResultsHeader />
          </div>

          <div className="mb-6 w-full">
            <SelectedTrayCard />
          </div>

          <div className="mb-8 w-full lg:mb-16">
            <AddedCablesTable />
          </div>

          <LoadAreaTotals />

          <MostConvenientIconLabel />

          {moreConvenientOptionToCard && (
            <TrayRecommendationCard
              title={moreConvenientOptionToCard.title}
              subtitle={moreConvenientOptionToCard.subtitle}
              image={moreConvenientOptionToCard.image}
              alt={moreConvenientOptionToCard.alt}
              description={moreConvenientOptionToCard.description}
              height={moreConvenientOptionToCard.height}
              width={moreConvenientOptionToCard.width}
              firstOption
            />
          )}

          <hr className="my-6 text-gray-placeholder lg:my-12" />

          <OtherTrayOptionsCollapsible />
        </div>

        <div className="flex w-full flex-col gap-4 lg:mb-14 lg:flex-row lg:gap-10">
          <Button variant="secondary" icon={<ArrowDownTrayIcon />}>
            Descargar
          </Button>

          <Button icon={<PhoneIcon />}>
            Solicitar Cotización del Proyecto
          </Button>
        </div>

        <hr className="my-6 w-full text-gray-placeholder lg:hidden" />

        <div className="flex w-full flex-col gap-4">
          <Button variant="add" icon={<PencilIcon />}>
            Editar
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteProjectModalVisible(true)}
          >
            Eliminar Proyecto
          </Button>
        </div>
      </div>

      <ModalOverlay isModalVisible={isDeleteProjectModalVisible}>
        <DeleteProjectModal
          isDeleteProjectModalVisible={isDeleteProjectModalVisible}
          setIsDeleteProjectModalVisible={setIsDeleteProjectModalVisible}
        />
      </ModalOverlay>
    </section>
  )
}
