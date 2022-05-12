import { defineStore } from "pinia"
import notification from "@/modules/notification"

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    addNotification(message, isError = false) {
      const n = isError
        ? notification.createErrorNotification(message)
        : notification.createSuccessNotification(message)

      this.notifications.push(n)
      return n
    },
    removeNotification(notificationId) {
      this.notifications = this.notifications.filter(
        (n) => n.id !== notificationId
      )
    },
  },
})
