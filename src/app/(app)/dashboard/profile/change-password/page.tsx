import InputPass from '@/components/InputPass'
import { authLinks } from '@/constants/links.constants'
import Link from 'next/link'
import ProfileAvatar from '../components/ProfileAvatar'
import ButtonsGroup from './components/ButtonsGroup'

export default function ChangePasswordPage() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-placeholder bg-gray-white px-2 pb-12 pt-16 lg:px-28 lg:pt-14">
        <ProfileAvatar isFormDisabled />

        <div className="w-full lg:flex lg:items-end lg:gap-8">
          <InputPass label="Contraseña actual" />

          <div className="mt-1 w-full text-end lg:text-start">
            <Link
              href={authLinks.forgotPass.path}
              className="body_small_regular hover:text-green-success hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="body_medium_regular">
              Última modificación: [11/05/2024]
            </p>
          </div>
        </div>

        <hr className="my-8 w-full text-gray-placeholder lg:my-6" />

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8">
          <InputPass
            label="Contraseña nueva"
            placeholder="8+caracteres: letras, números, símbolos"
          />
          <InputPass
            label="Confirmar nueva contraseña"
            placeholder="Repite la contraseña"
          />
        </div>

        <div className="hidden w-full lg:block">
          <ButtonsGroup />
        </div>
      </div>

      <div className="w-full lg:hidden">
        <ButtonsGroup />
      </div>
    </>
  )
}
