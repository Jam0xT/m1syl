import { defineStore } from "pinia";
import { accountStore } from "./accountStore.ts";
import config from '../../m1syl.config';

export const roomStore = defineStore('room', {
    state: () => ({
        id: '',
        playerList: [] as PlayerState[],
        ws: null as WebSocket | null,
    }),
    actions: {
        init() {
            this.ws = (() => {
                try {
                    const ws = new WebSocket(`${config.lobby_url}/room`);
                    ws.onopen = () => {
                        ws.send(JSON.stringify({
                            cmd: 'i',
                            dat: accountStore().accessToken,
                        }));
                        console.log('WebSocket opened');
                    };
                    ws.onmessage = (event) => {
                        const msg = JSON.parse(event.data);
                        switch (msg.cmd) {
                            case '#': // joins a new room
                                this.id = msg.dat.rid;
                                this.playerList = msg.dat.ls.map((state: {dis: string, rd: boolean, id: string}) => {
                                    return {display: state.dis, ready: state.rd, id: state.id} as PlayerState;
                                });
                                break;
                            case '+': // someone else joins
                                this.playerList.push({display: msg.dat.dis, id: msg.dat.id, ready: false});
                                break;
                            case '-': // someone else leaves
                                this.playerList.splice(this.playerList.findIndex((state) => {return state.id === msg.dat.id}), 1);
                                break;
                            case '!': // leaves current room, might be forced to (closed/been kicked from)
                                this.id = '';
                                this.playerList = [];
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
            this.id = '';
            this.playerList = [];
        }
    }
});

type PlayerState = {
    id: string;
    display: string;
    ready: boolean;
}