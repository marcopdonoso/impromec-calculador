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

  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hasVerified = useRef(false)

  useEffect(() => {
    if (token && !hasVerified.current) {
      hasVerified.current = true
      verifyEmail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const verifyEmail = async () => {
    setStatus(null)
    setError(null)

    const result = await verifyEmailToken(token as string)

    if (result.data) {
      setStatus(result.data.message)
    } else if (result.error) {
      const errorMsg = result.error?.message
      if (errorMsg.includes('ya está verificado')) {
        setStatus('Tu correo ya ha sido verificado. Inicia sesión.')
      }
      setError(errorMsg)
    }
  }

  const requestLinkHanlder = async () => {
    setError(null)

    const result = await requestVerificationEmail(token as string)

    if (result.data) {
      router.push(authLinks.successfulReg.path)
    } else if (result.error) {
      setError(result.error?.message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-7">
      {status && (
        <div className="flex flex-col items-center gap-6">
          <Image
            src={'/svg/smile.svg'}
            alt="happy_face"
            width={150}
            height={150}
            className="size-[70px]"
          />
          <h4 className="body_large_semibold text-center lg:heading_h4">
            {status}
          </h4>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center gap-6">
          <FaceFrownIcon className="size-[70px]" />
          <h4 className="body_large_semibold text-center lg:heading_h4">
            {error}
          </h4>
        </div>
      )}
      <div className="min-w-[300px]">
        {status?.includes('verificado') && (
          <Link href={authLinks.login.path}>
            <Button className="w-full">Iniciar sesión</Button>
          </Link>
        )}
        {error && !status?.includes('verificado') && (
          <Button className="w-full" onClick={requestLinkHanlder}>
            Solicitar un nuevo enlace
          </Button>
        )}
      </div>
    </main>
  )
}
