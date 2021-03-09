<template>
  <div class="modal fade" id="myModalSend">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Send</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <div class="modal-body text-center">
          <p>Current only support TRX</p>

          <div class="form-group text-left">
            <label>Address</label>
            <input v-model="data.address" type="text" class="form-control" />
          </div>

          <div class="form-group text-left">
            <label>Amount</label>
            <input v-model="data.amount" type="number" class="form-control" />
          </div>

          <button type="button" class="btn btn-primary" @click="send">
            Send
          </button>

          <p class="small pt-4">
            Transaction fee default by
            <a href="https://tron.network" target="_blank">Tron.network</a>
          </p>
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
      data: {
        address: "",
        amount: 0,
      },
    };
  },
  methods: {
    send: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/wallet/send/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          this.showAlert(res);
          // window.location.href = "/MyLicense";
          $("#myModalSend").modal("hide");
        })
        .catch((error) => {
          this.isLoading = false;
          // console.error(error.response.data);
          this.showAlert(error.response.data, false);
        });
    },
  },
};
</script>

<style>
</style>