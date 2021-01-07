const db = require("../utils/db");
const expect = require("chai").expect;
const studentsModule = require("../models/students.module");


const existStudent = {
    id: "18120002",
    name: "Lê Văn Bảo",
    birthday: new Date(2000, 02, 01, 24),
    sex: "Nam",
    
};
const notExistStudent = {
    id: "18129002",
    name: "Lê Văn Bảo",
    birthday: new Date(2000, 02, 01, 24),
    sex: "Nam",
};

describe("getAllStudent", () => {
    it("lay du list hoc sinh", async function () {
        let query = `SELECT * FROM HOC_SINH`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;

        return studentsModule.getAll().then((result2) => {
            expect(result1).to.be.equal(result2.length);
        });
    });
});




describe("getAllAccounts", () => {
    it("Lay du list account hoc sinh", async function () {
        let query = `SELECT * FROM ACCOUNT_HOC_SINH`;
        let result1;
        let result = await db.query(query);
        result1 = result.length

        return studentsModule.getAllAccounts().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});



describe("getOne", () => {
    it("Lay dung hoc sinh 18120002",  async function () {
        let query = `SELECT * FROM HOC_SINH WHERE HOC_SINH.ID_HOC_SINH = "18120002"`;
        var result1;
        let result = await db.query(query);
        result1 = result[0].ID_HOC_SINH;
        

        return studentsModule.getOne("18120002").then((result2) => {
            expect(result1).to.be.equal(result2[0].ID_HOC_SINH);

        });
       
    });
});



describe("addStudent", () => {
    it("Them hoc sinh da ton tai",  async function () {
     
        return studentsModule.addStudent(existStudent).then((result2) => {
            expect(result2).to.be.false;

        });
     
    });
});

//TODO: NOT THIS
// describe("addStudent", () => {
//     it("Them hoc sinh chua ton tai",  () => {
        
//         let result2 = await studentsModule.addStudent(notExistStudent);
//         // //ASSERT
//         expect(result2).to.be.false;
//     });
// });

//TODO: NOT THIS
// describe("editStudent", () => {
//     it("Edit hoc sinh da ton tai",  () => {
//         let result2 = await studentsModule.editStudent(existStudent);
//         // //ASSERT
//         expect(result2).to.be.false;
//     });
// });

describe("editStudent", () => {
    it("Edit hoc sinh khong ton tai",  async function () {

        return studentsModule.editStudent(notExistStudent).then((result2) => {
            expect(result2).to.be.false;

        });
     
      
    });
});

// TODO: NOT THIS
// describe("delStudent", () => {
//     it("Xoa hoc sinh da ton tai",  () => {
//         let result2 = await studentsModule.delStudent(existStudent);
//         // //ASSERT
//         expect(result2).to.be.false;
//     });
// });


describe("delStudent", () => {
    it("Xoa hoc sinh khong ton tai",  async function () {
        return studentsModule.delStudent(notExistStudent).then((result2) => {
            expect(result2).to.be.false;

        });
       
    });
});



describe("getTimetable", () => {
    it("Lay du list thoi khoa bieu", async function () {
        let query = `SELECT LOP_HOC.*, HOC_PHAN.TEN_HP
        FROM BANG_DIEM, HOC_SINH, LOP_HOC, HOC_PHAN
        WHERE BANG_DIEM.ID_HOC_SINH = HOC_SINH.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND HOC_SINH.ID_HOC_SINH = "18120002"`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getTimetable("18120002").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});

describe("getScoreTable", () => {
    it("Lay du list bang diem",  async function () {
        let query = `SELECT BANG_DIEM.*, HOC_PHAN.TEN_HP
        FROM BANG_DIEM, HOC_PHAN, LOP_HOC
        WHERE LOP_HOC.ID_LOP_HOC = BANG_DIEM.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND BANG_DIEM.ID_HOC_SINH = "18120002"`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getScoreTable("18120002").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
        
    });
});

// describe("getEnrollableSubject",  () => {
//     it("Lay du list mon hoc co the dang ky", async function () {
//         let query = `SELECT DISTINCT LOP_HOC.*, HOC_PHAN.TEN_HP
//         FROM LOP_HOC, HOC_PHAN
//         WHERE LOP_HOC.MA_HP = HOC_PHAN.MA_HP
//         AND LOP_HOC.MA_HP NOT IN (
//             SELECT LOP_HOC.MA_HP
//             FROM LOP_HOC, BANG_DIEM
//             WHERE LOP_HOC.ID_LOP_HOC = BANG_DIEM.ID_LOP_HOC
//             AND BANG_DIEM.ID_HOC_SINH = "18120002"`;
//         let result1;
//         let result = await db.query(query);
//         result1 = result.length;
//         return studentsModule.getEnrollableSubject("18120002").then((result2) => {
//             expect(result1).to.be.equal(result2.length);

//         });
//     });
// });



describe("enrollSubject", () => {
    it("Dang ky hoc phan co ID_HS khong ton tai", async function () {

        return studentsModule.enrollSubject("18129992","LH100001").then((result2) => {
            expect(result2).to.be.false;

        });
        
    });
});


describe("getSubjectEnrolled", () => {
    it("Lay dung list mon hoc da dang ky",  async function () {
        let query = `SELECT LOP_HOC.*, HOC_PHAN.TEN_HP
        FROM BANG_DIEM, HOC_SINH, LOP_HOC, HOC_PHAN
        WHERE BANG_DIEM.ID_HOC_SINH = HOC_SINH.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND HOC_SINH.ID_HOC_SINH = "18120002"`;
        var result1;
        let result = await db.query(query)
        result1 = result.length;
        
        return studentsModule.getSubjectEnrolled("18120002").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
      
    });
});

describe("unenrollSubject", () => {
    it("Huy dang ky hoc phan co ID_HS khong ton tai",  async function () {


        return studentsModule.unenrollSubject("18129992","LH100001").then((result2) => {
            expect(result2).to.be.false;

        });
        
    });
});



describe("getPassword", () => {
    it("Lay dung account hs",  async function () {
        let query = `SELECT * FROM ACCOUNT_HOC_SINH WHERE ID_HOC_SINH= "18120002"`;
        let result1;

        let result = await db.query(query)
        result1 = result[0].ID_HOC_SINH;

        return studentsModule.getPassword("18120002").then((result2) => {
            expect(result1).to.be.equal(result2[0].ID_HOC_SINH);

        });
        
    });
});

describe("adminGetStudentsFailed", () => {
    it("Lay du list hoc sinh rot mon", async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND BANG_DIEM.DIEM_TK < 5`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.adminGetStudentsFailed().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
        
    });
});

describe("adminGetStudentsSuccess", () => {
    it("Lay du list hoc sinh qua mon",  async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND BANG_DIEM.DIEM_TK >= 5`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.adminGetStudentsSuccess().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});

describe("adminGetStudentsPro", () => {
    it("Lay du list hoc sinh tren 8 diem",  async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND BANG_DIEM.DIEM_TK >= 8`;

        let result1;
        let result = await db.query(query);
        result1 = result.length;

        return studentsModule.adminGetStudentsPro().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});

describe("getInfoStudent", () => {
    it("Lay du list hoc sinh tren 8 diem",  async function () {
        let query = `SELECT * FROM HOC_SINH WHERE ID_HOC_SINH = "18120002"`;
        let result1;
        let result = await db.query(query)
      
        result1 = result[0].ID_HOC_SINH;
        return studentsModule.getInfoStudent("18120002").then((result2) => {
            expect(result1).to.be.equal(result2[0].ID_HOC_SINH);

        });
       
    });
});


describe("getStudentsByClass", () => {
    it("Lay du list hoc sinh cua giao vien GV100001",  async function () {
        let query = `SELECT HOC_SINH.ID_HOC_SINH, HO_TEN, GIOI_TINH, NGAY_SINH
        FROM HOC_SINH, BANG_DIEM, LOP_HOC 
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND LOP_HOC.ID_GIAO_VIEN = "GV100001"
        AND LOP_HOC.ID_LOP_HOC = "LH100001"`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getStudentsByClass("LH100001","GV100001").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
      
    });
});

describe("getStudentsFailed", () => {
    it("Lay du list hoc sinh rot mon cua giao vien GV100001", async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND LOP_HOC.ID_GIAO_VIEN = "GV100001"
        AND BANG_DIEM.DIEM_TK < 5`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getStudentsFailed("GV100001").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
    });
});



describe("getStudentsSuccess", () => {
    it("Lay du list hoc sinh qua mon cua giao vien GV100001",  async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND LOP_HOC.ID_GIAO_VIEN = "GV100001"
        AND BANG_DIEM.DIEM_TK >= 5`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getStudentsSuccess("GV100001").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
      
    });
});

describe("getStudentsPro", () => {
    it("Lay du list hoc sinh gioi cua giao vien GV100001", async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK, TEN_HP
        FROM HOC_SINH, BANG_DIEM, LOP_HOC, HOC_PHAN
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = LOP_HOC.ID_LOP_HOC
        AND HOC_PHAN.MA_HP = LOP_HOC.MA_HP
        AND LOP_HOC.ID_GIAO_VIEN = "GV100001"
        AND BANG_DIEM.DIEM_TK >= 8`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getStudentsPro("GV100001").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});


describe("getMale", () => {
    it("Lay du list hoc sinh nam",  async function () {
        let query = `SELECT * FROM HOC_SINH WHERE GIOI_TINH = 'Nam'`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getMale().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});

describe("getFemale", () => {
    it("Lay du list hoc sinh nu",  async function () {
        let query = `SELECT * FROM HOC_SINH WHERE GIOI_TINH = 'Nữ'`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getFemale().then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
        
    });
});


describe("getStudentsFailedByClass", () => {
    it("Lay du list hoc sinh rot mon cua lop LH100001", async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK
        FROM HOC_SINH, BANG_DIEM
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = 'LH100001'
        AND BANG_DIEM.DIEM_TK < 5`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getStudentsFailedByClass("LH100001").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
        
       
    });
});

describe("getStudentsPassedByClass", () => {
    it("Lay du list hoc sinh qua mon cua lop GV100001", async function () {
        let query = `SELECT BANG_DIEM.ID_HOC_SINH, HO_TEN, DIEM_TK
        FROM HOC_SINH, BANG_DIEM
        WHERE HOC_SINH.ID_HOC_SINH = BANG_DIEM.ID_HOC_SINH
        AND BANG_DIEM.ID_LOP_HOC = 'LH100001'
        AND BANG_DIEM.DIEM_TK >= 5`;
        let result1;
        let result = await db.query(query);
        result1 = result.length;
        return studentsModule.getStudentsPassedByClass("LH100001").then((result2) => {
            expect(result1).to.be.equal(result2.length);

        });
       
    });
});




























