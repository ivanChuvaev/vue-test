<script setup lang="ts">
const props = defineProps<{
  onClose?: VoidFunction
  hideHeader?: boolean
}>()

const handleClose = () => {
  if (props.onClose) {
    if (Array.isArray(props.onClose)) {
      props.onClose.forEach((func) => func())
      return
    }
    props.onClose()
  }
}
</script>

<template>
  <div class="drawer-modal">
    <div v-if="!props.hideHeader" class="drawer-modal-header">
      <h4>Title</h4>
      <button @click="handleClose">x</button>
    </div>
    <div
      class="drawer-modal-content"
      :class="{ 'drawer-modal-content--no-header': props.hideHeader }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.drawer-modal {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: var(--color-background-mute);
  max-height: 80vh;
  overflow: hidden;
}
.drawer-modal-header {
  position: sticky;
  top: 0;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
}
.drawer-modal-content {
  padding: 16px;
  padding-top: 0;
  max-height: 80vh;
  height: 100%;
  overflow: auto;
}
.drawer-modal-content--no-header {
  padding-top: 16px;
}
</style>
