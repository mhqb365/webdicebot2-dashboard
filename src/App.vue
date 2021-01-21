<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-3">
        <Left />
      </div>
      <div class="col-9">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Left from "@/layout/Left";

export default {
  name: "App",
  components: {
    Left,
  },
};
</script>

<style>
</style>