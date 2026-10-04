import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { products } from '../../content/catalog'
import { ProductGallery } from './ProductGallery'

const [first] = products
const render = (count: number) =>
  renderToStaticMarkup(<ProductGallery images={first.images.slice(0, count)} productName={first.name} />)

describe('ProductGallery', () => {
  it('tek görselde küçük görsel şeridini göstermez', () => {
    const html = render(1)
    expect(html).not.toContain('<button')
    expect(html).not.toContain('aria-live')
    expect(html).toContain('fetchPriority="high"')
  })

  it('birden çok görselde ilk görsel seçili başlar', () => {
    const html = render(2)
    expect(html.match(/<button/g)).toHaveLength(2)
    expect(html.match(/aria-current="true"/g)).toHaveLength(1)
    expect(html).toContain(`alt="${first.images[0].alt}"`)
  })

  it('görsel yoksa hiçbir şey çizmez', () => {
    expect(render(0)).toBe('')
  })
})
