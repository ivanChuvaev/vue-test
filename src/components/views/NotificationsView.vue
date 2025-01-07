<script setup lang="ts">
import { NotificationType, notificationStore } from '@/stores/notification-store';
import CommonHeader from '../CommonHeader.vue';
const handleAddSuccessNotification = () => {
  notificationStore.open({
    type: NotificationType.SUCCCESS,
    title: 'Success notification',
    description: 'This is success notification with default auto hide configuration',
    closeButton: true,
  })
}
const handleAddErrorNotification = () => {
  notificationStore.open({
    type: NotificationType.ERROR,
    title: 'Error notification',
    description: 'This is error notification with default auto hide configuration',
    closeButton: true,
  })
}
const handleAddInfoNotification = () => {
  notificationStore.open({
    type: NotificationType.INFO,
    title: 'Info notification',
    description: 'Description',
    closeButton: true,
  })
}
const handleAddPermanentSuccessNotification = () => {
  notificationStore.open({
    type: NotificationType.SUCCCESS,
    title: 'Permanent success notification',
    description: 'This notification will not close automatically, close it manually',
    closeButton: true,
    autoHideDuration: null,
  })
}
const handleAddSuccessLongNotification = () => {
  notificationStore.open({
    type: NotificationType.SUCCCESS,
    title: 'Success notification',
    description: 'This is success notification with default auto hide configuration',
    closeButton: true,
    autoHideDuration: 30000,
  })
}
</script>

<template>
  <div class="page">
    <CommonHeader text="Notifications" class="page-header" :hide-count="true" />
    <div class="page-content">
      <button @click="handleAddSuccessNotification">add success notification</button>
      <button @click="handleAddErrorNotification">add error notification</button>
      <button @click="handleAddInfoNotification">add info notification</button>
      <button @click="handleAddPermanentSuccessNotification">add permanent success notification</button>
      <button @click="handleAddSuccessLongNotification">add success long notification</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 16px;
}
.page-header {
  margin-bottom: 16px;
}
.page-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
@media screen and (min-width: 768px) {
  .page-content {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
