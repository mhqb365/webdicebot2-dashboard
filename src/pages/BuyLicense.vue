<template>
  <div>
    <div class="pb-5">
      <h2 class="display-4 text-primary"># Buy license</h2>

      <p>
        You have
        <span v-if="isLoading3" class="spinner-border spinner-border-sm"></span>
        <span v-else>{{ Number(user.balance).toFixed(6) }}</span>
        TRX
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
        You will pay
        <span v-if="isLoading2" class="spinner-border spinner-border-sm"></span>
        <span v-else>{{ data.price }}</span>
        TRX
      </p>

      <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
        <span class="spinner-border spinner-border-sm"></span>
      </button>

      <button v-else class="btn btn-primary btn-block" @click="order">
        Buy
      </button>
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
      isLoading2: false,
      isLoading3: false,
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
      this.isLoading2 = true;
      this.fetchPriceTron().then((response) => {
        this.isLoading2 = false;
        // console.log(response);
        this.isLoading = false;
        this.priceTronPerDay = 2 / Number(response) / 1e1;
        this.calculator();
      });
    },
    profile: function () {
      this.isLoading3 = true;
      axios({
        url: API_URL + "/user/profile/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading3 = false;
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