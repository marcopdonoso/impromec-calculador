import Image from 'next/image'
import Button from '../Button'
import Input from '../Input'
import TextArea from '../TextArea'

export default function ContactForm() {
  return (
    <div className="-mx-2 flex flex-col items-center gap-8 rounded-lg bg-gray-background px-2 pb-6 pt-8 lg:gap-7 lg:rounded-2xl lg:p-14">
      <Image
        src={'/svg/Logo_text.svg'}
        alt="Logotipo de Impromec"
        width={500}
        height={500}
        className="h-auto w-20 lg:w-32"
      />
      <form className="flex w-full flex-col items-center gap-4 lg:gap-6">
        <Input label="Nombre" placeholder="Ej: José Rodríguez Soto" />
        <Input label="Correo electrónico" placeholder="Ej: yo@correo.com" />
        <TextArea
          variant="full"
          label="Mensaje"
          placeholder="Escribe tu mensaje aquí"
        />
        <Button className="mt-16" variant="full" type="submit">
          Enviar Correo
        </Button>
      </form>
    </div>
  )
}
