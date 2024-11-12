import Button from '@/components/Button'
import { appLinks } from '@/constants/links.constants'
import Link from 'next/link'

export default function ButtonsGroup() {
  return (
    <div className="mt-8 flex w-full flex-col gap-6 lg:mt-36 lg:flex-row-reverse lg:gap-8">
      <Button>Guardar</Button>
      <Link href={appLinks.profile.path} className="w-full">
        <Button variant="secondary">Cancelar</Button>
      </Link>
    </div>
  )
}
