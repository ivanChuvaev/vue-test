<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { addTargetToObserver, removeTargetFromObserver } from './observer'

const props = withDefaults(
  defineProps<{
    initialHeight?: number
  }>(),
  {
    initialHeight: 200,
  },
)

const isInView = ref(false)
const height = ref(`${props.initialHeight}px`)
const root = useTemplateRef('root')

const observerHandler = (entry: IntersectionObserverEntry) => {
  isInView.value = entry.isIntersecting
  if (root.value) {
    height.value = entry.isIntersecting ? 'fit-content' : `${root.value.clientHeight}px`
  }
}

onMounted(() => {
  if (root.value) {
    addTargetToObserver(root.value, observerHandler)
  }
})

onUnmounted(() => {
  if (root.value) {
    removeTargetFromObserver(root.value)
  }
})
</script>

<template>
  <div ref="root" :style="{ height }">
    <slot v-if="isInView"></slot>
  </div>
</template>
