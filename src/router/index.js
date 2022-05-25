import ROUTER_CONFIG from "./config"
import { createRouter, createWebHistory } from "vue-router"
import { appendPageTitle, authenticationGuard } from "@/router/guards"

let routes = [
  {
    path: "/app",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: ROUTER_CONFIG.ROUTE_NAMES.HOME,
        meta: {
          title: ROUTER_CONFIG.PAGE_TITLES.HOME,
        },
        component: () => import("../views/sandbox/LibrarySandbox.vue"),
      },
      {
        path: "404",
        name: ROUTER_CONFIG.ROUTE_NAMES.ERROR_404,
        meta: {
          title: ROUTER_CONFIG.PAGE_TITLES.ERROR_404,
        },
        component: () => import("../views/errors/404Error.vue"),
      },
      {
        path: "500",
        name: ROUTER_CONFIG.ROUTE_NAMES.ERROR_500,
        meta: {
          title: ROUTER_CONFIG.PAGE_TITLES.ERROR_500,
        },
        component: () => import("../views/errors/500Error.vue"),
      },
    ],
  },
]

if (process.env.VITE_ENV === "development") {
  routes = routes.concat([
    {
      path: "/sandbox",
      name: ROUTER_CONFIG.ROUTE_NAMES.SANDBOX,
      meta: {
        title: ROUTER_CONFIG.PAGE_TITLES.SANDBOX,
      },
      component: () => import("../views/sandbox/LibrarySandbox.vue"),
    },
    // App level redirect
    {
      path: "/:pathMatch(.*)*",
      redirect: () => ({
        name: ROUTER_CONFIG.ROUTE_NAMES.SANDBOX,
      }),
    },
  ])
} else {
  routes = routes.concat([
    // App level redirect
    {
      path: "/:pathMatch(.*)*",
      redirect: () => ({
        name: ROUTER_CONFIG.ROUTE_NAMES.ERROR_404,
      }),
    },
  ])
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

// TODO: enable when auth is implemented
//router.beforeEach(authenticationGuard)
router.afterEach(appendPageTitle)

export default router
