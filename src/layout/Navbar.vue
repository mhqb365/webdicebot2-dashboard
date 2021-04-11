<template>
  <div class="">
    <nav class="navbar navbar-expand-md bg-light navbar-light">
      <h2 class="text-primary"># Menu</h2>

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
              Getting Started
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/Register"
              v-bind:class="[this.$route.path == '/Register' ? 'active' : '']"
            >
              Register
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/Login"
              v-bind:class="[this.$route.path == '/Login' ? 'active' : '']"
            >
              Login
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
              Forgot Password
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
              Getting Started
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
              Bot Installer
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/MyWallet"
              v-bind:class="[this.$route.path == '/MyWallet' ? 'active' : '']"
            >
              My Wallet
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/MyLicense"
              v-bind:class="[this.$route.path == '/MyLicense' ? 'active' : '']"
            >
              My License
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/BuyLicense"
              v-bind:class="[this.$route.path == '/BuyLicense' ? 'active' : '']"
            >
              Buy License
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
              Script Store
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
              Change Password
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Logout"> Logout </a>
          </li>
        </ul>

        <ul v-if="isAdmin" class="navbar-nav mb-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="/Summary"
              v-bind:class="[this.$route.path == '/Summary' ? 'active' : '']"
            >
              Summary
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
              Add Free License
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/User"
              v-bind:class="[this.$route.path == '/User' ? 'active' : '']"
            >
              User List
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/License"
              v-bind:class="[this.$route.path == '/License' ? 'active' : '']"
            >
              License List
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>