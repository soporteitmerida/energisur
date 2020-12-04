import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component:  Login
    },
    {
      path: '/login',
      name: 'Login',
      component:  Login
    },
    {
      path: '/home',
      name: 'Home',
      component:  Home
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile")
    },
    {
      path: "/viajes",
      name: "trips",
      component: () => import("./views/Trips")
    }

  ]
})