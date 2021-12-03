import notification from "../../modules/notification"

const notificationMutations = {
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
    notificationMutations.postNotification(state, n)
  },

  /**
   * Syntactic sugar for generating and storing a non-configurable Success Notification to state
   * @param state
   * @param message
   */
  postSuccessNotification(state, message) {
    const n = notification.createSuccessNotification(message)
    notificationMutations.postNotification(state, n)
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
}

export default notificationMutations
