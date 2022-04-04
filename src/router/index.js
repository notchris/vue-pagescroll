import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    title: 'Home'
  },
  {
    path: '/about',
    name: 'about',
    title: 'About'
  },
  {
    path: '/contact',
    name: 'contact',
    title: 'Contact'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
