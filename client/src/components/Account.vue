<script setup lang="ts">
import BackButton from "./account/BackButton.vue";
import AuthForm from "./account/AuthForm.vue";

import { ref } from 'vue';
import { globalStore } from '../stores/globalStore.ts';
const global = globalStore();

const controller = {
    visible: ref(false),
    show() {
        this.visible.value = true;
    },
    hide() {
        this.visible.value = false;
    }
};

global.show_account = controller.show.bind(controller);
global.hide_account = controller.hide.bind(controller);
</script>

<template>
    <div class="account" v-show="controller.visible.value">
        <BackButton class="back-button-cpnt"/>
        <AuthForm class="auth-form-cpnt"/>
    </div>
</template>

<style scoped>
.account {
    position: absolute;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg/bg_account.svg");
    background-size: cover;
    z-index: 10;
}

.back-button-cpnt {
    position: absolute;
    left: 1rem;
    top: 1rem;
}

.auth-form-cpnt {
    position: relative;
    top: 5rem;
}
</style>