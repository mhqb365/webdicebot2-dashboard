<template>
  <div class="pb-5">
    <h2 class="text-primary">Rock Paper Srissors</h2>

    <p>
      You have
      <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
      <span v-else>{{ Number(balance).toFixed(6) }} TRX</span>
      <button type="button" class="btn btn-light btn-sm" @click="getBalance">
        <i class="fas fa-sync"></i>
      </button>
    </p>

    <div class="row text-center">
      <div class="col-md-6 pb-2">
        <div class="border rounded">
          <img src="/static/games/rock-paper-scissors/none.png" />
          <h3>You</h3>
        </div>
      </div>

      <div class="col-md-6 pb-2">
        <div class="border rounded">
          <img src="/static/games/rock-paper-scissors/none.png" />
          <h3>Computer</h3>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Bet amount</label>
      <input type="number" class="form-control" value="5" />
    </div>

    <div class="text-center">
      <div class="row text-center">
        <div class="col-md-4">
          <img
            type="button"
            class="place-bet pb-2"
            src="/static/games/rock-paper-scissors/rock.png"
            width="64px"
          />
          <br />
          Bet Rock
        </div>
        <div class="col-md-4">
          <img
            type="button"
            class="place-bet pb-2"
            src="/static/games/rock-paper-scissors/paper.png"
            width="64px"
          />
          <br />
          Bet Paper
        </div>
        <div class="col-md-4">
          <img
            type="button"
            class="place-bet pb-2"
            src="/static/games/rock-paper-scissors/scissors.png"
            width="64px"
          />
          <br />
          Bet Scissors
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      balance: 0,
    };
  },
  methods: {
    getBalance: function () {},
  },
};
</script>

<style>
.place-bet:hover {
  transform: scale(1.5);
}
</style>