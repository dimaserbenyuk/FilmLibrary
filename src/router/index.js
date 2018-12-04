import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '@/components/Home'
import Task from '@/components/Task'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'


import Uimini from 'uimini/dist/css/uimini.css'
Vue.use(Router);
Vue.use(Uimini);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store.getters.checkUser ? next() : next('/login')
       //   next()
       // } else {
       //   next('login')

      }
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      beforeEnter(to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Registration',
      name: 'registration',
      component: Registration
    }
  ]
})
