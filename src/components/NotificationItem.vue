<script setup lang="ts">
import { type Notification, NotificationType } from '@/stores/notification-store'
import { notificationStore } from '@/stores/notification-store'
import NotificationTimer from './NotificationTimer.vue'
const props = defineProps<Notification>()
</script>

<template>
  <div
    class="notification"
    :class="{
      'notification--error': props.type === NotificationType.ERROR,
      'notification--success': props.type === NotificationType.SUCCCESS,
      'notification--info': props.type === NotificationType.INFO,
    }"
  >
    <div class="notification__info">
      <h4 class="notification__title">{{ props.title }}</h4>
      <div v-if="props.description" class="notification__description">{{ props.description }}</div>
    </div>
    <button
      v-if="props.closeButton"
      class="notification__button"
      @click="() => notificationStore.close(props.id)"
    >
      x
    </button>
    <NotificationTimer
      v-if="props.autoHideDuration"
      class="notification__time"
      :time="props.autoHideDuration"
    />
  </div>
</template>

<style scoped>
.notification {
  width: 100%;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.103);
  margin: 0 auto;
  position: relative;
}

.notification--error {
  background-color: var(--color-notification-error);
  color: var(--vt-c-black);
}

.notification--success {
  background-color: var(--color-notification-success);
  color: var(--vt-c-black);
}

.notification--info {
  background-color: var(--color-notification-info);
  color: var(--vt-c-black);
}

@media screen and (min-width: 768px) {
  .notification {
    width: 300px;
    margin: 0;
  }
}

.notification__title {
  font-weight: bold;
}

.notification__description {
  font-size: 14px;
}

.notification__button {
  display: flex;
  width: 24px;
  height: 24px;
  place-content: center;
  background-color: transparent;
  border: none;
  outline: none;
}

.notification__time {
  position: absolute;
  bottom: 4px;
  right: 4px;
  padding: 0 4px;
  border-radius: 4px;
  font-size: 12px;
  color: rgb(0, 0, 0);
  font-style: italic;
}
</style>
