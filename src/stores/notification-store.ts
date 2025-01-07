import { markRaw, reactive } from 'vue'

const successAudio = new Audio('audio/success.mp3')
const errorAudio = new Audio('audio/error.mp3')

export enum NotificationType {
  INFO,
  ERROR,
  SUCCCESS,
}

export type Notification = {
  id: any
  autoHideDuration: number | null
  type: NotificationType
  title: string
  description?: string
  closeButton?: boolean
}

export const notificationStore = reactive({
  notifications: [] as Notification[],
  open(
    notification: Omit<Notification, 'id' | 'autoHideDuration'> & {
      autoHideDuration?: number | null
    },
  ) {
    const autoHideDuration =
      notification.autoHideDuration !== null ? (notification.autoHideDuration ?? 5000) : null
    const id = Math.random()
    this.notifications.push(
      markRaw({
        ...notification,
        id,
        autoHideDuration,
      }),
    )

    switch (notification.type) {
      case NotificationType.ERROR:
        errorAudio.currentTime = 0
        errorAudio.play()
        break
      case NotificationType.SUCCCESS:
        successAudio.currentTime = 0
        successAudio.play()
        break
    }

    if (autoHideDuration !== null) {
      setTimeout(() => {
        this.close(id)
      }, autoHideDuration)
    }
  },
  close(id: any) {
    this.notifications = this.notifications.filter((item) => item.id !== id)
  },
  pop() {
    this.notifications.pop()
  },
  clear() {
    this.notifications = []
  },
})
