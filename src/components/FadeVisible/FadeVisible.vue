<script setup lang="ts">
import {
  addTargetToFadeVisibleObserver,
  removeTargetFromFadeVisibleObserver,
} from './fade-visible-observer'
import { onMounted, onUnmounted, ref, useTemplateRef, type StyleValue } from 'vue'

const props = defineProps<{
  class?: string
  style?: StyleValue
}>()

const fadeVisible = useTemplateRef('fade-visible')
const visible = ref(false)

const observerHandler = (entry: IntersectionObserverEntry) => {
  visible.value = entry.isIntersecting
}

onMounted(() => {
  addTargetToFadeVisibleObserver(fadeVisible.value!, observerHandler)
})

onUnmounted(() => {
  if (fadeVisible.value) {
    removeTargetFromFadeVisibleObserver(fadeVisible.value)
  }
})
</script>

<template>
  <div :class="['fade-visible', props.class]" :style="props.style">
    <div ref="fade-visible" :class="['fade-visible-item', { 'fade-visible-item--in-view': visible }]">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.fade-visible {
  overflow: visible;
}
.fade-visible-item {
  opacity: 0;
  transform: translate(0, 10px) scale(0.98);
  transition:
    opacity 500ms ease,
    transform 500ms ease;
}

.fade-visible-item--in-view {
  transform: translate(0, 0) scale(1);
  opacity: 1;
}
</style>
