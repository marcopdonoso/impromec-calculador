import Button from '@/components/Button'
import { appLinks } from '@/constants/links.constants'
import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function CalculatorMain() {
  return (
    <main className="mt-14 flex w-full flex-col gap-4 lg:mt-20">
      <Link href={'/dashboard/calculator/projects-list'}>
        <Button variant="icon_right" icon={<ChevronRightIcon />}>
          Mis proyectos [(0)]
        </Button>
      </Link>
      <Link href={appLinks.calculatorNewProject.path}>
        <Button variant="add" icon={<PlusCircleIcon />}>
          Agregar proyecto
        </Button>
      </Link>
    </main>
  )
}
