import clsx from 'clsx'
import { ElementType, ReactNode } from 'react'

type TypographyVariant =
  | 'heading_h4'
  | 'heading_h6'
  | 'body_large_semibold'
  | 'body_large_regular'
  | 'body_medium_bold'
  | 'body_medium_medium'
  | 'body_medium_regular'
  | 'body_small_medium'
  | 'body_small_regular'
  | 'body_xs_medium'
  | 'body_xs_regular'
  | 'body_xxs_regular'

interface VariantProps {
  tag: ElementType
  className: string
}

const variants: Record<TypographyVariant, VariantProps> = {
  heading_h4: {
    tag: 'h4',
    className: 'text-3xl font-bold',
  },
  heading_h6: {
    tag: 'h6',
    className: 'text-2xl font-semibold',
  },
  body_large_semibold: {
    tag: 'p',
    className: 'text-lg font-semibold',
  },
  body_large_regular: {
    tag: 'p',
    className: 'text-lg font-normal',
  },
  body_medium_bold: {
    tag: 'p',
    className: 'text-base font-bold',
  },
  body_medium_medium: {
    tag: 'p',
    className: 'text-base font-medium',
  },
  body_medium_regular: {
    tag: 'p',
    className: 'text-base font-normal',
  },
  body_small_medium: {
    tag: 'p',
    className: 'text-sm font-medium',
  },
  body_small_regular: {
    tag: 'p',
    className: 'text-sm font-normal',
  },
  body_xs_medium: {
    tag: 'p',
    className: 'text-xs font-medium',
  },
  body_xs_regular: {
    tag: 'p',
    className: 'text-xs font-normal',
  },
  body_xxs_regular: {
    tag: 'p',
    className: 'text-[10px] font-normal',
  },
}

interface TypographyProps {
  variant?: TypographyVariant
  className?: string
  children: ReactNode
}

export default function Typography({
  variant = 'body_medium_regular',
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = variants[variant].tag

  return (
    <Component
      className={clsx(variants[variant].className, className)}
      {...props}
    >
      {children}
    </Component>
  )
}
