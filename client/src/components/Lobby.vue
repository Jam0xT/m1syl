<script setup lang="ts">
import Title from './lobby/Title.vue';
import BackButton from "./lobby/BackButton.vue";
import RoomIDDisplay from "./lobby/RoomIDDisplay.vue";

import { ref } from 'vue';
import { globalStore } from "../stores/globalStore.ts";

const global = globalStore();

const controller = {
    visible: ref(false),
    show() {
        this.visible.value = true;
    },
    hide() {
        this.visible.value = false;
    },
};

global.show_lobby = controller.show.bind(controller);
global.hide_lobby = controller.hide.bind(controller);

</script>

<template>
    <div class="lobby" v-show="controller.visible.value">
        <Title class="lobby-title-cpnt"/>
        <BackButton class="back-button-cpnt"/>
        <RoomIDDisplay class="room-id-display-cpnt"/>
    </div>
</template>

<style scoped>
.lobby {
    position: absolute;
    display: flex;
    flex-direction: column;
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