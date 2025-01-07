<script setup lang="ts">
import type { ShopItem } from '@/types'
import { localStorageStore } from '@/stores/local-storage-store'
import { computed } from 'vue'
import { ModalConfigType, modalStore } from '@/stores/modal-store'
import RatingForm from './forms/RatingForm.vue'

const props = defineProps<ShopItem>()
const count = computed(
  () => localStorageStore.cart.shopItems.find((item) => item.id === props.id)?.count,
)
const handleRemoveFromCart = () => {
  localStorageStore.removeShopItemFromCart(props.id)
}
const handleAddToCart = () => {
  localStorageStore.addShopItemToCart(props.id)
}
const handleOpenRateModal = () => {
  const ratedFound = localStorageStore.ratedShopItems.find((item) => item.id === props.id)
  const formProps: InstanceType<typeof RatingForm>['$props'] = {
    initialValue: Math.round((ratedFound?.rate ?? props.stars.value) * 1e1) / 1e1,
    onSubmit(data, close) {
      const found = localStorageStore.shopItems.find((item) => item.id === props.id)
      if (found) {
        if (ratedFound) {
          found.stars.value =
            (found.stars.value * found.stars.count - ratedFound.rate + data.rating) /
            found.stars.count
          ratedFound.rate = data.rating
        } else {
          found.stars.value =
            (found.stars.value * found.stars.count + data.rating) / (found.stars.count + 1)
          found.stars.count += 1
          localStorageStore.ratedShopItems.push({
            id: props.id,
            rate: data.rating,
          })
        }
      }
      close()
    },
  }
  if (window.matchMedia('(min-width:768px)').matches) {
    modalStore.open({
      type: ModalConfigType.SIMPLE,
      component: RatingForm,
      modalProps: {
        hideHeader: true,
        style: {
          width: '300px',
        },
      },
      props: formProps,
    })
    return
  }
  modalStore.open({
    type: ModalConfigType.DRAWER,
    component: RatingForm,
    modalProps: {
      hideHeader: true,
    },
    props: formProps,
  })
}
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="title">
        <div class="title__merchant">
          {{ localStorageStore.merchants.find(({ id }) => id === props.merchantId)?.name }}
        </div>
        <span v-if="props.itemOfMonth" class="item-of-month"></span>
        <h4 class="title__name">{{ props.name }}</h4>
      </div>
      <div class="card-image-wrapper">
        <img loading="lazy" class="card-image" :src="props.image" alt="shop-card" />
      </div>
      <div v-if="props.tags && props.tags.length > 0" class="tags">
        <div v-for="id in props.tags" :key="id" class="tag">
          {{ localStorageStore.tags.find((item) => item.id === id)?.name }}
        </div>
      </div>
      <div class="description" v-if="props.description">
        {{ props.description }}
      </div>
      <div class="stars">
        <span
          v-for="(_, i) in [...Array(5)]"
          :key="i"
          class="star"
          :class="{ 'star--active': i + 1 <= Math.round(props.stars.value * 1e1) / 1e1 }"
          >&#x2605;</span
        >
        <span class="stars-number">
          {{ props.stars.value.toFixed(1) }} / {{ props.stars.count }}
        </span>
        <button class="stars-button" @click="handleOpenRateModal">
          {{
            localStorageStore.ratedShopItems.find(({ id }) => id === props.id)?.rate.toFixed(1) ??
            'Rate'
          }}
        </button>
      </div>
      <div class="price">
        <span
          class="price__initial"
          :class="{ 'price__initial--with-discount': props.discount !== undefined }"
        >
          ${{ props.price }}
        </span>
        <span v-if="props.discount !== undefined" class="price__discount">
          - {{ (props.discount * 100).toFixed(1).replace(/\.0*$/, '') }}%
        </span>
        <span v-if="props.discount !== undefined" class="price__actual">
          ${{ (props.price * (1 - props.discount)).toFixed(2).replace(/\.0*$/, '') }}
        </span>
      </div>
      <div class="buttons">
        <template v-if="count !== undefined">
          <button class="count-button" @click="handleRemoveFromCart">-</button>
          <button class="count-button" @click="handleAddToCart">+</button>
          <span class="item-count">In cart: {{ count }}</span>
        </template>
        <button v-if="count === undefined" @click="handleAddToCart">Add to cart</button>
      </div>
    </div>
    <div v-if="props.awards && props.awards.length > 0" class="awards">
      <div class="awards__content">
        <div>{{ props.awards[0] }}</div>
        <div v-if="props.awards.length > 1">...</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  min-width: 300px;
  max-width: 400px;
  width: 100%;
}
.card-content {
  background-color: var(--color-background-soft);
  position: relative;
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  overflow: hidden;
}
.title {
  margin-bottom: 8px;
  display: flow-root;
}
.title__name {
  display: inline;
  font-weight: bold;
}
.title__merchant {
  background-color: var(--color-background-mute);
  max-width: 50%;
  font-style: italic;
  word-break: break-word;
  white-space-collapse: preserve;
  padding: 0 8px;
  border-radius: 4px;
  display: block;
  float: right;
  margin-left: 8px;
}
.card-image-wrapper {
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 4px;
}
.card-image {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 200ms ease;
}
@media screen and (pointer: fine) {
  .card-image:hover {
    transform: scale(1.1);
  }
}
.tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.tag {
  border-radius: 4px;
  padding: 0 8px;
  background-color: var(--color-background-mute);
}
.description {
  margin-top: 8px;
}
.stars {
  margin-top: 8px;
  display: flex;
  align-items: center;
  width: 100%;
}
.star {
  font-size: 32px;
  line-height: 100%;
  color: color-mix(in srgb, var(--color-background-mute), var(--color-text) 10%);
  margin-left: 4px;
}
.star:first-child {
  margin-left: 0;
}
.star--active {
  color: var(--color-accent);
}
.stars-number {
  font-size: 14px;
  line-height: normal;
  border-radius: 4px;
  margin: 0 8px;
  display: flex;
  justify-content: center;
}
.stars-button {
  font-size: 14px;
  line-height: normal;
  height: fit-content;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  cursor: pointer;
  border-radius: 4px;
  border: none;
  padding: 8px 16px;
  margin-left: auto;
}
.stars-button:active {
  background-color: var(--color-accent);
  color: black;
}
@media screen and (pointer: fine) {
  .stars-button:hover {
    background-color: var(--color-accent);
    color: black;
  }
}
.price {
  margin-top: 8px;
  font-weight: bold;
  font-size: 16px;
  display: flex;
}
.price__initial--with-discount {
  text-decoration: line-through;
  opacity: 0.4;
}
.price__discount {
  margin-left: 8px;
  background-color: var(--color-accent);
  color: black;
  padding: 0 8px;
  border-radius: 4px;
}
.price__actual {
  margin-left: 8px;
}
.item-of-month {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 4px;
  display: grid;
  place-items: center;
  float: left;
}
.item-of-month::after {
  content: '';
  width: 10px;
  height: 10px;
  background-color: var(--color-danger);
  border-radius: 50%;
}
.awards {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
}
.awards__content {
  width: fit-content;
  margin: 0 auto;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
  align-items: start;
}
.awards__content > * {
  padding: 0 6px;
  background: var(--color-background-mute);
  border-radius: 4px;
  font-size: 12px;
}
.buttons {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}
.buttons button {
  flex-grow: 1;
  height: 40px;
  background-color: var(--color-primary);
  color: var(--color-text-inverted);
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 200ms ease;
}
.buttons button:hover {
  background-color: color-mix(in srgb, var(--color-primary), white 10%);
}
button.count-button {
  width: 40px;
  flex-grow: 0;
}
.item-count {
  padding: 0 16px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}
</style>
