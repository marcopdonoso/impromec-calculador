import Button from '@/components/Button'
import Message from '@/components/Message'
import { useRouter } from 'next/navigation'

interface UnfinishedSectorMessageProps {
  idx: number
  projectId: string
}

export default function UnfinishedSectorMessage({
  idx,
  projectId,
}: UnfinishedSectorMessageProps) {
  const router = useRouter()

  const handleCompleteSector = () => {
    // Navegar a la página de edición del proyecto con el parámetro de sector activo
    router.push(`/dashboard/calculator/edit-project/${projectId}?activeSector=${idx}`)
  }

  return (
    <Message
      variant="info"
      title={`No has terminado de completar el Sector ${idx + 1}`}
    >
      Por favor, revisa los campos pendientes del Sector {idx + 1} para realizar
      el calculo correspondiente.
      <div className="-ml-10 mt-4 lg:ml-0">
        <Button onClick={handleCompleteSector}>
          Completar sector {idx + 1}
        </Button>
      </div>
    </Message>
  )
}
