'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Alert from '../Alert'
import Button from '../Button'
import Input from '../Input'
import TextArea from '../TextArea'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: {
    name: string
    email: string
    message: string
  }) => {
    setError(null)
    setSuccess(null)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setSuccess(
        'Mensaje enviado con éxito. Pronto nos pondremos en contacto contigo.'
      )
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
      reset()
    } else {
      setError('Error al enviar el mensaje')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <div className="-mx-2 flex flex-col items-center gap-8 rounded-lg bg-gray-background px-2 pb-6 pt-8 lg:gap-7 lg:rounded-2xl lg:p-14">
      <Image
        src={'/svg/Logo_text.svg'}
        alt="Logotipo de Impromec"
        width={500}
        height={500}
        className="h-auto w-20 lg:w-32"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4 lg:gap-6"
      >
        <Input
          label="Nombre"
          placeholder="Ej: José Rodríguez Soto"
          {...register('name')}
        />
        <Input
          label="Correo electrónico"
          placeholder="Ej: yo@correo.com"
          {...register('email')}
        />
        <TextArea
          variant="full"
          label="Mensaje"
          placeholder="Escribe tu mensaje aquí"
          {...register('message')}
        />
        {error && <Alert variant="error" paragraph={error} />}
        {success && <Alert variant="success" paragraph={success} />}
        <Button className="mt-16" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </div>
  )
}
