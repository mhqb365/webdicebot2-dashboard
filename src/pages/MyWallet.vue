<template>
  <div class="pb-5">
    <h2 class="text-primary">My wallet</h2>

    <p class="small text-warning">
      + This is a Tron wallet, it link Tron Ecosystem. You can import this
      wallet to any wallet app support Tron
    </p>

    <div class="card gradient-primary balance text-center mb-3">
      <div class="card-body">
        <p>Current only support TRX</p>

        <p>
          <span
            v-if="isLoading"
            class="spinner-border"
          ></span>

          <span v-else> ≈ {{ Number(balanceUsd).toFixed(3) }} $ </span>
          <button
            type="button"
            class="btn btn-light btn-sm"
            @click="getBalance"
          >
            <i class="fas fa-sync"></i>
          </button>
        </p>

        <h3 class="m-0">
          <span
            v-if="isLoading"
            class="spinner-border"
          ></span>
          <span v-else>{{ Number(balance).toFixed(6) }} TRX</span>
        </h3>
      </div>
    </div>

    <div class="text-center">
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

      <a :href="tronScan + 'address/' + address" target="_blank">
        <button class="btn btn-info mb-2">
          <img src="/static/details.svg" width="18px" />
          Account Details
        </button>
      </a>

      <button
        class="btn btn-secondary mb-2"
        data-toggle="modal"
        data-target="#myModalPrivateKey"
      >
        <img src="/static/export.svg" width="18px" />
        Export Private Key
      </button>
    </div>

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
      address: localStorage.getItem("address"),
      balance: 0,
      balanceUsd: 0,
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
      this.getTrxPrice().then((response) => {
        // console.log(response);
        this.balanceUsd = Number(response.tron.usd) * this.balance;
      });
    },
  },
};
</script>

<style>
</style>