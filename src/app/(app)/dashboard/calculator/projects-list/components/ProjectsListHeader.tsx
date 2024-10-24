export default function ProjectsListHeader() {
  return (
    <div className="mb-4 w-full rounded-lg bg-gray-white p-3 lg:mb-0">
      <h6 className="hidden lg:heading_h6 lg:block">Mis proyectos</h6>

      <p className="body_small_regular text-center lg:body_medium_regular lg:text-start lg:text-gray-text_inactive">
        Encuentra aquí todos los proyectos que has calculado en{' '}
        <span className="body_small_medium">Impromec Calculador</span>
      </p>
    </div>
  )
}
