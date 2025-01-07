export type Merchant = {
  id: number
  name: string
}

export type ShopItem = {
  id: number,
  price: number, // $
  discount?: number, // [0..1]
  merchantId: number,
  name: string,
  description?: string,
  image: string,
  stars: {
    value: number
    count: number
  },
  itemOfMonth?: boolean
  awards?: string[]
  tags?: number[]
}

export type TagCategory = {
  id: number
  name: string
}

export type Tag = {
  id: number,
  name: string,
  categoryId: number
}