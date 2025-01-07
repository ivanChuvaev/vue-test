<script setup lang="ts">
import { ModalConfigType, modalStore, type ModalConfig } from '@/stores/modal-store'
import SimpleModal from './modals/SimpleModal.vue'
import { computed, onUnmounted, watch } from 'vue'
import DrawerModal from './modals/DrawerModal.vue'

const open = computed(() => modalStore.modals.length > 0)

type AlteredModalConfig = ModalConfig<any> & { key: number; originalIndex: number }

const modals = computed(() => {
  const map = new Map<ModalConfigType, AlteredModalConfig[]>()
  modalStore.modals.forEach((modal, index) => {
    const found = map.get(modal.type)
    const newItem: any = { ...modal, originalIndex: index }
    map.set(modal.type, found ? [...found, newItem] : [newItem])
  })

  return {
    raw: (map.get(ModalConfigType.RAW) ?? []) as Extract<
      AlteredModalConfig,
      { type: ModalConfigType.RAW }
    >[],
    simple: (map.get(ModalConfigType.SIMPLE) ?? []) as Extract<
      AlteredModalConfig,
      { type: ModalConfigType.SIMPLE }
    >[],
    drawer: (map.get(ModalConfigType.DRAWER) ?? []) as Extract<
      AlteredModalConfig,
      { type: ModalConfigType.DRAWER }
    >[],
  }
})

const handleWrapperClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    modalStore.pop()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    modalStore.pop()
  }
}

watch(open, (value) => {
  if (value) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'auto'
  }
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div class="backdrop" :class="{ 'backdrop--open': open }"></div>
  <div class="wrapper" :class="{ 'wrapper--open': open }">
    <TransitionGroup name="modal-drawer-item" :duration="100">
      <template v-if="modals.drawer.length > 0">
        <div
          v-for="modal in modals.drawer"
          :key="modal.key"
          :style="{ zIndex: modal.originalIndex }"
          class="modal-drawer-item"
          @click="handleWrapperClick"
        >
          <DrawerModal
            class="modal-drawer-item-paper"
            v-bind="modal.modalProps"
            @close="() => modalStore.close(modal.key)"
          >
            <component
              :is="modal.component"
              v-bind="modal.props"
              @close="() => modalStore.close(modal.key)"
            />
          </DrawerModal>
        </div>
      </template>
    </TransitionGroup>
    <TransitionGroup name="modal-raw-item">
      <template v-if="modals.raw.length > 0">
        <div
          v-for="modal in modals.raw"
          :key="modal.key"
          :style="{ zIndex: modal.originalIndex }"
          class="modal-raw-item"
          @click="handleWrapperClick"
        >
          <component
            :is="modal.component"
            v-bind="modal.props"
            @close="() => modalStore.close(modal.key)"
          />
        </div>
      </template>
    </TransitionGroup>
    <TransitionGroup name="modal-simple-item">
      <template v-if="modals.simple.length > 0">
        <div
          v-for="modal in modals.simple"
          :key="modal.key"
          :style="{ zIndex: modal.originalIndex }"
          class="modal-simple-item"
          @click="handleWrapperClick"
        >
          <SimpleModal v-bind="modal.modalProps" @close="() => modalStore.close(modal.key)">
            <component
              :is="modal.component"
              v-bind="modal.props"
              @close="() => modalStore.close(modal.key)"
            />
          </SimpleModal>
        </div>
      </template>
    </TransitionGroup>
  </div>
</template>

<style>
.wrapper {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 200ms ease,
    visibility 200ms linear;
}

.wrapper--open {
  opacity: 1;
  visibility: visible;
}

.backdrop {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: color-mix(in srgb, var(--color-text), transparent 50%);
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 200ms ease,
    visibility 200ms linear;
}

.backdrop--open {
  opacity: 1;
  visibility: visible;
}

.modal-drawer-item {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.modal-drawer-item-paper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: transform 200ms ease;
}
.modal-drawer-item-enter-active > .modal-drawer-item-paper,
.modal-drawer-item-leave-active > .modal-drawer-item-paper {
  transform: translateY(0);
}
.modal-drawer-item-enter-from > .modal-drawer-item-paper,
.modal-drawer-item-leave-to > .modal-drawer-item-paper {
  transform: translateY(100%);
}

.modal-raw-item {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal-simple-item {
  transition: opacity 200ms ease;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: grid;
  padding: 16px;
  overflow: auto;
  place-items: center;
}

.modal-simple-item-enter-active,
.modal-simple-item-leave-active {
  opacity: 1;
}
.modal-simple-item-enter-from,
.modal-simple-item-leave-to {
  opacity: 0;
}
</style>
