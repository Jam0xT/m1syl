import crypto from "crypto";

const roomDict: Record<string, Room> = {}; // rm id -> rm obj
const CnxDict: Record<string, string> = {}; // ws id -> rm id

class Room {
    static create() {
        return new Room();
    }

    static join(wsID: string, roomID: string) {
        roomDict[roomID].add(wsID);
    }

    static leave(wsID: string) {
        roomDict[CnxDict[wsID]].del(wsID);
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

    roomID: string;
    rdCnt: number = 0; // rd = short for 'ready'; cnt = short for 'count'
    cnx: Record<string, CnxState> = {}; // cnx = short for 'connection'

    constructor() {
        this.roomID = Room.getNewID();
        roomDict[this.roomID] = this;
    }

    add(wsID: string) {
        this.cnx[wsID] = {rd: false} as CnxState;
    }

    del(wsID: string) {
        delete this.cnx[wsID];
    }

    ready(wsID: string) {

    }
}

type CnxState = {
    rd: boolean,
}

export default Room;