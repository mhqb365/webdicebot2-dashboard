<template>
  <div class="">
    <!-- <h2 class="text-primary">Menu</h2> -->

    <div
      class="alert mb-3 shadow-sm"
      v-bind:class="
        Number(percent_change_24h) >= 0 ? 'alert-success' : 'alert-danger'
      "
    >
      1 TRX ≈ {{ Number(trxPrice).toFixed(3) }} $ ({{
        Number(percent_change_24h).toFixed(2)
      }}%)
    </div>

    <div v-if="!isLogin">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/">
            <i class="fas fa-bars"></i>
            &nbsp; Getting Started
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Register' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/Register">
            <i class="fas fa-user-plus"></i>
            &nbsp; Register
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Login' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/Login">
            <i class="fas fa-sign-in-alt"></i>
            &nbsp; Login
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ForgotPassword'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <a href="/ForgotPassword">
            <i class="fas fa-lock"></i>
            &nbsp; Forgot Password
          </a>
        </li>
      </ul>
    </div>

    <div v-else>
      <ul class="list-group mb-3">
        <li class="list-group-item text-primary">
          <i class="fas fa-user"></i> &nbsp; {{ userName }}
        </li>
        <li class="list-group-item text-primary">
          <i class="fas fa-envelope"></i> &nbsp; {{ email }}
        </li>
      </ul>

      <ul class="list-group mb-3">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/">
            <i class="fas fa-bars"></i>
            &nbsp; Getting Started
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/BotInstaller'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <a href="/BotInstaller">
            <i class="fas fa-robot"></i>
            &nbsp; Bot Installer
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/MyWallet' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/MyWallet">
            <i class="fas fa-wallet"></i>
            &nbsp; My Wallet
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/MyLicense' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/MyLicense">
            <i class="fas fa-key"></i>
            &nbsp; My License
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/BuyLicense' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/BuyLicense">
            <i class="fas fa-shopping-cart"></i>
            &nbsp; Buy License
          </a>
        </li>
        <!-- <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/RockPaperScissors'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <a href="/RockPaperScissors">
          <i class="fas fa-hand-rock"></i>
            &nbsp; Rock Paper Scissors
          </a>
        </li> -->
        <!-- <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ScriptStore'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <a href="/ScriptStore">
            <i class="fas fa-store"></i>
            &nbsp; Script Store
          </a>
        </li> -->
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ChangePassword'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <a href="/ChangePassword">
            <i class="fas fa-lock"></i>
            &nbsp; Change Password
          </a>
        </li>
        <li class="list-group-item">
          <a href="/Logout">
            <i class="fas fa-sign-out-alt"></i>
            &nbsp; Logout
          </a>
        </li>
      </ul>

      <ul v-if="isAdmin" class="list-group mb-3">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Summary' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/Summary">
            <i class="fas fa-user-shield"></i>
            &nbsp; Summary
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/AddFreeLicense'
              ? 'custom-active list-link'
              : '',
          ]"
        >
          <a href="/AddFreeLicense">
            <i class="fas fa-plus-square"></i>
            &nbsp; Add Free License
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/User' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/User">
            <i class="fas fa-users"></i>
            &nbsp; User List
          </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/License' ? 'custom-active list-link' : '',
          ]"
        >
          <a href="/License">
            <i class="fas fa-th-list"></i>
            &nbsp; License List
          </a>
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
      email: localStorage.getItem("email"),
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