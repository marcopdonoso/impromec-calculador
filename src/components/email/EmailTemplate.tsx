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
import { ReactNode } from 'react'

interface EmailTemplateProps {
  title: string
  heading: string
  name: string
  children: ReactNode
  buttonText: string
  buttonHref: string
  token: string
}

const EmailTemplate = ({
  title,
  heading,
  name,
  children,
  buttonText,
  buttonHref,
  token,
}: EmailTemplateProps) => {
  return (
    <Html lang="es">
      <Head title={title} />
      <Preview>{title}</Preview>
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
              <Column className="flex items-center gap-5">
                <Img
                  src="https://res.cloudinary.com/drc513m7f/image/upload/v1725472967/Logo_xd3tbz.jpg"
                  alt="impromec_logo"
                  className="h-16"
                />
                <h4 className="text-2xl font-bold">{heading}</h4>
              </Column>
            </Row>
            <Text className="text-base">¡Hola, {name}!</Text>
            <Text className="text-base">{children}</Text>
            <Button
              href={buttonHref}
              className="mt-4 w-full max-w-[430px] rounded-lg bg-gray-button_primary py-3 text-center text-gray-white"
            >
              {buttonText}
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailTemplate
