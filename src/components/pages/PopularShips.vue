<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue'
import { ApiData } from "../../data.ts";

const data = ApiData();
const timer = ref<number | null>(parseInt((data.nextUpdate - (new Date().getTime() / 1000)).toString()));

const refListBox = ref<HTMLElement | null>(null);
const showList = ref(false);
const updating = ref(false);

const update = () => {
  showList.value = false;
  updating.value = true;

  setTimeout(() => {
    showList.value = true;
    nextTick(() => refListBox.value?.scrollTo({top: 0, behavior: "instant"}));

    updating.value = false;
  }, 2000);
};

onMounted(() => {
  setInterval(() => {
    timer.value = parseInt((data.nextUpdate - (new Date().getTime() / 1000)).toString());

    if (updating.value) return;

    if (timer.value === 0) update();
  }, 100);
  setTimeout(() => showList.value = true, 300);
});
</script>

<template>
  <div id="popular_ships">
    <div id="content">
      <p id="title">Popular Ships played in the community</p>
      <p id="warning">List is for random battles only</p>
      <p id="timer">Updates in: {{ timer }} sec</p>
      <p id="last_reset_date">Last Reset: {{ data.lastResetDate }}</p>

      <div id="list_box" v-show="showList" ref="refListBox">
        <div id="top-bar">
          <p class="ship-name">Name</p>
          <p class="battles">Battles</p>
          <p class="win-rate">Win rate</p>
          <p class="damage">Av. Damage</p>
          <p class="kills">Av. Kills</p>
        </div>

        <div class="ship" v-for="ship in data.popularShips">
          <p class="ship-name">{{ ship.name }}</p>
          <p class="battles">{{ ship.battles }}</p>
          <p class="win-rate">{{ ((ship.wins / ship.battles) * 100).toFixed(2) }}%</p>
          <p class="damage">{{ Math.round(ship.damage / ship.battles).toLocaleString("sv-SE") }}</p>
          <p class="kills">{{ (ship.kills / ship.battles).toFixed(1) }}</p>
        </div>
      </div>

      <router-link to="/">
        <button id="return">< Back</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
p { margin: 0 }

#popular_ships {
  animation: fade 0.04s ease-out forwards;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #323232;
  z-index: 1000;

  #content {
    opacity: 0;
    animation: fadeContents 0.1s ease-in forwards;
    animation-delay: 0.2s;
    position: relative;
    height: 100%;
  }

  #return:hover {
    background-color: rgba(255, 255, 255, 0.09);
  }

  #return {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: transparent;
    border: none;
    transition: background-color 0.25s;
    font-weight: bold;
  }

  #title {
    position: absolute;
    top: 35px;
    left: 165px;
    width: 260px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }

  #warning {
    position: absolute;
    top: 90px;
    right: 50px;
  }

  #timer {
    position: absolute;
    top: 65px;
    right: 50px;
    width: 200px;
    text-align: left;
  }

  #last_reset_date {
    position: absolute;
    bottom: 5px;
    right: 50px;
  }

  #list_box {
    position: absolute;
    top: 120px; bottom: 35px;
    left: 40px; right: 40px;
    background-color: #3B3B3B;
    overflow-y: auto;
    animation: fadeContents 0.1s ease-in forwards;
  }

  .ship, #top-bar {
    width: 100%;
    height: 50px;
    background-color: #272727;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-weight: bold;
    font-size: 20px;

    p {
      width: 50%;
      margin: 0 20px 0 100px;
      text-align: right;
    }

    .ship-name {
      margin: 0 auto 0 20px;
      text-align: left;
    }
  }

  #top-bar {
    height: 40px;
    font-size: 18px;
    font-weight: normal;
    background-color: rgba(39, 39, 39, 0.7);
  }
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeContents {
  from {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
  }
  to {
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
}
</style>