import interceptors from "../../../src/http/interceptors"
import logger from "../../../src/modules/logger"
import clock from "../../../src/modules/clock"
import mocks from "../../mocks"
import store from "../../../src/store"

describe("interceptors", () => {
  describe("injectAuthorizationHeader", () => {
    it("adds an Authorization header only when a Token exists", () => {
      store.state.accessToken = null
      store.state.accessTokenExpiresAt = null
      jest.spyOn(clock, "isBeforeNow").mockReturnValueOnce(false)
      let config = interceptors.injectAuthorizationHeader({
        headers: [],
      })
      expect(config.headers).not.toContain("Authorization")

      store.state.accessToken = mocks.token
      store.state.accessTokenExpiresAt = 123512351235235
      jest.spyOn(clock, "isBeforeNow").mockReturnValueOnce(true)
      config = interceptors.injectAuthorizationHeader({
        headers: [],
      })
      expect(config.headers["Authorization"]).toStrictEqual(
        `Bearer ${mocks.token}`
      )
    })
  })

  describe("logErrors", () => {
    it("logs the error before rethrowing it", async () => {
      const mockError = new Error("foo")
      const spy = jest.spyOn(logger, "error").mockImplementation()
      await expect(interceptors.logErrors(mockError)).rejects.toThrowError()
      expect(spy).toHaveBeenCalled()
    })
  })
})
