import logger from "@/modules/logger"
import { useAuthStore } from "@/store/authStore"

export default {
  /**
   * Injects an Authorization Header to an Axios request configuration
   * @param config
   * @returns config
   */
  injectAuthorizationHeader: async (config) => {
    const authStore = useAuthStore()
    const accessToken = await authStore.getAccessToken()
    config.headers["Authorization"] = `Bearer ${accessToken}`
    return config
  },

  /**
   * Logs Errors resulting from failed HTTP requests
   * @param error
   * @returns {Promise<{success: boolean}>}
   */
  logErrors: async (error) => {
    logger.error(error)
    throw error
  },
}
