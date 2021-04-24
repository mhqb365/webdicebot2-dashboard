<template>
  <div>
    <div class="pb-5">
      <h2 class="text-primary">Terms of use</h2>

      <p class="small">
        The following user agreement is to read in its entirety prior to the use
        of Web DiceBot's products and services. The agreement constitutes a
        legal binding between the user and all services found on webdicebot.xyz
      </p>

      <pre class="bg-white border rounded p-2">
1. You must know what is dice
2. You must control your money in dice
3. You must have to differentiate between dice tools with dice script
4. You must know the Lua language (v5.3) or Javascript language when play with dice script
5. You must have license key when use Web DiceBot
6. Do not share your license if you do not wanna anyone use bot by your money
7. Only use the installer at webdicebot.xyz if you do not want someone fake us to trick you
8. Upgrade level max security in your account at all dice sites</pre
      >
    </div>

    <div class="pb-5">
      <h2 class="text-primary">How to use</h2>

      <pre class="bg-white border rounded p-2">
Step 1: Join to the Web DiceBot system via Register/Login
Step 2: Deposit TRX (Tron) to your wallet then buy license with days you wanna
Step 3: At dice site you play, open dev tool of browser then paste installer to console tab
<a href="https://www.youtube.com/embed/hlGGOO2aZsY" target="_blank">See video tutorial</a>

You can buy TRX (Tron) at:
<a href="https://justswap.org/#/home" target="_blank">JustSwap</a>,
<a href="https://binance.com/vn/register?ref=37324651" target="_blank"
  >Binance.com</a
>
or any crypto exchanges</pre>
    </div>

    <div class="pb-5">
      <h2 class="text-primary">Sample Lua dice script</h2>

      <pre class="bg-white border rounded p-2">
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet()
    if (win) then
        nextbet=basebet
    else
        nextbet=previousbet*2
    end
end</pre
      >
    </div>

    <div class="pb-5">
      <h2 class="text-primary">Sample Javascript dice script</h2>

      <pre class="bg-white border rounded p-2">
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet() {
    if (win) {
        nextbet=basebet
    } else {
        nextbet=previousbet*2
    }
}</pre
      >
    </div>

    <div class="pb-5">
      <h2 class="text-primary">System variables</h2>

      <pre class="bg-white border rounded p-2">
chance : % win change
bethigh : bet side, true is over/above, false is under/below
nextbet : bet amount for next bet make
balance : current balance
profit : total profit in round
currentprofit, lastBet.profit : profit of last bet make
previousbet, lastBet.amount : amount of last bet make
lastBet.id : nonce of user
lastBet.chance : win chance of last bet make
lastBet.roll : result number of last bet make
win : true is last bet make has win, false is lose
bets : bet count
wins : win count
winstreak  : streak of win count
losses : lose count
losestreak : streak of lose count
currentstreak : streak of bet count
</pre
      >
    </div>

    <div class="pb-5">
      <h2 class="text-primary">System functions</h2>

      <pre class="bg-white border rounded p-2">
dobet() : loop betting
start() : start betting
stop() : stop betting
continuebet() : continue betting after call function stop()
resetseed() : reset seed fair
resetstats() : reset stats in round
ching() : alert with sound
checkbalance() : check current balance if new deposit
sleep(n) : play bet after n seconds
</pre
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>