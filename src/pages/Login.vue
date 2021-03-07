<template>
  <div class="pb-5">
    <h2 class="text-primary"># Login</h2>

    <p>
      Account only use at webdicebot.xyz. You do not have an account?
      <router-link to="/Register">Register</router-link>
    </p>

    <div class="form-group">
      <label>Username</label>
      <input v-model="data.userName" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Password</label>
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
import API_URL from "@/utils/apiUrl";

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
      this.isLoading = true;
      axios({
        url: API_URL + "/user/login",
        method: "POST",
        data: this.data,
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (!res.status) return this.showAlert(res.message, false);
        localStorage.setItem("userName", this.data.userName);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("permission", res.data.permission);
        this.showAlert("Login success");
        window.location.href = "/Dashboard";
      });
    },
  },
};
</script>

<style>
</style>