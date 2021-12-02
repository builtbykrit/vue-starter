import ROUTER_CONFIG from "./config"
import { createRouter, createWebHistory } from "vue-router"

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

/**
 * Append the page title to each route
 */
router.afterEach((to) => {
  document.title = `${ROUTER_CONFIG.APP_NAME} | ${to.meta["title"]}`
})

export default router
