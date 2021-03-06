<template>
  <div>
    <div class="pb-5">
      <h2 class="text-primary"># Add free license</h2>

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
        this.data.userName = "";
        this.data.limit = 10;
      });
    },
  },
};
</script>

<style>
</style>