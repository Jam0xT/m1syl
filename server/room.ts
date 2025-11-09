import crypto from "crypto";
import { wsDict } from "./index";

const roomDict: Record<string, Room> = {}; // rm id -> rm obj
const cnxDict: Record<string, string> = {}; // ws id -> rm id

class Room {
    static create(wsID: string, id: string, display: string) {
        const room = new Room();
        roomDict[room.id] = room;
        room.add(wsID, id, display);
        wsDict[wsID].send(JSON.stringify({
            cmd: '#',
            dat: {
                rid: room.id, // room id
                ls: room.getList(),
            }
        }));
    }

    static join(roomID: string, wsID: string, id: string, display: string) {
        const room = roomDict[roomID].add(wsID, id, display);
        wsDict[wsID].send(JSON.stringify({
            cmd: '#',
            dat: {
                rid: roomID,
                ls: room.getList(),
            }
        }));
    }

    static leave(wsID: string) {
        roomDict[cnxDict[wsID]].del(wsID);
    }

    static getNewID(): string {
        const charList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fixedIDLen = 6;
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        let val = arr[0];
        let id = '';
        while (val > 0) {
            id += charList[val % charList.length];
            val = (val - val % charList.length) / charList.length;
        }
        while (id.length < fixedIDLen) {
            id += '0';
        }
        return id;
    }

    id: string;
    rdCnt: number = 0; // rd = short for 'ready'; cnt = short for 'count'
    cnx: Record<string, CnxState> = {}; // cnx = short for 'connection'; ws id -> cnx state

    constructor() {
        this.id = Room.getNewID();
        roomDict[this.id] = this;
    }

    getList() {
        return Object.values(this.cnx).map((state: CnxState) => {
            return {
                rd: state.ready,
                dis: state.display,
                id: state.id
            }
        });
    }

    add(wsID: string, id: string, display: string) {
        cnxDict[wsID] = this.id;
        this.cnx[wsID] = {
            ready: false,
            display: display,
            id: id,
            wsID: wsID
        } as CnxState;
        this.broadcast(() => {
            return {
                cmd: '+',
                dat: {
                    id: id,
                    dis: display
                }
            };
        }, wsID);
        return this;
    }

    del(wsID: string) {
        this.broadcast(() => {
            return {
                cmd: '-',
                dat: {
                    id: this.cnx[wsID].id,
                }
            };
        }, wsID);
        delete cnxDict[wsID];
        delete this.cnx[wsID];
        return this;
    }

    broadcast(getMsg: () => object, exceptWSID?: string) {
        Object.values(this.cnx).forEach(state => {
            if (state.wsID != exceptWSID) {
                wsDict[state.wsID].send(JSON.stringify(getMsg()));
            }
        });
    }

    ready(wsID: string) {

    }
}

type CnxState = {
    ready: boolean,
    display: string,
    id: string,
    wsID: string
}

export default Room;