import { useEffect } from 'react'
import { site } from '../content/site'

export function usePageTitle(pageTitle: string) {
  useEffect(() => {
    document.title = site.pageTitle(pageTitle)
  }, [pageTitle])
}
