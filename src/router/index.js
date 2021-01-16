import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import BotInstaller from '@/pages/BotInstaller'
import MyLicense from '@/pages/MyLicense'
import BuyLicense from '@/pages/BuyLicense'
import Deposit from '@/pages/Deposit'
import Withdraw from '@/pages/Withdraw'
import Logout from '@/pages/Logout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/BotInstaller',
      name: 'BotInstaller',
      component: BotInstaller,
      meta: { requiresAuth: true }
    },
    {
      path: '/MyLicense',
      name: 'MyLicense',
      component: MyLicense,
      meta: { requiresAuth: true }
    },
    {
      path: '/BuyLicense',
      name: 'BuyLicense',
      component: BuyLicense,
      meta: { requiresAuth: true }
    },
    {
      path: '/Deposit',
      name: 'Deposit',
      component: Deposit,
      meta: { requiresAuth: true }
    },
    {
      path: '/Withdraw',
      name: 'Withdraw',
      component: Withdraw,
      meta: { requiresAuth: true }
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: Logout,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    !localStorage.getItem('userName') || !localStorage.getItem('token') ? next({ path: '/Login' }) : next()
  }
  else next()
})

export default router