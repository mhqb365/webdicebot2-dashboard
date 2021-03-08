<template>
  <div class="pb-5">
    <h2 class="text-primary"># My info</h2>

    <ul class="list-group">
      <li class="list-group-item">Username: {{ userName }}</li>
      <li class="list-group-item">Email: {{ email }}</li>
      <li class="list-group-item">
        Balance:
        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
        <span v-else>{{ Number(balance).toFixed(6) }}</span>
        TRX
        <img
          class="ml-1"
          type="button"
          src="/static/refresh.svg"
          width="18px"
          @click="getBalance"
        />
      </li>
      <li class="list-group-item">
        <a :href="tronNode + 'address/' + address" target="_blank">
          <button class="btn btn-primary mb-2">
            <img src="/static/details.svg" width="18px" />
            Account Details
          </button>
        </a>

        <button
          class="btn btn-success mb-2"
          data-toggle="modal"
          data-target="#myModalRecevie"
        >
          <img src="/static/receive.svg" width="18px" />
          Receive
        </button>

        <button
          class="btn btn-danger mb-2"
          data-toggle="modal"
          data-target="#myModalSend"
        >
          <img src="/static/send.svg" width="18px" />
          Send
        </button>

        <button
          class="btn btn-secondary mb-2"
          data-toggle="modal"
          data-target="#myModalPrivateKey"
        >
          <img src="/static/export.svg" width="18px" />
          Export Private Key
        </button>
      </li>
    </ul>

    <Recevie />
    <Send />
    <PrivateKey />
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";
import TRON_NODE from "@/utils/tronNode";
import Recevie from "@/components/Recevie";
import Send from "@/components/Send";
import PrivateKey from "@/components/PrivateKey";

export default {
  components: {
    Recevie,
    Send,
    PrivateKey,
  },
  data() {
    return {
      isLoading: false,
      userName: localStorage.getItem("userName"),
      email: localStorage.getItem("email"),
      address: localStorage.getItem("address"),
      balance: 0,
      tronNode: TRON_NODE,
    };
  },
  mounted: function () {
    this.getBalance();
    setTimeout(() => this.getBalance(), 3e4);
  },
  methods: {
    getBalance: function () {
      this.isLoading = true;
      axios({
        url:
          API_URL + "/wallet/balance/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          this.balance = Number(res).toFixed(6);
        })
        .catch((error) => {
          console.log(error.response.data);
          window.location.href = "/Logout";
        });
    },
  },
};
</script>

<style>
</style>