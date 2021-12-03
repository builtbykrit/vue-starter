import mutations from "../../../../src/store/notification/notificationMutations"
import state from "../../../../src/store/notification/notificationState"
import notification from "../../../../src/modules/notification"

describe("mutations", () => {
  describe("postErrorNotification", () => {
    it("stores an error Notification to state", () => {
      state.notifications = []
      expect(state.notifications.length).toEqual(0)
      mutations.postErrorNotification(state, "Oh no!")
      expect(state.notifications.length).toEqual(1)
      expect(state.notifications[0].type).toBe("ERROR")
    })
  })

  describe("postSuccessNotification", () => {
    it("stores a success Notification to state", () => {
      state.notifications = []
      mutations.postSuccessNotification(state, "Yay!")
      expect(state.notifications.length).toEqual(1)
      expect(state.notifications[0].type).toBe("SUCCESS")
    })
  })

  describe("removeNotification", () => {
    it("removes a notification from state", () => {
      const n = notification.createSuccessNotification("Yay!")
      state.notifications = [n]
      mutations.removeNotification(state, n.id)
      expect(state.notifications.length).toEqual(0)
    })
  })
})
