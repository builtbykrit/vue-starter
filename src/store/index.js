import { createStore } from "vuex"
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"

const ls = new SecureLS({ isCompression: false })
const persistedState = createPersistedState({
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
})

export default createStore({
  state,
  getters,
  mutations,
  plugins: [persistedState],
})
