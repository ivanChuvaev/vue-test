import { mockMerchants, mockShopItems, mockTagCategories, mockTags } from '@/mock'
import type { Merchant, ShopItem, Tag, TagCategory } from '@/types'
import { reactive, watch } from 'vue'

const version = 5;

type LocalStorageStore = {
  version: number
  merchants: Merchant[]
  shopItems: ShopItem[]
  tags: Tag[],
  tagCategories: TagCategory[],
  favoriteShopItems: number[]
  ratedShopItems: Array<{
    id: number,
    rate: number,
  }>
  cart: {
    shopItems: Array<{
      id: number,
      count: number,
    }>
  }
  addShopItemToCart: (id: number) => void
  removeShopItemFromCart: (id: number) => void
}

let localStorageData: LocalStorageStore | null = null

try {
  const data = window.localStorage.getItem('local-storage-data')
  if (data) {
    localStorageData = JSON.parse(data)

    // handle new versions of storage
    if (localStorageData && localStorageData.version !== version) {
      localStorageData = null
    }
  }
} catch (e) {
  localStorageData = null
}

export const localStorageStore = reactive<LocalStorageStore>({
  version,
  merchants: localStorageData?.merchants ?? mockMerchants,
  shopItems: localStorageData?.shopItems ?? mockShopItems,
  tags: localStorageData?.tags ?? mockTags,
  tagCategories: localStorageData?.tagCategories ?? mockTagCategories,
  cart: localStorageData?.cart ?? { shopItems: [] },
  favoriteShopItems: localStorageData?.favoriteShopItems ?? [],
  ratedShopItems: localStorageData?.ratedShopItems ?? [],
  addShopItemToCart(id: number) {
    const found = this.cart.shopItems.find((item) => item.id === id);
    if (found) {
      found.count += 1
    } else {
      this.cart.shopItems.push({ id, count: 1 })
    }
  },
  removeShopItemFromCart(id: number) {
    const found = this.cart.shopItems.find((item) => item.id === id);
    if (found) {
      found.count -= 1
      if (found.count === 0) {
        this.cart.shopItems = this.cart.shopItems.filter((item) => item.id !== id);
      }
    }
  }
})

watch(localStorageStore, (value) => {
  window.localStorage.setItem('local-storage-data', JSON.stringify(value))
})
