<template>
  <div>
    <div class="pb-5">
      <h2 class="display-4 text-primary"># My info</h2>

      <div v-if="isLoading" class="spinner-border text-muted"></div>

      <ul v-else class="list-group">
        <li class="list-group-item">Username: {{ user.userName }}</li>
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Deposit address: {{ user.address }}</li>
        <li class="list-group-item">
          Balance: {{ Number(user.balance).toFixed(6) }} TRX
        </li>
      </ul>
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
      user: {},
    };
  },
  mounted: function () {
    this.profile();
  },
  methods: {
    profile: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/user/profile/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        this.user = res.data;
      });
    },
  },
};
</script>

<style>
</style>