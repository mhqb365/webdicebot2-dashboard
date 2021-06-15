<template>
  <div class="pb-5">
    <h2 class="text-primary">My wallet</h2>

    <p class="small">
      + This is a Tron wallet, link Tron Ecosystem
      <br />
      + You can import it to any wallet app support Tron
    </p>

    <div class="card gradient-primary balance text-center mb-3">
      <div class="card-body">
        <p>Only support TRX</p>

        <h3 class="m-0 pb-3">
          <span v-if="isLoading" class="spinner-border"></span>
          <span v-else>{{ Number(balance).toFixed(6) }} TRX</span>
        </h3>

        <p class="mb-0 pb-0">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm"
          ></span>

          <span v-else>
            ≈
            {{
              Number(balanceUsd).toLocaleString("vi", {
                style: "currency",
                currency: "USD",
              })
            }}
          </span>
          <button
            type="button"
            class="btn btn-light btn-sm"
            @click="getBalance"
          >
            <i class="fas fa-sync"></i>
          </button>
        </p>
      </div>
    </div>

    <div class="text-center">
      <button
        class="btn btn-success mb-2"
        data-toggle="modal"
        data-target="#myModalRecevie"
      >
        <i class="fas fa-arrow-down"></i>
        Receive
      </button>

      <button
        class="btn btn-danger mb-2"
        data-toggle="modal"
        data-target="#myModalSend"
      >
        <i class="fas fa-arrow-up"></i>
        Send
      </button>

      <a
        :href="tronScan + '/address/' + address + '/transactions'"
        target="_blank"
        class="btn btn-info mb-2"
      >
        <i class="fas fa-info-circle"></i>
        Account Details
      </a>

      <button
        class="btn btn-secondary mb-2"
        data-toggle="modal"
        data-target="#myModalPrivateKey"
      >
        <i class="fas fa-file-export"></i>
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
      tronWeb,
      isLoading: false,
      isLoading2: false,
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