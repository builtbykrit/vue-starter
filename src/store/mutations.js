import notification from "../modules/notification"

const mutations = {
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
   * Stores a Notification to state
   * @param state
   * @param notification
   */
  postNotification(state, notification) {
    state.notifications.push(notification)
  },

  /**
   * Syntactic sugar for generating and storing a non-configurable Error Notification to state
   * @param state
   * @param message
   */
  postErrorNotification(state, message) {
    const n = notification.createErrorNotification(message)
    mutations.postNotification(state, n)
  },

  /**
   * Syntactic sugar for generating and storing a non-configurable Success Notification to state
   * @param state
   * @param message
   */
  postSuccessNotification(state, message) {
    const n = notification.createSuccessNotification(message)
    mutations.postNotification(state, n)
  },

  /**
   * Removes a Notification from state
   * @param state
   * @param notificationId
   */
  removeNotification(state, notificationId) {
    state.notifications = state.notifications.filter(
      (n) => n.id !== notificationId
    )
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

export default mutations
