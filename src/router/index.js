import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from "../views/Sign/Sign";
import SignIn from "../views/Sign/SignIn";
import SignUp from "../views/Sign/SignUp";
import Home from "../views/Home";
import Index from "../views/Index";
import Search from "../views/Search";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Sign',
    component: Sign,
    children: [
      {
        path: "/sign-in",
        name: "SignIn",
        component: SignIn
      },
      {
        path: "/sign-up",
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
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
