import Button from '@/components/Button'
import Message from '@/components/Message'
import { useRouter } from 'next/navigation'

interface UnfinishedProjectMessageProps {
  projectId: string
}

export default function UnfinishedProjectMessage({
  projectId,
}: UnfinishedProjectMessageProps) {
  const router = useRouter()

  const handleCompleteProject = () => {
    // Navegar a la página de edición del proyecto
    router.push(`/dashboard/calculator/edit-project/${projectId}`)
  }

  return (
    <Message
      variant="info"
      title="No has terminado de calcular el proyecto"
    >
      Por favor, revisa los campos pendientes para realizar el cálculo correspondiente.
      <div className="-ml-10 mt-4 lg:ml-0">
        <Button onClick={handleCompleteProject}>
          Completar proyecto
        </Button>
      </div>
    </Message>
  )
}
