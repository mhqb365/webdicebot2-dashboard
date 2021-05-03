<template>
  <div class="pb-5">
    <h2 class="text-primary"># License list</h2>

    <p>Total: {{ totalDocs }} | Pages: {{ totalPages }}</p>

    <ul class="pagination">
      <li v-if="hasPrevPage" class="page-item">
        <button type="button" class="page-link" @click="licensesList(page - 1)">
          Previous
        </button>
      </li>
      <li class="page-item active">
        <button type="button" class="page-link">{{ page }}</button>
      </li>
      <li v-if="hasNextPage" class="page-item">
        <button type="button" class="page-link" @click="licensesList(page + 1)">
          Next
        </button>
      </li>
    </ul>

    <p class="small">
      <span>Dark</span>: Free license | <span class="text-success">Green</span>:
      Paid license | <span class="text-danger">Red</span>: Expired license |
      <span class="text-warning">Yellow</span>: Locked license
    </p>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search by username"
        v-model="keyword"
        @change="search()"
      />
      <div class="input-group-append">
        <button type="button" class="btn btn-secondary" @click="emptyKeyWord()">
          Clear
        </button>
      </div>
    </div>

    <div class="table-responsive-sm">
      <div v-if="isLoading" class="spinner-border text-muted"></div>

      <table v-else class="table table-bordered table-hover bg-white table-sm">
        <thead>
          <tr>
            <th>Time</th>
            <th>Username</th>
            <th>Limit</th>
            <th>Price</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="doc in docs"
            :key="doc._id"
            v-bind:class="[
              (Date.now() - new Date(doc.time)) / 864e5 > doc.limit
                ? 'text-danger'
                : doc.locked
                ? 'text-warning'
                : doc.type == 'Pay'
                ? 'text-success'
                : 'text-dark',
            ]"
          >
            <td>
              {{
                new Date(doc.time).toLocaleDateString("en-GB", {
                  timeZone: "UTC",
                })
              }}
            </td>
            <td>{{ doc.userName }}</td>
            <td>{{ doc.limit }}</td>
            <td>
              {{
                Number(doc.price) > 0
                  ? Number(doc.price).toFixed(6) + " TRX"
                  : "Free"
              }}
            </td>
            <td>
              <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" :value="doc.value" />
                <div class="input-group-append">
                  <button
                    type="button"
                    class="btn btn-primary"
                    v-clipboard="() => doc.value"
                    v-clipboard:success="clipboardSuccess"
                    v-clipboard:error="clipboardError"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </td>
            <td>
              <span v-if="isLoading2">
                <button class="btn btn-warning btn-sm" disabled>
                  <span class="spinner-border spinner-border-sm"></span>
                </button>
              </span>

              <span v-else>
                <button
                  v-if="doc.locked"
                  @click="action('unlock', doc._id)"
                  type="button"
                  class="btn btn-warning btn-sm"
                >
                  Unlock
                </button>
                <button
                  v-else
                  @click="action('lock', doc._id)"
                  type="button"
                  class="btn btn-warning btn-sm"
                >
                  Lock
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      keyword: "",
      isLoading: false,
      isLoading2: false,
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
    };
  },
  mounted: function () {
    this.licensesList(this.page);
  },
  methods: {
    licensesList: function (page) {
      this.isLoading = true;
      axios({
        url: API_URL + "/license/licenseList?page=" + page,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        this.docs = res.docs;
        this.page = res.page;
        this.totalDocs = res.totalDocs;
        this.totalPages = res.totalPages;
        this.hasPrevPage = res.hasPrevPage;
        this.hasNextPage = res.hasNextPage;
      });
    },
    action: function (action, license) {
      this.isLoading2 = true;
      axios({
        url: API_URL + "/license/" + action + "/" + license,
        method: "PUT",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading2 = false;
        let res = response.data;
        // console.log(res);
        this.licensesList(this.page);
      });
    },
    search: function () {
      if (this.keyword == "") return this.licensesList(this.page);
      this.isLoading = true;
      axios({
        url: API_URL + "/license/search/" + this.keyword,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          this.docs = res.docs;
        })
        .catch((error) => {
          this.isLoading = false;
          this.showAlert(error.response.data, false);
        });
    },
    emptyKeyWord: function () {
      this.keyword = "";
      this.licensesList(this.page);
    },
  },
};
</script>

<style>
</style>