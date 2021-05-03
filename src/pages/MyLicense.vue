<template>
  <div>
    <div class="pb-5">
      <h2 class="text-primary">Summary</h2>

      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card p-4">
            Total license
            <br />
            <h4 class="text-primary">
              <div v-if="isLoading2" class="spinner-border text-muted"></div>
              <span v-else> {{ total }}</span>
            </h4>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card p-4">
            Spend
            <br />
            <h4 class="text-success">
              <div v-if="isLoading2" class="spinner-border text-muted"></div>
              <span v-else> {{ Number(spendTrx).toFixed(6) }} TRX</span>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class="pb-5">
      <h2 class="text-primary">My license</h2>

      <p>Total: {{ totalDocs }} | Pages: {{ totalPages }}</p>

      <ul class="pagination">
        <li v-if="hasPrevPage" class="page-item">
          <button type="button" class="page-link" @click="myLicense(page - 1)">
            Previous
          </button>
        </li>
        <li class="page-item active">
          <button type="button" class="page-link">{{ page }}</button>
        </li>
        <li v-if="hasNextPage" class="page-item">
          <button type="button" class="page-link" @click="myLicense(page + 1)">
            Next
          </button>
        </li>
      </ul>

      <p class="small">
        <span>Dark</span>: Free license |
        <span class="text-success">Green</span>: Paid license |
        <span class="text-danger">Red</span>: Expired license |
        <span class="text-warning">Yellow</span>: Locked license
      </p>

      <div class="table-responsive-sm">
        <div v-if="isLoading" class="spinner-border text-muted"></div>

        <table
          v-else
          class="table table-bordered table-hover bg-white table-sm rounded"
        >
          <thead>
            <tr>
              <th>Price</th>
              <th>License</th>
              <th>Begin</th>
              <th>End</th>
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
                      class="btn btn-primary btn-sm"
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
                {{
                  new Date(doc.time).toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                }}
              </td>
              <td>
                {{
                  new Date(
                    Number(864e5 * doc.limit) + Number(new Date(doc.time))
                  ).toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                }}
              </td>
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
      isLoading2: false,
      total: 0,
      spendTrx: 0,
    };
  },
  mounted: function () {
    this.myLicense(this.page);
    this.getSummary();
  },
  methods: {
    myLicense: function (page) {
      this.isLoading = true;
      axios({
        url:
          API_URL +
          "/license/myLicense/" +
          localStorage.getItem("userName") +
          "?page=" +
          page,
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
          this.page = res.page;
          this.totalDocs = res.totalDocs;
          this.totalPages = res.totalPages;
          this.hasPrevPage = res.hasPrevPage;
          this.hasNextPage = res.hasNextPage;
        })
        .catch((error) => {
          this.isLoading = false;
          this.showAlert(error.response.data, false);
          window.location.href = "/Logout";
        });
    },
    getSummary: function () {
      this.isLoading2 = true;
      axios({
        url: API_URL + "/license/mySummary/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading2 = false;
          let res = response.data;
          // console.log(res);
          res.map((r) => {
            this.total++;
            this.spendTrx += r.price;
          });
        })
        .catch((error) => {
          this.isLoading2 = false;
          this.showAlert(error.response.data, false);
          window.location.href = "/Logout";
        });
    },
  },
};
</script>

<style>
</style>