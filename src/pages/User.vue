<template>
  <div class="pb-5">
    <h2 class="text-primary"># User list</h2>

    <p>Total: {{ totalDocs }} | Pages: {{ totalPages }}</p>

    <ul class="pagination">
      <li v-if="hasPrevPage" class="page-item">
        <button type="button" class="page-link" @click="userList(page - 1)">
          Previous
        </button>
      </li>
      <li class="page-item active">
        <button type="button" class="page-link">{{ page }}</button>
      </li>
      <li v-if="hasNextPage" class="page-item">
        <button type="button" class="page-link" @click="userList(page + 1)">
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
            <th>Username</th>
            <th>Action</th>
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
              <button
                type="button"
                class="btn btn-primary"
                @click="getProfile(doc.userName)"
                data-toggle="modal"
                data-target="#myModal"
              >
                Profile
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Profile</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div class="modal-body">
            <div v-if="isLoading2" class="spinner-border text-muted"></div>

            <ul v-else class="list-group">
              <li class="list-group-item">Username: {{ modal.userName }}</li>
              <li class="list-group-item">Email: {{ modal.email }}</li>
              <li class="list-group-item">
                Address:
                <a
                  :href="tronNode + 'address/' + modal.address"
                  target="_blank"
                >
                  {{ modal.address }}
                </a>
              </li>
              <li class="list-group-item">
                Balance:
                <span
                  v-if="isLoading3"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span v-else>{{ Number(modal.balance).toFixed(6) }}</span>
                TRX
                <img
                  class="ml-1"
                  type="button"
                  src="/static/refresh.svg"
                  width="18px"
                  @click="getBalance(modal.userName)"
                />
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
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
      isLoading3: false,
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      keyword: "",
      modal: {
        userName: "",
        email: "",
        address: "",
        balance: 0,
      },
      tronNode: TRON_NODE,
    };
  },
  mounted: function () {
    this.userList(this.page);
  },
  methods: {
    userList: function (page) {
      this.isLoading = true;
      axios({
        url: API_URL + "/user/userList?page=" + page,
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
    getProfile: function (userName) {
      this.isLoading2 = true;
      axios({
        url: API_URL + "/user/profile/" + userName,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading2 = false;
        let res = response.data;
        // console.log(res);
        this.modal = res;
        this.getBalance(this.modal.userName);
      });
    },
    getBalance: function (userName) {
      this.isLoading3 = true;
      axios({
        url: API_URL + "/wallet/balance/" + userName,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading3 = false;
          let res = response.data;
          // console.log(res);
          this.modal.balance = Number(res).toFixed(6);
        })
        .catch((error) => {
          console.log(error.response.data);
          window.location.href = "/Logout";
        });
    },
    search: function () {
      if (this.keyword == "") return this.userList(this.page);
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
        this.docs = res.docs;
      });
    },
    emptyKeyWord: function () {
      this.keyword = "";
      this.userList(this.page);
    },
  },
};
</script>

<style>
</style>