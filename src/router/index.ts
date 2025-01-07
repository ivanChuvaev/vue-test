import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/views/HomeView.vue'
import RootLayout from '@/components/layouts/RootLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root-layout',
      component: RootLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('@/components/views/NotificationsView.vue'),
        },
        {
          path: '/circles',
          name: 'circles',
          component: () => import('@/components/views/CirclesView.vue'),
        },
        {
          path: '/shop',
          name: 'shop',
          component: () => import('@/components/views/ShopView.vue'),
        },
        {
          path: '/shop-cart',
          name: 'cart',
          component: () => import('@/components/views/ShopView.vue'),
          props: { cart: true },
        },
        {
          path: '/virtual',
          name: 'virtual',
          component: () => import('@/components/views/VirtualView.vue'),
        },
      ],
    },
  ],
})

export default router
