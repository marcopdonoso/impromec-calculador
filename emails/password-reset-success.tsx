/* eslint-disable @next/next/no-img-element */
import EmailTemplate from '@/components/email/EmailTemplate'

const PasswordResetSuccessEmail = () => {
  return (
    <EmailTemplate
      title="La contraseña de su cuenta se ha actualizado."
      heading="Contraseña actualizada"
      name=""
      buttonText="Iniciar sesión"
      buttonHref=""
      token=""
    >
      La contraseña de tu cuenta en{' '}
      <span className="font-semibold">Impromec Calculador.</span> se ha
      actualizado con éxito.
    </EmailTemplate>
  )
}

export default PasswordResetSuccessEmail
