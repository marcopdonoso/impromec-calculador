import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import IconTagInfo from './IconTagInfo'

export default function ProjectOverviewContent() {
  return (
    <div className="flex flex-col gap-1 lg:gap-2">
      <IconTagInfo
        icon={<BriefcaseIcon />}
        tag="Proyecto"
        info="[Instalación Electrobol]"
      />
      <IconTagInfo
        icon={<BuildingOfficeIcon />}
        tag="Empresa"
        info="[Electrobol S.A]"
      />
      <IconTagInfo
        icon={<MapPinIcon />}
        tag="Locación"
        info="[Cochabamba, Bolivia]"
      />
    </div>
  )
}
