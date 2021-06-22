<template>
  <div class="mb-4">
    <h2 class="text-primary">Buy license</h2>

    <p>
      You have
      <span
        v-if="isLoading"
        class="spinner-border spinner-border-sm text-muted"
      ></span>
      <span v-else>{{ Number(balance).toFixed(6) }} TRX</span>
      <button type="button" class="btn btn-light btn-sm" @click="getAccount">
        <i class="fas fa-sync"></i>
      </button>
      <br />
      You will pay ≈
      <span
        >{{ Number(data.price).toFixed(6) }} TRX for {{ data.limit }} days license</span
      >
    </p>

    <div class="form-group">
      <label>Number of days you want:</label>
      <input
        type="number"
        class="form-control"
        v-model="data.limit"
        @change="calculator"
      />
    </div>

    <button v-if="isLoading2" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>
    <button v-else class="btn btn-primary btn-block" @click="buy">Buy</button>
  </div>
</template>

<script>
import axios from "axios";
import BOT_API from "@/utils/botApi";
import TRON_API from "@/utils/tronApi";
import TRON_SCAN from "@/utils/tronScan";
import tronWeb from "@/utils/tronWeb";

export default {
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      address: localStorage.getItem("address"),
      balance: 0,
      trxPrice: 0,
      licensePricePerDays: 0,
      data: {
        limit: 10,
        price: 0,
      },
      tronScan: TRON_SCAN,
    };
  },
  mounted: function () {
    this.getAccount();
    setInterval(() => {
      this.getAccount();
    }, 3e4);
  },
  methods: {
    getAccount: function () {
      this.isLoading = true;
      this.data.price = 0;

      axios({
        url: TRON_API + "/api/account?address=" + this.address,
        method: "GET",
      }).then((response) => {
        this.isLoading = false;
        let result = response.data;
        // console.log(result);
        this.balance = tronWeb.fromSun(result.balance);
        this.getPrice();
      });
    },
    getPrice: function () {
      this.getTrxPrice().then((response) => {
        // console.log(response);
        this.trxPrice = Number(response.tron.usd).toFixed(6);
        this.calculator();
      });
    },
    calculator: function () {
      this.licensePricePerDays = Number(
        2 / Number(this.trxPrice) / 1e1
      ).toFixed(6);
      this.data.price = this.data.limit * Number(this.licensePricePerDays) + 1;
    },
    buy: function () {
      if (!this.data.limit || this.data.limit <= 10)
        return this.showAlert("Min is 10 days", false);

      this.isLoading2 = true;

      axios({
        url:
          BOT_API + "/license/buyLicense/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      })
        .then((response) => {
          this.isLoading2 = false;
          let res = response.data;
          // console.log(res);
          this.showAlert(res);
          window.location.href = "/MyLicense";
        })
        .catch((error) => {
          this.isLoading2 = false;
          // console.error(error.response.data);
          this.showAlert(error.response.data, false);
        });
    },
  },
};
</script>

<style>
</style>