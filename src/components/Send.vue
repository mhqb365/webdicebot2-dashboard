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
          <p>
            Transaction fee default by
            <a href="https://tron.network" target="_blank">Tron.network</a>
          </p>

          <div class="form-group text-left">
            <label>Address</label>
            <input v-model="address" type="text" class="form-control" />
          </div>

          <div class="form-group text-left">
            <label>Amount</label>
            <input v-model="amount" type="number" class="form-control" />
          </div>

          <button v-if="isLoading" class="btn btn-primary" disabled>
            <span class="spinner-border spinner-border-sm"></span>
          </button>

          <button
            v-else
            type="button"
            class="btn btn-primary btn-block"
            @click="send"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tronWeb from "@/utils/tronWeb";

export default {
  data() {
    return {
      isLoading: false,
      address: "",
      amount: 0,
    };
  },
  mounted: function () {
    tronWeb.setPrivateKey(localStorage.getItem("privateKey"));
  },
  methods: {
    send: async function () {
      this.isLoading = true;

      let dataTransaction = await tronWeb.trx.sendTransaction(
        this.address,
        tronWeb.toSun(Number(this.amount).toFixed(6))
      );

      this.isLoading = false;

      if (dataTransaction.result) {
        this.showAlert("Success");
        $("#myModalSend").modal("hide");
      } else this.showAlert("Fail, error by Tron.network", false);
    },
  },
};
</script>

<style>
</style>