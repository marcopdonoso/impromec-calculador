import ProjectOverviewContent from './ProjectOverviewContent'

export default function ProjectOverview() {
  return (
    <div className="px-2 lg:px-0">
      <div className="mb-4 flex h-12 items-center rounded-lg bg-gray-input px-5 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">
          Resumen de tu proyecto
        </h4>
      </div>
      <ProjectOverviewContent />
    </div>
  )
}
