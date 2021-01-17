<template>
  <div>
    <div class="py-5">
      <h2 class="display-4 text-primary"># Buy license</h2>

      <p>You have {{ Number(user.balance).toFixed(6) }} TRX</p>

      <div class="form-group">
        <label>How many day you wanna? Minimum 10 days</label>
        <input
          type="number"
          class="form-control"
          v-model="data.limit"
          @change="calculator"
        />
      </div>

      <p>You will pay {{ data.price }} TRX</p>

      <b-button v-if="isLoading" variant="primary" block disabled>
        <span class="spinner-border spinner-border-sm"></span>
      </b-button>

      <b-button v-else variant="primary" block @click="order">Buy</b-button>
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
      user: {},
      priceTronPerDay: 0,
      data: {
        limit: 10,
        price: 0,
      },
    };
  },
  mounted: function () {
    this.fetchPrice();
    setInterval(() => this.fetchPrice(), 6e4);
    this.profile();
  },
  methods: {
    fetchPrice: function () {
      this.fetchPriceTron().then((response) => {
        // console.log(response);
        this.isLoading = false;
        this.priceTronPerDay = 2 / Number(response) / 1e1;
        this.calculator();
      });
    },
    profile: function () {
      axios({
        url: API_URL + "/user/profile/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        this.user = res.data;
      });
    },
    calculator: function () {
      this.data.price = (this.data.limit * this.priceTronPerDay).toFixed(0);
    },
    order: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/license/order/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (!res.status) return this.showAlert(res.message, false);
        this.showAlert("Success");
      });
    },
  },
};
</script>

<style>
</style>