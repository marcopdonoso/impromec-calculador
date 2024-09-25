import Button from '@/components/Button'
import Input from '@/components/Input'

export default function AddSectorPage() {
  return (
    <section className="flex min-h-screen flex-col px-4 pt-8">
      <Input
        label="Nombre del sector [1]"
        placeholder="Ej: Sala de servidores"
        className="mb-16"
      />
      <Button className="mb-4">Guardar sector</Button>
      <Button variant="secondary">Volver atrás</Button>
    </section>
  )
}
