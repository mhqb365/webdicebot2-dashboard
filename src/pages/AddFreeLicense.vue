<template>
  <div class="pb-5">
    <h2 class="text-primary">Add free license</h2>

    <div class="form-group">
      <label>Username</label>
      <input v-model="data.userName" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Limit</label>
      <input v-model="data.limit" type="number" class="form-control" />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>
    <button v-else class="btn btn-primary btn-block" @click="add">Add</button>
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
        limit: 10,
      },
    };
  },
  methods: {
    add: function () {
      if (!this.data.userName || !this.data.limit)
        return this.showAlert("Enter all requirements", false);
      if (this.data.limit <= 0)
        return this.showAlert("Limit must not is zero", false);

      this.isLoading = true;
      axios({
        url: BOT_API + "/license/addFree",
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
          this.showAlert(res);
          this.data.userName = "";
          this.data.limit = 10;
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