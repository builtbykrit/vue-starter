import state from "../../../../src/store/token/tokenState"
import getters from "../../../../src/store/token/tokenGetters"
import dayjs from "dayjs"

describe("tokenGetters", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe("isAuthenticated", () => {
    const mockToken = "validAccessToken"

    it("returns FALSE if no Token exists", () => {
      state.accessToken = null
      expect(getters.isAuthenticated(state)).toBeFalsy()
    })

    it("returns FALSE if a Token exists but its expired", () => {
      state.accessToken = mockToken
      jest.spyOn(getters, "accessTokenIsExpired").mockReturnValue(true)
      expect(getters.isAuthenticated(state)).toBeFalsy()
    })

    it("returns TRUE if the Token exists and has not expired", () => {
      state.accessToken = mockToken
      jest.spyOn(getters, "accessTokenIsExpired").mockReturnValue(false)
      expect(getters.isAuthenticated(state)).toBeTruthy()
    })
  })

  describe("accessTokenIsExpired", () => {
    it("returns FALSE if the Token is not expired", () => {
      state.accessTokenExpiresAt = dayjs().add(100, "m").unix()
      expect(getters.accessTokenIsExpired(state)).toBeFalsy()
    })

    it("returns TRUE if the Token is expired", () => {
      state.accessTokenExpiresAt = dayjs().subtract(100, "m").unix()
      expect(getters.accessTokenIsExpired(state)).toBeTruthy()
    })

    it("returns TRUE is no Token expiration exists", () => {
      state.accessTokenExpiresAt = null
      expect(getters.accessTokenIsExpired(state)).toBeTruthy()
    })
  })
})
