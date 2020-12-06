const db = require('../utils/db');
const bcrypt = require('bcrypt');

const TABLE_ACCOUNT_STUDENT = 'ACCOUNT_HOC_SINH';
const TABLE_STUDENT = 'HOC_SINH';

module.exports = {
    getAll() {
        return  db.getAll(TABLE_STUDENT);
    },

    getAllAccounts() {
        return db.getAll(TABLE_ACCOUNT_STUDENT);
    },

    addStudent(student) {
        // student(id, name, birthday, sex)

        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_STUDENT} WHERE ID_HOC_SINH = ?`
            , [student.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Đã tồn tại học sinh có ID tương ứng
                    resolve(false);
                } else {
                    // Chưa tồn tại học sinh có ID tương ứng
                    db.query(`INSERT INTO ${TABLE_STUDENT}(ID_HOC_SINH,HO_TEN,NGAY_SINH,GIOI_TINH) VALUES ('${student.id}','${student.name}','${student.birthday}','${student.sex}')`).then(() => {
                        bcrypt.hash('12345678', 10, (e, hash) => {
                            db.query(`INSERT INTO ${TABLE_ACCOUNT_STUDENT}(ID_HOC_SINH,MAT_KHAU) VALUES ('${student.id}','${hash}')`).then(() => resolve(true));
                        });
                    });
                };
            });
        });

    },

    editStudent(student) {
        // student(id, name, birthday, sex)
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_STUDENT} WHERE ID_HOC_SINH = ?`
            , [student.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Đã tồn tại học sinh có ID tương ứng
                    db.query(`UPDATE ${TABLE_STUDENT} SET HO_TEN ='${student.name}',NGAY_SINH ='${student.birthday}',GIOI_TINH ='${student.sex}' WHERE ID_HOC_SINH = '${student.id}';`).then(() => resolve(true));
                } else {
                    // Không tồn tại học sinh có ID tương ứng
                    resolve(false);
                };
            });
        });
    },

    delStudent(student) {
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_STUDENT} WHERE ID_HOC_SINH = ?`
            , [student.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Có tồn tại học sinh có ID tương ứng
                    db.query(`DELETE FROM ${TABLE_ACCOUNT_STUDENT} WHERE ID_HOC_SINH = '${student.id}'`).then(() => {
                        db.query(`DELETE FROM BANG_DIEM WHERE ID_HOC_SINH = ${student.id}`).then(() => {
                            db.query(`DELETE FROM ${TABLE_STUDENT} WHERE ID_HOC_SINH = '${student.id}'`).then(() => {
                                resolve(true);
                            });
                        })
                    });
                }  else {
                    // Không tồn tại học sinh có ID tương ứng
                    resolve(false);
                };
            });
        });
        
    },

    getTimetable(idStudent) {
        return db.query(`SELECT LOP_HOC.*, HOC_PHAN.TEN_HP
        FROM BANG_DIEM, HOC_SINH, LOP_HOC, HOC_PHAN
        WHERE BANG_DIEM.ID_HOC_SINH = HOC_SINH.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND HOC_SINH.ID_HOC_SINH = '${idStudent}'`);
       
    },

    getScoreTable(idStudent) {
        return db.query(`SELECT BANG_DIEM.DIEM_TK, HOC_PHAN.TEN_HP
        FROM BANG_DIEM, HOC_PHAN, LOP_HOC
        WHERE LOP_HOC.ID_LOP_HOC = BANG_DIEM.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND BANG_DIEM.ID_HOC_SINH = '${idStudent}'`);
    },

    getEnrollableSubject(idStudent) {
        return db.query(`SELECT DISTINCT LOP_HOC.*, HOC_PHAN.TEN_HP
            FROM LOP_HOC, HOC_PHAN
            WHERE LOP_HOC.MA_HP = HOC_PHAN.MA_HP
            AND LOP_HOC.MA_HP NOT IN (
                SELECT LOP_HOC.MA_HP
                FROM LOP_HOC, BANG_DIEM
                WHERE LOP_HOC.ID_LOP_HOC = BANG_DIEM.ID_LOP_HOC
                AND BANG_DIEM.ID_HOC_SINH = '${idStudent}')`);
    },

    enrollSubject(idStudent, classes) {
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_STUDENT} WHERE ID_HOC_SINH = ?`
            , [idStudent], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length) {
                    if (typeof classes == 'string') classes = [classes];
                    classes.forEach(function(e) {
                        db.query(`INSERT INTO BANG_DIEM (ID_HOC_SINH,ID_LOP_HOC,DIEM_GK,DIEM_CK,DIEM_TK) VALUES ('${idStudent}','${e}',0,0,0)`)
                        resolve(true);
                    })
                }  else {
                    resolve(false);
                };
            });
        });
    },
    
    getSubjectEnrolled(idStudent) {
        return db.query(`SELECT LOP_HOC.*, HOC_PHAN.TEN_HP
        FROM BANG_DIEM, HOC_SINH, LOP_HOC, HOC_PHAN
        WHERE BANG_DIEM.ID_HOC_SINH = HOC_SINH.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND HOC_SINH.ID_HOC_SINH = '${idStudent}'`);
    },

    unenrollSubject(idStudent, idclass) {
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_ACCOUNT_STUDENT} WHERE ID_HOC_SINH = ?`
            , [idStudent], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length) {
                    if (typeof idclass == 'string') {
                        db.query(`DELETE FROM BANG_DIEM 
                            WHERE ID_HOC_SINH = '${idStudent}' AND ID_LOP_HOC = '${idclass}'`)
                        resolve(true);
                    }
                }  else {
                    resolve(false);
                };
            });
        });

    }
}