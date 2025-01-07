<script setup lang="ts">
import { onMounted, onUnmounted, ref, type StyleValue } from 'vue'
const props = defineProps<{
  class?: string
  style?: StyleValue
  time: number
}>()

const _time = ref(Math.ceil(props.time / 1000))
let intervalId = 0

onMounted(() => {
  intervalId = setInterval(() => {
    _time.value -= 1
    if (_time.value <= 0) {
      clearInterval(intervalId)
    }
  }, 1000)
})
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <span :class="props.class" :style="props.style">
    <span v-if="_time >= 3600"
      >{{ (Math.floor(_time / 3600) % 24).toString().padStart(2, '0') }}:</span
    >
    <span v-if="_time >= 60">{{ (Math.floor(_time / 60) % 60).toString().padStart(2, '0') }}:</span>
    <span>{{ (_time % 60).toString().padStart(2, '0') }}</span>
  </span>
</template>
