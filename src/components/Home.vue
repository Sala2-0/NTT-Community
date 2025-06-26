<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue';
import Members from "./Members.vue";
import Clan from "./Clan.vue";
import Tools from "./Tools.vue";
import {API_DATA} from "../data.ts";

const page = ref<string | null>(null);
const about = ref(false);

const toggle = (e: MouseEvent) => {
  const self = e.target as HTMLButtonElement;
  page.value = self.getAttribute("page") as string;
};

const windowWidth = ref(window.innerWidth);
const mobileSidebar = ref(false);

let lastScroll = 0
let hide = ref(false);

const scroll = async () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 0 && lastScroll > 0) {
    await new Promise(resolve => setTimeout(resolve, 80));
    hide.value = true;
  } else {
    await new Promise(resolve => setTimeout(resolve, 80));
    hide.value = false;
  }

  lastScroll = currentScroll;
};

watch(page, () => {
  if (page.value) document.body.classList.add('no-scroll');
  else document.body.classList.remove('no-scroll');
});

onMounted(() => {
  window.addEventListener('scroll', scroll);
  window.addEventListener('resize', () => windowWidth.value = window.innerWidth);
});
onUnmounted(() => {
  window.removeEventListener('scroll', scroll);
  window.removeEventListener('resize', () => windowWidth.value = window.innerWidth);
});

function discord() {
  window.open("https://discord.gg/BE5NDrY65W");
}

function toggleMobileSidebar() {
  mobileSidebar.value = !mobileSidebar.value;
  // if (mobileSidebar.value) document.body.classList.add('no-scroll');
  // else document.body.classList.remove('no-scroll');
}

function $() {
  window.open("https://ko-fi.com/ntt_yurizono_seia_", "_blank");
}
</script>

<template>
  <transition name="fade">
    <div v-show="hide" id="navbar">
      <button page="members" class="members" @click="toggle" v-if="windowWidth > 500">Members</button>
      <button class="about" @click="about = !about" v-if="windowWidth > 500">About</button>
      <button page="tools" class="tools" @click="toggle" v-if="windowWidth > 500">Tools</button>
      <button class="discord" @click="discord" v-if="windowWidth > 500">Join our Discord!</button>

      <button class="mobile-menu" v-if="windowWidth <= 500" @click="toggleMobileSidebar">
        <img src="../assets/menu.png" alt="">
      </button>
    </div>
  </transition>

  <transition name="fade">
    <div v-show="!hide" id="title">
      <p>NTT Community</p>
      <button page="members" class="members" @click="toggle" v-if="windowWidth > 500">Members</button>
      <button class="about" @click="about = !about" v-if="windowWidth > 500">About</button>
      <button page="tools" class="tools" @click="toggle" v-if="windowWidth > 500">Tools</button>
      <button class="discord" @click="discord" v-if="windowWidth > 500">Join our Discord!</button>

      <button class="mobile-menu" v-if="windowWidth <= 500" @click="toggleMobileSidebar">
        <img src="../assets/menu.png" alt="">
      </button>
    </div>
  </transition>

  <div id="mobile_sidebar" v-if="windowWidth <= 500" v-show="mobileSidebar">
    <button class="discord" @click="discord">Join our Discord!</button>
    <button class="donation" @click="$">OPTIONAL</button>
    <div class="wrapper">
      <p>Site is managed by <a href="https://profile.worldofwarships.eu/statistics/557422466" target="_blank">Yurizono_Seia_</a></p>
      <p>Built with Vue.js</p>
    </div>
    <p class="version">Site version 2.0</p>
  </div>

  <div id="about-dropdown" v-show="about" v-if="windowWidth > 500">
    <p>Site is managed by <a href="https://profile.worldofwarships.eu/statistics/557422466" target="_blank">Yurizono_Seia_</a></p>
    <p>Built with Vue.js</p>
    <button class="donation" @click="$">OPTIONAL</button>
    <p class="version">Site version 2.1</p>
  </div>

  <div id="intro">
    <div id="about">
      <p>NTT Community is a World of Warships clan group based in the EU region.</p>
      <p>Comprising of 4 different clans; [NTT] Entity, [N7T] Octo, [N77] Bates, [NT7] Before, and more than 500 members
        on our
        Discord server, NTT Community is one of the biggest and most active communities on the EU region</p>
    </div>
  </div>

  <div id="why_join_us">
    <h2>Why NTT?</h2>

    <div class="cards">
      <div class="card">
        <h3>Activity</h3>
        <p>We are a very active community. With a few dozen players and active divisions every evening, You will never
          feel lonely or left out.</p>
      </div>

      <div class="card">
        <h3>Competitive</h3>
        <p>We strive to reach the highest ratings possible in every Clan Battle season and be as successful as possible
          in tournaments.</p>
      </div>

      <div class="card">
        <h3>Unity</h3>
        <p>All players, regardless of skill level, nationality or competitiveness are welcomed. We offer a friendly
          enviroment where both competitive and non-competitive players can hangout and enjoy the game together.</p>
      </div>
    </div>
  </div>

  <div id="clan-war-ratings">
    <h2>Clan Battles S29: Sea Lion results</h2>
    <div class="clans">
      <Clan v-for="(clan, index) in API_DATA().DATA!.clan_wars"
            :i="index"
            :data="clan"
      />
    </div>
  </div>

  <Members v-if="page === 'members'" :toggle="toggle"/>
  <Tools v-if="page === 'tools'" :toggle="toggle"/>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
}

