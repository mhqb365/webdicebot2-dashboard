<template>
  <div>
    <div class="py-5">
      <h2 class="display-4 text-primary"># My info</h2>

      <b-list-group>
        <b-list-group-item> Username: {{ user.userName }} </b-list-group-item>

        <b-list-group-item> Email: {{ user.email }} </b-list-group-item>

        <b-list-group-item>
          Deposit address: {{ user.address }}
        </b-list-group-item>

        <b-list-group-item> Balance: {{ user.balance }} </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      user: {},
    };
  },
  mounted: function () {
    this.profile();
  },
  methods: {
    profile: function () {
      axios({
        url: API_URL + "/user/profile/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
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