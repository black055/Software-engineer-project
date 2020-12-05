const db = require('../utils/db');

const TABLE_COURSES = 'HOC_PHAN';

module.exports = {
    getAll() {
        return db.getAll(TABLE_COURSES);
    }
}