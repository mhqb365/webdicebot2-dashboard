<template>
  <div class="">
    <nav class="navbar navbar-expand-md bg-light navbar-light">
      <h2 class="text-primary">Menu</h2>

      <div class="alert alert-info">
        <a href="https://coinmarketcap.com/currencies/tron/" target="_blank">
          TRX ≈ {{ Number(trxPrice).toFixed(3) }}$ ({{
            Number(percent_change_24h).toFixed(2)
          }}%)
        </a>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul v-if="!isLogin" class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link"
              href="/"
              v-bind:class="[this.$route.path == '/' ? 'active' : '']"
            >
              <i class="fas fa-bars"></i>
              &nbsp; Getting Started
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/Register"
              v-bind:class="[this.$route.path == '/Register' ? 'active' : '']"
            >
              <i class="fas fa-user-plus"></i>
              &nbsp; Register
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/Login"
              v-bind:class="[this.$route.path == '/Login' ? 'active' : '']"
            >
              <i class="fas fa-sign-in-alt"></i>
              &nbsp; Login
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/ForgotPassword"
              v-bind:class="[
                this.$route.path == '/ForgotPassword' ? 'active' : '',
              ]"
            >
              <i class="fas fa-lock"></i>
              &nbsp; Forgot Password
            </a>
          </li>
        </ul>

        <ul v-else class="navbar-nav mb-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="/"
              v-bind:class="[this.$route.path == '/' ? 'active' : '']"
            >
              <i class="fas fa-bars"></i>
              &nbsp; Getting Started
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/BotInstaller"
              v-bind:class="[
                this.$route.path == '/BotInstaller' ? 'active' : '',
              ]"
            >
              <i class="fas fa-robot"></i>
              &nbsp; Bot Installer
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/MyWallet"
              v-bind:class="[this.$route.path == '/MyWallet' ? 'active' : '']"
            >
              <i class="fas fa-wallet"></i>
              &nbsp; My Wallet
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/MyLicense"
              v-bind:class="[this.$route.path == '/MyLicense' ? 'active' : '']"
            >
              <i class="fas fa-user"></i>
              &nbsp; My License
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/BuyLicense"
              v-bind:class="[this.$route.path == '/BuyLicense' ? 'active' : '']"
            >
              <i class="fas fa-shopping-cart"></i>
              &nbsp; Buy License
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/ScriptStore"
              v-bind:class="[
                this.$route.path == '/ScriptStore' ? 'active' : '',
              ]"
            >
              <i class="fas fa-store"></i>
              &nbsp; Script Store
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/ChangePassword"
              v-bind:class="[
                this.$route.path == '/ChangePassword' ? 'active' : '',
              ]"
            >
              <i class="fas fa-lock"></i>
              &nbsp; Change Password
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Logout">
              <i class="fas fa-sign-out-alt"></i>
              &nbsp; Logout
            </a>
          </li>
        </ul>

        <ul v-if="isAdmin" class="navbar-nav mb-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="/Summary"
              v-bind:class="[this.$route.path == '/Summary' ? 'active' : '']"
            >
              <i class="fas fa-user-shield"></i>
              &nbsp; Summary
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/AddFreeLicense"
              v-bind:class="[
                this.$route.path == '/AddFreeLicense' ? 'active' : '',
              ]"
            >
              <i class="fas fa-plus-square"></i>
              &nbsp; Add Free License
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/User"
              v-bind:class="[this.$route.path == '/User' ? 'active' : '']"
            >
              <i class="fas fa-users"></i>
              &nbsp; User List
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/License"
              v-bind:class="[this.$route.path == '/License' ? 'active' : '']"
            >
              <i class="fas fa-th-list"></i>
              &nbsp; License List
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trxPrice: 0,
      percent_change_24h: 0,
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
        this.trxPrice = Number(response.price_in_usd);
        this.percent_change_24h = Number(response.percent_change_24h);
      });
    },
  },
};
</script>

<style>
</style>