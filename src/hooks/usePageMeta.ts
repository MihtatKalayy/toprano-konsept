import { useEffect } from 'react'
import { site } from '../content/site'

function setMetaDescription(content: string) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!meta) throw new Error('index.html içinde <meta name="description"> bulunamadı.')
  meta.content = content
}

interface PageMetaOptions {
  /** Sepet, sipariş ve 404 gibi sayfalar arama motorlarına kapatılır. */
  noindex?: boolean
}

/** Sekme başlığını, açıklama meta etiketini ve gerekiyorsa `robots: noindex` etiketini sayfaya göre günceller. */
export function usePageMeta(pageTitle: string, description: string, { noindex = false }: PageMetaOptions = {}) {
  useEffect(() => {
    document.title = site.pageTitle(pageTitle)
    setMetaDescription(description)
    if (!noindex) return
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.append(robots)
    return () => robots.remove()
  }, [pageTitle, description, noindex])
}
