<template>
  <div class="pb-5">
    <h2 class="text-primary">Forgot password</h2>

    <div class="form-group">
      <label>Email</label>
      <input v-model="data.email" type="email" class="form-control" />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block" @click="requestPassword">
      Request
    </button>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      isLoading: false,
      data: {
        email: "",
      },
    };
  },
  methods: {
    requestPassword: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/user/forgotPassword",
        method: "POST",
        headers: {
          //   Auth: localStorage.getItem("token"),
        },
        data: this.data,
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          this.showAlert(res);
          this.data.email = "";
        })
        .catch((error) => {
          this.isLoading = false;
          this.showAlert(error.response.data, false);
        });
    },
  },
};
</script>

<style>
</style>