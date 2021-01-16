<template>
  <div>
    <div class="py-5">
      <h2 class="display-4 text-primary"># Register</h2>

      <p>
        Account only use at webdicebot.xyz. You have an account?
        <router-link to="/Login">Login</router-link>
      </p>

      <b-overlay :show="isLoading" rounded="sm">
        <label>User name</label>
        <b-form-input class="mb-3" v-model="data.userName"></b-form-input>

        <label>Email</label>
        <b-form-input
          type="email"
          class="mb-3"
          v-model="data.email"
        ></b-form-input>

        <label>Password</label>
        <b-form-input
          type="password"
          class="mb-3"
          v-model="data.password"
        ></b-form-input>

        <b-button variant="primary" block @click="register">Register</b-button>
      </b-overlay>
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
        this.showAlert("Register success");
        window.location.href = "/Dashboard";
      });
    },
  },
};
</script>

<style>
</style>