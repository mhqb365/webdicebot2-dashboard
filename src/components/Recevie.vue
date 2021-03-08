<template>
  <div class="modal fade" id="myModalRecevie">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Receive</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <div class="modal-body text-center">
          <p>Current only support TRX</p>

          <div class="form-group">
            <input v-model="address" type="text" class="form-control" />
          </div>

          <button
            type="button"
            class="btn btn-primary"
            v-clipboard="() => address"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
          >
            Copy address
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: localStorage.getItem("address"),
    };
  },
};
</script>

<style>
</style>