<template>
  <div>
    <div class="pb-5">
      <h2 class="display-4 text-primary"># Hi-Lo game</h2>

      <div class="table-responsive-sm">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Bets</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ statitic.bets }}</td>
              <td>{{ statitic.wins }}</td>
              <td>{{ statitic.losses }}</td>
              <td>{{ statitic.profit }} TRX</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        You have
        <span v-if="isLoading3" class="spinner-border spinner-border-sm"></span>
        <span v-else>{{ Number(user.balance).toFixed(6) }}</span>
        TRX
      </p>

      <div class="form-group">
        <label>Bet amount</label>
        <input v-model="betAmount" type="number" class="form-control" />
      </div>

      <div v-if="isLoading" class="text-center">
        <button class="btn btn-success btn-lg m-2" disabled>
          <span class="spinner-border spinner-border-sm"></span>
        </button>

        <button class="btn btn-danger btn-lg m-2" disabled>
          <span class="spinner-border spinner-border-sm"></span>
        </button>
      </div>

      <div v-else class="text-center">
        <button
          type="button"
          class="btn btn-success btn-lg m-2"
          @click="roll('Hi')"
        >
          Bet Hi
        </button>
        <button
          type="button"
          class="btn btn-danger btn-lg m-2"
          @click="roll('Lo')"
        >
          Bet Lo
        </button>
      </div>
    </div>

    <div class="pb-5">
      <div class="table-responsive-sm">
        <div v-if="isLoading2" class="spinner-border text-muted"></div>

        <table v-else class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Time</th>
              <th>Username</th>
              <th>Target</th>
              <th>Result</th>
              <th>Amount</th>
              <th>Profit</th>
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
              <td>{{ doc.direction }}</td>
              <td>{{ doc.result }}</td>
              <td>{{ doc.betAmount }} TRX</td>
              <td>{{ doc.profit }} TRX</td>
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
      isLoading2: false,
      isLoading3: false,
      betAmount: 1,
      user: {},
      statitic: {},
      docs: [],
    };
  },
  mounted: function () {
    this.profile();
  },
  methods: {
    profile: function () {
      this.isLoading3 = true;
      axios({
        url: API_URL + "/user/profile/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading3 = false;
        let res = response.data;
        // console.log(res);
        this.user = res.data;
        this.loadStatitic();
      });
    },
    loadStatitic: function () {
      axios({
        url: API_URL + "/hilo/statitic/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        let res = response.data;
        // console.log(res);
        this.statitic = res.data;
        this.loadBetLog();
      });
    },
    loadBetLog: function () {
      this.isLoading2 = true;
      axios({
        url: API_URL + "/hilo/betLog?page=1",
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading2 = false;
        let res = response.data;
        // console.log(res);
        this.docs = res.data.docs;
      });
    },
    roll: function (direction) {
      this.isLoading = true;
      axios({
        url: API_URL + "/hilo/roll/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: {
          betAmount: this.betAmount,
          direction,
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        this.profile();
      });
    },
  },
};
</script>

<style>
</style>