<template>
  <div>
    <ul class="list-group mb-3">
      <li class="list-group-item">
        TRX:
        {{ Number(trxPrice).toFixed(3) }} $
        <span
          v-bind:class="
            Number(percent_change_24h) >= 0 ? 'text-success' : 'text-danger'
          "
          >({{ percent_change_24h > 0 ? "+" : ""
          }}{{ Number(percent_change_24h).toFixed(2) }}%)</span
        >
      </li>
    </ul>

    <div v-if="!isLogin">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/">
            <i class="fas fa-bars"></i>
            &nbsp; Getting Started
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Register' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/Register">
            <i class="fas fa-user-plus"></i>
            &nbsp; Register
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Login' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/Login">
            <i class="fas fa-sign-in-alt"></i>
            &nbsp; Login
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ForgotPassword'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <router-link to="/ForgotPassword">
            <i class="fas fa-lock"></i>
            &nbsp; Forgot Password
          </router-link>
        </li>
      </ul>
    </div>

    <div v-else>
      <ul class="list-group mb-3">
        <li class="list-group-item text-primary">
          <i class="fas fa-user"></i> &nbsp; {{ userName }}
        </li>
      </ul>

      <ul class="list-group mb-3">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/">
            <i class="fas fa-bars"></i>
            &nbsp; Getting Started
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/BotInstaller'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <router-link to="/BotInstaller">
            <i class="fas fa-robot"></i>
            &nbsp; Bot Installer
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/MyWallet' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/MyWallet">
            <i class="fas fa-wallet"></i>
            &nbsp; My Wallet
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/MyLicense' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/MyLicense">
            <i class="fas fa-key"></i>
            &nbsp; My License
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/BuyLicense' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/BuyLicense">
            <i class="fas fa-shopping-cart"></i>
            &nbsp; Buy License
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ChangePassword'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <router-link to="/ChangePassword">
            <i class="fas fa-lock"></i>
            &nbsp; Change Password
          </router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/Logout">
            <i class="fas fa-sign-out-alt"></i>
            &nbsp; Logout
          </router-link>
        </li>
      </ul>

      <ul v-if="isAdmin" class="list-group mb-3">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Summary' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/Summary">
            <i class="fas fa-user-shield"></i>
            &nbsp; Summary
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/User' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/User">
            <i class="fas fa-users"></i>
            &nbsp; User List
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/License' ? 'custom-active list-link' : '',
          ]"
        >
          <router-link to="/License">
            <i class="fas fa-th-list"></i>
            &nbsp; License List
          </router-link>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/AddFreeLicense'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <router-link to="/AddFreeLicense">
            <i class="fas fa-plus-square"></i>
            &nbsp; Add Free License
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trxPrice: 0,
      percent_change_24h: 0,
      userName: localStorage.getItem("userName"),
    };
  },
  mounted: function () {
    this.updatePrice();
    setInterval(() => {
      this.updatePrice();
    }, 3e4);
  },
  methods: {
    updatePrice: function () {
      this.getTrxPrice().then((response) => {
        // console.log(response);
        this.trxPrice = Number(response.tron.usd);
        this.percent_change_24h = Number(response.tron.usd_24h_change);
      });
    },
  },
};
</script>

<style>
.list-group-item > a {
  text-decoration: none;
}

.list-link > a {
  font-weight: bolder;
}

.custom-active {
  border-left: 5px solid #007bff;
}
</style>