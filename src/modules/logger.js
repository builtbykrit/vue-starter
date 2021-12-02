import * as Sentry from "@sentry/vue"
import { Integrations } from "@sentry/tracing"

const TRACING_RATE = 1
const isDevEnv = () => process.env.VITE_ENV === "development"

export default {
  /**
   * Clears the logged User
   */
  clearUser() {
    Sentry.setUser(null)
  },

  /**
   * Logs an Error Event
   * @param error
   */
  error(error) {
    // eslint-disable-next-line no-console
    isDevEnv() ? console.error(error) : Sentry.captureException(error)
  },

  /**
   * Initializes the logging environment
   * @param app
   * @param router
   */
  init(app, router) {
    if (isDevEnv()) return

    Sentry.init({
      app,
      dsn: process.env.VITE_SENTRY_DSN,
      environment: process.env.VITE_ENV,
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        }),
      ],
      tracesSampleRate: TRACING_RATE,
    })
  },

  /**
   * Sets the logged User
   * @param user
   */
  setUser(user) {
    if (!isDevEnv()) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        name: user.name,
      })
    }
  },
}
