<script setup lang="ts">
import { roomStore } from '../../stores/roomStore';
const room = roomStore();

async function copy() {
    console.log('copy');
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(room.id);
        } catch (error) {
            console.error('Error copying Room ID to clipboard:');
            console.error(error);
        }
    } else {
        console.warn('Not HTTPS connection, falling back to legacy copy method.')
        legacyCopy();
    }
}

function legacyCopy() {
    console.warn('Warning: Using legacy unsafe copy method! Use HTTPS for modern safe copying if possible!');
    const text = document.createElement('textarea');
    text.value = room.id;
    text.style.position = 'absolute';
    text.style.opacity = '0';
    document.body.appendChild(text);
    text.focus();
    text.select();
    try {
        const res = document.execCommand('copy');
        if (!res) {
            console.error('Failed to copy with legacy copy method.');
        }
    } catch (error) {
        console.error('Failed to copy with legacy copy method:');
        console.error(error);
    } finally {
        document.body.removeChild(text);
    }
}
</script>

<template>
    <div class="room-id-display" @click="copy">
        {{ room.id ? `#${room.id}` : 'Not in a room.' }}
    </div>
</template>

<style scoped>
.room-id-display {
    font-size: 4rem;
    color: rgb(var(--clr2));
    text-shadow: .15rem .15rem rgba(var(--clr2), 0.5);
    cursor: pointer;
}
</style>