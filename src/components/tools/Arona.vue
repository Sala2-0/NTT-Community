<script setup lang="ts">
const github = () => window.open("https://github.com/Sala2-0/Arona");
const invite = () => window.open("https://discord.com/oauth2/authorize?client_id=1360295816476098692&permissions=139586750464&integration_type=0&scope=bot+applications.commands");
</script>

<template>
  <div id="arona">
    <div id="banner">
      <img src="/src/assets/wows_ba_banner_transparent.png" alt="">
    </div>
    <h2>Arona is a clan battle oriented discord bot</h2>

    <div id="links">
      <button id="github_link" @click="github">Github repository</button>
      <button id="invite_link" @click="invite">Add it to your server</button>
    </div>

    <p>Commands list can be found on github repository.</p>

    <p id="credits">Bot theme is based on Blue Archive</p>
  </div>
</template>

<style scoped>
#banner {
  width: 470px;
  display: inline-block;
  background-color: #FFFFFF;
  border-radius: 10px;

  img { width: 100%; }
}

button {
  width: 200px;
  margin: 5px;
}

#links {
  display: inline-block;
  flex-direction: row;
}

#credits {
  position: absolute;
  top: 5px;
  right: 10px;
  margin: 0;
}
</style>