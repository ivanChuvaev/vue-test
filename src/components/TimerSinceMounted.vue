<script setup lang="ts">
import { onMounted, onUnmounted, ref, type StyleValue } from 'vue'
const props = defineProps<{
  class?: string
  style?: StyleValue
}>()

const time = ref(0)
let intervalId = 0

onMounted(() => {
  intervalId = setInterval(() => {
    time.value += 1
  }, 1000)
})
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <span :class="props.class" :style="props.style">
    <span v-if="time >= 3600"
      >{{ (Math.floor(time / 3600) % 24).toString().padStart(2, '0') }}h&nbsp;</span
    >
    <span v-if="time >= 60"
      >{{ (Math.floor(time / 60) % 60).toString().padStart(2, '0') }}m&nbsp;</span
    >
    <span>{{ (time % 60).toString().padStart(2, '0') }}s</span>
  </span>
</template>
