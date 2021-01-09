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
        let result = await db.query(query);
        let result1 = result.length;
        return classesModule.getAll().then((result2) => {
            expect(result1).to.be.equal(result2.length);
        });
    });
});

describe("addClass", () => {
    it("Da ton tai lop hoc", () => {
        return classesModule.addClass(classInfo1).then((result) => {
            expect(result).to.be.false;
        });
    });
});

describe("editClass", () => {
    it("Lop chua ton tai", () => {
        return classesModule.editClass(classInfo2).then((result) => {
            expect(result).to.be.false;
        });
    });
});

describe("deleteClass", () => {
    it("Lop chua ton tai", () => {
        return classesModule.deleteClass(classInfo2).then((result) => {
            expect(result).to.be.false;
        });
    });
});

describe("getClassByDay", () => {
    it("", async () => {
        let selectedDay = 5;
        let query = `SELECT LH.ID_LOP_HOC, HP.TEN_HP, LH.TEN_LOP, LH.PHONG_HOC, LH.LICH_HOC, LH.TIET_BAT_DAU, LH.TIET_KET_THUC, LH.NGAY_BAT_DAU, GV.HO_TEN, LH.PHONG_HOC, GV.ID_GIAO_VIEN, HP.MA_HP
                     FROM LOP_HOC LH, HOC_PHAN HP, GIAO_VIEN GV
                     WHERE LH.MA_HP = HP.MA_HP AND LH.ID_GIAO_VIEN = GV.ID_GIAO_VIEN AND LICH_HOC = ${selectedDay}`;
        let result = await db.query(query);
        let result1 = result.length;
        return classesModule.getClassesByDay(selectedDay).then((result2) => {
            expect(result1).to.be.equal(result2.length);
        });
    });
});
