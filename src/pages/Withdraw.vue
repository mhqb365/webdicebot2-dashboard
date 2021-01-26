<template>
  <div>
    <h2 class="display-4 text-primary"># Withdraw</h2>

    <p>You have {{ Number(user.balance).toFixed(6) }} TRX</p>

    <div class="form-group">
      <label>Address</label>
      <input v-model="data.address" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Amount</label>
      <input v-model="data.amount" type="number" class="form-control" />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block mb-3" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block mb-3" @click="withdraw">
      Withdraw
    </button>

    <hr />

    <h2 class="display-4 text-primary"># Send to user</h2>

    <div class="form-group">
      <label>Username</label>
      <input v-model="dataTip.userName" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label>Amount</label>
      <input v-model="dataTip.amount" type="number" class="form-control" />
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block mb-3" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block mb-3" @click="tip">
      Send
    </button>

    <hr />

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
      You don’t have any withdraw yet
    </div>

    <div v-else class="table-responsive-sm">
      <div v-if="isLoading2" class="spinner-border text-muted"></div>

      <table v-else class="table table-bordered table-hover">
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
              (GMT)
            </td>
            <td>
              <a
                v-if="doc.txid.length == 64"
                :href="tronNode + doc.txid"
                target="_blank"
                >{{ doc.txid }}</a
              >
              <span v-else>send to {{ doc.txid }}</span>
            </td>
            <td>{{ doc.amount }} TRX</td>
          </tr>
        </tbody>
      </table>
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
      data: {
        address: "",
        amount: 0,
      },
      dataTip: {
        userName: "",
        amount: 0,
      },
      data: {
        address: "",
        amount: 0,
      },
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
    this.listWithdraw(this.page);
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
    withdraw: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/withdraw/request/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (!res.status) return this.showAlert(res.message, false);
        this.showAlert("Success");
        this.profile();
        this.listWithdraw(this.page);
      });
    },
    tip: function (page) {
      this.isLoading = true;
      axios({
        url: API_URL + "/withdraw/tip/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.dataTip,
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        console.log(res);
        if (!res.status) return this.showAlert(res.message, false);
        this.showAlert("Success");
        this.profile();
        this.listWithdraw(this.page);
      });
    },
    listWithdraw: function (page) {
      this.isLoading2 = true;
      axios({
        url:
          API_URL +
          "/withdraw/fetch/" +
          localStorage.getItem("userName") +
          "?page=" +
          page,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading2 = false;
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