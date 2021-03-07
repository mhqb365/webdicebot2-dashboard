<template>
  <div class="pb-5">
    <h2 class="text-primary"># My license</h2>

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

    <p class="small">
      <span class="text-success">Green color</span>: Paid and Working.
      <span class="text-danger">Red color</span>: Expired.
      <span class="text-warning">Yellow color</span>: Locked.
      <span class="text-dark">Black color</span>: Free
    </p>

    <div class="table-responsive-sm">
      <div v-if="isLoading" class="spinner-border text-muted"></div>

      <table v-else class="table table-bordered table-hover bg-white">
        <thead>
          <tr>
            <th>Price</th>
            <th>License</th>
            <th>Start</th>
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
              <div class="input-group mb-3">
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
    };
  },
  mounted: function () {
    this.license(this.page);
  },
  methods: {
    license: function (page) {
      this.isLoading = true;
      axios({
        url:
          API_URL +
          "/license/fetch/" +
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