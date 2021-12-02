import clock from "../modules/clock"

const getters = {
  /**
   * Checks whether the current User's Access Token has expired
   * @param state
   * @returns {boolean}
   */
  accessTokenIsExpired(state) {
    return clock.isBeforeNow(state.accessTokenExpiresAt ?? 0)
  },

  /**
   * Checks whether the current User is authenticated
   * @param state
   * @returns {boolean}
   */
  isAuthenticated(state) {
    return !!state.accessToken && !getters.accessTokenIsExpired(state)
  },
}

export default getters
