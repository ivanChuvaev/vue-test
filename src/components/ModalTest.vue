<script setup lang="ts">
import { ModalConfigType, modalStore } from '@/stores/modal-store';
import { getCurrentInstance } from 'vue';
import ColorBox from './ColorBox.vue';

  const ModalTest = getCurrentInstance()!.type as any;
</script>

<template>
<div class="modal-test">
  <div class="modal-test-grid">
    <button @click="() => modalStore.open({ type: ModalConfigType.RAW, component: ModalTest })">raw modal</button>
    <button @click="() => modalStore.open({ type: ModalConfigType.SIMPLE, component: ModalTest })">simple modal</button>
    <button @click="() => modalStore.open({ type: ModalConfigType.DRAWER, component: ModalTest })">drawer modal</button>
  </div>
  <ColorBox class="color-box" color="var(--color-background-soft)" />
</div>
</template>

<style scoped>
.modal-test-grid {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
}
@media screen and (min-width: 768px) {
  .modal-test-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
.color-box {
  margin-top: 8px;
}
</style>