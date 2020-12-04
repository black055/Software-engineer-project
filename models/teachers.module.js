const db = require('../utils/db');

const TABLE_ACCOUNT_TEACHER = 'ACCOUNT_GIAO_VIEN';
const TABLE_TEACHER = 'GIAO_VIEN';

module.exports = {
    getAll() {
        return  db.getAll(TABLE_TEACHER);
    },

    getAllAccounts() {
        return db.getAll(TABLE_ACCOUNT_TEACHER);
    },

    getSchedule(id_gv) {
        return db.query(`SELECT TEN_HP, PHONG_HOC, TEN_LOP, TIET_BAT_DAU, TIET_KET_THUC FROM LOP_HOC JOIN HOC_PHAN 
        WHERE HOC_PHAN.MA_HP = LOP_HOC.MA_HP AND ID_GIAO_VIEN = '${id_gv}'`);
    },

    getListClass(id_gv) {
        return db.query(`SELECT ID_LOP_HOC, TEN_LOP, HOC_PHAN.MA_HP, TEN_HP FROM LOP_HOC JOIN HOC_PHAN 
        WHERE HOC_PHAN.MA_HP = LOP_HOC.MA_HP AND ID_GIAO_VIEN = '${id_gv}'`)
    },
}