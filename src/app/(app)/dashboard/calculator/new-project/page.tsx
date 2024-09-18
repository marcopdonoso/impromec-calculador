import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'
import Input from '@/components/Input'
import MySwitch from '@/components/MySwitch'
import Link from 'next/link'

export default function NewProjectPage() {
  return (
    <section className="min-h-screen px-4">
      <Breadcrumbs className="px-24 py-5" />
      <div className="flex flex-col items-center justify-center py-12 lg:py-4">
        <h4 className="body_large_semibold lg:heading_h4">Proyecto nuevo</h4>
        <p className="body_small_regular mt-2 lg:body_large_regular">
          Ingresa los siguientes datos para comenzar
        </p>
        <form className="mt-12 w-full lg:mt-14 lg:max-w-4xl">
          <Input
            label="Nombre del proyecto"
            placeholder="Ej: Instalación planta de fabricación"
          />
          <div className="mt-4 flex flex-col gap-4 lg:mt-6 lg:flex-row lg:gap-8">
            <Input label="Empresa" placeholder="Ej: Empresa ABC" />
            <Input label="Locación" placeholder="Ej: Cochabamba, Bolivia" />
          </div>
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-gray-background px-7 py-6 lg:mt-10 lg:flex-row lg:items-start lg:justify-between lg:pl-14 lg:pr-20">
            <div className="max-w-lg lg:flex-1">
              <p className="body_small_medium lg:body_medium_medium">
                ¿Deseas dividir el proyecto en sectores?
              </p>
              <p className="hidden lg:body_medium_regular lg:mt-2 lg:block">
                Al dividir el proyecto en sectores, es posible optimizar el
                diseño y la selección de bandejas portacables para cada área
                específica.
              </p>
            </div>
            <MySwitch />
          </div>
          <div className="mt-8 flex w-full flex-col gap-4 lg:flex-row-reverse lg:gap-9">
            <Button type="submit">Continuar</Button>
            <Link href={'/dashboard/calculator'} className="lg:w-full">
              <Button variant="secondary" type="button">
                Volver atrás
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
