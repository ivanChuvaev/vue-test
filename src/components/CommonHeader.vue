<script setup lang="ts">
import { globalStore } from '@/stores/global-store';

const props = defineProps<{
  text: string
  hideCount?: boolean
  onIncrement?: VoidFunction
  onDecrement?: VoidFunction
}>()
</script>

<template>
  <header>
    <h1>{{ text }}<span v-if="!props.hideCount" class="count">{{ globalStore.count }}</span></h1>
    <div class="buttons">
      <button v-if="!!props.onIncrement" @click="props.onIncrement()">+</button>
      <button v-if="!!props.onDecrement" @click="props.onDecrement()">-</button>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  padding: 8px 16px;
}

header > h1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.count {
  font-family: monospace;
}

.buttons {
  margin-left: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.buttons > button {
  width: 30px;
  height: 30px;
}
</style>
