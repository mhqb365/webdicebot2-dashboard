<template>
  <div class="">
    <h2 class="display-4 text-primary"># Menu</h2>

    <div v-if="!isLogin">
      <ul class="list-group">
        <li class="list-group-item">
          <router-link to="/">Getting Started</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/Register">Register</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/Login">Login</router-link>
        </li>
      </ul>
    </div>

    <div v-else>
      <ul class="list-group mb-3">
        <li class="list-group-item">
          <router-link to="/">Getting Started</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/BotInstaller">Bot Installer</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/MyInfo">My Info</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/MyLicense">My License</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/BuyLicense">Buy License</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/Deposit">Deposit</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/Withdraw">Withdraw</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/Logout">Logout</router-link>
        </li>
      </ul>

      <ul class="list-group mb-3">
        <li class="list-group-item">
          <router-link to="/Summary">Summary</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/AddFreeLicense">Add Free License</router-link>
        </li>
      </ul>
    </div>

    <span>Web DiceBot &copy; 2019 - {{ new Date().getFullYear() }} </span>
  </div>
</template>

<script>
export default {
  mounted: function () {
    if (this.isLogin) this.checkDeposit();
  },
};
</script>

<style>
</style>