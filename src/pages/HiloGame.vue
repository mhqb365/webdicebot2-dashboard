<template>
  <div class="pb-5">
    <h2 class="text-primary"># HiLo game</h2>

    <p>
      You have
      <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
      <span v-else>{{ Number(user.balance).toFixed(6) }}</span>
      TRX
    </p>
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
      this.isLoading3 = true;
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