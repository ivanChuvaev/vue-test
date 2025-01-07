import type DrawerModal from '@/components/modals/DrawerModal.vue'
import type SimpleModal from '@/components/modals/SimpleModal.vue'
import { markRaw, reactive } from 'vue'

export enum ModalConfigType {
  RAW,
  SIMPLE,
  DRAWER,
}

export type ModalConfig<C extends abstract new (...args: any) => any> =
  | {
      type: ModalConfigType.RAW
      component: C
      props?: InstanceType<C>['$props']
    }
  | {
      type: ModalConfigType.SIMPLE
      component: C
      modalProps?: InstanceType<typeof SimpleModal>['$props']
      props?: InstanceType<C>['$props']
    }
  | {
      type: ModalConfigType.DRAWER
      component: C
      modalProps?: InstanceType<typeof DrawerModal>['$props']
      props?: InstanceType<C>['$props']
    }

export const modalStore = reactive({
  modals: [] as Array<ModalConfig<any> & { key: number }>,
  open<P extends abstract new (...args: any) => any>(config: ModalConfig<P>) {
    this.modals.push(
      markRaw({
        key: Math.random(),
        ...config,
      }),
    )
  },
  close(key: any) {
    this.modals = this.modals.filter((item) => item.key !== key)
  },
  pop() {
    this.modals.pop()
  },
  clear() {
    this.modals = []
  },
})
