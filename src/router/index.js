import Vue from 'vue'
import VueRouter from 'vue-router'
import Employees from '../components/Employees'
import EmployeeDetail from '../components/EmployeeDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/product/:id',
    name: 'EmployeeDetail',
    component: EmployeeDetail
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
