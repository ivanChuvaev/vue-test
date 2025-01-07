import { reactive } from 'vue'

export const globalStore = reactive({
  count: 0,
  increment() {
    this.count += 2
  },
  decrement() {
    this.count -= 2
  },
})
