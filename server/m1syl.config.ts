const config = Object.freeze({
    port: 3000,
    mongodb_uri: 'mongodb://localhost:27017/',
    cors_whitelist: ['http://localhost:5173'],
    ws_port: 8080,
});

export default config;