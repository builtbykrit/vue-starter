import ROUTER_CONFIG from "./config"
import { createRouter, createWebHistory } from "vue-router"
import { appendPageTitle, authenticationGuard } from "@/router/guards"

const routes = [
  {
    path: "/",
    name: ROUTER_CONFIG.ROUTE_NAMES.SANDBOX,
    meta: {
      title: ROUTER_CONFIG.PAGE_TITLES.SANDBOX,
      requiresAuth: false,
      splash: false,
    },
    component: () => import("../views/Sandbox.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

router.beforeEach(authenticationGuard)
router.afterEach(appendPageTitle)

export default router
