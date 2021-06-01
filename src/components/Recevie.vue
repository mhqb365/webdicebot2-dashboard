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
          <p>Only send TRX to this address, 1 confirmation(s) required</p>

          <qrcode-vue
            class="my-4"
            :value="address"
            :size="120"
            level="H"
          ></qrcode-vue>

          <div class="input-group mb-3">
            <input v-model="address" type="text" class="form-control" />

            <div class="input-group-append">
              <button
                type="button"
                class="btn btn-primary"
                v-clipboard="() => address"
                v-clipboard:success="clipboardSuccess"
                v-clipboard:error="clipboardError"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      address: localStorage.getItem("address"),
    };
  },
};
</script>

<style>
</style>