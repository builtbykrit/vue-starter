export default {
  /**
   * Clears authentication data from state
   * @param state
   */
  clearAuthentication(state) {
    state.accessToken = null
    state.accessTokenExpiresAt = null
    state.refreshToken = null
  },

  /**
   * Stores an Access Token to state
   * @param state
   * @param token
   */
  setAccessToken(state, token) {
    state.accessToken = token
  },

  /**
   * Stores a Refresh Token to state
   * @param state
   * @param token
   */
  setRefreshToken(state, token) {
    state.refreshToken = token
  },

  /**
   * Stores the current User's data to state
   * @param state
   * @param user
   */
  setCurrentUser(state, user) {
    state.currentUser = user
  },
}
