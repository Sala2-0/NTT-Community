<script setup lang="ts">
  import {VueSpinner} from "vue3-spinners";
</script>

<template>
  <div id="loader">
    <h2>Loading </h2>
    <VueSpinner size="30"/>
  </div>
</template>

<style scoped>
  #loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    h2 { margin: 0 10px 0 0; }
  }
</style>