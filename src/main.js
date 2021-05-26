// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/vue-clipboard'
import './plugins/vue-sweetalert2'
import axios from 'axios'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      isLogin: false,
      isAdmin: false
    }
  },
  mounted: function () {
    localStorage.getItem('token') ? this.isLogin = true : this.isLogin = false
    localStorage.getItem('permission') > 0 ? this.isAdmin = true : this.isAdmin = false
  },
  methods: {
    clipboardSuccess: function ({ value }) {
      if (value == null) return this.showAlert("Empty value", false)
      this.showAlert("Copy success")
    },
    clipboardError: function () {
      this.showAlert("Copy fail", false)
    },
    showAlert: function (message, type = true) {
      this.$swal.fire({
        icon: type ? "success" : "error",
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: 'top-end'
      });
    },
    logout: function () {
      localStorage.removeItem('userName')
      localStorage.removeItem('email')
      localStorage.removeItem('address')
      localStorage.removeItem('privateKey')
      localStorage.removeItem('permission')
      localStorage.removeItem('token')
      window.location.href = '/'
    },
    getTrxPrice: async function () {
      let result = await axios({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd&include_24hr_change=true",
        method: "GET",
      })

      return result.data
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})