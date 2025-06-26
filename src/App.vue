<script setup lang="ts">
import {onMounted, ref} from "vue";
import Loading from "./components/Loading.vue";
import Loaded from "./components/Loaded.vue";
import Home from "./components/Home.vue";
import {API_DATA} from "./data";

const data = API_DATA();
const loading = ref<boolean | null>(true);

const isDev = import.meta.env.DEV;
const apiUrl = isDev ? "http://localhost:3000" : "https://ntt-community.com";

const getClanData = async () => {
  const response = await fetch(`${apiUrl}/api/clan_data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return console.log("Failed to fetch data");

  const parsed = await response.json();

  data.DATA.community_clans = parsed.community_clans;
  data.DATA.clan_wars = parsed.clan_wars;
  data.DATA.season_number = parsed.season_number;
};

const getShipData = async () => {
  const response = await fetch(`${apiUrl}/api/ships`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsed = await JSON.parse(await response.text());

  data.SHIPS = parsed.data;
};

onMounted(async () => {
  try {
    await getClanData();
    await getShipData();

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
  <Home v-else/>
</template>

<style scoped>

</style>
