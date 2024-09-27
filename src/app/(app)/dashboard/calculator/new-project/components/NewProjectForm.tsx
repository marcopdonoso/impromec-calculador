import Button from '@/components/Button'
import Input from '@/components/Input'
import { appLinks } from '@/constants/links.constants'
import Link from 'next/link'
import SectorSwitch from './SectorSwitch'

export default function NewProjectForm() {
  return (
    <form className="mt-12 w-full lg:mt-14">
      <Input
        label="Nombre del proyecto"
        placeholder="Ej: Instalación planta de fabricación"
      />
      <div className="mt-4 flex flex-col gap-4 lg:mt-6 lg:flex-row lg:gap-8">
        <Input label="Empresa" placeholder="Ej: Empresa ABC" />
        <Input label="Locación" placeholder="Ej: Cochabamba, Bolivia" />
      </div>
      <SectorSwitch />
      <div className="mt-8 flex w-full flex-col gap-4 lg:flex-row-reverse lg:gap-9">
        <Button type="submit">Continuar</Button>
        <Link href={appLinks.calculatorHome.path} className="lg:w-full">
          <Button variant="secondary" type="button">
            Volver atrás
          </Button>
        </Link>
      </div>
    </form>
  )
}
