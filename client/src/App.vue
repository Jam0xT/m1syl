<script setup lang="ts">
import Main from './components/Main.vue';
import Lobby from './components/Lobby.vue';
import Account from './components/Account.vue';
</script>

<template>
    <div class="app-container">
        <Main/>
        <Lobby/>
        <Account/>
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;

    user-select: none;
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
}
</style>
