<script setup lang="ts">
import Title from './lobby/Title.vue';
import BackButton from "./lobby/BackButton.vue";
import RoomIDDisplay from "./lobby/RoomIDDisplay.vue";
import RoomCreateButton from "./lobby/RoomCreateButton.vue";
import RoomJoinButton from "./lobby/RoomJoinButton.vue";
import RoomLeaveButton from "./lobby/RoomLeaveButton.vue";

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

const isInLobby = ref(false);

</script>

<template>
    <div class="lobby" v-show="controller.visible.value">
        <Title class="lobby-title-cpnt"/>
        <Transition class="not-in-lobby-tr">
            <div class="not-in-lobby" v-if="!isInLobby">
                <RoomCreateButton class="room-create-button-cpnt"/>
                <RoomJoinButton class="room-join-button-cpnt"/>
            </div>
        </Transition>
        <Transition class="in-lobby">
            <div class="in-lobby" v-if="isInLobby">
                <RoomIDDisplay class="room-id-display-cpnt"/>
                <RoomLeaveButton class="room-leave-button-cpnt"/>
            </div>
        </Transition>
        <BackButton class="back-button-cpnt"/>
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

.lobby-title-cpnt {
    margin-top: 3rem;
    margin-bottom: 0;
}

.room-create-button-cpnt {
    margin-top: 1rem;
}

.room-join-button-cpnt {
    margin-top: 1rem;
}

.back-button-cpnt {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
}

.not-in-lobby {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.in-lobby {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>