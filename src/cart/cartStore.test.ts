import { describe, expect, it, vi } from 'vitest'
import { shopConfig } from '../config/shop'
import { products } from '../content/catalog'
import { createProductLookup } from '../lib/cart'
import { cartStorageKey, serializeCart } from '../lib/cartStorage'
import { createCartStore } from './cartStore'

class MemoryStorage implements Storage {
  private items = new Map<string, string>()
  get length() {
    return this.items.size
  }
  clear() {
    this.items.clear()
  }
  getItem(key: string) {
    return this.items.get(key) ?? null
  }
  key(index: number) {
    return [...this.items.keys()][index] ?? null
  }
  removeItem(key: string) {
    this.items.delete(key)
  }
  setItem(key: string, value: string) {
    this.items.set(key, value)
  }
}

class BrokenStorage extends MemoryStorage {
  getItem(): string | null {
    throw new DOMException('Erişim engellendi', 'SecurityError')
  }
  setItem(): void {
    throw new DOMException('Kota aşıldı', 'QuotaExceededError')
  }
}

const lookup = createProductLookup(products)
const silentLogger = () => ({ warn: vi.fn() })
const makeStore = (storage: Storage | null, logger = silentLogger()) =>
  ({ store: createCartStore({ storage, lookup, config: shopConfig, logger }), logger })

function fakeWindow() {
  const listeners = new Set<(event: StorageEvent) => void>()
  return {
    addEventListener: (_type: 'storage', listener: (event: StorageEvent) => void) => {
      listeners.add(listener)
    },
    removeEventListener: (_type: 'storage', listener: (event: StorageEvent) => void) => {
      listeners.delete(listener)
    },
    dispatch: (event: Partial<StorageEvent>) => listeners.forEach((listener) => listener(event as StorageEvent)),
    size: () => listeners.size,
  }
}

describe('createCartStore', () => {
  it('her değişikliği kaydeder ve dinleyicilere bildirir', () => {
    const storage = new MemoryStorage()
    const { store } = makeStore(storage)
    const listener = vi.fn()
    store.subscribe(listener)

    expect(store.add('p-001', 2).status).toBe('added')
    store.setQuantity('p-001', 5)
    store.add('p-012', 1)
    store.remove('p-012')

    expect(store.getSnapshot().cart).toEqual([{ productId: 'p-001', quantity: 5 }])
    expect(JSON.parse(storage.getItem(cartStorageKey)!)).toEqual({ version: 1, lines: [{ productId: 'p-001', quantity: 5 }] })
    expect(listener).toHaveBeenCalledTimes(4)
  })

  it('değişmeyen işlemde kaydetmez ve bildirmez; anlık görüntü aynı kalır', () => {
    const { store } = makeStore(new MemoryStorage())
    const listener = vi.fn()
    store.subscribe(listener)
    const before = store.getSnapshot()
    store.add('p-006', 1)
    store.remove('p-001')
    expect(store.getSnapshot()).toBe(before)
    expect(listener).not.toHaveBeenCalled()
  })

  it('yeniden oluşturulunca kayıtlı sepeti okur (yenileme sonrası kalıcılık)', () => {
    const storage = new MemoryStorage()
    makeStore(storage).store.add('p-001', 3)
    expect(makeStore(storage).store.getSnapshot()).toEqual({ cart: [{ productId: 'p-001', quantity: 3 }], issues: [] })
  })

  it('bozuk kaydı ayıklar, düzeltilmiş hali geri yazar, loga yazar ve bilgi verir', () => {
    const storage = new MemoryStorage()
    storage.setItem(cartStorageKey, JSON.stringify({ version: 1, lines: [{ productId: 'p-001', quantity: 99 }, { productId: 'x' }] }))
    const { store, logger } = makeStore(storage)
    expect(store.getSnapshot().cart).toEqual([{ productId: 'p-001', quantity: 10 }])
    expect(store.getSnapshot().issues).toHaveLength(2)
    expect(logger.warn).toHaveBeenCalledOnce()
    expect(storage.getItem(cartStorageKey)).toBe(serializeCart([{ productId: 'p-001', quantity: 10 }]))
    store.dismissIssues()
    expect(store.getSnapshot().issues).toEqual([])
  })

  it('tamamen bozuk metinde boş sepetle açılır', () => {
    const storage = new MemoryStorage()
    storage.setItem(cartStorageKey, '{bozuk')
    const { store } = makeStore(storage)
    expect(store.getSnapshot().cart).toEqual([])
    expect(store.getSnapshot().issues).toEqual([{ type: 'corrupt' }])
  })

  it('depolama kullanılamıyorsa bellekte çalışır ve loga yazar', () => {
    const { store, logger } = makeStore(new BrokenStorage())
    expect(logger.warn).toHaveBeenCalledOnce()
    store.add('p-001', 2)
    store.add('p-001', 1)
    expect(store.getSnapshot().cart).toEqual([{ productId: 'p-001', quantity: 3 }])
    expect(logger.warn).toHaveBeenCalledOnce()
  })

  it('kaydetme başarısız olursa bellekte devam eder ve bir kez loga yazar', () => {
    const storage = new MemoryStorage()
    storage.setItem = () => {
      throw new DOMException('Kota aşıldı', 'QuotaExceededError')
    }
    const { store, logger } = makeStore(storage)
    store.add('p-001', 1)
    store.add('p-012', 1)
    expect(store.getSnapshot().cart).toHaveLength(2)
    expect(logger.warn).toHaveBeenCalledOnce()
  })

  it('depolama hiç yoksa (null) bellekte çalışır', () => {
    const { store } = makeStore(null)
    store.add('p-001', 1)
    expect(store.getSnapshot().cart).toEqual([{ productId: 'p-001', quantity: 1 }])
  })

  it('başka sekmedeki değişikliği alır', () => {
    const storage = new MemoryStorage()
    const { store } = makeStore(storage)
    const target = fakeWindow()
    const disconnect = store.connect(target)
    const listener = vi.fn()
    store.subscribe(listener)

    storage.setItem(cartStorageKey, serializeCart([{ productId: 'p-012', quantity: 4 }]))
    target.dispatch({ key: cartStorageKey, storageArea: storage })
    expect(store.getSnapshot().cart).toEqual([{ productId: 'p-012', quantity: 4 }])
    expect(listener).toHaveBeenCalledOnce()

    // Başka anahtarlar ya da başka depolama alanı yok sayılır
    target.dispatch({ key: 'baska', storageArea: storage })
    target.dispatch({ key: cartStorageKey, storageArea: new MemoryStorage() })
    expect(listener).toHaveBeenCalledOnce()

    // Diğer sekmede depolama tamamen temizlenirse sepet boşalır
    storage.clear()
    target.dispatch({ key: null, storageArea: storage })
    expect(store.getSnapshot().cart).toEqual([])

    disconnect()
    expect(target.size()).toBe(0)
  })
})
