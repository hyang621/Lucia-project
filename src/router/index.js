import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/list/index.vue')
  },
  {
    path: '/share',
    name: 'Share',
    component: () => import('../views/share/index.vue')
  },
  {
    path: '/',
    redirect: '/home',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
