'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <br />
      <Input
        variant="password"
        label="Contraseña"
        placeholder="8+caracteres: letras, números, símbolos"
      />
      <br />
      <Input variant="large" label="email" placeholder="yo@correo.com" />
      <Input label="email" placeholder="yo@correo.com" />
      <Textarea label="Textarea" placeholder="hola" />
      <Button variant="add" icon={<PlusCircleIcon />}>
        Mis Proyectos
      </Button>
    </div>
  )
}
