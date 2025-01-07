<script setup lang="ts">
import { ModalConfigType, modalStore } from '@/stores/modal-store'
import { getCurrentInstance, useId } from 'vue'

const props = defineProps<{
  onClose?: VoidFunction
  onSave?: VoidFunction
}>()

const id = useId()
const UserForm = getCurrentInstance()!.type as any
</script>

<template>
  <div>
    User form {{ id }}
    <button @click="() => modalStore.open({ type: ModalConfigType.SIMPLE, component: UserForm })">
      open user form
    </button>
    <button @click="props.onClose">close</button>
    <button @click="props.onSave">save</button>
  </div>
</template>
