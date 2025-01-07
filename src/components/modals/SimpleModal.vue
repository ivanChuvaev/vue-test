<script setup lang="ts">
import type { StyleValue } from 'vue'

const props = defineProps<{
  class?: string
  style?: StyleValue
  hideHeader?: boolean
  onClose?: VoidFunction
  onBack?: VoidFunction
}>()

const handleClose = () => {
  if (props.onClose) {
    if (Array.isArray(props.onClose)) {
      props.onClose.forEach((func) => func())
      return
    }
    props.onClose()
  }
}
</script>

<template>
  <div :class="['simple-modal', props.class]" :style="props.style">
    <header v-if="!props.hideHeader">
      <div id="simple-modal-title-wrapper" class="title-wrapper">
        <h3>Title</h3>
      </div>
      <div class="buttons">
        <button @click="handleClose">x</button>
      </div>
    </header>
    <slot></slot>
  </div>
</template>

<style scoped>
.simple-modal {
  background-color: var(--color-background-mute);
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.185);
}
header {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-wrapper {
  display: flex;
  gap: 8px;
  line-height: 24px;
}
.buttons {
  display: flex;
}
.buttons > button {
  width: 24px;
  height: 24px;
  display: flex;
  place-content: center;
}
</style>
