<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import Player from "./Player.vue";
import "../Members.css"
import {API_DATA} from "../data.ts";

defineProps<{
  toggle: (e: MouseEvent) => void,
}>();

const data = API_DATA();

const roleOrder: any = {
  commander: 1,
  executive_officer: 2,
  recruitment_officer: 3,
  commissioned_officer: 4,
  officer: 5,
  private: 6
}

const containerRef = ref<HTMLElement | null>(null);
const selected = ref("NTT");
const selectedOrder = ref("rank");
const showList = ref(false);
const targetClan = ref(data.DATA.community_clans![selected.value]); // Rearranged members from each clan depending on selected.value

targetClan.value = targetClan.value.sort((a: any, b: any) => roleOrder[a.role] - roleOrder[b.role]); // Sort for the first time

const selectClan = (event: MouseEvent) => {
  const self = event.target as HTMLButtonElement;

  // Return if clicking on already selected button to avoid unnecessary reloading
  if (self.getAttribute("clans") === selected.value) return;
  showList.value = false;

  selected.value = self.getAttribute("clans") as string;
  targetClan.value = data.DATA.community_clans![selected.value]; // Change values to members from currently selected clan

  // Change default sorting back to rank
  selectedOrder.value = "rank";
  targetClan.value = targetClan.value.sort((a: any, b: any) => roleOrder[a.role] - roleOrder[b.role]);

  // console.log(targetClan.value); // Debug code

  setTimeout(() => {
    showList.value = true;
    nextTick(() => containerRef.value?.scrollTo({top: 0, behavior: "instant"}));
  }, 400);
};

const selectOrder = (event: MouseEvent) => {
  const self = event.target as HTMLButtonElement;

  selectedOrder.value = self.parentElement!.getAttribute("id") as string;

  targetClan.value = targetClan.value.sort((a: any, b: any) => {
    // Handle privated accounts
    if (a.private_account && !b.private_account) return 1;
    if (!a.private_account && b.private_account) return -1;
    if (a.private_account && b.private_account) return 0;

    // Handle the order normally
    switch (selectedOrder.value) {
      case "rank":
        return roleOrder[a.role] - roleOrder[b.role];
      case "player":
        return a.username.localeCompare(b.username);
      case "battles_amount":
        return b.battles - a.battles;
      case "winrate":
        return b.winrate - a.winrate;
      case "xp_per_battle":
        return b.xp_per_battle - a.xp_per_battle;
      case "damage_per_battle":
        return b.damage_per_battle - a.damage_per_battle;
      case "kills_per_battle":
        return b.kills_per_battle - a.kills_per_battle;
      case "time_in_clan":
        return b.time_in_clan - a.time_in_clan;
      case "last_battle_time":
        return b.last_battle_time - a.last_battle_time;
      default:
        return 0;
    }
  });

};

onMounted(() => {
  setTimeout(() => showList.value = true, 600);
});
</script>

