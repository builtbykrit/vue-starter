import ROUTER_CONFIG from "./config";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: ROUTER_CONFIG.ROUTE_NAMES.SANDBOX,
    meta: {
      title: ROUTER_CONFIG.PAGE_TITLES.SANDBOX,
    },
    component: () => import("../views/Sandbox.vue"),
  },
  {
    path: "/404",
    name: ROUTER_CONFIG.ROUTE_NAMES.ERROR_404,
    meta: {
      title: ROUTER_CONFIG.PAGE_TITLES.ERROR_404,
    },
    component: () => import("../views/errors/404Error.vue"),
  },
  {
    path: "/500",
    name: ROUTER_CONFIG.ROUTE_NAMES.ERROR_500,
    meta: {
      title: ROUTER_CONFIG.PAGE_TITLES.ERROR_500,
    },
    component: () => import("../views/errors/500Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 };
  },
});

/**
 * Append the page title to each route
 */
router.afterEach((to) => {
  document.title = `${ROUTER_CONFIG.APP_NAME} | ${to.meta["title"]}`;
});

export default router;
