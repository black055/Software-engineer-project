const db = require('../utils/db');

const TABLE_ACCOUNT_TEACHER = 'ACCOUNT_GIAO_VIEN';
const TABLE_TEACHER = 'GIAO_VIEN';

module.exports = {
    getAll() {
        return  db.getAll(TABLE_TEACHER);
    },

    getAllAccounts() {
        return db.getAll(TABLE_ACCOUNT_TEACHER);
    }
}