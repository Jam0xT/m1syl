<script setup lang="ts">
function toGithubLink() {
    window.open('https://github.com/Jam0xT/m1syl', '_blank');
}
</script>

<template>
<div>
    <button class="github-button" @click="toGithubLink">
        <img class="github-icon" src="../../assets/github.svg" alt="github" width="32" height="32"/>
    </button>
</div>
</template>

<style scoped>
.github-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 5px;
}

.github-icon {
    width: 4rem;
    height: 4rem;
    filter: drop-shadow(3px 3px rgba(var(--clr1), 0.5));
}

.github-icon:hover {
    filter: drop-shadow(5px 5px rgba(var(--clr1), 0.5));
}
</style>