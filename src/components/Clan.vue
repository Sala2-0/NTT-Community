<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  data: any;
}>();

// console.log(props.data) // Debug code

const division = ref<string | undefined> (getDivision(props.data.division));
const color = ref<string | undefined> (getColor(props.data.league));

function getDivision(division: number) {
  switch (division) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "II";
  }
}

function getColor(league: number) {
  switch (league) {
    case 0: return "#cda4ff";
    case 1: return "rgb(190, 231, 189)";
    case 2: return "rgb(227, 214, 160)";
    case 3: return "rgb(204, 228, 228)";
    case 4: return "rgb(204, 153, 102)";
  }
}
</script>

<template>
  <div class="clan" :clan="data.tag">
    <div class="league" :style="{borderColor: color}">
      <p class="division">{{ division }}</p>
    </div>
    <p>{{ data.tag }}</p>
  </div>
</template>

<style scoped>
.clan {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;

  p { font-size: 25px; }

  .league {
    border: solid 5px;
    border-radius: 100%;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .division {
      font-size: 40px;
      height: 100%;
      margin: 0;
      text-align: center;
      font-weight: bold;

      display: flex;
      justify-content: center;  /* horizontal centering */
      align-items: center;      /* vertical centering */
      transform: translateY(-2.5px); /* fine-tune this value */
    }
  }
}
</style>