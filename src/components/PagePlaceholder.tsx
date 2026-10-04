import type { ReactNode } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'

interface PagePlaceholderProps {
  title: string
  description: string
  children?: ReactNode
}

// Sayfaların gerçek içeriği gelene kadar kullanılan ortak yer tutucu.
export function PagePlaceholder({ title, description, children }: PagePlaceholderProps) {
  usePageMeta(title)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-prose text-lg text-antrasit-700">{description}</p>
      {children}
    </div>
  )
}
