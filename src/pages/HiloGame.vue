<template>
  <div class="pb-5">
    <h2 class="text-primary"># HiLo game</h2>

    <p>
      You have
      <span v-if="isLoading3" class="spinner-border spinner-border-sm"></span>
      <span v-else>{{ Number(user.balance).toFixed(6) }}</span>
      TRX
    </p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>