<script setup lang="ts">
import { computed, ref, useTemplateRef, type StyleValue } from 'vue'

const props = defineProps<{
  modelValue?: number
  class?: string
  style?: StyleValue
  name?: string
}>()

const emit = defineEmits<{
  'update:model-value': [value: number]
}>()

const _value = ref(props.modelValue ?? 0)
const previewValue = ref<number>(props.modelValue ?? 0)

const value = computed({
  get: () => props.modelValue ?? _value.value,
  set: (value) => {
    _value.value = value
    emit('update:model-value', value)
  },
})
</script>

<template>
  <div :class="['stars', props.class]" :style="props.style">
    <input ref="input-ref" type="number" :name="props.name" :value="value" />
    <span
      v-for="(_, i) in [...Array(5)]"
      :key="i"
      class="star"
      :class="{ 'star--active': i + 1 <= value, 'start--preview-active': i + 1 <= previewValue }"
      @mouseover="() => (previewValue = i + 1)"
      @click="() => (value = i + 1)"
      >&#x2605;</span
    >
    <span class="stars-number">
      {{ value.toFixed(1) }}
    </span>
  </div>
</template>

<style scoped>
.stars {
  display: flex;
  align-items: center;
  width: 100%;
}
.stars input {
  position: absolute;
  visibility: hidden;
}
.star {
  width: 28px;
  text-align: center;
  font-size: 32px;
  line-height: 100%;
  color: color-mix(in srgb, var(--color-background-mute), var(--color-text) 10%);
  cursor: pointer;
}
.star:first-child {
  margin-left: 0;
}
.stars:hover .start--preview-active,
.stars:not(:hover) .star--active {
  color: var(--color-accent);
}
.stars-number {
  font-size: 14px;
  line-height: normal;
  border-radius: 4px;
  margin: 0 8px;
  display: flex;
  justify-content: center;
}
</style>
