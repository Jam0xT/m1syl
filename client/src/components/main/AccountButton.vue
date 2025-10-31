<script setup lang="ts">
import { ref } from 'vue'
import { global } from "../../stores/global.ts";
const store = global();

function goAccount() {
    store.view = 'account';
    store.hide_main(store.show_account);
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
    <button class="account-button" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="goAccount">
        {{ isHovering ? '> Account <' : 'Account' }}
    </button>
</template>

<style scoped>
.account-button {
    font-family: 'ComicRelief-Bold', sans-serif;
    font-size: 3rem;
    color: rgb(var(--clr2)); /* Match title color */
    background: none;
    border: none;
    cursor: pointer;
    padding: .6rem 1.2rem;
    text-shadow: .2rem .2rem rgba(var(--clr2d), 0.7);
}

.account-button:hover {
    text-shadow: .3rem .3rem rgba(var(--clr2d), 0.7); /* Outer, stronger glow */
}
</style>