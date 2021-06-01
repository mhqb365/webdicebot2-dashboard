<template>
  <div>
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

    <div class="pb-5">
      <h2 class="text-primary">Last 20 transactions</h2>

      <a
        :href="tronScan + '/address/' + address + '/transactions'"
        target="_blank"
        class="btn btn-primary mb-3"
      >
        See More
      </a>

      <div class="table-responsive-sm">
        <div class="card shadow-sm">
          <div class="card-body">
            <div v-if="isLoading2" class="spinner-border text-muted"></div>

            <table v-else class="table table-hover table-sm">
              <thead>
                <tr>
                  <!-- <th>Time</th> -->
                  <th>Hash</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="doc in docs"
                  :key="doc._id"
                  v-bind:class="[
                    doc.contractData.owner_address == address
                      ? 'text-danger'
                      : 'text-success',
                  ]"
                >
                  <!-- <td>
                    {{
                      new Date(doc.timestamp).toLocaleDateString("en-GB", {
                        timeZone: "UTC",
                      })
                    }}
                  </td> -->
                  <td>
                    <a
                      :href="tronScan + '/transaction/' + doc.hash"
                      target="_blank"
                    >
                      <!-- {{ doc.hash.slice(0, 8) + "...." + doc.hash.slice(-8) }} -->
                      {{ doc.hash }}
                    </a>
                  </td>
                  <td>
                    <span v-if="doc.confirmed" class="badge badge-success"
                      >CONFIRMED</span
                    >
                    <span
                      v-else
                      class="spinner-border spinner-border-sm text-muted"
                    ></span>
                  </td>
                  <td>
                    {{ doc.contractData.owner_address == address ? "-" : "+"
                    }}{{
                      Number(
                        tronWeb.fromSun(Number(doc.contractData.amount))
                      ).toLocaleString("en")
                    }}
                    TRX
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TRON_SCAN from "@/utils/tronScan";
import tronWeb from "@/utils/tronWeb";
import Recevie from "@/components/Recevie";
import Send from "@/components/Send";
import PrivateKey from "@/components/PrivateKey";
import TRON_API_LIST from "@/utils/tronApiList";
import axios from "axios";

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
      docs: [],
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
        this.getTransaction();
      });
    },
    getTransaction: function () {
      this.docs = [];
      this.isLoading2 = true;
      axios({
        url:
          TRON_API_LIST +
          "/transaction?sort=-timestamp&count=true&limit=20&start=0&address=" +
          this.address,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        this.isLoading2 = false;
        // console.log(response.data);
        response.data.data.map((res) => {
          // console.log(res);
          if (
            res.tokenInfo.tokenAbbr == "trx" &&
            Number(res.contractData.amount) > 1
          )
            this.docs.push(res);
        });
      });
    },
  },
};
</script>

<style>
</style>