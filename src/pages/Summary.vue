<template>
  <div>
    <div class="pb-5">
      <h2 class="text-primary">Summary</h2>

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
        <div class="col-md-6 mb-3">
          <div class="card gradient-primary p-4 summary">
            Income
            <br />
            <h4>
              <div v-if="isLoading" class="spinner-border"></div>
              <span v-else>{{ Number(income).toFixed(6) }} TRX</span>
            </h4>
            <span
              >≈
              {{
                Number(vnd).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </span>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <div class="card gradient-danger p-4 summary">
            License
            <br />
            <h4>
              <div v-if="isLoading" class="spinner-border"></div>
              <span v-else>{{ license }}</span>
            </h4>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <div class="card gradient-warning p-4 summary">
            Pay
            <br />
            <h4>
              <div v-if="isLoading" class="spinner-border"></div>
              <span v-else>{{ pay }}</span>
            </h4>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <div class="card gradient-info p-4 summary">
            Free
            <br />
            <h4>
              <div v-if="isLoading" class="spinner-border"></div>
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

export default {
  data() {
    return {
      isLoading: false, 
      userName: "",
      state: "ThisMonth",
      income: 0,
      license: 0,
      pay: 0,
      free: 0,
      vnd: 0,
      address: localStorage.getItem("address"),
    };
  },
  mounted: function () {
    this.summary(this.state);
  },
  methods: {
    summary: function (state) {
      this.state = state;
      this.income = 0;
      this.license = 0;
      this.pay = 0;
      this.free = 0;
      this.vnd = 0;
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

          this.priceVnd();
        })
        .catch((error) => {
          this.isLoading = false;
          this.showAlert(error.response.data, false);
          window.location.href = "/Logout";
        });
    },
    priceVnd: function () {
      axios({
        url: "https://api-prod.bitmoon.net/graphql",
        method: "POST",
        data: {
          query:
            "\n    query getPriceBook ($coin_id: String) {\n      apiPricebook (coin_id: $coin_id){\n        coin_id,\n        bid_price_vnd,\n        fast_bid_price,\n        fast_ask_price,\n        ask_price_vnd,\n        fast,\n        normal,\n        is_direct,\n        broker_code,\n        change_24h,\n        volume,\n        coin,\n        trade_buy_fee,\n        trade_sell_fee,\n        base_currency\n      }\n    }\n  ",
          variables: { coin_id: "tron" },
        },
      }).then((response) => {
        let res = response.data;
        // console.log(res);
        let result = res.data.apiPricebook[0];
        this.vnd = result.fast_ask_price * this.income;
        // console.log(this.vnd)
      });
    },
  },
};
</script>

<style>
.summary {
  min-height: 135px;
}
</style>