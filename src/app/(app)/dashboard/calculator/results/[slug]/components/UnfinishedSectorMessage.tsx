import Button from '@/components/Button'
import Message from '@/components/Message'

interface UnfinishedSectorMessageProps {
  idx: number
}

export default function UnfinishedSectorMessage({
  idx,
}: UnfinishedSectorMessageProps) {
  return (
    <Message
      variant="info"
      title={`No has terminado de completar el Sector ${idx + 1}`}
    >
      Por favor, revisa los campos pendientes del Sector {idx + 1} para realizar
      el calculo correspondiente.
      <div className="-ml-10 mt-4 lg:ml-0">
        <Button>Completar sector {idx + 1}</Button>
      </div>
    </Message>
  )
}
