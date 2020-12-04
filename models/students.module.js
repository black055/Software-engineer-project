const db = require('../utils/db');

const TABLE_ACCOUNT_STUDENT = 'ACCOUNT_HOC_SINH';
const TABLE_STUDENT = 'HOC_SINH';

module.exports = {
    getAll() {
        return  db.getAll(TABLE_STUDENT);
    },

    getAllAccounts() {
        return db.getAll(TABLE_ACCOUNT_STUDENT);
    },

}