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
        return db.query(`SELECT TEN_HP, PHONG_HOC, TEN_LOP, TIET_BAT_DAU, TIET_KET_THUC, LICH_HOC FROM LOP_HOC JOIN HOC_PHAN 
        WHERE HOC_PHAN.MA_HP = LOP_HOC.MA_HP AND ID_GIAO_VIEN = '${id_gv}'`);
    },

    getListClass(id_gv) {
        return db.query(`SELECT ID_LOP_HOC, TEN_LOP, HOC_PHAN.MA_HP, TEN_HP FROM LOP_HOC JOIN HOC_PHAN 
        WHERE HOC_PHAN.MA_HP = LOP_HOC.MA_HP AND ID_GIAO_VIEN = '${id_gv}'`)
    },

    getAllClasses(id_gv) {
        return db.query(`SELECT ID_LOP_HOC, TEN_LOP, HOC_PHAN.TEN_HP FROM LOP_HOC, HOC_PHAN WHERE ID_GIAO_VIEN = '${id_gv}' 
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP`);
    },

    getMarkByClass(id_gv, id_lh) {
        return db.query(`SELECT HOC_SINH.ID_HOC_SINH, HOC_SINH.HO_TEN, BANG_DIEM.DIEM_GK, BANG_DIEM.DIEM_CK, BANG_DIEM.DIEM_TK, TEN_HP 
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN 
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH 
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC  
        AND LOP_HOC.MA_HP = HOC_PHAN.MA_HP 
        AND LOP_HOC.ID_GIAO_VIEN = '${id_gv}' 
        AND LOP_HOC.ID_LOP_HOC = '${id_lh}'`);
    },
}