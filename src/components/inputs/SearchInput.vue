<script setup lang="ts">
import { computed, ref, type StyleValue } from 'vue'

const props = defineProps<{
  modelValue?: string
  class?: string
  style?: StyleValue
}>()

const emit = defineEmits<{
  'update:model-value': [value: string]
}>()

const _value = ref(props.modelValue ?? '')

const value = computed<string>({
  get() {
    return props.modelValue ?? _value.value
  },
  set(value) {
    _value.value = value
    emit('update:model-value', value)
  },
})

const handleInput = (e: Event) => {
  value.value = (e.target as HTMLInputElement).value
}

const handleClickClearIcon = (e: Event) => {
  value.value = ''
  e.preventDefault()
}
</script>

<template>
  <div class="search-wrapper" :class="props.class" :style="props.style">
    <input
      type="search"
      :class="['search-input', 'search-input--with-left-icon', 'search-input--with-right-icon']"
      placeholder="Search"
      @input="handleInput"
      :value="value"
    />
    <button class="search-icon search-icon--left" type="button">S</button>
    <button
      class="search-icon search-icon--right search-icon--interactive"
      @mousedown="handleClickClearIcon"
      type="button"
    >
      X
    </button>
  </div>
</template>

<style scoped>
.search-wrapper {
  --search-px: 4px;
  --search-icon-size: 25px;
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  position: relative;
  border-radius: 6px;
  color: var(--color-text);
}
@media screen and (pointer: fine) {
  .search-wrapper:hover {
    border-color: var(--color-border-hover);
  }
}
.search-input {
  height: 100%;
  width: 100%;
  border-radius: 6px;
  background-color: var(--color-background-soft);
  border: none;
  outline: none;
  padding-left: var(--search-icon-size);
  padding-right: var(--search-icon-size);
  color: inherit;
}
.search-input::-webkit-search-cancel-button {
  display: none;
}
.search-input--with-left-icon {
  padding-left: calc(2 * var(--search-px) + var(--search-icon-size));
}
.search-input--with-right-icon {
  padding-right: calc(2 * var(--search-px) + var(--search-icon-size));
}
.search-icon {
  width: var(--search-icon-size);
  height: var(--search-icon-size);
  position: absolute;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  top: 50%;
  transform: translateY(-50%);
  color: color-mix(in srgb, var(--color-text), var(--color-background-mute) 40%);
  border-radius: 4px;
  pointer-events: none;
}
.search-icon--interactive {
  cursor: pointer;
  transition: background-color 200ms ease;
  pointer-events: all;
}
@media screen and (pointer: fine) {
  .search-icon--interactive:hover {
    background-color: var(--color-background-mute);
  }
}

.search-icon--left {
  left: var(--search-px);
}
.search-icon--right {
  right: var(--search-px);
}
</style>
