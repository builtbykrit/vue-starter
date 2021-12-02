import logger from "../modules/logger"
import store from "../store"

export default {
  /**
   * Injects an Authorization Header to an Axios request configuration
   * @param config
   * @returns config
   */
  injectAuthorizationHeader: (config) => {
    if (store.getters.isAuthenticated) {
      config.headers["Authorization"] = `Bearer ${store.state.accessToken}`
    }
    return config
  },

  /**
   * Logs Errors resulting from failed HTTP requests
   * @param error
   * @returns {Promise<void>}
   */
  logErrors: async (error) => {
    logger.error(error)
    throw error
  },
}
