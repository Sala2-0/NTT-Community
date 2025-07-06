<script setup lang="ts">
import {ref, watch} from "vue";
import {API_DATA} from "../../data.ts";

const data = API_DATA();

type Ship = {
  id: string,
  name: string,
  stats: {
    average_damage_dealt: number,
    average_kills: number,
    win_rate: number
  }
};

const battlePerformance = ref({
  damage: 0,
  kills: 0,
  win: "false",
});

const search = ref("");
const searchList = ref<Ship[]>([]);
const list = ref<{
  id: string,
  name: string,
  PR: number,
  stats: {
    average_damage_dealt: number,
    average_kills: number,
    win_rate: number
  }
}[]>([]);

// Value refers to PR value
const getColor = (value: number) => {
  if (value >= 0 && value <= 750) return "#FE0E00";
  else if (value > 750 && value <= 1100) return "#FE7903";
  else if (value > 1100 && value <= 1350) return "#FFC71F";
  else if (value > 1350 && value <= 1550) return "#44B300";
  else if (value > 1550 && value <= 1750) return "#318000";
  else if (value > 1750 && value <= 2100) return "#02C9B3";
  else if (value > 2100 && value <= 2450) return "#D042F3";
  else if (value > 2450) return "#A00DC5";
};

const add = (ship: Ship) => {
  const win = battlePerformance.value.win === "true";

  const normalization = {
    damage: Math.max(0, (battlePerformance.value.damage / ship.stats.average_damage_dealt) - 0.4) / (1 - 0.4),
    kills: Math.max(0, (battlePerformance.value.kills / ship.stats.average_kills) - 0.1) / (1 - 0.1),
    win: Math.max(0, ((win ? 1 : 0) / (ship.stats.win_rate / 100)) - 0.7) / (1 - 0.7),
  }

  const personalRating = Math.round((700 * normalization.damage) + (300 * normalization.kills) + (150 * normalization.win));

  list.value.push({id: ship.id, name: ship.name, PR: personalRating, stats: ship.stats});

  searchList.value = searchList.value.filter(s => s.id !== ship.id);
};

watch(search, () => {
  searchList.value = [];
  if (search.value.length === 0) return;

  const lowercased = search.value.toLowerCase();

  for (const id in data.SHIPS) {
    if (data.SHIPS[id].stats === undefined) continue;
    if (list.value.find(ship => ship.id === id)) continue;

    if (data.SHIPS[id].name.toLowerCase().startsWith(lowercased)) searchList.value.push({
      id,
      name: data.SHIPS[id].name,
      stats: data.SHIPS[id].stats,
    });
  }
});

watch(battlePerformance.value, () => {
  const win = battlePerformance.value.win === "true";

  for (const ship of list.value) {
    const normalization = {
      damage: Math.max(0, (battlePerformance.value.damage / ship.stats.average_damage_dealt) - 0.4) / (1 - 0.4),
      kills: Math.max(0, (battlePerformance.value.kills / ship.stats.average_kills) - 0.1) / (1 - 0.1),
      win: Math.max(0, ((win ? 1 : 0) / (ship.stats.win_rate / 100)) - 0.7) / (1 - 0.7),
    }

    ship.PR = Math.round((700 * normalization.damage) + (300 * normalization.kills) + (150 * normalization.win));
  }
});
</script>

<template>
  <div id="pr_calculator">
    <p id="credits">PR values and formula from WoWs numbers</p>
    <p id="version">PR Calculator Version 1.1.0</p>

    <div id="battle_performance">
      <p>Battle performance</p>

      <div class="label-wrapper">
        <label for="damage">Damage:</label>
        <input id="damage" type="number" placeholder="Damage" v-model="battlePerformance.damage">
      </div>

      <div class="label-wrapper">
        <label for="kills">Kills:</label>
        <select id="kills" v-model="battlePerformance.kills">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      <div class="label-wrapper">
        <label for="win">Victory:</label>
        <select id="win" v-model="battlePerformance.win">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </div>

    <div id="ship_search">
      <input id="search" type="text" placeholder="Ship" autocomplete="off" v-model="search">

      <div id="result_box">
        <button class="ship" v-for="ship in searchList" :key="ship.id" @click="add(ship)">{{ ship.name }}</button>
      </div>
    </div>

    <div id="list">
<!--      <div id="topbar">-->
<!--        <button>test</button>-->
<!--      </div>-->
      <div class="ship" v-for="ship in list" :key="ship.id">
        <p class="ship-name">{{ ship.name }}</p>
        <p class="personal-rating" :style="{ 'color': getColor(ship.PR) }">{{ ship.PR }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
p { font-size: 1.1em; font-weight: 500; margin: 0 }

#credits, #version {
  position: absolute;
  font-weight: 400;
  color: #888888;
}

#credits {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

#version {
  right: 10px;
  top: 10px;
  font-size: 1em;
}

#pr_calculator {
  width: 300px;
  height: 100px;
}

#battle_performance { display: flex; flex-direction: column; }

.label-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5rem;

  label {
    font-size: 1.1em;
    font-weight: 500;
    margin-right: 0.5rem;
    text-align: left;
    width: 100px;
  }

  input, select {
    margin-left: 0.5rem;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    background-color: #272727;
    width: 100%;
  }
}

#ship_search {
  margin-top: 5rem;
  justify-content: center;
  background-color: transparent;
  height: 400px;

  #search {
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    background-color: #272727;
    width: 90%;
  }

  #result_box {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }

  .ship {
    background-color: #272727;
    border-radius: 0;
  }
}

#list {
  position: absolute;
  top: 70px;
  left: 400px;
  bottom: 100px;
  right: 50px;
  overflow-y: auto;
  overflow-x: auto;
  background-color: #3b3b3b;

  #topbar {
    display: flex;
    flex-direction: row;
    height: 30px;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: #272727;
  }

  .ship {
    width: 100%;
    height: 50px;
    background-color: #272727;
    border-radius: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .ship-name {
    margin-left: 1rem;
  }

  .personal-rating {
    margin-right: 1rem;
  }
}

/* Delete arrows in Chrome */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Delete arrows Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>