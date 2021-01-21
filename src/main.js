// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './plugins/bootstrap'
import './plugins/vue-clipboard'
import './plugins/vue-sweetalert2'
import axios from 'axios'
import API_URL from '@/utils/apiUrl'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      isLogin: false,
      isAdmin: false,
    }
  },
  mounted: function () {
    localStorage.getItem('userName') && localStorage.getItem('token') && localStorage.getItem('permission')
      ? (this.isLogin = true)
      : (this.isLogin = false)

    localStorage.getItem('permission') >= 2 ? this.isAdmin = true : this.isAdmin = false
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
        showConfirmButton: true
      });
    },
    logout: function () {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
      window.location.href = '/'
    },
    fetchPriceTron: async function () {
      let result = await axios({
        url: "https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT",
        method: "GET",
      })
      return result.data.price
    },
    checkDeposit: function () {
      axios({
        url: API_URL + '/deposit/check/' + localStorage.getItem('userName'),
        method: 'GET',
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then(response => {
        let res = response.data
        // console.log(res)
        if (res.status) if (res.data.change) window.location.reload()
      })
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})