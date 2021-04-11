<template>
  <div class="pb-5">
    <h2 class="text-primary">Edit script</h2>

    <button
      type="button"
      class="btn btn-secondary mb-3"
      @click="
        $router.push({
          name: 'ScriptStore',
        })
      "
    >
      Cancel
    </button>

    <div class="form-group">
      <label>Content</label>
      <textarea class="form-control" rows="5" id="content"></textarea>
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block" @click="save">Save</button>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      isLoading: false,
      simplemde: "",
      data: {
        content: "",
      },
    };
  },
  mounted: function () {
    this.simplemde = new SimpleMDE({
      element: document.getElementById("content"),
      toolbar: false,
    });
    this.loadScript();
    // console.log()
  },
  methods: {
    loadScript: function () {
      this.isLoading = true;

      axios({
        url: API_URL + "/script/" + this.$route.params.id,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          // console.log(res);
          this.simplemde.value(res.content);
        })
        .catch((error) => {
          this.isLoading2 = false;
          this.showAlert(error.response.data, false);
        });
    },
    save: function () {
      this.isLoading = true;
      this.data.content = this.simplemde.value();

      axios({
        url: API_URL + "/script/" + this.$route.params.id,
        method: "PUT",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: this.data,
      })
        .then((response) => {
          this.isLoading = false;
          let res = response.data;
          this.showAlert(res);
          setTimeout(() => (window.location.href = "/ScriptStore"), 1e3);
        })
        .catch((error) => {
          this.isLoading = false;
          this.showAlert(error.response.data, false);
        });
    },
  },
};
</script>

<style>
</style>