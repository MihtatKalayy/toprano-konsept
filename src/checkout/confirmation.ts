import type { CartSummary, ResolvedLine } from '../lib/cart'

/** Onay ekranında gösterilen özet: yalnızca ürünler ve toplamlar; kişisel veri içermez. */
export interface OrderConfirmation {
  lines: ResolvedLine[]
  summary: CartSummary
}

// Onay yalnızca bellekte, tek kullanımlık tutulur. Depolamaya ya da adres çubuğuna yazılmadığı için
// sayfa yenilenince veya onay adresi doğrudan açılınca bulunamaz ve onay ekranı gösterilmez.
let pending: OrderConfirmation | null = null

export function stashConfirmation(confirmation: OrderConfirmation): void {
  pending = confirmation
}

export function peekConfirmation(): OrderConfirmation | null {
  return pending
}

export function discardConfirmation(): void {
  pending = null
}
