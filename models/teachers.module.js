const db = require('../utils/db');
const bcrypt = require('bcrypt');

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

    addTeacher(teacher) {
        // techer(id, name, birthday, sex, phone)

        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_TEACHER} WHERE ID_GIAO_VIEN = ?`
            , [teacher.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Đã tồn tại giáo viên có ID tương ứng
                    resolve(false);
                } else {
                    // Chưa tồn tại giáo viên có ID tương ứng
                    db.query(`INSERT INTO ${TABLE_TEACHER}(ID_GIAO_VIEN,HO_TEN,NGAY_SINH,GIOI_TINH,SDT)
                                VALUES ('${teacher.id}','${teacher.name}','${teacher.birthday}','${teacher.sex}','${teacher.phone}')`).then(() => {
                        bcrypt.hash('12345678', 10, (e, hash) => {
                            db.query(`INSERT INTO ${TABLE_ACCOUNT_TEACHER}(ID_GIAO_VIEN,MAT_KHAU) VALUES ('${teacher.id}','${hash}')`).then(() => resolve(true));
                        });
                    });
                };
            });
        });
    },

    editTeacher(teacher) {
        // techer(id, name, birthday, sex, phone)

        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_TEACHER} WHERE ID_GIAO_VIEN = ?`
            , [teacher.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Đã tồn tại giáo viên có ID tương ứng
                    db.query(`UPDATE ${TABLE_TEACHER} SET HO_TEN ='${teacher.name}',NGAY_SINH ='${teacher.birthday}',
                    GIOI_TINH ='${teacher.sex}',SDT='${teacher.phone}' WHERE ID_GIAO_VIEN = '${teacher.id}';`).then(() => resolve(true));
                } else {
                    // Không tồn tại giáo viên có ID tương ứng
                    resolve(false);
                };
            });
        });
    },

    delTeacher(teacher) {
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_TEACHER} WHERE ID_GIAO_VIEN = ?`
            , [teacher.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Có tồn tại giáo viên có ID tương ứng
                    db.query(`DELETE FROM ${TABLE_ACCOUNT_TEACHER} WHERE ID_GIAO_VIEN = '${teacher.id}'`).then(() => {
                        db.query(`UPDATE LOP_HOC SET ID_GIAO_VIEN = null WHERE ID_GIAO_VIEN = '${teacher.id}'`).then(() => {
                            db.query(`DELETE FROM ${TABLE_TEACHER} WHERE ID_GIAO_VIEN = '${teacher.id}'`).then(() => {
                                resolve(true);
                            });
                        })
                    });
                }  else {
                    // Không tồn tại giáo viên có ID tương ứng
                    resolve(false);
                };
            });
        });
    },

    updateScoreForStudent(id_st, id_class, gk, ck, tk) {
        return db.query(`UPDATE BANG_DIEM SET DIEM_GK = ${gk}, DIEM_CK = ${ck}, DIEM_TK = ${tk} 
        WHERE ID_HOC_SINH = '${id_st}' AND ID_LOP_HOC = '${id_class}'`);
    },

    getStudentsByClass(id_class, id_gv) {
        return db.query(`SELECT HOC_SINH.ID_HOC_SINH, HO_TEN, GIOI_TINH, NGAY_SINH
        FROM HOC_SINH, BANG_DIEM, LOP_HOC 
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND LOP_HOC.ID_GIAO_VIEN = '${id_gv}'
        AND LOP_HOC.ID_LOP_HOC = '${id_class}'`);
    },

    getStudentsFailed (id_gv) {
        return db.query(`SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND LOP_HOC.ID_GIAO_VIEN = '${id_gv}'
        AND BANG_DIEM.DIEM_TK < 5`);
    },

    getStudentsSuccess (id_gv) {
        return db.query(`SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND LOP_HOC.ID_GIAO_VIEN = '${id_gv}'
        AND BANG_DIEM.DIEM_TK > 5`);
    },

    getStudentsPro (id_gv) {
        return db.query(`SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND LOP_HOC.ID_GIAO_VIEN = '${id_gv}'
        AND BANG_DIEM.DIEM_TK >= 8`);
    },
}