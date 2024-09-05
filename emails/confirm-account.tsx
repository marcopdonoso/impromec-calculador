/* eslint-disable @next/next/no-img-element */
import EmailTemplate from '@/components/email/EmailTemplate'

const ConfirmAccountEmail = () => {
  return (
    <EmailTemplate
      title="Confirme su dirección de correo electrónico"
      heading="Confirma tu cuenta"
      name=""
      buttonText="Confirmar registro"
      buttonHref=""
      token=""
    >
      Acabas de crear una cuenta en{' '}
      <span className="font-semibold">Impromec Calculador.</span> Confirma tu
      dirección de correo electrónico para que que podamos verificar que
      realmente eres tú.
    </EmailTemplate>
  )
}

export default ConfirmAccountEmail
