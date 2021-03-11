<template>
  <div class="pb-5">
    <h2 class="text-primary"># Script store</h2>

    <p class="small text-warning">
      Test script with test coin before use with real coin
    </p>

    <p>Total: {{ totalDocs }} | Pages: {{ totalPages }}</p>

    <ul class="pagination">
      <li v-if="hasPrevPage" class="page-item">
        <button type="button" class="page-link" @click="fetchScript(page - 1)">
          Previous
        </button>
      </li>
      <li class="page-item active">
        <button type="button" class="page-link">{{ page }}</button>
      </li>
      <li v-if="hasNextPage" class="page-item">
        <button type="button" class="page-link" @click="fetchScript(page + 1)">
          Next
        </button>
      </li>
    </ul>

    <div v-if="isLoading" class="spinner-border text-muted"></div>

    <div v-else class="row">
      <div class="col-sm-12 mb-3" v-for="doc in docs" :key="doc._id">
        <div class="card p-2">
          <div class="clearfix">
            <span class="float-left">
              <b>
                <span class="badge badge-warning">{{ doc.type }}</span>
                <span class="text-primary">{{ doc.name }}</span>
                shared by
                <span class="text-primary">{{ doc.author }}</span>
              </b>
            </span>

            <span v-if="isAdmin" class="float-right">
              <button v-if="isLoading2" class="btn btn-primary" disabled>
                <span class="spinner-border spinner-border-sm"></span>
              </button>

              <button
                v-else
                type="button"
                class="btn btn-danger btn-sm"
                @click="deleteScript(doc._id)"
              >
                Delete
              </button>
            </span>
          </div>

          <hr />

          <div class="form-group">
            <textarea
              class="form-control"
              rows="5"
              v-model="doc.content"
            ></textarea>
          </div>

          <button
            type="button"
            class="btn btn-primary btn-block mb-3"
            v-clipboard="() => doc.content"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
          >
            Copy
          </button>
        </div>
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
    this.fetchScript(this.page);
  },
  methods: {
    fetchScript: function (page) {
      this.isLoading = true;
      axios({
        url: API_URL + "/script?page=" + page,
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
          this.isLoading2 = false;
          this.showAlert(error.response.data, false);
        });
    },
    deleteScript: function (id) {
      this.isLoading2 = true;
      axios({
        url: API_URL + "/script/" + id,
        method: "DELETE",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          let res = response.data;
          // console.log(res);
          this.showAlert(res);
          this.fetchScript(this.page);
        })
        .catch((error) => {
          this.isLoading2 = false;
          this.showAlert(error.response.data, false);
        });
    },
  },
};
</script>

<style>
</style>