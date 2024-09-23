import Breadcrumbs from '@/components/Breadcrumbs'
import ProjectOverview from '../../components/ProjectOverview'
import DataForCalculation from '../components/DataForCalculation'

export default function NoSectorizedPage() {
  return (
    <section className="flex min-h-screen flex-col gap-6 px-2 pb-20 pt-8">
      <Breadcrumbs
        currentPageTitle="Instalacion Electrobol"
        className="hidden lg:block"
      />
      <ProjectOverview />
      <DataForCalculation />
    </section>
  )
}
