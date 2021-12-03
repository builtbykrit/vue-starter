import mutations from "../../../src/store/mutations"
import state from "../../../src/store/state"
import mocks from "../../mocks"
import notification from "../../../src/modules/notification"

describe("mutations", () => {
  describe("clearAuthentication", () => {
    beforeEach(() => {
      state.accessToken = mocks.token
      state.refreshToken = mocks.token
      state.accessTokenExpiresAt = 1638396816
    })

    it("clears the Access Token from state", () => {
      expect(state.accessToken).toBeDefined()
      mutations.clearAuthentication(state)
      expect(state.accessToken).toBeNull()
    })

    it("clears the Refresh Token from state", () => {
      expect(state.refreshToken).toBeDefined()
      mutations.clearAuthentication(state)
      expect(state.refreshToken).toBeNull()
    })

    it("clears the access token expiration from state", () => {
      expect(state.accessTokenExpiresAt).toBeDefined()
      mutations.clearAuthentication(state)
      expect(state.accessTokenExpiresAt).toBeNull()
    })
  })

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

  describe("setAccessToken", () => {
    it("stores an Access Token to state", () => {
      state.accessToken = null
      expect(state.accessToken).toBeNull()
      mutations.setAccessToken(state, mocks.token)
      expect(state.accessToken).toBeDefined()
    })
  })

  describe("setRefreshToken", () => {
    it("stores a Refresh Token to state", () => {
      state.refreshToken = null
      expect(state.refreshToken).toBeNull()
      mutations.setRefreshToken(state, mocks.token)
      expect(state.refreshToken).toBeDefined()
    })
  })

  describe("setCurrentUser", () => {
    it("stores User data to state", () => {
      state.currentUser = null
      expect(state.currentUser).toBeNull()
      mutations.setCurrentUser(state, mocks.user)
      expect(state.currentUser).toBeDefined()
    })
  })
})
