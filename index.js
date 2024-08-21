//cors
const cors = require('cors');
//express
const express = require('express');
//http
const {createServer} = require("node:http");
//router
const { router } = require('./router/router');
//socket
const { createSocket } = require('./socket/socket');

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());
app.use(router);

const io = createSocket(server);

//dotenv
require('dotenv').config();

//sockets-controller
const { emitAllMessages } = require('./controller/emitAllMessage.controller');
const { incomingMessageController } = require('./controller/incomingMessages.controller');

//constants/events
const { CONNECTION_EVENT, INCOMING_MESSAGE_EVENT } = require('./constanst/events');

io.on(CONNECTION_EVENT, (socket)=> {
    // new connections
    emitAllMessages(socket);

    // message entry
    socket.on(
        INCOMING_MESSAGE_EVENT, 
        (data, callback)=> incomingMessageController(io, data, callback)
    );
});

server.listen(8080, ()=> {
    console.log(`Server is running at http://localhost:${process.env.PORT}/`);
});
