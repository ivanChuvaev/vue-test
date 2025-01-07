<script setup lang="ts">
import { computed, ref, watch, type StyleValue } from 'vue'
const props = withDefaults(
  defineProps<{
    modelValue?: number | null
    items: string[]
    style?: StyleValue
    rotation?: number
    radius?: number
  }>(),
  {
    rotation: 0,
    radius: 100,
  },
)

const emit = defineEmits(['update:model-value'])

const innerValue = ref<null | number>(props.modelValue !== undefined ? props.modelValue : 0);

const value = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : innerValue.value,
  set: (value) => {
    innerValue.value = value
    emit('update:model-value', value)
  },
})

const _rotation = ref(props.rotation)

const handleSelect = (index: number) => {
  value.value = index
}

watch([() => props.rotation, value], () => {
  if (value.value !== null && value.value !== undefined) {
    const nextRotation = props.rotation + (-value.value / props.items.length) * 360
    const delta = (_rotation.value - nextRotation) % 360
    _rotation.value -= ((delta + 540) % 360) - 180
  }
}, {
  immediate: true
})
</script>

<template>
  <div
    class="circle-selector"
    :style="[{ '--radius': `${props.radius}px`, '--rotation': `${_rotation}deg` }, props.style]"
  >
    <div class="circle-selector-center"></div>
    <ul class="circle-selector-list">
      <li
        v-for="(item, index) in items"
        :key="item"
        class="circle-selector-item"
        :style="{ '--item-rotation': `${(index / items.length) * 360}deg` }"
        @click="() => handleSelect(index)"
      >
        <div
          class="circle-selector-item__visual"
          :class="{ 'circle-selector-item__visual--selected': value === index }"
        >
          {{ item }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.circle-selector {
  position: relative;
  display: flex;
  width: fit-content;
}
.circle-selector-list {
  display: flex;
  padding: 0;
  width: var(--radius);
  height: var(--radius);
  transform: rotate(var(--rotation));
  transition: transform 800ms ease;
}
.circle-selector-center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--radius) * 0.8);
  height: calc(var(--radius) * 0.8);
  background: radial-gradient(circle at bottom, red 0, blue 100%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.circle-selector-item {
  position: absolute;
  list-style: none;
  left: 50%;
  top: 50%;
  transform: rotate(var(--item-rotation));
}
.circle-selector-item__visual {
  position: absolute;
  transform: translate(calc(var(--radius) * 0.5), -50%);
  background-color: rgb(61, 61, 61);
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
  transition:
    box-shadow 200ms ease,
    background-color 200ms ease;
}
.circle-selector-item__visual:hover {
  background-color: gray;
}
.circle-selector-item__visual--selected {
  background-color: red;
}
.circle-selector-item__visual--selected:hover {
  background-color: rgb(255, 73, 73);
}
</style>
