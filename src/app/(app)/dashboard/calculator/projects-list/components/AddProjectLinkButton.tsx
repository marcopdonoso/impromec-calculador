import Button from '@/components/Button'
import { appLinks } from '@/constants/links.constants'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AddProjectLinkButton() {
  return (
    <Link
      href={appLinks.calculatorNewProject.path}
      className="w-full min-w-52 px-2 lg:flex-1"
    >
      <Button variant="add" icon={<PlusCircleIcon />}>
        Agregar proyecto
      </Button>
    </Link>
  )
}
