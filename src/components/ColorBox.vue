<script setup lang="ts">
import type { StyleValue } from 'vue';

const props = defineProps<{
  class?: string
  style?: StyleValue
  color?: string
}>();

</script>

<template>
  <div :class="['color-box', props.class]" :style="[props.style, { '--color': props.color }]">
    COLOR BOX
  </div>
</template>

<style>
.color-box {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color);
  --l-threshold: 0.723;
  --l: clamp(0, (l / var(--l-threshold) - 1) * -infinity, 1);
  color: oklch(from var(--color) var(--l) 0 h);
  font-weight: bold;
}
</style>
