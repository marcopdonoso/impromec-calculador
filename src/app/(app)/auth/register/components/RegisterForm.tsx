import Button from '@/components/Button'
import Input from '@/components/Input'
import InputPass from '@/components/InputPass'
import MyListbox from '@/components/MyListbox'
import MyPhoneInput from '@/components/MyPhoneInput'
import { specializationAreas } from '@/constants/specialization-areas.constants'

export default function RegisterForm() {
  return (
    <form className="mt-6 flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Input label="Nombre completo" placeholder="Ej: José Rodríguez Soto" />
        <Input
          type="email"
          label="Correo electrónico"
          placeholder="Ej: yo@correo.com"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Input label="Empresa (opcional)" placeholder="Ej: Empresa ABC" />
        <MyListbox
          label="Área de especialización"
          options={specializationAreas}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <MyPhoneInput />
        <Input label="Locación" placeholder="Cochabamba, Bolivia" />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:mb-24 lg:flex-row lg:gap-8">
        <InputPass
          label="Contraseña"
          placeholder="8+caracteres: letras, números, símbolos"
        />
        <InputPass
          label="Confirmar contraseña"
          placeholder="Repite la contraseña"
          className="mb-20 lg:mb-0"
        />
      </div>
      <Button className="lg:w-[32vw]">Registrarme</Button>
    </form>
  )
}
