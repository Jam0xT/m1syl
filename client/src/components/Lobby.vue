<script setup lang="ts">
import Title from './lobby/Title.vue';
import BackButton from "./lobby/BackButton.vue";
import RoomIDDisplay from "./lobby/RoomIDDisplay.vue";
import RoomCreateButton from "./lobby/RoomCreateButton.vue";
import RoomJoinButton from "./lobby/RoomJoinButton.vue";
import RoomLeaveButton from "./lobby/RoomLeaveButton.vue";
import PlayerList from "./lobby/PlayerList.vue";

import { ref } from 'vue';
import { globalStore } from "../stores/globalStore.ts";
import { roomStore } from "../stores/roomStore.ts";

const global = globalStore();
const room = roomStore();

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
        <Transition class="not-in-lobby-tr">
            <div class="not-in-lobby" v-if="!room.id">
                <RoomCreateButton class="room-create-button-cpnt"/>
                <RoomJoinButton class="room-join-button-cpnt"/>
            </div>
        </Transition>
        <Transition class="in-lobby">
            <div class="in-lobby" v-if="room.id">
                <RoomIDDisplay class="room-id-display-cpnt"/>
                <RoomLeaveButton class="room-leave-button-cpnt"/>
                <PlayerList class="player-list-cpnt"/>
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

.player-list-cpnt {
    position: absolute;
    transform: translateX(-25rem);
}

.room-create-button-cpnt {
    margin-top: 1rem;
}

.room-join-button-cpnt {
    margin-top: 1rem;
}

.room-id-display-cpnt {
    margin-top: 2rem;
}

.room-leave-button-cpnt {
    margin-top: 2rem;
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