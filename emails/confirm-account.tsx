/* eslint-disable @next/next/no-img-element */
import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Tailwind,
  Text,
} from '@react-email/components'

interface ConfirmAccountProps {
  name: string
  email: string
  token: string
}

const ConfirmAccountEmail = ({ name, email, token }: ConfirmAccountProps) => {
  return (
    <Html lang="es">
      <Head title="Confirme su dirección de correo electrónico" />
      <Preview>Confirme su dirección de correo electrónico</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                red: '#DA0027',
                red_alt: '#FEEBEB',
                yellow: '#FABC00',
                green: {
                  success: '#22AD5C',
                  success_alt: '#DAF8E6',
                },
                gray: {
                  button_primary: '#3F3F3F',
                  text: '#1F2A37',
                  text_alt: '#4B5563',
                  placeholder_icon: '#6B7280',
                  text_inactive: '#637381',
                  placeholder: '#9CA3AF',
                  input: '#DFE4EA',
                  background: '#F2F2F2',
                  background_alt: '#FAFAFA',
                  white: '#FFFFFF',
                  dark: '#111928',
                },
                shadow: 'rgba(160, 175, 195, 0.4)',
              },
            },
          },
        }}
      >
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
            format: 'woff2',
          }}
        />
        <Body>
          <Container className="h-7 w-full bg-red" />
          <Container className="flex w-full flex-col">
            <Row className="my-4">
              <Column className="flex items-center gap-7">
                <Img
                  src="https://res.cloudinary.com/drc513m7f/image/upload/v1725472967/Logo_xd3tbz.jpg"
                  alt="impromec_logo"
                  className="h-12"
                />
                <h4 className="text-2xl font-bold">Confirma tu cuenta</h4>
              </Column>
            </Row>
            <Text className="text-base">¡Hola, {name}!</Text>
            <Text className="text-base">
              Acabas de crear una cuenta en{' '}
              <span className="font-semibold">Impromec Calculador.</span>{' '}
              Confirma tu dirección de correo electrónico para que que podamos
              verificar que realmente eres tú.
            </Text>
            <Button
              href="example.com"
              className="mt-4 w-full max-w-[430px] rounded-lg bg-[#636363] py-3 text-center text-gray-white"
            >
              Confirmar registro
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ConfirmAccountEmail
