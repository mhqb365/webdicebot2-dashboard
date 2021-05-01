<template>
  <div class="pb-5">
    <h2 class="text-primary">Share your script</h2>

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

    <p class="small text-warning">
      + Please share script clean and can working on Web DiceBot
    </p>

    <div class="form-group">
      <label>Language</label>
      <select class="form-control" v-model="data.type">
        <option>Lua</option>
        <option>Javascript</option>
      </select>
    </div>

    <div class="form-group">
      <label>Script name</label>
      <input type="text" class="form-control" v-model="data.name" />
    </div>

    <div class="form-group">
      <label>Content</label>
      <textarea class="form-control" rows="5" id="content"></textarea>
    </div>

    <button v-if="isLoading" class="btn btn-primary btn-block" disabled>
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button v-else class="btn btn-primary btn-block" @click="share">
      Share
    </button>
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
        type: "Lua",
        name: "",
        content: "",
        author: localStorage.getItem("userName"),
      },
    };
  },
  mounted: function () {
    this.simplemde = new SimpleMDE({
      element: document.getElementById("content"),
      toolbar: false,
    });
  },
  methods: {
    share: function () {
      this.isLoading = true;
      this.data.content = this.simplemde.value();

      axios({
        url: API_URL + "/script",
        method: "POST",
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