<template>
  <div id="members">
    <div class="content">
      <h2>Members in the community</h2>

      <div id="clans">
        <button clans="NTT" :class="{a: selected === 'NTT'}" @click="selectClan">NTT</button>
        <button clans="N7T" :class="{a: selected === 'N7T'}" @click="selectClan">N7T</button>
        <button clans="N77" :class="{a: selected === 'N77'}" @click="selectClan">N77</button>
        <button clans="NT7" :class="{a: selected === 'NT7'}" @click="selectClan">NT7</button>
      </div>

      <div id="members_list" v-show="showList" ref="containerRef">
        <div id="topbar">
          <div class="topbar-buttons" id="rank">
            <button :class="{'topbar-selected': selectedOrder === 'rank'}" @click="selectOrder">Rank</button>
          </div>
          <div class="topbar-buttons" id="player">
            <button :class="{'topbar-selected': selectedOrder === 'player'}" @click="selectOrder">Player</button>
          </div>
          <div class="end-wrapper">
            <div class="topbar-buttons" id="battles_amount">
              <button :class="{'topbar-selected': selectedOrder === 'battles_amount'}" @click="selectOrder">BTL</button>
            </div>
            <div class="topbar-buttons" id="winrate">
              <button :class="{'topbar-selected': selectedOrder === 'winrate'}" @click="selectOrder">W/B</button>
            </div>
            <div class="topbar-buttons" id="xp_per_battle">
              <button :class="{'topbar-selected': selectedOrder === 'xp_per_battle'}" @click="selectOrder">E/B</button>
            </div>
            <div class="topbar-buttons" id="damage_per_battle">
              <button :class="{'topbar-selected': selectedOrder === 'damage_per_battle'}" @click="selectOrder">D/B
              </button>
            </div>
            <div class="topbar-buttons" id="kills_per_battle">
              <button :class="{'topbar-selected': selectedOrder === 'kills_per_battle'}" @click="selectOrder">K/B
              </button>
            </div>
            <div class="topbar-buttons" id="time_in_clan">
              <button :class="{'topbar-selected': selectedOrder === 'time_in_clan'}" @click="selectOrder">Days</button>
            </div>
            <div class="topbar-buttons" id="last_battle_time">
              <button :class="{'topbar-selected': selectedOrder === 'last_battle_time'}" @click="selectOrder">LBT
              </button>
            </div>
          </div>
        </div>
        <ul class="list">
          <Player
            v-for="(player, index) in targetClan"
            :i="index"
            :playerData="player"
          />
        </ul>
      </div>

      <button id="return" @click="toggle">Back</button>
    </div>
  </div>
</template>

<style scoped>
#members {
  animation: fade 0.04s ease-out forwards;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #323232;
  z-index: 1000;

  /* Fade in main content first */

  .content {
    opacity: 0;
    animation: fadeContents 0.1s ease-in forwards;
    animation-delay: 0.5s;
  }

  #return:hover {
    background-color: rgba(255, 255, 255, 0.09);
  }

  #return {
    position: absolute;
    top: 0;
    left: 10px;
    background-color: transparent;
    border: none;
    transition: background-color 0.25s;
  }

  #clans button {
    border-radius: 0;
    background: rgba(0, 0, 0, 0.24);
  }

  .a {
    border-color: #ffffff;
  }

  #members_list::-webkit-scrollbar { width: 5px; }
  #members_list::-webkit-scrollbar-track { background: transparent; }
  #members_list::-webkit-scrollbar-thumb { background: #252525; border-radius: 12px; }
  #members_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    height: 600px;
    overflow-y: auto;
    scroll-behavior: smooth;

    /* When main content finishes loading, fade in the members list */
    animation: fadeContents 0.1s ease-in forwards;

    /*scrollbar-width: none;*/

    #topbar {
      width: 95%;
      height: 40px;
      background-color: #2c2c2c;
      display: flex;
      justify-content: start;

      .topbar-buttons {
        display: flex;
        justify-content: left;
      }

      .topbar-buttons button:hover {
        background-color: rgba(255, 255, 255, 0.22)
      }

      .topbar-buttons button {
        border-radius: 0;
        background-color: transparent;
        transition: background-color 0.25s;
        border: none;
        width: 70px;
        height: 40px;
        padding: 0;
      }

      .topbar-selected {
        background-color: rgba(255, 255, 255, 0.22) !important;
      }

      #player {
        width: 30%
      }

      .end-wrapper .topbar-buttons {
        width: 100%;
        padding: 0 20px;

        button {
          width: 100%
        }
      }
    }

    .list {
      list-style-type: none;
      width: 95%;
      padding: 0;
      margin: 0;

      .player {
        height: 60px;
        background-color: #222222;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;

        img {
          height: 40px;
          padding: 0 15px
        }

        #name_rank {
          flex-direction: column;
          text-align: left;
          width: 30%;

          [player="username"] {
            font-size: 16px;
            margin: 0;
          }

          [player="rank"] {
            margin: 0;
            font-size: 14px;
          }
        }

        .end-wrapper p {
          margin: 0;
          width: 100%;
          padding: 0 20px;
          text-align: center;
        }
      }
    }

    .end-wrapper {
      display: flex;
      justify-content: end;
      width: 100%
    }
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
    transform: translateY(5%);
  }
  to {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    transform: translateY(0);
  }
}
</style>