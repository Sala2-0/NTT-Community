<script setup lang="ts">
import { ref, onMounted } from 'vue'

const selected = ref<HTMLElement | null>(null);
const dropzones = ref<HTMLElement[] | null>(null);

function select(e: MouseEvent) {
  const card = e.target as HTMLElement;

  if (card.parentElement?.classList.contains('dropzone'))
    return;

  if (selected.value !== null) {
    selected.value!.classList.remove('selected');
    selected.value = null;
  }

  selected.value = card;
  selected.value.classList.add('selected');

  highlight();
}

function highlight() {
  for (const dropzone of dropzones.value!) {
    dropzone.classList.add("drop-select");
  }
}

function unhighlight() {
  for (const dropzone of dropzones.value!)
    dropzone.classList.remove("drop-select");
}

function drop(e: MouseEvent) {
  if (selected.value === null) return;
  if ((e.target as HTMLElement).children.length > 0) return;

  const dropzone = e.target as HTMLElement;
  dropzone.appendChild(selected.value!);

  selected.value!.style.cursor = "not-allowed";
  selected.value!.style.position = "absolute";
  selected.value!.classList.remove('selected');
  selected.value = null;

  unhighlight()
}

onMounted(() => {
  dropzones.value = Array.from(document.querySelectorAll('.dropzone'));
});
</script>

<template>
  <div id="cardzzz">
    <div id="dropzones">
      <div class="dropzone" position="0" @click="drop"></div>
      <div class="dropzone" position="1" @click="drop"></div>
      <div class="dropzone" position="2" @click="drop"></div>
      <div class="dropzone" position="3" @click="drop"></div>
    </div>

    <div id="cards_reel">
      <div class="card-wrapper" v-for="i in 5">
        <div class="card" @click="select">
          <p class="name">{{ i }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#cardzzz {
  user-select: none;
}

.card {
  width: 100px;
  height: 150px;
  border-radius: 10px;
  background-color: #5a5656;
  cursor: pointer;

  .name {
    pointer-events: none;
  }
}

#dropzones {
  display: flex;
  position: absolute;
  bottom: 260px;
  left: 50%;
  transform: translateX(-50%);

  .dropzone {
    width: 100px;
    height: 150px;
    border-radius: 10px;
    margin: 10px;
    border: 1px dashed #ccc;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

#cards_reel {
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  width: 100%;
  height: 200px;
  background-color: #3b3b3b;
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  background-color: #000000;
}

.drop-select {
  cursor: pointer;
  user-select: none;
  background: rgba(255, 255, 255, 0.16);
}

.card-wrapper {
  margin: 10px;
}
</style>