//socket.io
const { Server } = require('socket.io');

const CONFIG = {
    cors: {
        origin: "*"
    }
}

const createSocket = (server) =>  new Server(server, CONFIG)

module.exports = { createSocket };