<template>
  <div class="">
    <nav class="navbar navbar-expand-md bg-light navbar-light">
      <div class="navbar-brand">
        <div>
          TRX:
          {{ Number(trxPrice).toFixed(3) }} $
          <span
            v-bind:class="
              Number(percent_change_24h) >= 0 ? 'text-success' : 'text-danger'
            "
            >({{ percent_change_24h > 0 ? "+" : ""
            }}{{ Number(percent_change_24h).toFixed(2) }}%)</span
          >
        </div>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <i class="fas fa-bars"></i>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul v-if="!isLogin" class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
              v-bind:class="[this.$route.path == '/' ? 'active' : '']"
            >
              <i class="fas fa-bars"></i>
              &nbsp; Getting Started
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/Register"
              v-bind:class="[this.$route.path == '/Register' ? 'active' : '']"
            >
              <i class="fas fa-user-plus"></i>
              &nbsp; Register
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/Login"
              v-bind:class="[this.$route.path == '/Login' ? 'active' : '']"
            >
              <i class="fas fa-sign-in-alt"></i>
              &nbsp; Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/ForgotPassword"
              v-bind:class="[
                this.$route.path == '/ForgotPassword' ? 'active' : '',
              ]"
            >
              <i class="fas fa-lock"></i>
              &nbsp; Forgot Password
            </router-link>
          </li>
        </ul>

        <ul v-else class="navbar-nav mb-3">
          <li class="nav-item nav-link">
            <i class="fas fa-user"></i> &nbsp; {{ userName }}
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
              v-bind:class="[this.$route.path == '/' ? 'active' : '']"
            >
              <i class="fas fa-bars"></i>
              &nbsp; Getting Started
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/BotInstaller"
              v-bind:class="[
                this.$route.path == '/BotInstaller' ? 'active' : '',
              ]"
            >
              <i class="fas fa-robot"></i>
              &nbsp; Bot Installer
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/MyWallet"
              v-bind:class="[this.$route.path == '/MyWallet' ? 'active' : '']"
            >
              <i class="fas fa-wallet"></i>
              &nbsp; My Wallet
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/MyLicense"
              v-bind:class="[this.$route.path == '/MyLicense' ? 'active' : '']"
            >
              <i class="fas fa-key"></i>
              &nbsp; My License
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/BuyLicense"
              v-bind:class="[this.$route.path == '/BuyLicense' ? 'active' : '']"
            >
              <i class="fas fa-shopping-cart"></i>
              &nbsp; Buy License
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/ChangePassword"
              v-bind:class="[
                this.$route.path == '/ChangePassword' ? 'active' : '',
              ]"
            >
              <i class="fas fa-lock"></i>
              &nbsp; Change Password
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/Logout">
              <i class="fas fa-sign-out-alt"></i>
              &nbsp; Logout
            </router-link>
          </li>
        </ul>

        <ul v-if="isAdmin" class="navbar-nav mb-3">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/Summary"
              v-bind:class="[this.$route.path == '/Summary' ? 'active' : '']"
            >
              <i class="fas fa-chart-line"></i>
              &nbsp; Summary
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/User"
              v-bind:class="[this.$route.path == '/User' ? 'active' : '']"
            >
              <i class="fas fa-users"></i>
              &nbsp; User List
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/License"
              v-bind:class="[this.$route.path == '/License' ? 'active' : '']"
            >
              <i class="fas fa-th-list"></i>
              &nbsp; License List
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/AddFreeLicense"
              v-bind:class="[
                this.$route.path == '/AddFreeLicense' ? 'active' : '',
              ]"
            >
              <i class="fas fa-plus-square"></i>
              &nbsp; Add Free License
            </router-link>
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
      userName: localStorage.getItem("userName"),
    };
  },
  mounted: function () {
    this.updatePrice();
    setInterval(() => {
      this.updatePrice();
    }, 3e4);

    $(document).ready(() => {
      $(".nav-item").click(() => $(".navbar-collapse").collapse("hide"));
    });
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
</style>