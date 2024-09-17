import Image from 'next/image'

export default function RegisterEmailSendedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-7">
      <div className="flex flex-col items-center gap-6">
        <Image
          src={'/svg/smile.svg'}
          alt="happy_face"
          width={150}
          height={150}
          className="size-[70px]"
        />
        <h4 className="body_large_semibold text-center lg:heading_h4">
          Sus datos de registro han sido enviados
        </h4>
        <p className="body_small_regular max-w-[596px] text-center lg:body_large_regular">
          Te enviaremos un email para confirmar tu dirección de correo
          electrónico y habilitar tu acceso a Impromec Calculador
        </p>
      </div>
    </main>
  )
}
