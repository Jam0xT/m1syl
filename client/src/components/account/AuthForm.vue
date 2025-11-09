<script setup lang="ts">
import ErrorMsg from './AuthForm/ErrorMsg.vue';
import './AuthForm/auth-form.css';
import './AuthForm/auth-info.css';

import { accountStore } from "../../stores/accountStore.ts";
import { ref, computed } from 'vue'

const account = accountStore();

const id = ref('');
const pswd = ref('');
const idRegex = /^[a-zA-Z0-9_]+$/;

const isValid = computed(() => {
    return (pswd.value.length > 0)
        && (id.value.length > 0)
        && idRegex.test(id.value);
});

const errorMsgRef = ref<InstanceType<typeof ErrorMsg> | null>(null);
function err(msg: string) {
    if (errorMsgRef.value) {
        errorMsgRef.value.showMsg(msg);
    }
}

async function submit() {
    console.log(id.value, pswd.value);
    const result = await account.reqLogin(id.value, pswd.value);
    switch (result) {
        case 0:
            login();
            break;
        case 1:
            err('Network Error');
            break;
        case 2:
            err('Login Failed');
            break;
        case 3:
            err('Bad Response');
            break;
        default:
            err('Unknown Error');
    }
}

function login() {
    pswd.value = '';
}

function logout() {
    id.value = '';
    account.logout();
}

</script>

<template>
    <div class="auth-form-container">
        <Transition name="auth-form-tr">
            <div class="auth-form" v-if="!account.loggedIn">
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
                <ErrorMsg class="error-msg-cpnt" ref="errorMsgRef"/>
            </div>
        </Transition>
        <Transition name="auth-info-tr">
            <div class="auth-info" v-if="account.loggedIn">
                <h2 class="auth-info-title">Account</h2>
                <div class="auth-info-id-text">
                    Logged in as:
                    <p class="auth-info-id-text-id">{{ account.id }}</p>
                </div>
                <button
                    type="button"
                    @click="logout"
                >Logout</button>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.auth-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
}
</style>