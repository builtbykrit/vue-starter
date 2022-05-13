import ROUTER_CONFIG from "@/router/config"
import { AuthenticationGuard as authenticationGuard } from "vue-auth0-plugin"

function appendPageTitle(to) {
  document.title = `${ROUTER_CONFIG.APP_NAME} | ${to.meta["title"]}`
}

export { appendPageTitle, authenticationGuard }
