const db = require('../utils/db');

const TABLE_CLASSES = 'LOP_HOC';
const TABLE_COURSES = 'HOC_PHAN';

module.exports = {
    getAll() {
        return db.query(`SELECT LH.ID_LOP_HOC, HP.TEN_HP, LH.TEN_LOP, LH.PHONG_HOC, LH.LICH_HOC, LH.TIET_BAT_DAU, LH.TIET_KET_THUC, LH.NGAY_BAT_DAU, GV.HO_TEN, LH.PHONG_HOC, GV.ID_GIAO_VIEN, HP.MA_HP
                         FROM ${TABLE_CLASSES} LH, ${TABLE_COURSES} HP, GIAO_VIEN GV
                         WHERE LH.MA_HP = HP.MA_HP AND LH.ID_GIAO_VIEN = GV.ID_GIAO_VIEN`);
    },

    addClass(classInfo) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_CLASSES} WHERE ID_LOP_HOC = ?`
            , [classInfo.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Đã tồn tại lớp học có ID tương ứng
                    resolve(false);
                }  else {
                    // Chưa tồn tại lớp học có ID tương ứng
                    db.query(`INSERT INTO ${TABLE_CLASSES}(ID_LOP_HOC,MA_HP,ID_GIAO_VIEN,TEN_LOP,NGAY_BAT_DAU,PHONG_HOC,LICH_HOC,TIET_BAT_DAU,TIET_KET_THUC) 
                    VALUES ('${classInfo.id}','${classInfo.courseID}','${classInfo.teacherID}','${classInfo.class}','${classInfo.firstday}'
                    ,'${classInfo.room}','${classInfo.day}','${classInfo.start}','${classInfo.end}')`).then(() => {resolve(true);});
                };
            });
        });
    },

    editClass(classInfo){
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_CLASSES} WHERE ID_LOP_HOC = ?`
            , [classInfo.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Có tồn tại lớp học có ID tương ứng
                    db.query(`UPDATE ${TABLE_CLASSES} SET MA_HP='${classInfo.courseID}',ID_GIAO_VIEN='${classInfo.teacherID}',
                    TEN_LOP='${classInfo.class}',NGAY_BAT_DAU='${classInfo.firstday}',PHONG_HOC='${classInfo.room}',LICH_HOC='${classInfo.day}',
                    TIET_BAT_DAU='${classInfo.start}',TIET_KET_THUC='${classInfo.end}' WHERE ID_LOP_HOC = '${classInfo.id}'`).then(() => {resolve(true);});
                }  else {
                    // Không tồn tại lớp học có ID tương ứng
                    resolve(false);
                };
            });
        });
    },

    deleteClass(classInfo){
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM ${TABLE_CLASSES} WHERE ID_LOP_HOC = ?`
            , [classInfo.id], (error, results, fields) => {
                if (error){
                    console.log(error);
                }
                
                if (results.length > 0) {
                    // Có tồn tại lớp học có ID tương ứng
                    db.query(`DELETE FROM BANG_DIEM WHERE ID_LOP_HOC = '${classInfo.id}'`).then(() => {
                        db.query(`DELETE FROM ${TABLE_CLASSES} WHERE ID_LOP_HOC = '${classInfo.id}'`).then(() => {
                            resolve(true);
                        });
                    });
                }  else {
                    // Không tồn tại lớp học có ID tương ứng
                    resolve(false);
                };
            });
        });
    },

    getClassesByDay(selectedDay) {
        return db.query(`SELECT LH.ID_LOP_HOC, HP.TEN_HP, LH.TEN_LOP, LH.PHONG_HOC, LH.LICH_HOC, LH.TIET_BAT_DAU, LH.TIET_KET_THUC, LH.NGAY_BAT_DAU, GV.HO_TEN, LH.PHONG_HOC, GV.ID_GIAO_VIEN, HP.MA_HP
                         FROM ${TABLE_CLASSES} LH, ${TABLE_COURSES} HP, GIAO_VIEN GV
                         WHERE LH.MA_HP = HP.MA_HP AND LH.ID_GIAO_VIEN = GV.ID_GIAO_VIEN AND LICH_HOC = ${selectedDay}`);
    }

}