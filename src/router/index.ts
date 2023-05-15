import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homeRouter from "@/modules/home/router";
import designRouter from "@/modules/design/router";
import trackRouter from "@/modules/track/router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    ...homeRouter,
  },
  {
    path: "/design",
    ...designRouter,
  },
  {
    path: "/track",
    ...trackRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
