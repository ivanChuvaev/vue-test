<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const progress = ref(0);

const handleScroll = () => {
  progress.value = 100 * window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
}

const handleScrollDelayed = () => {
  setTimeout(handleScroll, 50)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scrollend', handleScrollDelayed)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scrollend', handleScrollDelayed)
})

</script>

<template>
  <progress max="100" :value="progress"></progress>
</template>

<style scoped>
progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0px;
  height: 4px;
}

progress::-webkit-progress-bar {
  background-color: transparent;
  border-radius: 0px;
}
progress::-moz-progress-bar {
  background-color: transparent;
  border-radius: 0px;
}
progress::-webkit-progress-value {
  background-color: rgb(87, 193, 255);
}
</style>