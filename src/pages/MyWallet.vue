<template>
  <div class="pb-5">
    <h2 class="text-primary"># My wallet</h2>

    <p class="small">
      This is a Tron wallet, it link Tron Ecosystem. You can import this wallet
      to any wallet app support Tron
    </p>

    <ul class="list-group">
      <li class="list-group-item">Username: {{ userName }}</li>
      <li class="list-group-item">Email: {{ email }}</li>
      <li class="list-group-item">
        Balance:
        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
        <span v-else>{{ Number(balance).toFixed(6) }}</span>
        TRX
        <button type="button" class="btn btn-light btn-sm" @click="getBalance">
          <img src="/static/refresh.svg" width="18px" />
        </button>
      </li>
      <li class="list-group-item">
        <a :href="tronScan + 'address/' + address" target="_blank">
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
import TRON_SCAN from "@/utils/tronScan";
import tronWeb from "@/utils/tronWeb";
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
      tronScan: TRON_SCAN,
    };
  },
  mounted: function () {
    this.getBalance();
    setTimeout(() => this.getBalance(), 3e4);
  },
  methods: {
    getBalance: async function () {
      this.isLoading = true;
      let bal = await tronWeb.trx.getBalance(this.address);
      this.isLoading = false;
      this.balance = tronWeb.fromSun(bal);
      // console.log(this.balance);
    },
  },
};
</script>

<style>
</style>