import interceptors from "../../../src/http/interceptors"
import logger from "../../../src/modules/logger"
import { createPinia, setActivePinia } from "pinia"
import { useAuthStore } from "@/store/authStore"
import { mockToken } from "../../mocks"

describe("interceptors", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  describe("injectAuthorizationHeader", () => {
    it("adds an Authorization header", async () => {
      const authStore = useAuthStore()
      authStore.getAccessToken = jest.fn(() => mockToken)
      const config = await interceptors.injectAuthorizationHeader({
        headers: [],
      })
      expect(config.headers["Authorization"]).toStrictEqual(
        `Bearer ${mockToken}`
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
