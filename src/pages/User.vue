<template>
  <div>
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

    <div v-if="docs.length == 0" class="text-center">
      ¯\_(ツ)_/¯
      <br />
      You don’t have any licenses yet
    </div>

    <div v-else class="table-responsive-sm">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th></th>
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
            <td>{{ doc.userName }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="detail(doc.userName)"
                data-toggle="modal"
                data-target="#myModal"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">User detail</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item">Username: {{ modal.userName }}</li>
              <li class="list-group-item">Email: {{ modal.email }}</li>
              <li class="list-group-item">
                Deposit address: {{ modal.address }}
              </li>
              <li class="list-group-item">Balance: {{ modal.balance }}</li>
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

export default {
  data() {
    return {
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      modal: {
        userName: "",
        email: "",
        address: "",
        balance: 0,
      },
    };
  },
  mounted: function () {
    this.users(this.page);
  },
  methods: {
    users: function (page) {
      axios({
        url: API_URL + "/user?page=" + page,
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
    detail: function (userName) {
      axios({
        url: API_URL + "/user/profile/" + userName,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        let res = response.data;
        console.log(res);
        this.modal = res.data;
      });
    },
  },
};
</script>

<style>
</style>