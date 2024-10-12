import DataForCalculation from '../../components/DataForCalculation'
import ProjectOverview from '../../components/ProjectOverview'
import SaveAndCalc from '../../components/SaveAndCalc'
import SectorsList from '../../components/SectorsList'
import PreventNavigation from './components/PreventNavigation'

export default function EditProjectPage() {
  return (
    <section className="flex min-h-screen w-full max-w-4xl flex-col gap-6 px-2 pb-20 pt-8 lg:gap-12">
      <PreventNavigation backHref="/" />

      <SectorsList />
      <ProjectOverview />
      <DataForCalculation />
      <SaveAndCalc />
    </section>
  )
}
