import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { Project } from '@/models/project.model'
import IconTagInfo from './IconTagInfo'

interface ProjectOverviewContentProps {
  project: Project
}

export default function ProjectOverviewContent({ project }: ProjectOverviewContentProps) {
  return (
    <div className="flex flex-col gap-1 lg:gap-2">
      <IconTagInfo
        icon={<BriefcaseIcon />}
        tag="Proyecto"
        info={project.projectName}
      />
      <IconTagInfo
        icon={<BuildingOfficeIcon />}
        tag="Empresa"
        info={project.projectCompany}
      />
      <IconTagInfo
        icon={<MapPinIcon />}
        tag="Locación"
        info={project.projectLocation}
      />
    </div>
  )
}
