//mysql
const { query } = require('../mysql/mysql.connection');

//constans/events
const { NEW_MESSAGE_EVENT } = require('../constanst/events');

//constans/queries
const { INSERT_NEW_MESSAGE_QUERY, GET_ALL_MESSAGES_QUERY } = require('../constanst/queries');

//schema
const schema = require('../schema/message.schema.json');

//ajv
const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schema);

async function incomingMessageController(io, data, callback) {
    try {
        if(!validate(data)) throw { message: "Invalid request." };
        const { username, message } = data;
        const result = await query({
            query: INSERT_NEW_MESSAGE_QUERY,
            params: [username, message],
        });
        if(!result) throw 'Error server. Invalid query.';
        const messages = await query({query: GET_ALL_MESSAGES_QUERY});
        io.emit(NEW_MESSAGE_EVENT, messages);
        callback({ ok: true });
    } catch (error) {
        console.log(error);
        callback({ ok: false });
        console.log("ERROR AT FILE <incomingMessages.controller.js>");
    }
}

module.exports = {
    incomingMessageController
}