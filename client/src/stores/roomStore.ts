import { defineStore } from "pinia";
import config from '../../m1syl.config';

export const roomStore = defineStore('room', {
    state: () => ({
        roomID: '',
        playerList: [],
        ws: null as WebSocket | null,
    }),
    actions: {
        init() {
            this.ws = (() => {
                try {
                    const ws = new WebSocket(config.lobby_url);
                    ws.onopen = () => {
                        console.log('WebSocket opened');
                    };
                    ws.onmessage = (event) => {
                        const msg = JSON.parse(event.data);
                        switch (msg.cmd) {
                            case '#':
                                this.roomID = msg.dat;
                                break;
                            case '+':

                                break;
                            case '-':
                                break;
                            case '!':
                                break;
                            default:
                                console.error(`Unknown command: ${msg.cmd}`);
                        }
                    };
                    ws.onclose = () => {
                        console.log('WebSocket closed');
                    };
                    ws.onerror = (e) => {
                        console.error(`WebSocket error: ${e}`);
                    };
                    return ws;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            })();
        },
        reqCreate() {
            if (this.ws === null) {
                console.error('WebSocket is null');
                return ;
            }
            this.ws.send(JSON.stringify({
                cmd: 'c',
            }));
        },
        reqJoin(roomID: string) {
            if (this.ws === null) {
                console.error('WebSocket is null');
                return ;
            }
            this.ws.send(JSON.stringify({
                cmd: 'j',
                dat: roomID,
            }));
        },
        reqLeave() {
            if (this.ws === null) {
                console.error('WebSocket is null');
                return ;
            }
            this.ws.send(JSON.stringify({
                cmd: 'l',
            }));
        }
    }
});