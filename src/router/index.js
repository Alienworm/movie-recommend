import Vue from 'vue';
import VueRouter from 'vue-router';
import Sign from "../views/sign/Sign";
import SignIn from "../views/sign/SignIn";
import SignUp from "../views/sign/SignUp";
import Home from "../views/Home";
import Index from "../views/Index";
import Search from "../views/Search";
import Recommend from "../views/Recommend";

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: { name: 'Index' }},
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
    children: [
      {
        path: "/sign/sign-in",
        name: "SignIn",
        component: SignIn
      },
      {
        path: "/sign/sign-up",
        name: "SignUp",
        component: SignUp
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "/home/index",
        name: "Index",
        component: Index
      },
      {
        path: "/home/search",
        name: "Search",
        component: Search
      },
      {
        path: "/home/recommend",
        name: "Recommend",
        component: Recommend
      },
    ]
  }
];

const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
