import { defineStore } from 'pinia';

export const global = defineStore('global', {
    state: () => ({
        hide_main: () => {},
        show_main: () => {},

        hide_lobby: () => {},
        show_lobby: () => {},
    }),
    actions:{

    }
});