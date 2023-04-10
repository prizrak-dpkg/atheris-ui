import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homeRouter from "@/modules/home/router";
import designRouter from "@/modules/design/router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    ...homeRouter,
  },
  {
    path: "/design",
    ...designRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
