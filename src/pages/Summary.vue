<template>
  <div>
    <div class="pb-5">
      <h2 class="text-primary"># Summary</h2>

      <ul class="pagination">
        <li
          class="page-item"
          v-bind:class="[state == 'ThisMonth' ? 'active' : '']"
        >
          <button class="page-link" @click="summary('ThisMonth')">
            This month
          </button>
        </li>

        <li
          class="page-item"
          v-bind:class="[state == 'LastMonth' ? 'active' : '']"
        >
          <button class="page-link" @click="summary('LastMonth')">
            Last month
          </button>
        </li>

        <li class="page-item" v-bind:class="[state == 'Total' ? 'active' : '']">
          <button class="page-link" @click="summary('Total')">Total</button>
        </li>
      </ul>

      <div class="row">
        <div class="col-md-12 mb-3">
          <div class="card p-4 summary">
            Admin balance
            <br />
            <h4 class="text-primary">
              <div v-if="isLoading2" class="spinner-border text-muted"></div>
              <span v-else> {{ Number(balance).toFixed(6) }} TRX</span>
              <span
                ><button
                  type="button"
                  class="btn btn-light btn-sm"
                  @click="getBalance"
                >
                  <img src="/static/refresh.svg" width="18px" />
                </button>
              </span>
            </h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card p-4 summary">
            Income
            <br />
            <h4 class="text-success">
              <div v-if="isLoading" class="spinner-border text-muted"></div>
              <span v-else>{{ Number(income).toFixed(6) }}</span> TRX
            </h4>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <div class="card p-4 summary">
            License
            <br />
            <h4 class="text-primary">
              <div v-if="isLoading" class="spinner-border text-muted"></div>
              <span v-else>{{ license }}</span>
            </h4>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <div class="card p-4 summary">
            Pay
            <br />
            <h4 class="text-warning">
              <div v-if="isLoading" class="spinner-border text-muted"></div>
              <span v-else>{{ pay }}</span>
            </h4>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <div class="card p-4 summary">
            Free
            <br />
            <h4 class="text-danger">
              <div v-if="isLoading" class="spinner-border text-muted"></div>
              <span v-else>{{ free }}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";
import tronWeb from "@/utils/tronWeb";

export default {
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      userName: "",
      state: "ThisMonth",
      income: 0,
      license: 0,
      pay: 0,
      free: 0,
      balance: 0,
      address: localStorage.getItem("address"),
    };
  },
  mounted: function () {
    this.summary(this.state);
    this.getBalance();
    setTimeout(() => this.getBalance(), 3e4);
  },
  methods: {
    summary: function (state) {
      this.state = state;
      this.income = 0;
      this.license = 0;
      this.pay = 0;
      this.free = 0;
      this.isLoading = true;

      axios({
        url: API_URL + "/license/summary/" + state,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          res.map((d) => {
            this.income += d.price;
            this.license += 1;
            d.type == "Pay" ? (this.pay += 1) : (this.free += 1);
          });
        })
        .catch((error) => {
          this.isLoading = false;
          this.showAlert(error.response.data, false);
          window.location.href = "/Logout";
        });
    },
    getBalance: async function () {
      this.isLoading2 = true;
      let bal = await tronWeb.trx.getBalance(this.address);
      this.isLoading2 = false;
      this.balance = tronWeb.fromSun(bal);
      // console.log(this.balance);
    },
  },
};
</script>

<style>
.summary {
  min-height: 135px;
}
</style>