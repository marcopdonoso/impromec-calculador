import Button from '@/components/Button'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function MyProjectsLinkButton() {
  return (
    <Link href={'/dashboard/calculator/projects-list'}>
      <Button
        variant="icon_right"
        icon={<ChevronRightIcon />}
        className="max-w-52 lg:w-52"
      >
        Mis proyectos
      </Button>
    </Link>
  )
}
