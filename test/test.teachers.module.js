const db = require("../utils/db");
const expect = require("chai").expect;
const teachersModule = require("../models/teachers.module");

const existedTeacher = {
    id: "GV100003",
    name: "Nguyễn Văn Trường",
    birthday: new Date(1985,03,15,24),
    sex: "Nam",
    phone: "0917245522",
}

const notExistedTeacher = {
    id: "GV999999",
    name: "Nguyễn Văn Trường",
    birthday: new Date(1985,03,15,24),
    sex: "Nam",
    phone: "0917245522",
}

describe("getAll", () => {
    it("Lay du list giao vien",  async function () {
        let query = `SELECT * FROM GIAO_VIEN`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return teachersModule.getAll().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
        
    });
});

describe("getAll", () => {
    it("Lay du list account giao vien",  async function () {
        let query = `SELECT * FROM ACCOUNT_GIAO_VIEN`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return teachersModule.getAllAccounts().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
        
    });
});

describe("getOne", () => {
    it("Lay dung giao vien GV100003",  async function () {
        let query = `SELECT * FROM GIAO_VIEN WHERE GIAO_VIEN.ID_GIAO_VIEN = "GV100003"`;
        var result1;
        let result = await db.query(query);
        result1 = result[0].ID_GIAO_VIEN;
        

        return teachersModule.getOne("GV100003").then((result2) => {
            expect(result1).to.be.equal(result2[0].ID_GIAO_VIEN);

        });
       
    });
});


describe("getSchedule", () => {
    it("",  async function () {
        
        let query = `SELECT HOC_PHAN.MA_HP, TEN_HP, PHONG_HOC, LOP_HOC.ID_LOP_HOC, TEN_LOP, TIET_BAT_DAU, TIET_KET_THUC, LICH_HOC 
        FROM LOP_HOC JOIN HOC_PHAN 
        WHERE HOC_PHAN.MA_HP = LOP_HOC.MA_HP AND ID_GIAO_VIEN = "GV100003"`;
        var result1;
        let result = await db.query(query);
        result1 = result.length;
        

        return teachersModule.getSchedule("GV100003").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});

describe("getAllClasses", () => {
    it("Lay du tkb cua giao vien GV100003",  async function () {
        let query = `SELECT ID_LOP_HOC, TEN_LOP, HOC_PHAN.TEN_HP FROM LOP_HOC, HOC_PHAN WHERE ID_GIAO_VIEN = "GV100003" 
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP`;
        var result1;
        let result = await db.query(query);
        result1 = result.length;
        

        return teachersModule.getAllClasses("GV100003").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});


describe("getMarkByClass", () => {
    it("Lay du list diem trong LH100003 cua GV100003",  async function () {
        let query = `SELECT HOC_SINH.ID_HOC_SINH, HOC_SINH.HO_TEN, BANG_DIEM.DIEM_GK, BANG_DIEM.DIEM_CK, BANG_DIEM.DIEM_TK, TEN_HP 
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN 
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH 
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC  
        AND LOP_HOC.MA_HP = HOC_PHAN.MA_HP 
        AND LOP_HOC.ID_GIAO_VIEN = "GV100003" 
        AND LOP_HOC.ID_LOP_HOC = "LH100003"`;
        var result1;
        let result = await db.query(query);
        result1 = result.length;
        

        return teachersModule.getMarkByClass("GV100003","LH100003").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});




describe("addTeacher", () => {
    it("Them GV da ton tai",  async function () {
       
        

        return teachersModule.addTeacher(existedTeacher).then((result2) => {
            expect(result2).to.be.false;

        });
       
    });
});

describe("editTeacher", () => {
    it("Sua thong tin GV khong ton tai",  async function () {
       
        

        return teachersModule.editTeacher(notExistedTeacher).then((result2) => {
            expect(result2).to.be.false;

        });
       
    });
});

describe("delTeacher", () => {
    it("Xoa thong tin GV khong ton tai",  async function () {
       
        

        return teachersModule.delTeacher(notExistedTeacher).then((result2) => {
            expect(result2).to.be.false;

        });
       
    });
});


describe("getInfoTeacher", () => {
    it("Lay dung thong tin cua GV100003",  async function () {
        let query = `SELECT GIAO_VIEN.ID_GIAO_VIEN, HO_TEN, NGAY_SINH, GIOI_TINH, SDT FROM GIAO_VIEN WHERE ID_GIAO_VIEN = "GV100003"`;
        var result1;
        let result = await db.query(query);
        result1 = result[0].ID_GIAO_VIEN;
        

        return teachersModule.getInfoTeacher("GV100003").then((result2) => {
            expect(result1).to.be.equal(result2[0].ID_GIAO_VIEN);

        });
       
    });
});

describe("getTeacherAccount", () => {
    it("Lay dung mat khau cua gv GV100003",  async function () {
        let query = `SELECT MAT_KHAU FROM ACCOUNT_GIAO_VIEN WHERE ID_GIAO_VIEN = "GV100003"`;
        var result1;
        let result = await db.query(query);
        result1 = result[0].MAT_KHAU;
        

        return teachersModule.getTeacherAccount("GV100003").then((result2) => {
            expect(result1).to.be.equal(result2[0].MAT_KHAU);

        });
       
    });
});



describe("adminGetteachersMale", () => {
    it("Lay du list GV nam",  async function () {
        let query = `SELECT *
        FROM GIAO_VIEN
        WHERE GIAO_VIEN.GIOI_TINH = 'Nam'`;
        var result1;
        let result = await db.query(query);
        result1 = result.length;
        

        return teachersModule.adminGetteachersMale().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});


describe("adminGetteachersFemale", () => {
    it("Lay du list GV nu",  async function () {
        let query = `SELECT *
        FROM GIAO_VIEN
        WHERE GIAO_VIEN.GIOI_TINH = 'Nữ'`;
        var result1;
        let result = await db.query(query);
        result1 = result.length;
        

        return teachersModule.adminGetteachersFemale().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});