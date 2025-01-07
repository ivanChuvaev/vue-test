<script setup lang="ts">
import ShopCard from '@/components/ShopCard.vue'
import { computed, ref } from 'vue'
import { localStorageStore } from '@/stores/local-storage-store'
import CommonHeader from '../CommonHeader.vue'
import SearchInput from '../inputs/SearchInput.vue'

const props = defineProps<{
  cart?: boolean
}>()

const search = ref('')

const items = computed(() => {
  return localStorageStore.shopItems.filter((item) => {
    const cartFilter =
      !props.cart || localStorageStore.cart.shopItems.find(({ id }) => item.id === id)

    const searchFilter =
      !search.value ||
      item.name.toUpperCase().includes(search.value.toUpperCase()) ||
      localStorageStore.merchants
        .find((merchant) => merchant.id === item.merchantId)
        ?.name.toUpperCase()
        .includes(search.value.toUpperCase())

    if (cartFilter && searchFilter) {
      return true
    }
    return false
  })
})
</script>

<template>
  <div class="shop-view">
    <CommonHeader :text="props.cart ? 'Cart' : 'Shop'" :hide-count="true" class="common-header" />
    <SearchInput class="search" v-model="search" />
    <div class="empty-message" v-if="items.length === 0">{{ search ? 'Not found' : 'Empty' }}</div>
    <div class="items" v-if="items.length > 0">
      <ShopCard v-for="item in items" v-bind="item" :key="item.id" />
    </div>
  </div>
</template>

<style scoped>
.shop-view {
  padding: 16px;
  min-height: calc(100dvh - var(--layout-header-height));
  display: flex;
  flex-direction: column;
}
.common-header {
  margin-bottom: 16px;
}
.search {
  margin-bottom: 16px;
}
.tabs {
  margin-left: auto;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.tab {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: var(--color-background-soft);
  position: relative;
  color: var(--color-text);
}
.tab--active {
  color: var(--color-text-inverted);
  background-color: color-mix(in srgb, var(--color-background-soft), var(--color-primary) 100%);
}
.pages label {
  display: flex;
  align-items: center;
  gap: 4px;
}
.empty-message {
  flex-grow: 1;
  display: grid;
  place-items: center;
  border-radius: 4px;
}
.items {
  display: grid;
  justify-items: center;
  align-items: start;
  gap: 16px;
}
@media screen and (min-width: 955px) {
  .items {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
