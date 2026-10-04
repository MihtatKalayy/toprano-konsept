import { describe, expect, it } from 'vitest'
import { discardConfirmation, peekConfirmation, stashConfirmation, type OrderConfirmation } from './confirmation'

const confirmation: OrderConfirmation = {
  lines: [],
  summary: { itemCount: 0, subtotalKurus: 0, shippingKurus: 0, totalKurus: 0, remainingForFreeShippingKurus: 0 },
}

describe('onay kaydı', () => {
  it('başta boştur, saklanınca okunur, atılınca kaybolur', () => {
    expect(peekConfirmation()).toBeNull()
    stashConfirmation(confirmation)
    expect(peekConfirmation()).toBe(confirmation)
    discardConfirmation()
    expect(peekConfirmation()).toBeNull()
  })
})
