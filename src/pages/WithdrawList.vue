<template>
  <div class="pb-5">
    <h2 class="text-primary"># Withdraw list</h2>

    <p>Total: {{ totalDocs }} | Pages: {{ totalPages }}</p>

    <ul class="pagination">
      <li v-if="hasPrevPage" class="page-item">
        <button type="button" class="page-link" @click="withdrawList(page - 1)">
          Previous
        </button>
      </li>
      <li class="page-item active">
        <button type="button" class="page-link">{{ page }}</button>
      </li>
      <li v-if="hasNextPage" class="page-item">
        <button type="button" class="page-link" @click="withdrawList(page + 1)">
          Next
        </button>
      </li>
    </ul>

    <div class="table-responsive-sm">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by username"
          v-model="keyword"
          @change="search()"
        />
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-secondary"
            @click="emptyKeyWord()"
          >
            Clear
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="spinner-border text-muted"></div>

      <table v-else class="table table-bordered table-hover bg-white">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
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
            <td>{{ doc.userName }}</td>
            <td>
              <a
                v-if="doc.txid.length == 64"
                :href="tronNode + doc.txid"
                target="_blank"
                >{{ doc.txid.slice(0, 5) }}...{{ doc.txid.slice(-5) }}</a
              >
              <span v-else>Send to {{ doc.txid }}</span>
            </td>
            <td>-{{ Number(doc.amount).toFixed(6) }} TRX</td>
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
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      tronNode: TRON_NODE,
      keyword: "",
    };
  },
  mounted: function () {
    this.withdrawList(this.page);
  },
  methods: {
    withdrawList: function (page) {
      this.isLoading = true;
      axios({
        url: API_URL + "/withdraw/fetchAdmin/?page=" + page,
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
    search: function (page) {
      if (this.keyword == "") return this.users(this.page);
      this.isLoading = true;
      axios({
        url: API_URL + "/user/search/" + this.keyword + "?&page=1",
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        this.docs = res.data.docs;
      });
    },
    emptyKeyWord: function () {
      this.keyword = "";
      this.users(this.page);
    },
  },
};
</script>

<style>
</style>