import { defineStore } from 'pinia';

export const global = defineStore('global', {
    state: () => ({
        hide_main: null as unknown as Function,
        show_main: null as unknown as Function,

        hide_lobby: null as unknown as Function,
        show_lobby: null as unknown as Function,

        hide_account: null as unknown as Function,
        show_account: null as unknown as Function,
    }),
    actions:{

    }
});