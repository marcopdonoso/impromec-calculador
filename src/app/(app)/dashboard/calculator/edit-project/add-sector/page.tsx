import Button from '@/components/Button'
import Input from '@/components/Input'
import { Suspense } from 'react'
import DeleteSingleSectorMessageWrapper from './components/DeleteSingleSectorMessageWrapper'

export default function AddSectorPage() {
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
      <Suspense>
        <DeleteSingleSectorMessageWrapper />
      </Suspense>
    </section>
  )
}
