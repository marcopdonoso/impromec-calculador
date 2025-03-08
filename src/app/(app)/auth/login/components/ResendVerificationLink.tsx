'use client'
import Alert from '@/components/Alert'
import { resendVerificationEmail } from '@/services/user.service'
import { useState } from 'react'

interface ResendVerificationLinkProps {
  email: string
  onClose: () => void
}

export default function ResendVerificationLink({
  email,
  onClose,
}: ResendVerificationLinkProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleResendVerification = async () => {
    setLoading(true)
    setError(null)

    const response = await resendVerificationEmail(email)

    if (response.data) {
      setSuccess(response.data.message)
      setTimeout(() => {
        setSuccess(null)
        onClose()
      }, 3000)
    }

    if (response.error) {
      setError(response.error.message)
    }

    setLoading(false)
  }

  return (
    <div className="mt-4 rounded-lg bg-yellow_alt p-4">
      <h6 className="body_medium_medium mb-2">Cuenta no verificada</h6>
      <p className="body_small_regular mb-4">
        Tu cuenta aún no ha sido verificada. Para acceder, debes verificar tu
        correo electrónico.
      </p>

      {error && (
        <div className="mb-3">
          <Alert variant="error" paragraph={error} />
        </div>
      )}

      {success && (
        <div className="mb-3">
          <Alert variant="success" paragraph={success} />
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="body_small_medium text-gray-text hover:underline"
        >
          Cancelar
        </button>
        <button
          onClick={handleResendVerification}
          disabled={loading}
          className="body_small_medium text-green-success hover:underline"
        >
          {loading ? 'Enviando...' : 'Reenviar correo de verificación'}
        </button>
      </div>
    </div>
  )
}
