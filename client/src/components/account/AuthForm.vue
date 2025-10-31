<script setup lang="ts">
import { ref, computed } from 'vue'
import accountManager from "../../scripts/account.ts";

const id = ref('');
const pswd = ref('');
const id_regex = /^[a-zA-Z0-9_]+$/;

const isValid = computed(() => {
    return (pswd.value.length > 0)
        && (id.value.length > 0)
        && id_regex.test(id.value);
});

function submit() {
    console.log(id.value, pswd.value);
    accountManager.reqLogin(id.value, pswd.value);
}
</script>

<template>
    <div class="auth-form">
        <h2 class="auth-form-title">Login / Register</h2>
        <form @submit.prevent="submit">
            <label for="id">ID (Username)</label> <br/>
            <input
                id="id"
                type="text"
                v-model="id"
                placeholder="Enter your ID here."
                required
                autocomplete="off"
            /> <br/>
            <label for="pswd">Password</label> <br/>
            <input
                id="pswd"
                type="password"
                v-model="pswd"
                placeholder="Enter your password here."
                required
                autocomplete="off"
            /> <br/>
            <button
                type="submit"
                :disabled="!isValid"
            >Submit</button>
        </form>
    </div>
</template>

<style scoped>
.auth-form {
    background: rgba(0, 0, 0, 0);
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 3rem;
    padding-right: 3rem;
}
.auth-form-title {
    font-family: ComicRelief-Bold, sans-serif;
    font-size: 3rem;
    color: rgb(var(--clr5));
    text-shadow: .2rem .2rem rgba(var(--clr5), 0.5);
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
}
label {
    font-family: ComicRelief-Bold, sans-serif;
    font-size: 1.2rem;
    color: rgb(var(--clr5));
    margin: 0;
    padding: 0;
}
input {
    font-family: ComicRelief-Bold, sans-serif;
    font-size: 1.5rem;
    color: rgba(var(--clr3), 1);
    text-align: center;

    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-bottom: .15rem solid rgba(127, 255, 212, .5);
    outline: none;

    margin-bottom: 2rem;
}
input::placeholder {
    color: rgba(0, 71, 135, 1);
}
button {
    --clr: 0, 235, 255;
    font-family: ComicRelief-Bold, sans-serif;
    font-size: 2rem;
    color: rgba(var(--clr5), 1);
    text-align: center;

    padding-left: 0.5rem;
    padding-right: 0.5rem;

    outline: none;
    border: none;

    cursor: pointer;

    background-color: rgba(0, 0, 0, 0);
}

button:hover:not(:disabled) {
    color: rgba(var(--clr), 1);
}

button:hover:disabled {
    cursor: not-allowed;
}

button:active:not(:disabled) {
    color: rgba(var(--clr), 0.5);
}
</style>