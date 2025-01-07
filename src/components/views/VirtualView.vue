<script setup lang="ts">
import VirtualBox from '@/components/VirtualBox'
import ExpensiveComponent from '../ExpensiveComponent.vue'
import { ref } from 'vue'
import CommonHeader from '../CommonHeader.vue'

const virtulizationEnabled = ref(true)

const items = [...Array(500)].map((_, index) => ({
  key: index,
  randomFloat: Math.random(),
  height: 500 + Math.random() * 700,
}))
</script>

<template>
  <div class="page">
    <div class="items">
      <CommonHeader :text="`Virtual: ${items.length} el`" :hide-count="true" />
      <div class="buttons">
        <button type="button" @click="() => (virtulizationEnabled = !virtulizationEnabled)">
          {{ virtulizationEnabled ? 'disable virtualization' : 'enable virtualization' }}
        </button>
      </div>
      <component
        :is="virtulizationEnabled ? VirtualBox : 'div'"
        class="item"
        v-for="item in items"
        :key="item.key"
      >
        <ExpensiveComponent />
      </component>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 16px;
}
.buttons {
  margin: 16px 0;
}
.item:not(:first-of-type) {
  margin-top: 16px;
}
.item-content {
  display: grid;
  place-items: center;
  background-color: color-mix(
    in srgb,
    var(--color-background-soft),
    var(--color-text) calc(var(--random-float) * 10%)
  );
}
</style>
