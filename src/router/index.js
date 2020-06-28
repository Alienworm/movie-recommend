import Vue from "vue";
import VueRouter from "vue-router";
import Sign from "../views/sign/Sign";
import Home from "../views/Home";
import Index from "../views/Index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/sign",
    name: "Sign",
    component: Sign
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home/index",
        name: "Index",
        component: Index
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
