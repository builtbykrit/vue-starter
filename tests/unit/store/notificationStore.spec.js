import { setActivePinia, createPinia } from "pinia"
import { useNotificationStore } from "@/store/notificationStore"

describe("mutations", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it("should create a store", () => {
    const notificationStore = useNotificationStore()
    expect(notificationStore).toBeDefined()
  })

  describe("addNotification", () => {
    it("stores a success Notification to state", () => {
      const notificationStore = useNotificationStore()
      expect(notificationStore.notifications.length).toEqual(0)
      notificationStore.addNotification("Yay!")
      expect(notificationStore.notifications.length).toEqual(1)
      expect(notificationStore.notifications[0].type).toBe("SUCCESS")
    })
    it("stores an error Notification to state", () => {
      const notificationStore = useNotificationStore()
      expect(notificationStore.notifications.length).toEqual(0)
      notificationStore.addNotification("Oh no!", true)
      expect(notificationStore.notifications.length).toEqual(1)
      expect(notificationStore.notifications[0].type).toBe("ERROR")
    })
  })

  describe("removeNotification", () => {
    it("removes a notification from state", () => {
      const notificationStore = useNotificationStore()
      const n = notificationStore.addNotification("Yay!")
      notificationStore.removeNotification(n.id)
      expect(notificationStore.notifications.length).toEqual(0)
    })
  })
})
