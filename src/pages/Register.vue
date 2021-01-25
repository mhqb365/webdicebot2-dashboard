<template>
  <div>
    <h2 class="display-4 text-primary"># Register</h2>

    <p>
      Account only use at webdicebot.xyz. You have an account?
      <router-link to="/Login">Login</router-link>
    </p>

    <div class="form-group">
      <label>Username</label>
      <input v-model="data.userName" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input v-model="data.email" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input v-model="data.password" type="password" class="form-control" />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block mb-3" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block mb-3" @click="register">
      Register
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
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/user/register",
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
        this.showAlert("Register success");
        window.location.href = "/Dashboard";
      });
    },
  },
};
</script>

<style>
</style>