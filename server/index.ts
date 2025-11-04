import express from 'express';
import config from './m1syl.config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import cors from 'cors';
import uws from 'uWebSockets.js';
import { v4 as UUIDv4 } from 'uuid';

import Room from './room';

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
        const token = jwt.sign({'id': id}, privateKey);
        res.status(200).json({'accessToken': token});
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
        },
        message: (ws, message) => {
            const userData = ws.getUserData();
            const parsedMsg = JSON.parse(Buffer.from(message).toString('utf-8')); // {'cmd':<cmd>, 'dat':<data>}
            switch (parsedMsg.cmd) {
                case 'c': // create
                    Room.create().add(userData.wsID);
                    break;
                case 'j': // join
                    Room.join(userData.wsID, parsedMsg.dat);
                    break;
                case 'l': // leave
                    Room.leave(userData.wsID);
                    break;
                default:
                    console.log(`Unknown command ${parsedMsg.cmd}`);
            }
        },
        close: (ws, code, message) => {

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
    wsID: string;
}