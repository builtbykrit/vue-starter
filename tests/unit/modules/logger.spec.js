/* eslint-disable no-console */
import logger from "../../../src/modules/logger"
import * as Sentry from "@sentry/vue"
import { createApp } from "@vue/runtime-dom"
import mocks from "../../mocks"
import { createRouterMock, injectRouterMock } from "vue-router-mock"

describe("logger", () => {
  const env = process.env
  const router = createRouterMock()

  beforeEach(() => {
    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router)
  })

  beforeEach(() => {
    console.log = jest.fn()
    console.error = jest.fn()
  })

  afterEach(() => {
    process.env = env
    jest.restoreAllMocks()
  })

  describe("init", () => {
    it("does not initialize Sentry outside of production", () => {
      process.env.VITE_ENV = "development"
      const spy = jest.spyOn(Sentry, "init")
      const div = document.createElement("div")
      const app = createApp(div)
      logger.init(app, router)
      expect(spy).not.toHaveBeenCalled()
    })

    it("initializes Sentry when in production", () => {
      process.env.VITE_ENV = "production"
      const div = document.createElement("div")
      const app = createApp(div)
      const spy = jest.spyOn(Sentry, "init")
      logger.init(app, router)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe("error", () => {
    let spy

    beforeEach(() => {
      spy = jest.spyOn(Sentry, "captureException").mockReturnValue("mockId")
    })

    it("only console logs when in dev", () => {
      process.env.VITE_ENV = "development"
      logger.error(new Error("foobar"))
      expect(console.error).toHaveBeenCalled()
      expect(spy).not.toHaveBeenCalled()
    })

    it("sends to Sentry when in production", () => {
      process.env.VITE_ENV = "production"
      logger.error(new Error("foobar"))
      expect(console.error).not.toHaveBeenCalled()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe("clearUser", () => {
    const spy = jest.spyOn(Sentry, "setUser").mockReturnValue()

    it("does nothing if not in production env", () => {
      process.env.VITE_ENV = "development"
      logger.clearUser()
      expect(spy).not.toHaveBeenCalled()
    })

    it("clears user context from Sentry if in production", () => {
      process.env.VITE_ENV = "production"
      logger.clearUser()
      expect(spy).not.toHaveBeenCalledWith(null)
    })
  })

  describe("setUser", () => {
    const spy = jest.spyOn(Sentry, "setUser").mockReturnValue()

    it("does nothing if not in production env", () => {
      process.env.VITE_ENV = "development"
      logger.setUser(mocks.user)
      expect(spy).not.toHaveBeenCalled()
    })

    it("clears user context from Sentry if in production", () => {
      process.env.VITE_ENV = "production"
      logger.setUser(mocks.user)
      expect(spy).not.toHaveBeenCalledWith(mocks.user)
    })
  })
})
