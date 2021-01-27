<template>
  <div>
    <div class="pb-5">
      <h2 class="display-4 text-primary"># My license</h2>

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

        <table v-else class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Status</th>
              <th>License</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doc in docs" :key="doc._id">
              <td>
                {{
                  (Date.now() - new Date(doc.time)) / 864e5 > doc.limit
                    ? "Expired"
                    : doc.locked
                    ? "Locked"
                    : "Working"
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
                (GMT+0)
              </td>
              <td>
                {{
                  new Date(
                    Number(864e5 * doc.limit) + Number(new Date(doc.time))
                  ).toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                }}
                (GMT)
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