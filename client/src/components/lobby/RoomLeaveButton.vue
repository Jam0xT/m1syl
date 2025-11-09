<script setup lang="ts">
import { roomStore } from "../../stores/roomStore.ts";

const room = roomStore();

// the style of this button is automatically found in auth-form.css
</script>

<template>
    <button
        type="button"
        @click="room.reqLeave"
    >Leave</button>
</template>

<style scoped>
button {
    font-size: 3rem;
}
</style>