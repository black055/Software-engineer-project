const db = require('../utils/db');

const TABLE_COURSES = 'HOC_PHAN';

module.exports = {
    getAll() {
        return db.getAll(TABLE_COURSES);
    },

    addCourse(course) {
        // course(id, name)

        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_COURSES} WHERE MA_HP = ?`
            , [course.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Đã tồn tại môn học có ID tương ứng
                    resolve(false);
                } else {
                    // Chưa tồn tại môn học có ID tương ứng
                    db.query(`INSERT INTO ${TABLE_COURSES}(MA_HP,TEN_HP) VALUES ('${course.id}','${course.name}')`).then(() => resolve(true));
                };
            });
        });
    },

    deleteCourse(course) {
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_COURSES} WHERE MA_HP = ?`
            , [course.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Có tồn tại môn học có ID tương ứng
                    db.query(`SELECT * FROM LOP_HOC WHERE MA_HP = ?`, [course.id], (error1, classes, fields1) => {
                        if (error1){
                            console.log(error1);
                        }
                        // Nếu còn tồn tại lớp học đang học môn học này
                        if (classes.length > 0) { resolve(false); }
                        else {
                            db.query(`DELETE FROM ${TABLE_COURSES} WHERE MA_HP = '${course.id}'`).then(() => {
                                resolve(true);
                            });
                        }
                    })
                }  else {
                    // Không tồn tại môn học có ID tương ứng
                    resolve(false);
                };
            });
        });
    },

    editCourse(course) {
        //course(id, name)

        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_COURSES} WHERE MA_HP = ?`
            , [course.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Đã tồn tại học phần có ID tương ứng
                    db.query(`UPDATE ${TABLE_COURSES} SET TEN_HP ='${course.name}' WHERE MA_HP = '${course.id}';`).then(() => resolve(true));
                } else {
                    // Không tồn tại học phần có ID tương ứng
                    resolve(false);
                };
            });
        });
    }

}