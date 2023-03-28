import {
  createRouter,
  createWebHashHistory,
} from "vue-router";
const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("./../views/login/index.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/home/vip.vue"),
    }
  ],
});

export default routes;
