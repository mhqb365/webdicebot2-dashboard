<template>
  <div>
    <h2 class="display-4 text-primary"># Terms of use</h2>
    <hr />
    <p>
      The following user agreement is to read in its entirety prior to the use
      of web diceBot's products and services. the agreement constitutes a legal
      binding between the user and all services found on webdicebot.xyz
    </p>
    <pre>
1. You must know what is dice
2. You must know control your money in dice
3. You have to differentiate between dice tools with strategy script for dice
4. You must know the Lua language (v5.3) or Javascript language when play with strategy script
5. You must have license key when use web dicebot (buy license when you has been join the to Web DiceBot system)
6. Do not share your license if you don't wanna anyone use bot by your money
7. Only use the installer in webdicebot.xyz if you don't want someone fake us to trick you
8. Upgrade level max security in your account at all dice sites</pre
    >

    <h2 class="display-4 text-primary"># How to use</h2>
    <hr />
    Step 1: Join to the Web DiceBot system via Register/Login
    <br />
    Step 2: Deposit TRX (Tron) to your deposit address then buy license with
    days you want
    <br />
    Step 3: Paste installer to console of browser on dice site you play.
    <a href="https://youtube.com/embed/Tu7oTnP7noc" target="_blank"
      >See video</a
    >
    <br />
    Buy TRX (Tron) at:
    <a href="https://binance.com/vn/register?ref=37324651" target="_blank"
      >Binance.com</a
    >

    <h2 class="display-4 text-primary"># Sample Lua strategy script</h2>
    <hr />
    <pre>
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

    <h2 class="display-4 text-primary"># Sample Javascript strategy script</h2>
    <hr />
    <pre>
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

    <h2 class="display-4 text-primary"># Variables</h2>
    <hr />
    <pre>
chance : % win change
bethigh : bet side, true is over/above, false is under/below
nextbet : bet amount for next bet make
balance : current balance
profit : total profit in round
currentprofit, lastBet.profit : profit of last bet make
previousbet, lastBet.amount : amount of last bet make
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
    <h2 class="display-4 text-primary"># Functions</h2>
    <hr />
    <pre>
dobet() : loop betting
start() : start betting
stop() : stop betting
continuebet() : continue betting after call function stop()
resetseed() : reset seed fair
resetstats() : reset stats in round
ching() : alert with sound
</pre
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>