import clsx from 'clsx'
import Link from 'next/link'

interface AuthFormCardProps {
  children: React.ReactNode
  title: string
  description: string
  footer?: string
  footerLink?: string
  footerLinkText?: string
  fullwidth?: boolean
  className?: string
}

export default function AuthFormCard({
  children,
  title,
  description,
  footer,
  footerLink,
  footerLinkText,
  fullwidth = true,
  className,
}: AuthFormCardProps) {
  return (
    <section
      className={clsx(
        'flex w-full flex-col items-center rounded-lg bg-gray-background px-2 py-8 lg:rounded-2xl',
        {
          'lg:px-28 lg:py-11': fullwidth,
          'lg:w-1/2 lg:p-14': !fullwidth,
        },
        className
      )}
    >
      <h4 className="body_large_semibold mb-2 text-center lg:heading_h4">
        {title}
      </h4>
      <p
        className={clsx(
          'body_small_regular text-center lg:body_large_regular',
          {
            'lg:text-start': !fullwidth,
          }
        )}
      >
        {description}
      </p>
      {children}
      <hr className="my-6 w-full text-gray-placeholder" />
      <p className="body_small_regular lg:body_large_regular">
        {footer}{' '}
        {footerLink && (
          <Link
            className="body_small_medium lg:body_large_semibold"
            href={footerLink}
          >
            {footerLinkText}
          </Link>
        )}
      </p>
    </section>
  )
}
