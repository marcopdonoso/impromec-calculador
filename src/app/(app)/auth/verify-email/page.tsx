import { Suspense } from 'react'
import VerifyEmailContent from './components/VerifyEmailContent'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
