<template>
  <div class="pb-4">
    <h2 class="text-primary">My wallet</h2>

    <p class="small">
      + This is a Tron wallet, link Tron Ecosystem
      <br />
      + You can import it to any wallet app support Tron
      <br />
      + Current only support TRX
    </p>

    <div class="row">
      <div class="col-md-12">
        <div
          class="
            card
            gradient-primary
            p-4
            text-center text-white
            border border-0
          "
        >
          <h4>
            <span v-if="isLoading" class="spinner-border"></span>

            <span v-else>
              {{ Number(balance).toFixed(6) }}
            </span>
            TRX
          </h4>

          <span
            >≈
            {{
              Number(balanceUsd).toLocaleString("vi", {
                style: "currency",
                currency: "USD",
              })
            }}
            <button
              type="button"
              class="btn btn-light btn-sm"
              @click="getAccount"
            >
              <i class="fas fa-sync"></i>
            </button>
          </span>

          <div class="row p-3 small">
            <div class="col-md-6">
              <i class="fas fa-tachometer-alt"></i>&nbsp; Bandwidth:
              {{ freeNetRemaining + netRemaining }}/<span class="small">{{
                freeNetLimit + netLimit
              }}</span>
            </div>
            <div class="col-md-6">
              <i class="fas fa-gas-pump"></i>&nbsp; Energy:
              {{ energyRemaining }}/<span class="small">{{ energyLimit }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 text-center control">
        <button
          class="btn btn-success mb-2 ml-1 mr-1 control-button shadow"
          data-toggle="modal"
          data-target="#myModalRecevie"
        >
          <i class="fas fa-arrow-down"></i>
          &nbsp; Receive
        </button>

        <button
          class="btn btn-danger mb-2 ml-1 mr-1 control-button shadow"
          data-toggle="modal"
          data-target="#myModalSend"
        >
          <i class="fas fa-arrow-up"></i>
          &nbsp; Send
        </button>

        <a
          :href="tronScan + '/address/' + address + '/transactions'"
          target="_blank"
          class="btn btn-info mb-2 ml-1 mr-1 control-button shadow"
        >
          <i class="fas fa-info-circle"></i>
          &nbsp; Details
        </a>

        <button
          class="btn btn-secondary mb-2 ml-1 mr-1 control-button shadow"
          data-toggle="modal"
          data-target="#myModalPrivateKey"
        >
          <i class="fas fa-file-export"></i>
          &nbsp; Export
        </button>
      </div>
    </div>

    <!-- Recevie -->
    <div class="modal fade" id="myModalRecevie">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Receive</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div class="modal-body">
            <p class="text-center">
              Only send TRX to this address, 1 confirmation(s) required
            </p>

            <qrcode-vue
              class="my-4 text-center"
              :value="address"
              :size="120"
              level="H"
            ></qrcode-vue>

            <label>Your address:</label>
            <div class="input-group mb-3">
              <input v-model="address" type="text" class="form-control" />

              <div class="input-group-append">
                <button
                  type="button"
                  class="btn btn-primary"
                  v-clipboard="() => address"
                  v-clipboard:success="clipboardSuccess"
                  v-clipboard:error="clipboardError"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Send -->
    <div class="modal fade" id="myModalSend">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Send</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div class="modal-body text-center">
            <div class="form-group text-left">
              <label>To address:</label>
              <input v-model="toAddress" type="text" class="form-control" />
            </div>

            <div class="form-group text-left">
              <label>Amount:</label>
              <input v-model="amount" type="number" class="form-control" />
            </div>

            <button v-if="isLoading2" class="btn btn-primary" disabled>
              <span class="spinner-border spinner-border-sm"></span>
            </button>

            <button
              v-else
              type="button"
              class="btn btn-primary btn-block"
              @click="send"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Export -->
    <div class="modal fade" id="myModalPrivateKey">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Export</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div class="modal-body">
            <label>Your private key:</label>

            <div class="input-group mb-3">
              <input v-model="privateKey" type="text" class="form-control" />

              <div class="input-group-append">
                <button
                  type="button"
                  class="btn btn-primary"
                  v-clipboard="() => privateKey"
                  v-clipboard:success="clipboardSuccess"
                  v-clipboard:error="clipboardError"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TRON_SCAN from "@/utils/tronScan";
import TRON_API from "@/utils/tronApi";
import tronWeb from "@/utils/tronWeb";
import QrcodeVue from "qrcode.vue";
import axios from "axios";

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      tronWeb,
      isLoading: false,
      isLoading2: false,
      address: localStorage.getItem("address"),
      privateKey: localStorage.getItem("privateKey"),
      balance: 0,
      balanceUsd: 0,
      tronScan: TRON_SCAN,
      freeNetLimit: 0,
      freeNetRemaining: 0,
      netLimit: 0,
      netRemaining: 0,
      energyLimit: 0,
      energyRemaining: 0,
      toAddress: "",
      amount: 0,
    };
  },
  mounted: function () {
    this.getAccount();
    tronWeb.setPrivateKey(this.privateKey);
  },
  methods: {
    getAccount: function () {
      this.isLoading = true;

      this.balanceUsd = 0;
      this.freeNetLimit = 0;
      this.netLimit = 0;
      this.freeNetRemaining = 0;
      this.netRemaining = 0;
      this.energyLimit = 0;
      this.energyRemaining = 0;

      axios({
        url: TRON_API + "/api/account?address=" + this.address,
        method: "GET",
      }).then((response) => {
        this.isLoading = false;
        let result = response.data;
        // console.log(result);
        this.balance = tronWeb.fromSun(result.balance);
        this.getTrxPrice().then((response) => {
          // console.log(response);
          this.balanceUsd = Number(response.tron.usd) * this.balance;
        });
        this.freeNetLimit = result.bandwidth.freeNetLimit;
        this.freeNetRemaining = result.bandwidth.freeNetRemaining;
        this.netLimit = result.bandwidth.netLimit;
        this.netRemaining = result.bandwidth.netRemaining;
        this.energyLimit = result.bandwidth.energyLimit;
        this.energyRemaining = result.bandwidth.energyRemaining;
      });
    },
    send: async function () {
      if (!this.toAddress) return this.showAlert("Wrong address", false);

      if (!this.amount || Number(this.amount) < 0)
        return this.showAlert("Wrong amount", false);

      this.isLoading2 = true;

      let dataTransaction = await tronWeb.trx.sendTransaction(
        this.toAddress,
        tronWeb.toSun(Number(this.amount).toFixed(6))
      );

      this.isLoading2 = false;

      if (dataTransaction.result) {
        this.showAlert("Success");
        $("#myModalSend").modal("hide");
        this.getAccount();
      } else this.showAlert("Fail, error by Tron.network", false);
    },
  },
};
</script>

<style>
.control {
  position: relative;
  top: -20px;
}

.control-button:hover {
  transform: scale(1.05);
}
</style>