const db = require("../utils/db");
const expect = require("chai").expect;
const classesModule = require("../models/classes.module");

const classInfo1 = {
    id: "LH100043",
    courseID: "MTH00053",
    teacherID: "GV100039",
    class: "18CTT1",
    room: "F300",
    firstDate: new Date(2020, 7, 30, 24),
    day: "4",
    start: "6",
    end: "10",
};
const classInfo2 = {
    id: "LH100125a",
    courseID: "MTH00053",
    teacherID: "GV100018",
    class: "18MTH3",
    room: "A202",
    firstDate: new Date(2020, 7, 30, 24),
    day: "5",
    start: "6",
    end: "10",
};

describe("getAllClasses", () => {
    it("", async () => {
        let query = `SELECT LH.ID_LOP_HOC, HP.TEN_HP, LH.TEN_LOP, LH.PHONG_HOC, LH.LICH_HOC, LH.TIET_BAT_DAU, LH.TIET_KET_THUC, LH.NGAY_BAT_DAU, GV.HO_TEN, LH.PHONG_HOC, GV.ID_GIAO_VIEN, HP.MA_HP
                         FROM LOP_HOC LH, HOC_PHAN HP, GIAO_VIEN GV
                         WHERE LH.MA_HP = HP.MA_HP AND LH.ID_GIAO_VIEN = GV.ID_GIAO_VIEN`;
        var result1;
        db.query(query, (err, result) => {
            if (err) throw err;
            result1 = result.length;
        });
        let result2 = await classesModule.getAll().length;
        // ASSERT
        expect(result1).to.be.equal(result2);
    });
});

describe("addClass", () => {
    it("Da ton tai lop hoc", async () => {
        let result2 = await classesModule.addClass(classInfo1);
        // ASSERT
        expect(result2).to.be.false;
    });
});

describe("editClass", () => {
    it("Lop chua ton tai", async () => {
        let result2 = await classesModule.editClass(classInfo2);
        // ASSERT
        expect(result2).to.be.false;
    });
});

describe("deleteClass", () => {
    it("Lop chua ton tai", async () => {
        let result2 = await classesModule.editClass(classInfo2);
        // ASSERT
        expect(result2).to.be.false;
    });
});

describe("getClassByDay", () => {
    it("", async () => {
        let selectedDay = 5;
        let query = `SELECT LH.ID_LOP_HOC, HP.TEN_HP, LH.TEN_LOP, LH.PHONG_HOC, LH.LICH_HOC, LH.TIET_BAT_DAU, LH.TIET_KET_THUC, LH.NGAY_BAT_DAU, GV.HO_TEN, LH.PHONG_HOC, GV.ID_GIAO_VIEN, HP.MA_HP
                     FROM LOP_HOC LH, HOC_PHAN HP, GIAO_VIEN GV
                     WHERE LH.MA_HP = HP.MA_HP AND LH.ID_GIAO_VIEN = GV.ID_GIAO_VIEN AND LICH_HOC = ${selectedDay}`;
        var result1;
        db.query(query, (err, result) => {
            if (err) throw err;
            result1 = result.length;
        });
        let result2 = await classesModule.getClassesByDay(selectedDay).length;
        // ASSERT
        expect(result1).to.be.equal(result2);
    });
});
