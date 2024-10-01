import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import IconTagInfo from './IconTagInfo'

export default function ProjectOverview() {
  return (
    <div className="px-2 lg:px-0">
      <div className="mb-4 flex h-12 items-center rounded-lg bg-gray-input px-5 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">
          Resumen de tu proyecto
        </h4>
      </div>
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
    </div>
  )
}
