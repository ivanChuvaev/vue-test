<script setup lang="ts">
import { RouterView } from 'vue-router'
import ModalStack from '@/components/ModalStack.vue'
import NotificationStack from './components/NotificationStack.vue';
</script>

<template>
  <RouterView />
  <ModalStack />
  <NotificationStack />
</template>
