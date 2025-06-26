<script setup lang="ts">
import "../Members.css"

type PlayerData = {
  role: string;
  username: string;
  battles?: number;
  winrate?: number;
  xp_per_battle?: number;
  damage_per_battle?: number;
  kills_per_battle?: number;
  time_in_clan?: number;
  last_battle_time?: number;
  private_account?: boolean;
};

defineProps<{
  i: number;
  playerData: PlayerData;
}>();

const roles: any = {
  commander: "Commander",
  executive_officer: "Deputy Commander",
  recruitment_officer: "Recruiter",
  commissioned_officer: "Commissioned Officer",
  officer: "Line Officer",
  private: "Midshipman"
}

const icons: any = {
  commander: new URL("../assets/Commander.png", import.meta.url).href,
  executive_officer: new URL("../assets/Executive_Officer.png", import.meta.url).href,
  recruitment_officer: new URL("../assets/Recruiter.png", import.meta.url).href,
  commissioned_officer: new URL("../assets/Commissioned_Officer.png", import.meta.url).href,
  officer: new URL("../assets/Line_Officer.png", import.meta.url).href,
  private: new URL("../assets/Midshipman.png", import.meta.url).href
}
</script>

<template>
  <li class="player">
    <img :src="icons[playerData.role]" alt="RANK">
    <div id="name_rank">
      <p player="username">{{ playerData.username }}</p>
      <p player="rank">{{ roles[playerData.role] }}</p>
    </div>
    <div class="end-wrapper">
      <p player="hidden_account" v-if="playerData.private_account">HIDDEN ACCOUNT LMAO WHAT A BITCH</p>
      <p player="battles_amount" v-if="!playerData.private_account">{{ playerData.battles }}</p>
      <p player="winrate" v-if="!playerData.private_account">{{ playerData.winrate }}%</p>
      <p player="experience" v-if="!playerData.private_account">{{ playerData.xp_per_battle }}</p>
      <p player="damage" v-if="!playerData.private_account">{{ playerData.damage_per_battle }}</p>
      <p player="kills_ber_battle" v-if="!playerData.private_account">{{ playerData.kills_per_battle }}</p>
      <p player="time_in_clan" v-if="!playerData.private_account">{{ playerData.time_in_clan }} d</p>
      <p player="last_battle_time" v-if="!playerData.private_account">{{ playerData.last_battle_time }} d</p>
    </div>
  </li>
</template>

<style scoped>
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
</style>