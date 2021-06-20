<template>
  <div>
    <div class="text-center">
      <div class="jumbotron text-center welcome text-white">
        <h1>WELCOME</h1>
        to WebDiceBot.Xyz
      </div>
    </div>

    <div class="mb-4">
      <h2 class="text-primary">Terms of use</h2>

      <p class="small">
        + The following user agreement is to read in its entirety prior to the
        use of Web DiceBot's products and services. The agreement constitutes a
        legal binding between the user and all services found on webdicebot.xyz
      </p>

      <pre>
1. You must know what is dice, dice bot, dice script
2. You must know the Lua language (v5.3) or Javascript language for make dice script
3. You must control your crypto currency in dice
4. You must have license when use Web DiceBot
5. License can use for all account, all dice sites and all devices of you
6. Upgrade level max of security (strong password, 2FA, etc..) for your account at all dice sites</pre
      >
    </div>

    <div class="mb-4">
      <h2 class="text-primary">How to use</h2>

      <pre>
Step 1: Join to the Web DiceBot system via Register/Login
Step 2: Deposit TRX (Tron) at My Wallet then buy license with days you want at Buy License
Step 3: Select dice site then copy installer script at Bot Installer
Step 4: Paste installer script to console of dice site then follow next request</pre
      >
    </div>

    <div class="row mb-4">
      <div class="col-md-6">
        <h2 class="text-primary">Sample Lua dice script</h2>

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
      </div>
      <div class="col-md-6">
        <h2 class="text-primary">Sample Javascript dice script</h2>

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
      </div>
    </div>

    <div class="mb-4">
      <h2 class="text-primary">System variables</h2>

      <pre>
chance : % win change
bethigh : bet side, true is over/above, false is under/below
nextbet : bet amount for next bet make
balance : current balance
profit : total profit in round
currentprofit, lastBet.profit : profit of last bet make
previousbet, lastBet.amount : amount of last bet make
lastBet.nonce : nonce of bets (some dice sites not have)
lastBet.id : id of bets (some dice sites not have)
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

    <div class="mb-4">
      <h2 class="text-primary">System functions</h2>

      <pre>
dobet() : loop betting
start() : start betting
stop() : stop betting
continuebet() : continue betting after call function stop()
resetseed() : reset seed fair
resetstats() : reset stats in round
ching() : alert with sound
checkbalance() : check current balance if new deposit
sleep(n) : play bet after n seconds (only work at lua mode)
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