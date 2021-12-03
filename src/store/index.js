import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
import notificationModule from "./notification"
import tokenModule from "./token"
import userModule from "./user"

const ls = new SecureLS({ isCompression: false })
const persistedState = createPersistedState({
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
})

export default createStore({
  modules: {
    notification: notificationModule,
    token: tokenModule,
    user: userModule,
  },
  plugins: [persistedState],
})
