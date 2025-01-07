import type { Merchant, ShopItem, Tag, TagCategory } from '@/types'

export const mockTagCategories: TagCategory[] = [
  {
    id: 1,
    name: 'Common',
  },
]

export const mockTags: Tag[] = [
  {
    id: 1,
    name: 'Winter',
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Summer',
    categoryId: 1,
  },
  {
    id: 3,
    name: 'Camp',
    categoryId: 1,
  },
  {
    id: 4,
    name: 'Desert',
    categoryId: 1,
  },
]

export const mockMerchants: Merchant[] = [
  {
    id: 1,
    name: 'Zara',
  },
  {
    id: 2,
    name: 'Orange',
  },
  {
    id: 3,
    name: 'long merchant',
  },
]

export const mockShopItems: ShopItem[] = [
  {
    id: 1,
    merchantId: 1,
    price: 10,
    discount: 0.212131,
    name: 'Croco',
    image: '/images/space-01.avif',
    description: 'Best choice if you go to beach',
    stars: {
      value: 5,
      count: 2045,
    },
    itemOfMonth: true,
    tags: [1],
  },
  {
    id: 2,
    merchantId: 1,
    price: 12,
    name: 'Wood bucket(Zara)',
    image: '/images/space-02.avif',
    stars: {
      value: 3.5,
      count: 1005
    },
    tags: [2],
  },
  {
    id: 3,
    merchantId: 3,
    price: 8,
    discount: 0.5,
    name: 'Expert tube',
    image: '/images/space-03.avif',
    stars: {
      value: 4.8,
      count: 5002,
    },
    itemOfMonth: true,
  },
  {
    id: 4,
    merchantId: 2,
    price: 20,
    name: 'Red stone',
    image: '/images/space-04.avif',
    stars: {
      value: 3.9,
      count: 823,
    },
    awards: ['Best choice', 'other award'],
    tags: [3, 4],
  },
  {
    id: 5,
    merchantId: 2,
    price: 40,
    discount: 0.8,
    name: 'Old hag',
    image: '/images/space-01.avif',
    stars: {
      value: 2.1,
      count: 10,
    },
    awards: ['Good choice'],
  },
  {
    id: 6,
    price: 5,
    merchantId: 2,
    name: 'Super duper duper duper long long long long long long long long long long long long item name',
    image: '/images/space-02.avif',
    stars: {
      value: 3,
      count: 122,
    },
    tags: [1, 2, 3, 4],
  },
]
