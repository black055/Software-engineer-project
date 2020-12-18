const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'sql10.freemysqlhosting.net',
    port: 3306,
    user: 'sql10382784',
    password: 'jUdRJjIDmU',
    database: 'sql10382784',
    connectionLimit: 100,
    dateStrings: ['DATE','DATETIME'],
    charset : 'utf8mb4'
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    query: pool_query,
    getAll: (tableName) => pool_query(`SELECT * FROM ${tableName}`),
};