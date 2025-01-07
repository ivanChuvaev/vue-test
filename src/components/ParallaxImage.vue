<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
const props = defineProps<{
  src: string
  delta: number
}>()

const element = useTemplateRef('element')

const progress = ref(0)

const handler = () => {
  const { top, height } = element.value!.getBoundingClientRect()
  const d = height / window.innerHeight
  const centerPercent = Math.max(-d, Math.min(1 + d, (top + height * 0.5) / window.innerHeight))
  progress.value = centerPercent
}

onMounted(() => {
  handler()
  window.addEventListener('scroll', handler)
  window.addEventListener('scrollend', handler)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handler)
  window.removeEventListener('scrollend', handler)
})
</script>

<template>
  <div
    ref="element"
    class="parallax-image"
    :style="{ '--delta': props.delta, '--progress': progress }"
  >
    <img :src="props.src" />
  </div>
</template>

<style scoped>
.parallax-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}
.parallax-image img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  --top-offset: calc(var(--delta) * 0.5 * 100%);
  --progress-offset: calc(var(--progress) * var(--delta) * 100%);
  transform: translateY(calc(var(--top-offset) - var(--progress-offset)))
    scale(calc(1 + var(--delta)));
}
</style>
