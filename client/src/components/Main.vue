<script setup lang="ts">
import PlayButton from "./main/PlayButton.vue";
import GithubIcon from "./main/GithubIcon.vue";
import Title from "./main/Title.vue";
import AccountDisplay from "./main/AccountDisplay.vue";
import AccountButton from "./main/AccountButton.vue";

import { globalStore } from '../stores/globalStore.ts';
import { onMounted, ref } from 'vue';
import gsap from "gsap";

const global = globalStore();

const controller = {
    container: null as null | HTMLElement,
    animator: null as unknown as gsap.core.Timeline,
    visible: ref(true),
    init() {
        this.container = document.querySelector('.main');
        this.animator = gsap.timeline().set(
            this.container,
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }
        );
    },
    hide(immediate?: Function) {
        if (this.animator.isActive())
            return ;
        if (immediate)
            immediate();
        this.animator = gsap.timeline().to(
            this.container,
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: .5,
                ease: 'power4.out',
                onComplete: () => {
                    this.visible.value = false;
                },
            }
        );
    },
    show(next?: Function) {
        if (this.animator.isActive())
            return ;
        this.visible.value = true;
        this.animator = gsap.timeline().to(
            this.container,
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: .5,
                ease: 'power4.out',
                onComplete: () => {
                    if (next)
                        next();
                }
            }
        );
    }
};

global.hide_main = controller.hide.bind(controller);
global.show_main = controller.show.bind(controller);

onMounted(() => {
    controller.init();
});
</script>

<template>
    <div class="main" v-show="controller.visible.value">
        <Title class="title-cpnt"/>
        <PlayButton class="play-button-cpnt"/>
        <GithubIcon class="github-icon-cpnt"/>
        <AccountDisplay class="account-display-cpnt"/>
        <AccountButton class="account-button-cpnt"/>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-image: url('../assets/bg/bg.svg');
    background-position: center;
    background-size: cover;
    flex-direction: column;
    position: absolute;
    z-index: 20;
}

.title-cpnt {
    transform: translate(4vh, -18vh);
}

.play-button-cpnt {
    transform: translateY(-15vh);
}

.github-icon-cpnt {
    position: absolute;
    top: 1rem;
    right: 1rem;
}

.account-display-cpnt {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
}

.account-button-cpnt {
    transform: translateY(-12vh);
}
</style>