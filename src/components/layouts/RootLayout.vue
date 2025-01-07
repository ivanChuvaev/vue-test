<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref, watch } from 'vue'
import HeaderProgressBar from '@/components/HeaderProgressBar.vue'
import { localStorageStore } from '@/stores/local-storage-store'

const menuOpen = ref(false)
const asideClickOutsideHandler = ref<VoidFunction | undefined>(undefined)

const colorTheme = ref(document.body.getAttribute('color-theme'))

const cartItemsCount = computed(() => {
  return localStorageStore.cart.shopItems.reduce((acc, item) => acc + item.count, 0)
})

const handleChangeTheme = () => {
  colorTheme.value = colorTheme.value === 'dark' ? 'light' : 'dark'
  window.localStorage.setItem('color-theme', colorTheme.value);
  document.body.setAttribute('color-theme', colorTheme.value)
}

watch(menuOpen, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
  setTimeout(() => {
    if (value) {
      asideClickOutsideHandler.value = () => {
        menuOpen.value = false
      }
      return
    }
    asideClickOutsideHandler.value = undefined
  }, 0)
})
</script>

<template>
  <header class="layout-header">
    <div class="container">
      <button class="menu-button" @click="menuOpen = !menuOpen">menu</button>
      <span class="layout-header-title"> header </span>
      <button
        class="theme-button"
        :class="{ 'theme-button--active': colorTheme === 'dark' }"
        @click="handleChangeTheme"
      >
        Theme
      </button>
    </div>
    <HeaderProgressBar />
  </header>
  <div
    class="layout-aside-backdrop"
    :class="{ 'layout-aside-backdrop--open': menuOpen }"
    @click="asideClickOutsideHandler"
  ></div>
  <aside :class="{ 'layout-aside': true, 'layout-aside--open': menuOpen }">
    <div class="layout-aside__content">
      <header class="layout-aside__header">header</header>
      <nav class="layout-aside__nav">
        <RouterLink to="/" @click="asideClickOutsideHandler">Home</RouterLink>
        <RouterLink to="/notifications" @click="asideClickOutsideHandler">Notifications</RouterLink>
        <RouterLink to="/circles" @click="asideClickOutsideHandler">Circles</RouterLink>
        <div class="double-links">
          <RouterLink to="/shop" @click="asideClickOutsideHandler">Shop</RouterLink>
          <RouterLink to="/shop-cart" @click="asideClickOutsideHandler">Cart {{ cartItemsCount }}</RouterLink>
        </div>
        <RouterLink to="/virtual" @click="asideClickOutsideHandler">Virtual</RouterLink>
      </nav>
      <footer class="layout-aside__footer">footer</footer>
    </div>
  </aside>
  <div class="layout-content">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
}

.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--layout-header-height);
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-text-inverted);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.089);
  z-index: 1;
}

@media screen and (min-width: 768px) {
  .menu-button {
    display: none;
  }
}

.layout-header-title {
  display: none;
}

@media screen and (min-width: 768px) {
  .layout-header-title {
    display: block;
  }
}

.theme-button {
  display: block;
  margin-left: auto;
}

.layout-aside-backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.185);
  transition:
    opacity 200ms ease,
    visibility 200ms linear;
}

.layout-aside-backdrop--open {
  opacity: 1;
  visibility: visible;
}

.layout-aside {
  background-color: var(--color-background-soft);
  position: fixed;
  top: 0;
  left: 0;
  width: var(--layout-aside-width);
  transform: translateX(-100%);
  height: 100%;
  transition: transform 200ms ease;
  z-index: 1;
  overflow: auto;
}

.layout-aside--open {
  left: 0px;
  transform: translateX(0);
}

@media screen and (min-width: 768px) {
  .layout-aside {
    z-index: 0;
    top: var(--layout-header-height);
    height: calc(100% - var(--layout-header-height));
    width: calc(var(--layout-aside-width) + (max(100%, 1140px) - 1140px) / 2);
    transform: translateX(0);
  }
}

@media screen and (min-width: 768px) {
  .layout-aside-backdrop {
    display: none;
  }
}

.layout-aside__content {
  width: var(--layout-aside-width);
  margin-left: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: sticky;
  top: 0;
  padding: 16px;
  padding-right: 16px;
}

.layout-aside__header {
  padding: 8px 16px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  margin-bottom: 16px;
}

.layout-aside__nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layout-aside__nav a.router-link-exact-active {
  color: var(--color-text);
}

.layout-aside__nav a.router-link-exact-active, .layout-aside__nav a.router-link-exact-active:hover {
  background-color: var(--color-accent);
  color: black;
}

.layout-aside__nav a {
  display: inline-block;
  padding: 0 1rem;
  border-radius: 4px;
}

.layout-aside__footer {
  padding: 8px 16px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
}

.layout-content {
  padding-top: var(--layout-header-height);
  padding-left: calc((max(100%, 1140px) - 1140px) / 2);
  padding-right: calc((max(100%, 1140px) - 1140px) / 2);
  flex-grow: 1;
}

@media screen and (min-width: 768px) {
  .layout-content {
    padding-top: var(--layout-header-height);
    padding-left: calc(var(--layout-aside-width) + (max(100%, 1140px) - 1140px) / 2);
    padding-right: calc((max(100%, 1140px) - 1140px) / 2);
    flex-grow: 1;
  }
}
.double-links {
  display: flex;
  justify-content: space-between;
}
.double-links > *:first-child {
  flex-grow: 1;
}
.double-links > *:last-child {
  margin-left: 8px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  color: var(--color-accent);
}
.double-links > *:last-child:hover {
  background-color: var(--color-accent);
  color: black;
}
.double-links > *.router-link-active:last-child, .double-links > *.router-link-active:last-child:hover {
  background-color: var(--color-accent);
  color: black;
}
</style>
