import express from 'express';
import config from './m1syl.config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import cors from 'cors';

const mongoClient = new MongoClient(config.mongodb_uri);
const privateKey = crypto.randomBytes(64).toString('hex');
const accountCollection = mongoClient.db('m1syl').collection('accounts');
const app = express();

const whitelist = ['http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
        } else if (whitelist.indexOf(origin!) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!!'));
        }
    },
    credentials: true, // not sure what it does but gemini says we need this for cookies
}));

app.use(express.json());

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