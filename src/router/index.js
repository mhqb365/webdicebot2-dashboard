import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import BotInstaller from '@/pages/BotInstaller'
import MyWallet from '@/pages/MyWallet'
import MyLicense from '@/pages/MyLicense'
import BuyLicense from '@/pages/BuyLicense'
import Summary from '@/pages/Summary'
import AddFreeLicense from '@/pages/AddFreeLicense'
import ScriptStore from '@/pages/ScriptStore'
import ShareYourScript from '@/pages/ShareYourScript'
import User from '@/pages/User'
import Token from '@/pages/Token'
import License from '@/pages/License'
import Logout from '@/pages/Logout'
import ForgotPassword from '@/pages/ForgotPassword'
import ChangePassword from '@/pages/ChangePassword'
import EditScript from '@/pages/EditScript'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/Token',
      name: 'Token',
      component: Token,
      meta: { requiresAuth: false }
    },
    {
      path: '/BotInstaller',
      name: 'BotInstaller',
      component: BotInstaller,
      meta: { requiresAuth: true }
    },
    {
      path: '/MyWallet',
      name: 'MyWallet',
      component: MyWallet,
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
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { requiresAuth: true }
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/EditScript',
      name: 'EditScript',
      component: EditScript
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