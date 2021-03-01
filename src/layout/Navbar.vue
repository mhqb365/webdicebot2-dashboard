<template>
  <div class="">
    <nav class="navbar navbar-expand-md bg-light navbar-light">
      <!-- Brand -->
      <!-- <a class="navbar-brand" href="#"># Menu</router-link> -->
      <h2 class="display-4 text-primary"># Menu</h2>

      <!-- Toggler/collapsibe Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul v-if="!isLogin" class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Getting Started</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Token">Token</router-link>
          <span class="badge badge-danger">On comming</span>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Register">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Login">Login</router-link>
          </li>
        </ul>

        <ul v-else class="navbar-nav mb-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Getting Started</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Token">Token</router-link>
          <span class="badge badge-danger">On comming</span>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/BotInstaller">Bot Installer</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/MyInfo">My Info</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/MyLicense">My License</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/BuyLicense">Buy License</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Deposit">Deposit</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Withdraw">Withdraw</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ScriptStore">Script Store</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ShareYourScript">Share Your Script</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Logout">Logout</router-link>
          </li>
        </ul>

        <ul v-if="isAdmin" class="navbar-nav mb-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/Summary">Summary</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddFreeLicense">Add Free License</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/User">User List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/License">License List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/DepositList">Deposit List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/WithdrawList">Withdraw List</router-link>
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