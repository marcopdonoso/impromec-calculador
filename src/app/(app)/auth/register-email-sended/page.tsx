import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function RegisterEmailSendedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-7">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={'/svg/smile.svg'}
          alt="happy_face"
          width={150}
          height={150}
          className="mb-2 size-[70px]"
        />

        <h4 className="body_large_semibold text-center lg:heading_h4">
          Sus datos de registro han sido enviados
        </h4>

        <p className="body_small_regular max-w-[596px] text-center lg:body_large_regular">
          Te enviaremos un email para confirmar tu dirección de correo
          electrónico y habilitar tu acceso a Impromec Calculador
        </p>

        <div className="max-w-[596px] rounded-2xl bg-gray-background p-4 lg:px-10 lg:py-6">
          <div className="flex items-start gap-2">
            <div>
              <InformationCircleIcon className="w-5 lg:w-6" />
            </div>
            <p className="body_small_regular lg:body_medium_regular">
              Si no ves el correo en tu bandeja de entrada, revisa la{' '}
              <span className="body_small_medium lg:body_medium_bold">
                carpeta de spam
              </span>{' '}
              o{' '}
              <span className="body_small_medium lg:body_medium_bold">
                correo no deseado.
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
