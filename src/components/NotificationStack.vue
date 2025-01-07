<script setup lang="ts">
import { notificationStore } from '@/stores/notification-store'
import NotificationItem from '@/components/NotificationItem.vue'
</script>

<template>
  <div v-if="notificationStore.notifications.length > 0" class="notifications-stack">
    <TransitionGroup name="notification">
      <div
        v-for="item in notificationStore.notifications"
        :key="item.id"
      >
        <NotificationItem v-bind="item" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style>
.notifications-stack {
  z-index: 2;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notification-container {
  position: relative;
}

@media screen and (min-width: 768px) {
  .notifications-stack {
    width: fit-content;
  }
}
</style>
