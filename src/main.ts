import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutside } from './directives/clickOutside'

document.body.setAttribute('color-theme', localStorage.getItem('color-theme') ?? 'system')

const app = createApp(App)

app.use(router)

app.directive('click-outside', clickOutside)

app.mount('#app')
