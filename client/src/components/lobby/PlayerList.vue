<script setup lang="ts">
import { roomStore } from "../../stores/roomStore.ts";

const room = roomStore();
</script>

<template>
    <div class="player-list-wrapper">
        <div v-for="state in room.playerList">
            <div class="player-element">
                {{ state.display }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.player-list-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.player-element {
    font-size: 2rem;
    margin: 0.5rem 0.5rem;
    color: rgb(var(--clr5));
}
</style>