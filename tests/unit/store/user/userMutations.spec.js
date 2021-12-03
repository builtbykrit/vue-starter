import state from "../../../../src/store/user/userState"
import mutations from "../../../../src/store/user/userMutations"
import mocks from "../../../mocks"

describe("userMutations", () => {
  describe("setCurrentUser", () => {
    it("stores User data to state", () => {
      state.currentUser = null
      expect(state.currentUser).toBeNull()
      mutations.setCurrentUser(state, mocks.user)
      expect(state.currentUser).toBeDefined()
    })
  })
})
