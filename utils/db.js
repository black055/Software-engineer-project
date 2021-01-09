const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'mysql-18180-0.cloudclusters.net',
    port: 18180,
    user: 'lethanhviet',
    password: '22102000',
    database: 'cnpm',
    connectionLimit: 50,
    dateStrings: ['DATE','DATETIME'],
    charset : 'utf8mb4'
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    query: pool_query,
    getAll: (tableName) => pool_query(`SELECT * FROM ${tableName}`),
};