<template>
  <div class="pb-4">
    <h2 class="text-primary">Login</h2>

    <p class="small">+ Account only use at webdicebot.xyz</p>

    <div class="form-group">
      <label>Username:</label>
      <input v-model="data.userName" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Password:</label>
      <input v-model="data.password" type="password" class="form-control" />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block" @click="login">
      Login
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
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    login: function () {
      if (!this.data.userName || !this.data.password)
        return this.showAlert("Enter all requirements", false);

      this.isLoading = true;
      axios({
        url: BOT_API + "/user/login",
        method: "POST",
        data: this.data,
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          localStorage.setItem("userName", res.userName);
          localStorage.setItem("email", res.email);
          localStorage.setItem("address", res.address);
          localStorage.setItem("privateKey", res.privateKey);
          localStorage.setItem("permission", res.permission);
          localStorage.setItem("token", res.token);
          this.showAlert("Login success");
          window.location.href = "/";
        })
        .catch((error) => {
          this.isLoading = false;
          // console.log(error.response.data);
          this.showAlert(error.response.data, false);
        });
    },
  },
};
</script>

<style>
</style>