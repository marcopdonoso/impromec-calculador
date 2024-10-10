import Message from '@/components/Message'
import { useRouter } from 'next/navigation'

export default function DeleteSingleSectorMessage() {
  const router = useRouter()

  const handleClick = () => {
    console.log('borrar proyecto actual') //TODO: cambiar por llamada al servicio correspondiente
    router.push('/dashboard/calculator/new-project')
  }
  return (
    <div className="mt-10">
      <Message title="Recuerda que seleccionaste dividir el proyecto en sectores.">
        Cuando divides el proyecto en sectores debes agregar al menos un sector
        y así podrás comenzar con el cálculo,{' '}
        <span
          onClick={handleClick}
          className="body_small_medium cursor-pointer text-green-success underline lg:body_medium_medium"
        >
          o puedes crear el proyecto desde cero.
        </span>
      </Message>
    </div>
  )
}
