const db = require("../utils/db");
const expect = require("chai").expect;
const coursesModule = require("../models/courses.module");

const courseInfo1 = {
    id: "CSC10007",
    name: "Hệ điều hành 1",
};

const courseInfo2 = {
    id: "CSC10007a",
    name: "Hệ điều hành 1",
};

describe("getAllCourse", () => {
    it("", () => {
        let query = `SELECT * FROM HOC_PHAN`;
        let result1;
        db.query(query, (err, result) => {
            if (err) throw err;
            result1 = result.length;
        });
        return coursesModule.getAll().then((result2) => {
            expect(result1).to.be.equal(result2.length);
        });
    });
});

describe("addCourse", () => {
    it("Da ton tai khoa hoc", () => {
        return coursesModule.addCourse(courseInfo1).then((result) => {
            expect(result).to.be.false;
        });
    });
});

describe("deleteCourse", () => {
    it("Khoa hoc khong ton tai", () => {
        return coursesModule.deleteCourse(courseInfo2).then((result) => {
            expect(result).to.be.false;
        });
    });
});

describe("editCourse", () => {
    it("Khoa hoc khong ton tai", () => {
        return coursesModule.editCourse(courseInfo2).then((result) => {
            expect(result).to.be.false;
        });
    });
});
