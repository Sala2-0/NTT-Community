<script setup lang="ts">
import {ref} from "vue";
import PrCalculator from "../tools/PrCalculator.vue";

defineProps<{
  toggle: (e: MouseEvent) => void,
}>();

const tool = ref<string | null>(null);
const showPage = ref(false);

const SWITCH = (event: MouseEvent) => {
  const self = event.target as HTMLButtonElement;

  if (self.classList.contains("selected")) return;
  self.classList.add("selected");

  showPage.value = false;
  tool.value = self.getAttribute("tool") as string;

  setTimeout(() => showPage.value = true, 100);
};
</script>

<template>
  <div id="tools">
    <div id="content">
      <div id="sidebar">
        <button id="return" @click="toggle">Return</button>
        <button tool="pr_calculator" @click="SWITCH">PR Calculator</button>
      </div>

      <div id="intro" v-if="tool === null">
        <h2>Welcome to Tools section</h2>
        <p>Here, you will find various tools and games oriented towards WoWs that I have created</p>
      </div>

      <div id="pages" v-show="showPage">
        <PrCalculator v-show="tool === 'pr_calculator'"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
#tools {
  animation: fade 0.04s ease-out forwards;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
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

  #sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background-color: #272727;

    button {
      width: 100%;
      border-radius: 0;
      background-color: transparent;
    }
  }

  #intro p { font-size: 1.2em; }

  #pages, #intro {
    position: absolute;
    top: 0; bottom: 0;
    left: 250px; right: 0;
    padding: 2rem;
    overflow-y: auto;

    animation: fadeContents 0.1s ease-in forwards;

    p { font-size: 1.1em; font-weight: 500; margin: 0 }
  }
}

.selected {
  border: 1px solid #ffffff;
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