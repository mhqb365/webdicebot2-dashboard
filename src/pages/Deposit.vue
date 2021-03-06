<template>
  <div>
    <div class="pb-5">
      <h2 class="text-primary"># Deposit</h2>

      <p>
        You have
        <span
          v-if="isLoading2"
          class="spinner-border spinner-border-sm"
        ></span>
        <span v-else>{{ Number(user.balance).toFixed(6) }}</span>
        TRX
      </p>

      <label>My deposit address</label>

      <div class="input-group">
        <input type="text" class="form-control" v-model="user.address" />
        <div class="input-group-append">
          <button
            class="btn btn-primary btn-block"
            v-clipboard="() => user.address"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
          >
            Copy
          </button>
        </div>
      </div>
    </div>

    <div class="pb-5">
      <h2 class="text-primary"># History</h2>

      <p>Total: {{ totalDocs }} | Pages: {{ totalPages }}</p>

      <ul class="pagination">
        <li v-if="hasPrevPage" class="page-item">
          <button type="button" class="page-link" @click="license(page - 1)">
            Previous
          </button>
        </li>
        <li class="page-item active">
          <button type="button" class="page-link">{{ page }}</button>
        </li>
        <li v-if="hasNextPage" class="page-item">
          <button type="button" class="page-link" @click="license(page + 1)">
            Next
          </button>
        </li>
      </ul>

      <div class="table-responsive-sm">
        <div v-if="isLoading" class="spinner-border text-muted"></div>

        <table v-else class="table table-bordered table-hover bg-white">
          <thead>
            <tr>
              <th>Time</th>
              <th>Txid</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doc in docs" :key="doc._id">
              <td>
                {{
                  new Date(doc.time).toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                }}
              </td>
              <td>
                <a
                  v-if="doc.txid.length == 64"
                  :href="tronNode + doc.txid"
                  target="_blank"
                  >{{ doc.txid.slice(0, 5) }}...{{ doc.txid.slice(-5) }}</a
                >
                <span v-else>Receive from {{ doc.txid }}</span>
              </td>
              <td>+{{ Number(doc.amount).toFixed(6) }} TRX</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";
import TRON_NODE from "@/utils/tronNode";

export default {
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      user: {},
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      tronNode: TRON_NODE,
    };
  },
  mounted: function () {
    this.profile();
    this.listDeposit(this.page);
  },
  methods: {
    profile: function () {
      this.isLoading2 = true;
      axios({
        url: API_URL + "/user/profile/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading2 = false;
        let res = response.data;
        // console.log(res);
        this.user = res.data;
      });
    },
    listDeposit: function (page) {
      this.isLoading = true;
      axios({
        url:
          API_URL +
          "/deposit/fetch/" +
          localStorage.getItem("userName") +
          "?page=" +
          page,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        this.docs = res.data.docs;
        this.page = res.data.page;
        this.totalDocs = res.data.totalDocs;
        this.totalPages = res.data.totalPages;
        this.hasPrevPage = res.data.hasPrevPage;
        this.hasNextPage = res.data.hasNextPage;
      });
    },
  },
};
</script>

<style>
</style>