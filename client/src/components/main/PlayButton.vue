<script setup lang="ts">
import { ref } from 'vue'
let isHovering = ref(false);

function handleMouseEnter() {
    isHovering.value = true;
}

function handleMouseLeave() {
    isHovering.value = false;
}
</script>

<template>
    <button class="play-button" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        {{ isHovering ? '> PLAY <' : 'PLAY' }}
    </button>
</template>

<style scoped>
.play-button {
    font-family: 'ComicRelief-Bold', sans-serif;
    font-size: 3rem;
    color: rgb(var(--clr2)); /* Match title color */
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px 20px;

    will-change: filter;
    transition: text-shadow 300ms, color 300ms;
    text-shadow: 3px 3px rgba(var(--clr2d), 0.7);
}

.play-button:hover {
    color: rgb(var(--clr2));
    text-shadow: 3px 3px rgba(var(--clr2d), 0.7); /* Outer, stronger glow */
}
</style>