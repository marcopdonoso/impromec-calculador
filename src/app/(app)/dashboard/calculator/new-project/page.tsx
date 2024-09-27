import NewProjectForm from './components/NewProjectForm'

export default function NewProjectPage() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12 lg:max-w-4xl">
      <h4 className="body_large_semibold lg:heading_h4">Proyecto nuevo</h4>
      <p className="body_small_regular mt-2 lg:body_large_regular">
        Ingresa los siguientes datos para comenzar
      </p>
      <NewProjectForm />
    </section>
  )
}
