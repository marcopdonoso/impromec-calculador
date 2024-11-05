'use client'
import Button from '@/components/Button'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-app_background-mobile bg-cover bg-fixed px-3 md:bg-center lg:bg-app_background-desktop">
      <Image
        alt="not_found_error"
        src={'/svg/error.svg'}
        height={181}
        width={520.08}
        className="h-24 w-auto"
      />
      <div className="flex flex-col items-center justify-center gap-2 p-2 text-center">
        <h6 className="body_large_semibold">Error de servidor</h6>
        <p className="body_small_regular">
          Lo sentimos, pero parece que algo salió mal en nuestro servidor
        </p>
      </div>

      <Button onClick={() => reset()}>Volver a intentar</Button>
    </div>
  )
}
