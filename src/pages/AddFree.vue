<template>
  <div>
    <div class="py-5">
      <label>Username</label>
      <b-form-input class="mb-3" v-model="data.userName"></b-form-input>

      <label>Limit</label>
      <b-form-input class="mb-3" v-model="data.limit"></b-form-input>

      <b-button variant="primary" block @click="add">Add</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      data: {
        userName: "",
        limit: 10,
      },
    };
  },
  methods: {
    add: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/license/add",
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
        this.userName = "";
        this.limit = 10;
      });
    },
  },
};
</script>

<style>
</style>