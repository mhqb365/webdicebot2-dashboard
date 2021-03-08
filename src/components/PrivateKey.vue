<template>
  <div class="modal fade" id="myModalPrivateKey">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Private key</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <div class="modal-body text-center">
          <div class="form-group">
            <input v-model="privateKey" type="text" class="form-control" />
          </div>

          <button
            type="button"
            class="btn btn-primary"
            v-clipboard="() => privateKey"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
          >
            Copy private key
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
      privateKey: localStorage.getItem("privateKey"),
    };
  },
};
</script>

<style>
</style>