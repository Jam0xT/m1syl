<script setup lang="ts">
import { ref, defineExpose } from 'vue';
const msg = ref('');
const isVisible = ref(false);
let visibleStack = 0;

const DISMISS_DELAY = 1500; // ms

function showMsg(msg_: string) {
    msg.value = msg_;
    isVisible.value = true;
    visibleStack++;
    setTimeout(() => {
        visibleStack--;
        if (visibleStack === 0) {
            isVisible.value = false;
        }
    }, DISMISS_DELAY);
}

defineExpose({showMsg});
</script>

<template>
    <div class="error-msg-container">
        <div class="error-msg-text" :class="{'visible': isVisible}">
            {{ msg }}
        </div>
    </div>
</template>

<style scoped>
.error-msg-text {
    font-size: 2rem;
    color: rgba(var(--clr6), 1);
    opacity: 0;
    transform: translateY(2rem);
    transition: opacity 0.1s var(--ease-out-cubic), transform 0.1s var(--ease-out-cubic);
}
.error-msg-text.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>