import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import notificationModule from "./notification"
import tokenModule from "./token"
import userModule from "./user"

export default createStore({
  modules: {
    notification: notificationModule,
    token: tokenModule,
    user: userModule,
  },
  plugins: [createPersistedState()],
})
