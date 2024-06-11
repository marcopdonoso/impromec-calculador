'use client'
import Input from '@/components/Input'

export default function Home() {
  const Icon = () => (
    <div className="flex h-4 w-4 items-center justify-center text-gray-text">
      +
    </div>
  )
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
    </div>
  )
}
