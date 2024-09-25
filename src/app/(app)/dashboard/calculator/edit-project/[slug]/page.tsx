import ProjectOverview from '../../../components/ProjectOverview'
import DataForCalculation from '../../components/DataForCalculation'

export default function EditProjectPage() {
  return (
    <section className="flex min-h-screen w-full max-w-4xl flex-col gap-6 px-2 pb-20 pt-8 lg:gap-12">
      <ProjectOverview />
      <DataForCalculation />
    </section>
  )
}
