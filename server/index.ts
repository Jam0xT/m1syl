import express from 'express';
import config from './m1syl.config';

const app = express();

app.post('/api/auth/login', (req, res) => {
    
});

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});