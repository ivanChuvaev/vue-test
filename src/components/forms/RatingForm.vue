<script setup lang="ts">
import { ref, type StyleValue } from 'vue';
import StarSelector from '../inputs/StarSelector.vue'
const props = defineProps<{
  class?: string,
  style?: StyleValue,
  initialValue?: number
}>()
const emit = defineEmits<{
  submit: [data: { rating: number }, close: VoidFunction]
  close: [],
}>();

const rating = ref(props.initialValue ?? 0);

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as unknown as {
    rating: number
  }
  data.rating = Number(data.rating)
  emit('submit', data, () => emit('close'));
}
</script>

<template>
  <form :class="['rating-form', props.class]" :style="props.style" name="rating-form" @submit="handleSubmit">
    <StarSelector name="rating" v-model="rating" />
    <button type="submit" :disabled="rating === 0">Submit</button>
  </form>
</template>

<style scoped>
.rating-form {
  display: flex;
  align-items: center;
}
.rating-form button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 200ms ease;
}
.rating-form button:disabled {
  background-color: color-mix(in srgb, var(--color-primary), var(--color-background-soft) 80%);
  cursor: default;
}
@media (pointer: fine) {
  .rating-form button:not(:disabled):hover {
    background-color: color-mix(in srgb, var(--color-primary), var(--color-background-soft) 10%);
  }
}
</style>
