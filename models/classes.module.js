const db = require('../utils/db');

const TABLE_CLASSES = 'LOP_HOC';

module.exports = {
    getAll() {
        return  db.getAll(TABLE_CLASSES);
    }
}