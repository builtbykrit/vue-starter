const userMutations = {
  /**
   * Stores the current User's data to state
   * @param state
   * @param user
   */
  setCurrentUser(state, user) {
    state.currentUser = user
  },
}

export default userMutations
