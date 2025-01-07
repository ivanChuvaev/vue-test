<script setup lang="ts">
  const items = [...Array(20)].map(() => ({
    key: Math.random(),
    label: Math.random().toString()
  }));
</script>

<template>
  <form name="long-form">
    <label v-for="item in items" :key="item.key">
      <div>{{ item.label }}</div>
      <input :name="item.label" type="text" />
    </label>
  </form>
</template>

<style scoped>
  label {
    margin-bottom: 8px;
  }
</style>