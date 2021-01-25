<template>
  <div>
    <h2 class="display-4 text-primary"># Bot installer</h2>

    <div class="form-group">
      <select class="form-control" v-model="selectName" @change="changeBot">
        <option v-for="bot in bots" :key="bot.name" :value="bot.name">
          {{ bot.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <textarea class="form-control" rows="5" v-model="selectValue"> </textarea>
    </div>

    <button
      class="btn btn-primary btn-block mb-3"
      v-clipboard="() => selectValue"
      v-clipboard:success="clipboardSuccess"
      v-clipboard:error="clipboardError"
    >
      Copy
    </button>
  </div>
</template>

<script>
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      selectName: "Select bot you need",
      selectValue:
        "Content bot will be show in there when you choose. Copy it then paste to Console of Developer tools in your browser",
      bots: [
        {
          name: "Select bot you need",
          value:
            "Content bot will be show in there when you choose. Copy it then paste to Console of Developer tools in your browser",
        },
        {
          name: "999dice.com",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/999dice'
document.body.appendChild(script)`,
        },
        {
          name: "betfury.io - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/betfury-dice'
document.body.appendChild(script)`,
        },
        {
          name: "bitsler.com - boom",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitsler-boom'
document.body.appendChild(script)`,
        },
        {
          name: "bitsler.com - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitsler-dice'
document.body.appendChild(script)`,
        },
        {
          name: "bitvest.io - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitvest'
document.body.appendChild(script)`,
        },
        {
          name: "casinoroyale.bet - dice classic",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/casinoroyale-dice-classic'
document.body.appendChild(script)`,
        },
        {
          name: "crypto.games - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/crypto-games-dice'
document.body.appendChild(script)`,
        },
        {
          name: "duckdice.io - faucet mode",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice-faucet-mode'
document.body.appendChild(script)`,
        },
        {
          name: "duckdice.io - main mode",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice'
document.body.appendChild(script)`,
        },
        {
          name: "duckdice.io - new year mode",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice-new-year-mode'
document.body.appendChild(script)`,
        },
        {
          name: "freebitco.in",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/freebitco'
document.body.appendChild(script)`,
        },
        {
          name: "gigabet.com - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/gigabet-dice'
document.body.appendChild(script)`,
        },
        {
          name: "luckyfish.io - dice classic",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/luckyfish-dice-classic'
document.body.appendChild(script)`,
        },
        {
          name: "luckyfish.io - limbo",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/luckyfish-limbo'
document.body.appendChild(script)`,
        },
        {
          name: "nanogames.io - hash dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/nanogames-hash-dice'
document.body.appendChild(script)`,
        },
        {
          name: "paradice.in - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/paradice'
document.body.appendChild(script)`,
        },
        {
          name: "primedice.com",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/primedice'
document.body.appendChild(script)`,
        },
        {
          name: "stake.com - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/stake-dice'
document.body.appendChild(script)`,
        },
        {
          name: "stake.com - limbo",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/stake-limbo'
document.body.appendChild(script)`,
        },
        {
          name: "trustdice.win - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/trustdice-dice'
document.body.appendChild(script)`,
        },
        {
          name: "wolf.bet - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/wolf'
document.body.appendChild(script)`,
        },
        {
          name: "wolf.bet - limbo",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/wolf-limbo'
document.body.appendChild(script)`,
        },
        {
          name: "yolodice.com",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/yolodice'
document.body.appendChild(script)`,
        },
      ],
    };
  },
  methods: {
    changeBot: function () {
      this.bots.map((bot) => {
        if (bot.name == this.selectName) return (this.selectValue = bot.value);
      });
    },
  },
};
</script>

<style>
</style>