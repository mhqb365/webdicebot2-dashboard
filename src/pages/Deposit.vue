<template>
  <div>
    <div class="py-5">
      <h2 class="display-4 text-primary"># Deposit</h2>

      <p>You have {{ Number(user.balance).toFixed(6) }} TRX</p>

      <label>My deposit address</label>

      <b-input-group class="mb-3">
        <b-form-input v-model="user.address"></b-form-input>

        <b-input-group-append>
          <b-button
            variant="primary"
            v-clipboard="() => user.address"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
            >Copy</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </div>

    <div class="py-5">
      <h2 class="display-4 text-primary"># History</h2>

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

      <div v-if="docs.length == 0" class="text-center">
        ¯\_(ツ)_/¯
        <br />
        You don’t have any deposit yet
      </div>

      <div v-else class="table-responsive-sm">
        <table class="table table-bordered table-hover">
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
                (GMT+0)
              </td>
              <td>
                <a
                  v-if="doc.txid.length == 64"
                  :href="tronNode + doc.txid"
                  target="_blank"
                  >{{ doc.txid }}</a
                >
                <span v-else>receive from {{ doc.txid }}</span>
              </td>
              <td>{{ doc.amount }} TRX</td>
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
    listDeposit: function (page) {
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