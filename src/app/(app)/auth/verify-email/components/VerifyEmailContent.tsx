'use client'

import Button from '@/components/Button'
import { authLinks } from '@/constants/links.constants'
import {
  requestVerificationEmail,
  verifyEmailToken,
} from '@/services/user.service'
import { FaceFrownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()
  const hasVerified = useRef(false)

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | null>(
    null
  )
  const [message, setMessage] = useState<string | null>(null)
  const [alreadyVerified, setAlreadyVerified] = useState(false)

  useEffect(() => {
    if (token && !hasVerified.current) {
      hasVerified.current = true
      verifyEmail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const verifyEmail = async () => {
    try {
      setStatus('loading')
      setMessage(null)
      setAlreadyVerified(false)

      const result = await verifyEmailToken(token as string)

      if (hasVerified.current === false) return

      if (result.data) {
        setStatus('success')
        setMessage(result.data.message)
        return
      }

      if (result.error) {
        // Verificamos específicamente si el error es porque ya está verificado
        if (result.error.statusCode === 409) {
          setStatus('success')
          setAlreadyVerified(true)
          setMessage(result.error.message)
        } else {
          setStatus('error')
          setMessage(result.error.message)
        }
      }
    } catch (error) {
      console.error('Error durante la verificación:', error)
      setStatus('error')
      setMessage('Ha ocurrido un error inesperado durante la verificación')
    }
  }

  const requestLinkHandler = async () => {
    setStatus('loading')
    setMessage(null)

    try {
      const result = await requestVerificationEmail(token as string)

      if (result.data) {
        router.push(authLinks.successfulReg.path)
      }

      if (result.error) {
        setStatus('error')
        setMessage(result.error.message)
      }
    } catch (error) {
      console.error('Error al solicitar nuevo enlace:', error)
      setStatus('error')
      setMessage('Ha ocurrido un error al solicitar un nuevo enlace')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-7">
      {status === 'loading' && <p className="text-gray-500">Verificando...</p>}

      {status === 'success' && (
        <div className="flex flex-col items-center gap-6">
          <Image
            src={'/svg/smile.svg'}
            alt="happy_face"
            width={150}
            height={150}
            className="size-[70px]"
          />
          <h4 className="body_large_semibold text-center lg:heading_h4">
            {message}
            {alreadyVerified && (
              <span className="text-gray-600 mt-2 block text-sm font-normal">
                Ya puedes iniciar sesión con tu cuenta.
              </span>
            )}
          </h4>
          <Link href={authLinks.login.path} className="w-full">
            <Button className="w-full">Iniciar sesión</Button>
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-6">
          <FaceFrownIcon className="size-[70px]" />
          <h4 className="body_large_semibold text-center lg:heading_h4">
            {message}
          </h4>
          <Button className="w-full" onClick={requestLinkHandler}>
            Solicitar un nuevo enlace
          </Button>
        </div>
      )}
    </main>
  )
}
