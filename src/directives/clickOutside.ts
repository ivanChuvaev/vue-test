import { type DirectiveBinding } from 'vue'

export const clickOutside = {
  beforeMount: (el: any, binding: DirectiveBinding<VoidFunction | null, string, string>) => {
    if (binding.value) {
      el.clickOutsideEvent = (event: MouseEvent) => {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value?.()
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    } else {
      el.clickOutsideEvent = null
    }
  },
  updated: (el: any, binding: DirectiveBinding<VoidFunction | null, string, string>) => {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
    if (binding.value) {
      el.clickOutsideEvent = (event: MouseEvent) => {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value?.()
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    } else {
      el.clickOutsideEvent = null
    }
  },
  unmounted: (el: any) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
