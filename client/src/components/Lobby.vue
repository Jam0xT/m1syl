<script setup lang="ts">
import Title from './lobby/Title.vue';
import BackButton from "./lobby/BackButton.vue";
</script>

<template>
    <div class="lobby">
        <Title/>
        <BackButton class="back-button-cpnt"/>
    </div>
</template>

<style scoped>
.lobby {
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg/bg_lobby.svg");
    background-size: cover;
    z-index: 10;
}

.back-button-cpnt {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
}
</style>