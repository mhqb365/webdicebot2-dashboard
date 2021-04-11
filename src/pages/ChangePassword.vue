<template>
  <div class="pb-5">
    <h2 class="text-primary">Change password</h2>

    <div class="form-group">
      <label>Current password</label>
      <input
        v-model="data.currentPassword"
        type="password"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label>New password</label>
      <input v-model="data.newPassword" type="password" class="form-control" />
    </div>

    <div class="form-group">
      <label>Re-type new password</label>
      <input
        v-model="data.retypeNewPassword"
        type="password"
        class="form-control"
      />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block" @click="changePassword">
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
        currentPassword: "",
        newPassword: "",
        retypeNewPassword: "",
      },
    };
  },
  methods: {
    changePassword: function () {
      this.isLoading = true;
      axios({
        url:
          API_URL + "/user/changePassword/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          this.data = {
            currentPassword: "",
            newPassword: "",
            retypeNewPassword: "",
          };
          this.showAlert(res);
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