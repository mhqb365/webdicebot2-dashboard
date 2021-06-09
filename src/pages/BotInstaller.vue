<template>
  <div>
    <div class="pb-5">
      <h2 class="text-primary">Bot installer</h2>

      <p class="small">
        + Only use the installer at dashboard.webdicebot.xyz if you do not want
        someone fake us to trick you
        <br />
        + With luckyfish casino, you must disable HOTKEYS can put dice script to
        script box
        <br />
        + With Lua mode, dice script must follow syntax of Lua version 5.3. If
        have any syntax error bot will not work
      </p>

      <div class="form-group">
        <select class="form-control" v-model="selectName" @change="changeBot">
          <option v-for="bot in bots" :key="bot.name" :value="bot.name">
            {{ bot.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <textarea class="form-control" rows="5" v-model="selectValue">
        </textarea>
      </div>

      <button
        class="btn btn-primary btn-block"
        v-clipboard="() => selectValue"
        v-clipboard:success="clipboardSuccess"
        v-clipboard:error="clipboardError"
      >
        Copy
      </button>
    </div>

    <div class="pb-5">
      <h2 class="text-primary">Emulator</h2>
      <p class="small">
        + Emulator is a casino simulation software run on your computer. Use it
        for install Web DiceBot for that casino
      </p>

      <div class="">
        <a
          href="https://github.com/mhqb365/webdicebot-emulator"
          target="_blank"
          class="btn btn-primary"
          >Download</a
        >
      </div>
    </div>
    <div class="pb-5">
      <h2 class="text-primary">How to use?</h2>

      <div class="text-center">
        <video class="w-50 border border-secondary rounded-sm" controls>
          <source src="/static/Video_2021-06-09_124347.mp4" type="video/mp4" />
          Your browser does not support HTML video
        </video>
      </div>

      <h5>Windows</h5>
      <ul class="list-group mb-3">
        <li class="list-group-item">
          Step 1: Double Click webdicebot-win.exe File, or Open Command Prompt
          at emulator you need
        </li>
        <li class="list-group-item">
          Step 2: Open browser then go to url show in Command Prompt
        </li>
      </ul>

      <h4>Mac</h4>
      <ul class="list-group mb-3">
        <li class="list-group-item">
          Step 1: Open Terminal in folder emulator you need then paste in order
          the 2 lines below
        </li>
        <pre class="bg-white shadow-sm">
chmod +x webdicebot-macos
./webdicebot-macos</pre
        >
        <li class="list-group-item">
          Step 2: Open browser then go to url show in Terminal
        </li>
      </ul>

      <h4>Linux</h4>
      <ul class="list-group mb-3">
        <li class="list-group-item">
          Step 1: Open Terminal in folder emulator you need then Paste in order
          the 2 lines below
        </li>
        <pre class="bg-white shadow-sm">
chmod +x webdicebot-linux
./webdicebot-linux</pre
        >
        <li class="list-group-item">
          Step 2: Open browser then go to url show in Terminal
        </li>
      </ul>
    </div>
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
          name: "betfury.io - limbo",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/betfury-limbo'
document.body.appendChild(script)`,
        },
        {
          name: "bitdice.me - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitdice'
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
          name: "cryptoplay.io - dice classic",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/cryptoplay-dice'
document.body.appendChild(script)`,
        },
        {
          name: "cryptoplay.io - limbo",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/cryptoplay-limbo'
document.body.appendChild(script)`,
        },
        {
          name: "duckdice.io - bonus mode",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice-bonus-mode'
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
          name: "freebitco.in",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/freebitco'
document.body.appendChild(script)`,
        },
        {
          name: "jacksclub.io - dice (work on emulator)",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/jacksclub.io-dice'
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
          name: "luckyfish.io - dice multiplayer",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/luckyfish-dice-multiplayer'
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
        //         {
        //           name: "stargames.bz - dice",
        //           value: `const BOT_URL = '${API_URL}'
        // var script = document.createElement('script')
        // script.type = 'text/javascript'
        // script.src = BOT_URL+'/bot/init/stargames.bz-dice'
        // document.body.appendChild(script)`,
        //         },
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
script.src = BOT_URL+'/bot/init/wolf-dice'
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