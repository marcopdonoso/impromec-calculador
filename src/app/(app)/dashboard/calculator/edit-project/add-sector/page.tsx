'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Message from '@/components/Message'
import { useRouter } from 'next/navigation'

export default function AddSectorPage() {
  const router = useRouter()

  const handleClick = () => {
    console.log('borrar proyecto actual') //TODO: cambiar por llamada al servicio correspondiente
    router.push('/dashboard/calculator/new-project')
  }

  return (
    <section className="flex min-h-screen w-full max-w-4xl flex-col px-4 pt-8">
      <Input
        label="Nombre del sector [1]"
        placeholder="Ej: Sala de servidores"
        className="mb-16 lg:mb-6"
      />
      <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-9">
        <Button>Guardar sector</Button>
        <Button variant="secondary">Volver atrás</Button>
      </div>
      <div className="mt-10">
        <Message title="Recuerda que seleccionaste dividir el proyecto en sectores.">
          Cuando divides el proyecto en sectores debes agregar al menos un
          sector y así podrás comenzar con el cálculo,{' '}
          <span
            onClick={handleClick}
            className="body_small_medium cursor-pointer text-green-success underline lg:body_medium_medium"
          >
            o puedes crear el proyecto desde cero.
          </span>
        </Message>
      </div>
    </section>
  )
}
