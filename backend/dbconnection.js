'user strict';

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chats',
    password: 'alex02',
    port: 5432,
})

module.exports = db;