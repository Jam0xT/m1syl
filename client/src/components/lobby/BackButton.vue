<script setup lang="ts">
import { globalStore } from '../../stores/globalStore.ts';
const store = globalStore();

function goMain() {
    store.view = 'main';
    store.show_main(store.hide_lobby);
}

</script>

<template>
    <button class="back-button" @click="goMain">
        < Back
    </button>
</template>

<style scoped>
.back-button {
    font-size: 3rem;
    color: rgb(var(--clr2)); /* Match title color */
    background: none;
    border: none;
    cursor: pointer;
    padding: .6rem 1.2rem;
    text-shadow: .2rem .2rem rgba(var(--clr2d), 0.7);
}

.back-button:hover {
    text-shadow: .3rem .3rem rgba(var(--clr2d), 0.7); /* Outer, stronger glow */
}
</style>