const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'cnpm',
    connectionLimit: 50,
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    query: pool_query,
    getAll: (tableName) => pool_query(`SELECT * FROM ${tableName}`),
};