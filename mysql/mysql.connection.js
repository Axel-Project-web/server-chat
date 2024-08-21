//mysql
const mysql = require('mysql2/promise.js');

const config_conn = {
    user: 'root',
    database: 'chat',
    password: 'admin',
    host: 'localhost',
}

async function query({
    query, 
    params = [],
}) {
    try {
        const connection = await mysql.createConnection(config_conn);
        const [results] = await connection.query(query, params);
        connection.end();
        return results;
    } catch (error) {
        console.log(error);
        console.log("ERROR AT FILE <mysql.connection.js>");
        return null;
    }
}

module.exports = { query };