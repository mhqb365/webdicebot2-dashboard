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
            <a class="nav-link" href="/"> Getting Started </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Token"> Token </a>
            <span class="badge badge-danger"> On comming </span>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Register"> Register </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Login"> Login </a>
          </li>
        </ul>

        <ul v-else class="navbar-nav mb-3">
          <li class="nav-item">
            <a class="nav-link" href="/"> Getting Started </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Token"> Token </a>
            <span class="badge badge-danger"> On comming </span>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/BotInstaller"> Bot Installer </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/MyWallet">
              My Wallet
              <span class="badge badge-success"> DeFi </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/MyLicense"> My License </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/BuyLicense"> Buy License </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ScriptStore"> Script Store </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ShareYourScript"> Share Your Script </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Logout"> Logout </a>
          </li>
        </ul>

        <ul v-if="isAdmin" class="navbar-nav mb-3">
          <li class="nav-item">
            <a class="nav-link" href="/Summary"> Summary </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/AddFreeLicense"> Add Free License </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/User"> User List </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/License"> License List </a>
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