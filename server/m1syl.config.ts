const config = Object.freeze({
    port: 3000,
    mongodb_uri: 'mongodb://localhost:27017/',
    cors_whitelist: ['http://localhost:5173'],
    ws_port: 8080,
    guest_id_number_length: 4,
});

export default config;