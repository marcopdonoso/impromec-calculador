import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import IconTagInfo from './IconTagInfo'

export default function ProjectOverview() {
  return (
    <div className="px-2">
      <div className="mb-4 flex h-12 items-center rounded-lg bg-gray-input px-5">
        <h4 className="body_small_medium">Resumen de tu proyecto</h4>
      </div>
      <IconTagInfo
        icon={<BriefcaseIcon />}
        tag="Proyecto"
        info="Instalación Electrobol"
      />
      <IconTagInfo
        icon={<BuildingOfficeIcon />}
        tag="Empresa"
        info="Electrobol S.A"
      />
      <IconTagInfo
        icon={<MapPinIcon />}
        tag="Locación"
        info="Cochabamba, Bolivia"
      />
    </div>
  )
}
