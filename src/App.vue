<script setup lang="ts">
import axios from 'axios'
import {onMounted, ref} from "vue";
import Loading from "./components/Loading.vue";
import Loaded from "./components/Loaded.vue";
import {ApiData} from "./data";
import type {Member} from "./types/member.ts";
import type {Ship} from "./types/ships.ts";
import type {PopularShip} from "./types/popularships.ts";

const data = ApiData();
const loading = ref<boolean | null>(true);

const isDev = import.meta.env.DEV;
const apiUrl = isDev ? "http://localhost:3000" : "https://ntt-community.com";

const getMembersData = async () => {
  const res = await axios.get(`${apiUrl}/api/members`);
  for (const member of res.data as Member[]) {
    switch (member.resided_clan) {
      case "NTT": data.members["NTT"].push(member); break;
      case "N7T": data.members["N7T"].push(member); break;
      case "N77": data.members["N77"].push(member); break;
      case "NT7": data.members["NT7"].push(member); break;
    }
  }
};

const getShipData = async () => {
  const res = await axios.get(`${apiUrl}/api/ships`);

  for (const ship of res.data as Ship[])
    data.ships.push(ship);
};

onMounted(async () => {
  try {
    await getMembersData();
    await getShipData();

    const source = new EventSource(`${apiUrl}/api/popular_ships`);
    let cached: PopularShip[] | null = null;

    source.onmessage = (event: MessageEvent) => {
      const parsed = JSON.parse(event.data)

      if (parsed.data !== cached && parsed.data !== null) {
        (parsed.data as PopularShip[]).sort((a, b) => b.battles -  a.battles);

        data.popularShips = parsed.data;
        data.lastResetDate = parsed.last_reset_date;
        cached = parsed.data;
      }
      data.nextUpdate = parsed.next_update;
    }

    source.onerror = (event: Event) => {
      console.log("Error getting data: ", event);
      data.popularShips = null;
    }

    loading.value = false;
    await delay(1000);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = null;
  }
});

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
</script>

<template>
  <Loading v-if="loading === true"/>
  <Loaded v-else-if="loading === false"/>
  <router-view v-else/>
</template>

<style scoped>

</style>
