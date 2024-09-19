import Breadcrumbs from '@/components/Breadcrumbs'
import NewProjectForm from './components/NewProjectForm'

export default function NewProjectPage() {
  return (
    <section className="min-h-screen px-4">
      <Breadcrumbs className="px-24 py-5" />
      <div className="flex flex-col items-center justify-center py-12 lg:py-4">
        <h4 className="body_large_semibold lg:heading_h4">Proyecto nuevo</h4>
        <p className="body_small_regular mt-2 lg:body_large_regular">
          Ingresa los siguientes datos para comenzar
        </p>
        <NewProjectForm />
      </div>
    </section>
  )
}
