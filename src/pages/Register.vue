<template>
  <div class="pb-4">
    <h2 class="text-primary">Register</h2>

    <p class="small">+ Account only use at webdicebot.xyz</p>

    <div class="form-group">
      <label>Username:</label>
      <input v-model="data.userName" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Email:</label>
      <input v-model="data.email" type="email" class="form-control" />
    </div>

    <div class="form-group">
      <label>Password:</label>
      <input v-model="data.password" type="password" class="form-control" />
    </div>

    <div class="form-group">
      <label>Re-type password:</label>
      <input
        v-model="data.retypePassword"
        type="password"
        class="form-control"
      />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block" @click="register">
      Register
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
        email: "",
        password: "",
        retypePassword: "",
      },
    };
  },
  methods: {
    register: function () {
      if (
        !this.data.userName ||
        !this.data.email ||
        !this.data.password ||
        !this.data.retypePassword
      )
        return this.showAlert("Enter all requirements", false);

      let regexp = /^[a-zA-Z0-9]{6,12}$/;

      if (!regexp.test(this.data.userName))
        return this.showAlert(
          "Username must 6-12 characters and no have special",
          false
        );

      this.isLoading = true;
      axios({
        url: BOT_API + "/user/register",
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
          this.showAlert("Register success");
          setTimeout(() => this.$router.push({ path: "/Login" }), 1e3);
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