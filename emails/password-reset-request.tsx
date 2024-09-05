/* eslint-disable @next/next/no-img-element */
import EmailTemplate from '@/components/email/EmailTemplate'

const PasswordResetRequestEmail = () => {
  return (
    <EmailTemplate
      title="Solicitud para restablecer la contraseña de su cuenta"
      heading="Restablecer contraseña"
      name=""
      buttonText="Restablecer contraseña"
      buttonHref=""
      token=""
    >
      Hemos recibido una solicitud para restablecer tu contraseña en{' '}
      <span className="font-semibold">Impromec Calculador.</span> Haz clic en el
      siguiente enlace para crear una nueva contraseña.
    </EmailTemplate>
  )
}

export default PasswordResetRequestEmail
