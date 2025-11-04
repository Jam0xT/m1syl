import { defineStore } from "pinia";
import config from '../../m1syl.config';

export const roomStore = defineStore('room', {
    state: () => ({
        roomID: '',
        playerList: [],
        ws: new WebSocket(config.lobby_url), // might fail to establish connection!
    }),
    actions: {
    }
});