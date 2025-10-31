<script setup lang="ts">
</script>

<template>
<div>
    <div class="account-display">
        <img class="account-icon" src="../../assets/account.svg" alt="github" width="32" height="32"/>
        <p class="account-id">
            Connecting...
        </p>
    </div>
</div>
</template>

<style scoped>
.account-display {
    background: none;
    border: none;
    padding: 5px 5px;
    display: flex;
    flex-direction: row;
}

.account-icon {
    width: 3rem;
    height: 3rem;
    filter: drop-shadow(3px 3px rgba(var(--clr1), 0.5));
}

.account-id {
    margin: 0;
    padding-left: 1rem;
    padding-top: 0.5rem;
    font-family: ComicRelief-Bold, sans-serif;
    font-size: 1.5rem;
    color: rgb(var(--clr1));
    text-align: left;
    text-shadow: 2px 2px rgba(var(--clr1), 0.5);
}
</style>