import state from "../../../../src/store/token/tokenState"
import mutations from "../../../../src/store/token/tokenMutations"
import mocks from "../../../mocks"

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
})
