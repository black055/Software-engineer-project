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
}

describe("getAllCourse", () => {
    it("", async () => {
        let query = `SELECT * FROM HOC_PHAN`;
        var result1;
        db.query(query, (err, result) => {
            if (err) throw err;
            result1 = result.length;
        });
        let result2 = await coursesModule.getAll().length;
        // ASSERT
        expect(result1).to.be.equal(result2);
    });
});

describe("addCourse", () => {
    it("Da ton tai khoa hoc", async () => {
        let result = await coursesModule.addCourse(courseInfo1);
        // ASSERT
        expect(result).to.be.false;
    });
});

describe("deleteCourse", () => {
    it("Khoa hoc khong ton tai", async () => {
        let result = await coursesModule.deleteCourse(courseInfo2);
        // ASSERT
        expect(result).to.be.false;
    });
});

describe("editCourse", () => {
    it("Khoa hoc khong ton tai", async () => {
        let result = await coursesModule.editCourse(courseInfo2);
        // ASSERT
        expect(result).to.be.false;
    });
});