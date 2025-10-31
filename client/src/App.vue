<script setup lang="ts">
import Main from './components/Main.vue';
</script>

<template>
    <div class="app-container">
        <Main/>
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
}
</style>
