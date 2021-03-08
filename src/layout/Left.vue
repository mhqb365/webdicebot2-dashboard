<template>
  <div class="">
    <h2 class="text-primary"># Menu</h2>

    <div v-if="!isLogin">
      <ul class="list-group">
        <li class="list-group-item">
          <a href="/"> Getting Started </a>
        </li>
        <li class="list-group-item">
          <a href="/Token"> Token </a>
          <span class="badge badge-danger"> On comming</span>
        </li>
        <li class="list-group-item">
          <a href="/Register"> Register </a>
        </li>
        <li class="list-group-item">
          <a href="/Login"> Login </a>
        </li>
      </ul>
    </div>

    <div v-else>
      <ul class="list-group mb-3">
        <li class="list-group-item">
          <a href="/"> Getting Started </a>
        </li>
        <li class="list-group-item">
          <a href="/Token"> Token </a>
          <span class="badge badge-danger">On comming</span>
        </li>
        <li class="list-group-item">
          <a href="/HiloGame"> Hilo Game </a>
          <span class="badge badge-danger">Hot</span>
        </li>
        <li class="list-group-item">
          <a href="/BotInstaller"> Bot Installer </a>
        </li>
        <li class="list-group-item">
          <a href="/MyInfo"> My Info </a>
        </li>
        <li class="list-group-item">
          <a href="/MyLicense"> My License </a>
        </li>
        <li class="list-group-item">
          <a href="/BuyLicense"> Buy License </a>
        </li>
        <li class="list-group-item">
          <a href="/Deposit"> Deposit </a>
        </li>
        <li class="list-group-item">
          <a href="/Withdraw"> Withdraw </a>
        </li>
        <li class="list-group-item">
          <a href="/ScriptStore"> Script Store </a>
        </li>
        <li class="list-group-item">
          <a href="/ShareYourScript"> Share Your Script </a>
        </li>
        <li class="list-group-item">
          <a href="/Logout"> Logout </a>
        </li>
      </ul>

      <ul v-if="isAdmin" class="list-group mb-3">
        <li class="list-group-item">
          <a href="/Summary"> Summary </a>
        </li>
        <li class="list-group-item">
          <a href="/AddFreeLicense"> Add Free License </a>
        </li>
        <li class="list-group-item">
          <a href="/User"> User List </a>
        </li>
        <li class="list-group-item">
          <a href="/License"> License List </a>
        </li>
        <li class="list-group-item">
          <a href="/DepositList"> Deposit List </a>
        </li>
        <li class="list-group-item">
          <a href="/WithdrawList"> Withdraw List </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>