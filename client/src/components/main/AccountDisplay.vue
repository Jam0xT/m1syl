<script setup lang="ts">
import { accountStore } from "../../stores/accountStore.ts";

const account = accountStore();

</script>

<template>
<div>
    <div class="account-display">
        <img class="account-icon" src="../../assets/account.svg" alt="github" width="32" height="32"/>
        <p class="account-id">
            {{ account.id ? `@${account.id}` : 'Not Logged In' }}
        </p>
    </div>
</div>
</template>

<style scoped>
.account-display {
    background: none;
    border: none;
    padding: .3rem .3rem;
    display: flex;
    flex-direction: row;
}

.account-icon {
    width: 3rem;
    height: 3rem;
    filter: drop-shadow(.2rem .2rem rgba(var(--clr1), 0.5));
}

.account-id {
    margin: 0;
    padding-left: 1rem;
    padding-top: 0.5rem;
    font-size: 1.5rem;
    color: rgb(var(--clr1));
    text-align: left;
    text-shadow: .15rem .15rem rgba(var(--clr1), 0.5);
}
</style>