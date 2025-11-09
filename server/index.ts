import express from 'express';
import config from './m1syl.config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import cors from 'cors';
import uws from 'uWebSockets.js';
import { v4 as UUIDv4 } from 'uuid';
import { getNewGuestID } from "./guest";

import Room from './room';

const wsDict: Record<string, uws.WebSocket<UserData>> = {};
const mongoClient = new MongoClient(config.mongodb_uri);
const privateKey = crypto.randomBytes(64).toString('hex');
const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
        } else if (config.cors_whitelist.indexOf(origin!) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!!'));
        }
    },
    credentials: true, // not sure what it does but gemini says we need this for cookies
}));

app.use(express.json());

const accountCollection = mongoClient.db('m1syl').collection('accounts');
app.post('/api/auth/login', async (req, res) => {
    console.log(req.body);
    const {id, pswd} = req.body;
    const accountDocument = await accountCollection.findOne({'id': id});
    console.log(accountDocument);
    if (accountDocument) {
        const verified = await bcrypt.compare(pswd, accountDocument.pswdh);
        if (verified) {
            const token = jwt.sign({'id': id}, privateKey);
            res.status(200).json({accessToken: token});
        } else {
            res.status(401).json({'error': 'Invalid credentials'});
        }
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pswd, salt);
        await accountCollection.insertOne({
            'id': id,
            'pswdh': hash,
        });
        const accessToken = jwt.sign(
            { // the payload
                'id': id
            },
            privateKey,
            {
                algorithm: 'HS256', // by default, just to tell explicitly
                expiresIn: '15m' // 15 min
            });
        res.status(200).json({'accessToken': accessToken});
    }
});

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});

const wsServer = uws.App()
    .get('/', (res, req) => {
        res.end('ok');
    })
    .ws<UserData>('/room', {
        open: (ws) => {
            const userData = ws.getUserData();
            userData.wsID = UUIDv4();
            wsDict[userData.wsID] = ws;
        },
        message: (ws, message) => {
            const userData = ws.getUserData();
            const parsedMsg = JSON.parse(Buffer.from(message).toString('utf-8')); // {'cmd':<cmd>, 'dat':<data>}
            switch (parsedMsg.cmd) {
                case 'i': // init
                    userData.open = true;
                    const accessToken: string = parsedMsg.dat.accessToken;
                    if (accessToken) {
                        try {
                            jwt.verify(accessToken, privateKey, (error, decoded ) => {
                                if (error) {
                                    console.error(`Verify errors: ${error}`);
                                    return ;
                                }
                                userData.id = (decoded as AccessTokenPayload).id;
                            });
                        } catch (err) {
                            console.error(`Something went wrong when attempting to verify an accessToken: ${err}`);
                        }
                    } else {
                        userData.id = getNewGuestID();
                        console.log(`new guest '${userData.id}'`);
                    }
                    break;
                case 'c': // create
                    if (!userData.open) { break; }
                    Room.create(userData.wsID, userData.id, userData.id);
                    break;
                case 'j': // join
                    if (!userData.open) { break; }
                    const roomID: string = parsedMsg.dat;
                    Room.join(roomID, userData.wsID, userData.id, userData.id);
                    break;
                case 'l': // leave
                    if (!userData.open) { break; }
                    Room.leave(userData.wsID);
                    break;
                default:
                    console.log(`Unknown command ${parsedMsg.cmd}`);
            }
        },
        close: (ws, code, message) => {
            const userData = ws.getUserData();
            if (!userData.open) {
                return;
            }
            Room.leave(userData.wsID);
        },
    })
    .listen(config.ws_port, (token) => {
        if (token) {
            console.log(`WebSocket Server listening on port ${config.ws_port}`);
        } else {
            console.log(`WebSocket Server failed to listen on port ${config.ws_port}`);
        }
    });

type UserData = {
    open: boolean;
    id: string;
    wsID: string;
}

type AccessTokenPayload = {
    id: string;
}

export {
    wsDict,
}