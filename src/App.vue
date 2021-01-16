<template>
  <div id="app">
    <SiderBar />
    <b-container class="p-4">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import SiderBar from "@/components/SiderBar";

export default {
  name: "App",
  components: {
    SiderBar,
  },
};
</script>

<style>
</style>