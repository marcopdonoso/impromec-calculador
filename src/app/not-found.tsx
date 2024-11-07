import Button from '@/components/Button'
import { appLinks } from '@/constants/links.constants'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-app_background-mobile bg-cover bg-fixed px-3 md:bg-center lg:bg-app_background-desktop">
      <Image
        alt="not_found_error"
        src={'/svg/not-found.svg'}
        height={181}
        width={510.84}
        className="h-24 w-auto"
      />
      <div className="flex flex-col items-center justify-center gap-2 p-2 text-center">
        <h6 className="body_large_semibold">Página no encontrada</h6>
        <p className="body_small_regular">
          Lo sentimos, pero la página que estás buscando no existe o ha sido
          movida
        </p>
      </div>
      <Link href={appLinks.home.path} className="w-full">
        <Button>Volver atrás</Button>
      </Link>
    </div>
  )
}
