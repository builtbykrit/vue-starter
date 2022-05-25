import { defineStore } from "pinia"
import { AuthenticationProperties as auth } from "vue-auth0-plugin"

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    currentUser: null,
  }),

  actions: {
    async getAccessToken(ignoreCache = false) {
      return await auth.getTokenSilently({ ignoreCache })
    },
    getCurrentUser() {
      // Get Auth0 user
      const auth0User = auth.client.getUser()
      // Get server user
      // TODO: get user from server
      const serverUser = {}
      this.currentUser = { ...auth0User, ...serverUser }
    },
    login: async () =>
      auth.loginWithRedirect({
        redirect_uri: process.env.VITE_AUTH0_REDIRECT_URI,
      }),
    logout: async () => {
      localStorage.clear()
      alert("This is a simulated logout")
      //auth.logout({ returnTo: process.env.VITE_AUTH0_LOGOUT_URI })
    },
  },

  getters: {
    isAuthenticated: async () => auth.client.isAuthenticated(),
  },
})
