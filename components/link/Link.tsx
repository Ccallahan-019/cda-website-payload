import { Button, type ButtonProps } from '@/components/ui/buttons/button'
import Link from 'next/link'
import React from 'react'

import type { Page } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  disabled?: boolean
  children?: React.ReactNode
  label?: string | null
  newTab?: boolean | null
  reference?: Page | null
  size?: ButtonProps['size']
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const LinkComponent: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && reference && reference.slug
      ? `/${reference.slug}` : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (!appearance || appearance === 'inline') {
    return (
      <Link href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
      <Link href={href || url || ''} {...newTabProps}>
        <Button size={size} variant={appearance}>
          {label && label}
          {children && children}
        </Button>
      </Link>
  )
}
