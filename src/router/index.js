import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import BotInstaller from '@/pages/BotInstaller'
import MyInfo from '@/pages/MyInfo'
import MyLicense from '@/pages/MyLicense'
import BuyLicense from '@/pages/BuyLicense'
import Deposit from '@/pages/Deposit'
import Withdraw from '@/pages/Withdraw'
import Summary from '@/pages/Summary'
import AddFreeLicense from '@/pages/AddFreeLicense'
import DepositList from '@/pages/DepositList'
import WithdrawList from '@/pages/WithdrawList'
import ScriptStore from '@/pages/ScriptStore'
import ShareYourScript from '@/pages/ShareYourScript'
import User from '@/pages/User'
import License from '@/pages/License'
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
      path: '/MyInfo',
      name: 'MyInfo',
      component: MyInfo,
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
      path: '/Summary',
      name: 'Summary',
      component: Summary,
      meta: { requiresAuth: true }
    },
    {
      path: '/AddFreeLicense',
      name: 'AddFreeLicense',
      component: AddFreeLicense,
      meta: { requiresAuth: true }
    },
    {
      path: '/DepositList',
      name: 'DepositList',
      component: DepositList,
      meta: { requiresAuth: true }
    },
    {
      path: '/WithdrawList',
      name: 'WithdrawList',
      component: WithdrawList,
      meta: { requiresAuth: true }
    },
    {
      path: '/ScriptStore',
      name: 'ScriptStore',
      component: ScriptStore,
      meta: { requiresAuth: true }
    },
    {
      path: '/ShareYourScript',
      name: 'ShareYourScript',
      component: ShareYourScript,
      meta: { requiresAuth: true }
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path: '/License',
      name: 'License',
      component: License,
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