<script setup lang="ts">

import PlayButton from "./main/PlayButton.vue";
import GithubIcon from "./main/GithubIcon.vue";
import Title from "./main/Title.vue";
</script>

<template>
    <div class="main">
        <Title class="title-cpnt"/>
        <PlayButton class="play-button-cpnt"/>
        <GithubIcon class="github-icon-cpnt"/>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-image: url('../assets/bg/bg.svg');
    background-position: center;
    background-size: cover;
    flex-direction: column;
}

.title-cpnt {
    transform: translate(4vh, -18vh);
}

.play-button-cpnt {
    transform: translateY(-15vh);
}

.github-icon-cpnt {
    position: absolute;
    top: 1rem;
    right: 1rem;
}
</style>