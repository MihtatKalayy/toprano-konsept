import { useEffect } from 'react'
import { site } from '../content/site'

function setMetaDescription(content: string) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!meta) throw new Error('index.html içinde <meta name="description"> bulunamadı.')
  meta.content = content
}

/** Sekme başlığını ve açıklama meta etiketini sayfaya göre günceller. */
export function usePageMeta(pageTitle: string, description: string = site.defaultMetaDescription) {
  useEffect(() => {
    document.title = site.pageTitle(pageTitle)
    setMetaDescription(description)
  }, [pageTitle, description])
}
