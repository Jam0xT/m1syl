<script setup lang="ts">
import { roomStore } from "../../stores/roomStore.ts";
import { ref } from 'vue';

const room = roomStore();

const roomIDInput = ref('');
const roomIDRegex = /^[a-zA-Z0-9]{6}$/;

function tryJoin() {
    if (roomIDRegex.test(roomIDInput.value)) {
        room.reqJoin(roomIDInput.value);
    } else {
        // invalid id!
    }
}
</script>

<template>
    <button
        type="button"
        @click="tryJoin"
    >Join</button>
    <input
        id="roomID"
        v-model="roomIDInput"
        placeholder="Enter ID here."
        autocomplete="off"
    />
</template>

<style scoped>
button {
    font-size: 3rem;
    margin-top: 1rem;
}

input {
    margin-top: 1rem;
    font-size: 2rem;
    width: 20rem;
}
</style>