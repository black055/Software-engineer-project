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
    }
}