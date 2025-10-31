<script setup lang="ts">
import { global } from '../../stores/global.ts';
const store = global();

function goMain() {
    store.show_main();
}

</script>

<template>
    <button class="back-button" @click="goMain">
        < Back
    </button>
</template>

<style scoped>
.back-button {
    font-family: 'ComicRelief-Bold', sans-serif;
    font-size: 3rem;
    color: rgb(var(--clr2)); /* Match title color */
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    text-shadow: 3px 3px rgba(var(--clr2d), 0.7);
}

.back-button:hover {
    text-shadow: 5px 5px rgba(var(--clr2d), 0.7); /* Outer, stronger glow */
}
</style>