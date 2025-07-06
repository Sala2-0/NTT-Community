<script setup lang="ts">

</script>

<template>
  <div id="battle_monitor">
    <p id="version">Battle Monitor Version 1.2.0</p>

    <button id="add">Add player</button>

    <div id="content">
      <div class="player">
        <p class="player-name">Yurizono_Seia_</p>

        <div class="player-overview">
          <p class="total-battles">Total battles: 203</p>
          <p class="winrate">Winrate: 70,4%</p>
          <p class="average-damage">Average damage: 98,600</p>
          <p class="average-kills">Average kills: 1,44</p>
        </div>

        <button class="inspect-player">Inspect</button>
        <button class="delete-player">X</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#battle_monitor {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
}
p { font-size: 1.1em; font-weight: 500; margin: 0 }

#version {
  position: absolute;
  font-weight: 400;
  color: #888888;

  right: 10px;
  top: 10px;
  font-size: 1em;
}

#add {
  background-color: #272727;
  position: absolute;
  left: 50px;
  top: 35px;
  width: 145px;
  height: 40px;

  font-size: 16px;
  font-weight: bold;
}

#content {
  background-color: #3B3B3B;
  position: absolute;
  left: 40px; right: 40px;
  top: 120px; bottom: 40px;
}

.player {
  background-color: #272727;
  width: 250px;
  height: 170px;
  margin: 10px;
  border-radius: 10px;
  position: relative;

  .player-name {
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .player-overview {
    font-size: 13px;
    position: absolute;
    left: 10px; right: 10px;
    top: 37px; bottom: 97px;
    text-align: left;
  }

  .inspect-player {
    background-color: #7A3F40;
    position: absolute;
    padding: 0;
    left: 10px;
    bottom: 10px;
    width: 105px;
    height: 30px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: bold;
  }

  .delete-player {
    background-color: #7A3F40;
    position: absolute;
    padding: 0;
    left: 5px;
    top: 5px;
    height: 25px;
    width: 30px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>