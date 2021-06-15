<template>
  <div class="pb-5">
    <h2 class="text-primary">Buy license</h2>

    <p>
      You have
      <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
      <span v-else>{{ Number(balance).toFixed(6) }} TRX</span>
      <button type="button" class="btn btn-light btn-sm" @click="getBalance">
        <i class="fas fa-sync"></i>
      </button>
    </p>

    <div class="form-group">
      <label>How many day you wanna? Minimum 10 days</label>
      <input
        type="number"
        class="form-control"
        v-model="data.limit"
        @change="calculator"
      />
    </div>

    <p>
      You will pay ≈
      <span v-if="isLoading2" class="spinner-border spinner-border-sm"></span>
      <span v-else>{{ Number(data.price).toFixed(6) }} TRX</span>
    </p>

    <button v-if="isLoading3" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block" @click="buy">Buy</button>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";
import TRON_SCAN from "@/utils/tronScan";
import tronWeb from "@/utils/tronWeb";

export default {
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
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
    this.getBalance();
    this.getPrice();
    setInterval(() => {
      this.getBalance();
      this.getPrice();
    }, 3e4);
  },
  methods: {
    getBalance: async function () {
      this.isLoading = true;
      let bal = await tronWeb.trx.getBalance(this.address);
      this.isLoading = false;
      this.balance = tronWeb.fromSun(bal);
      // console.log(this.balance);
    },
    getPrice: function () {
      this.isLoading2 = true;
      this.getTrxPrice().then((response) => {
        this.isLoading2 = false;
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
      this.isLoading3 = true;
      axios({
        url:
          API_URL + "/license/buyLicense/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      })
        .then((response) => {
          this.isLoading3 = false;
          let res = response.data;
          // console.log(res);
          this.showAlert(res);
          window.location.href = "/MyLicense";
        })
        .catch((error) => {
          this.isLoading3 = false;
          // console.error(error.response.data);
          this.showAlert(error.response.data, false);
        });
    },
  },
};
</script>

<style>
</style>