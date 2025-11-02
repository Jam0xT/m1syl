<script setup lang="ts">
import { ref } from 'vue'
import { globalStore } from "../../stores/globalStore.ts";
const store = globalStore();

function goLobby() {
    store.view = 'lobby';
    store.hide_main(store.show_lobby);
}

let isHovering = ref(false);
function handleMouseEnter() {
    isHovering.value = true;
}
function handleMouseLeave() {
    isHovering.value = false;
}
</script>

<template>
    <button class="play-button" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="goLobby">
        {{ isHovering ? '> PLAY <' : 'PLAY' }}
    </button>
</template>

<style scoped>
.play-button {
    font-size: 3rem;
    color: rgb(var(--clr2)); /* Match title color */
    background: none;
    border: none;
    cursor: pointer;
    padding: .6rem 1.2rem;
    text-shadow: .2rem .2rem rgba(var(--clr2d), 0.7);
}

.play-button:hover {
    text-shadow: .3rem .3rem rgba(var(--clr2d), 0.7); /* Outer, stronger glow */
}
</style>