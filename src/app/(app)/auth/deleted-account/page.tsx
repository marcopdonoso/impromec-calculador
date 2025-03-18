import Button from '@/components/Button'
import { authLinks } from '@/constants/links.constants'
import Image from 'next/image'
import Link from 'next/link'

export default function DeletedAccountPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex max-w-4xl flex-col items-center gap-4">
        <Image
          src="/svg/Delete_account.svg"
          alt="Cuenta eliminada"
          width={150}
          height={150}
          className="w-20 lg:w-36"
          priority
        />
        <h1 className="body_large_semibold lg:heading_h4">
          Tu cuenta ha sido eliminada
        </h1>
        <p className="body_small_regular max-w-xl text-center lg:body_large_regular">
          Lamentamos que te vayas. Si deseas volver en el futuro, puedes
          registrarte nuevamente
        </p>
        <div className="mt-6 flex w-full flex-col gap-4 lg:flex-row-reverse lg:gap-10">
          <Link href={authLinks.login.path} className="lg:w-full">
            <Button>Volver al inicio</Button>
          </Link>
          <Link href={authLinks.register.path} className="lg:w-full">
            <Button variant="secondary">Registrarme de nuevo</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
