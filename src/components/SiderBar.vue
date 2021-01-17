<template>
  <div>
    <b-button
      class="assitant"
      variant="primary"
      v-b-toggle.sidebar-1
      v-b-tooltip.hover
      title="Menu"
    >
      <b-icon-list-task></b-icon-list-task>
    </b-button>

    <b-sidebar id="sidebar-1" title="Menu" backdrop shadow>
      <div v-if="!isLogin" class="px-3 py-2">
        <b-list-group>
          <b-list-group-item>
            <router-link to="/">Getting Started</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/Register">Register</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/Login">Login</router-link>
          </b-list-group-item>
        </b-list-group>
      </div>

      <div v-else class="px-3 py-2">
        <b-list-group>
          <b-list-group-item>
            <router-link to="/">Getting Started</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/BotInstaller">Bot Installer</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/MyInfo">My Info</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/MyLicense">My License</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/BuyLicense">Buy License</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/Deposit">Deposit</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/Withdraw">Withdraw</router-link>
          </b-list-group-item>

          <b-list-group-item v-if="isAdmin">
            <router-link to="/Summary">Summary</router-link>
          </b-list-group-item>

          <b-list-group-item v-if="isAdmin">
            <router-link to="/AddFree">AddFree</router-link>
          </b-list-group-item>

          <b-list-group-item>
            <router-link to="/Logout">Logout</router-link>
          </b-list-group-item>
        </b-list-group>
      </div>

      <span class="p-4">
        Web DiceBot &copy; 2019 - {{ new Date().getFullYear() }}
      </span>
    </b-sidebar>
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
.assitant {
  position: fixed;
  bottom: 50%;
  right: 1.5rem;
  z-index: 9999;
}

.assitant > img {
  width: 64px;
  height: 64px;
  cursor: pointer;
}
</style>