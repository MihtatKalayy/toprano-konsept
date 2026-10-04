// Mağaza kuralları için tek yapılandırma yeri. Tutarlar kuruş cinsinden tam sayıdır.
export const shopConfig = {
  /** Ücretsiz kargo eşiğinin altındaki siparişlerde sabit kargo ücreti (₺75) */
  shippingFeeKurus: 7_500,
  /** Ara toplam bu tutara eşit veya üstündeyse kargo ücretsizdir (₺1.500) */
  freeShippingThresholdKurus: 150_000,
  /** Sepette ürün başına adet sınırları */
  minQuantity: 1,
  maxQuantityPerProduct: 10,
} as const

export type ShopConfig = typeof shopConfig