#about-dropdown {
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 100;
  width: 20%;
  height: 20%;
  background-color: rgb(25, 25, 25);
  border-radius: 10px;

  .donation:hover { background-color: #45597e; }
  .donation {
    background-color: #617fb3;
    border: none;
    transition: background-color 0.25s;

    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 14px;
    margin: 0;
  }

  .version {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 14px;
    margin: 0;
  }
}

#navbar {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  .members, .about, .tools {
    height: 60px;
    border-radius: 0;
    background: transparent;
  }

  .discord:hover {
    background-color: #5056af;
  }

  .discord {
    height: 40px;
    background-color: #646cff;
    transition: border-color 0.25s;

    position: absolute;
    right: 30px;
  }
}

#title {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.1);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    font-size: 40px;
    font-weight: 600;
  }

  .members { left: 30px; }
  .about { left: 150px; }
  .tools { left: 250px; }
  .discord { right: 30px; }
  .members, .discord, .about, .tools {
    position: absolute;
    top: 15px;
    height: 40px;
    background: transparent;
    border: none;
    transition: background-color 0.25s;
  }

  .members:hover, .discord:hover, .about:hover, .tools:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
}

#intro {
  padding-top: 80px;
  height: 500px;

  #about {
    padding-top: 80px;
    width: 100%;

    p {
      font-size: 20px
    }
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  .card {
    margin: 10px;
    width: 30%;
    background-color: rgba(51, 50, 50, 0.8);
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);

    p {
      padding: 20px;
    }

    h3 {
      padding-top: 30px;
    }
  }
}

#why_join_us {
  margin-top: 100px;
  height: 600px;
}

#clan-war-ratings {
  display: flex;
  flex-direction: column;
  align-items: center;

  .clans {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media screen and (max-width: 500px) {
  /* Menu button */
  .mobile-menu {
    height: 60px;
    width: 60px;
    border-radius: 0;

    img { height: 100%; }
  }

  #title {
    height: 60px;
    justify-content: space-between;

    p { margin-left: 10px; }
    z-index: 100;
  }

  #navbar {
    display: flex;
    justify-content: flex-end;
    z-index: 100;
  }

  #mobile_sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: rgb(25, 25, 25);

    .donation {
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 14px;
      margin: 0;
      background-color: #617fb3;
      border: none;
      transition: background-color 0.25s;
    }

    .discord {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 40px;
      border: none;
      margin: 0;
      background-color: #646cff;
    }

    .wrapper {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 100%;
    }

    .version {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-size: 16px;
      margin: 0;
    }
  }

  #intro { height: 100%; }

  .cards {
    width: 100%;
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 10px;
    }
  }

  #why_join_us { height: 100%; }

  #clan-war-ratings { padding-top: 100px; }
}

a {
  color: #719ad1;
  text-decoration: none;
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-active {
  transition-delay: 0.1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>