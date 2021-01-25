<template>
  <div>
    <h2 class="display-4 text-primary"># Add Free License</h2>

    <div class="form-group">
      <label>Username</label>
      <input v-model="data.userName" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Limit</label>
      <input v-model="data.limit" type="number" class="form-control" />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block mb-3" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block mb-3" @click="add">Add</button>
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
        this.userName = "";
        this.limit = 10;
      });
    },
  },
};
</script>

<style>
</style>