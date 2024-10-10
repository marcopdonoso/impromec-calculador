'use client'
import Button from '@/components/Button'
import TrayRecommendationCard from '@/components/TrayRecommendationCard'
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

  return (
    <section className="flex min-h-screen flex-col items-center px-4 pb-20 pt-12 lg:px-28">
      <div className="flex w-full max-w-4xl flex-col">
        <div className="mb-8 w-full lg:mb-16">
          <ResultsHeader />
        </div>

        <div className="mb-8 w-full lg:mb-16">
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

          <TrayRecommendationCard
            title="Bandeja Recta Liviana (60 mm x 100 mm)"
            subtitle="Hasta 96.33 kg/ml"
            image="/img/escalerilla.png"
            alt="bandeja_portacable_tipo_escalerilla"
            description="1 mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2."
            height={60}
            width={100}
            firstOption
          />

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
