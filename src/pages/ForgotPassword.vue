<template>
  <div class="pb-4">
    <h2 class="text-primary">Forgot password</h2>

    <p class="small">
      + Enter email has been register in Web DiceBot to request temp password
    </p>

    <div class="form-group">
      <label>Email:</label>
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
import BOT_API from "@/utils/botApi";

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
      if (!this.data.email)
        return this.showAlert("Enter all requirements", false);

      this.isLoading = true;
      axios({
        url: BOT_API + "/user/forgotPassword",
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
          setTimeout(() => this.$router.push({ path: "/Login" }), 1e3);
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