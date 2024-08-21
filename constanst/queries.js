const GET_ALL_MESSAGES_QUERY = `select message, username from messages`
const INSERT_NEW_MESSAGE_QUERY = "insert into messages(username, message) values(?, ?)";

module.exports = {
    GET_ALL_MESSAGES_QUERY,
    INSERT_NEW_MESSAGE_QUERY
}