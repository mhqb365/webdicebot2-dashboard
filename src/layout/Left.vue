<template>
  <div class="">
    <h2 class="text-primary"># Menu</h2>

    <div v-if="!isLogin">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/"> Getting Started </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Register' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/Register"> Register </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Login' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/Login"> Login </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ForgotPassword'
              ? 'custom-active  list-link'
              : '',
          ]"
        >
          <a href="/ForgotPassword"> Forgot Password </a>
        </li>
      </ul>
    </div>

    <div v-else>
      <ul class="list-group mb-3">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/"> Getting Started </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/BotInstaller'
              ? 'custom-active  list-link'
              : '',
          ]"
        >
          <a href="/BotInstaller"> Bot Installer </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/MyWallet' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/MyWallet"> My Wallet </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/MyLicense' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/MyLicense"> My License </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/BuyLicense' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/BuyLicense"> Buy License </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ScriptStore'
              ? 'custom-active  list-link'
              : '',
          ]"
        >
          <a href="/ScriptStore"> Script Store </a>
          <span class="badge badge-primary">Free</span>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/ChangePassword'
              ? 'custom-active  list-link'
              : '',
          ]"
        >
          <a href="/ChangePassword"> Change Password </a>
        </li>
        <li class="list-group-item">
          <a href="/Logout"> Logout </a>
        </li>
      </ul>

      <ul v-if="isAdmin" class="list-group mb-3">
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/Summary' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/Summary"> Summary </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/AddFreeLicense'
              ? 'custom-active  list-link'
              : '',
          ]"
        >
          <a href="/AddFreeLicense"> Add Free License </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/User' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/User"> User List </a>
        </li>
        <li
          class="list-group-item"
          v-bind:class="[
            this.$route.path == '/License' ? 'custom-active  list-link' : '',
          ]"
        >
          <a href="/License"> License List </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
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