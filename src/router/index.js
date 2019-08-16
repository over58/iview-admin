import Vue from "vue";
import Router from "vue-router";
import afterRouter from "./afterRouter";
import beforeRouter from "./beforeRouter";
import Main from "com/main/main";
import routes from "./routes";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("../views/Logout")
    },
    {
      path: "/",
      name: "main",
      component: Main,
      redirect: "/login",
      children: routes
    }
    // {
    //   path: "*",
    //   name: "404",
    //   meta: {
    //     label: "404",
    //     icon: "icon-test"
    //   },
    //   component: () => import("../views/404.vue")
    // }
  ]
});
beforeRouter(router);
afterRouter(router);

export default router;
