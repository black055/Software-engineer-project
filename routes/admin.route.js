const express = require('express');
const studentsModule = require('../models/students.module');
const teachersModule = require('../models/teachers.module');
const classesModule = require('../models/classes.module');
const coursesModule = require('../models/courses.module');
const router = express.Router();

router.get('/', async (req, res) => {
    const data = await classesModule.getAll();
    const courses = await coursesModule.getAll();
    const teachers = await teachersModule.getAll();
    res.render('admin/classesManage', {
        listClasses: data,
        listCourses: courses,
        listTeachers: teachers,
    });
})

router.get('/studentsManage', async (req, res) => {
    const data = await studentsModule.getAll();
    res.render('admin/studentsManage', {
        listStudents: data,
    });
})

router.post('/studentsManage/add', async (req, res) => {
    result = await studentsModule.addStudent(req.body);
    res.redirect('/admin/studentsManage');
})

router.post('/studentsManage/edit', async (req, res) => {
    result = await studentsModule.editStudent(req.body);
    res.redirect('/admin/studentsManage');
})

router.post('/studentsManage/delete', async (req, res) => {
    result = await studentsModule.delStudent(req.body);
    res.redirect('/admin/studentsManage');
})

router.get('/teachersManage', async (req, res) => {
    const data = await teachersModule.getAll();
    res.render('admin/teachersManage', {
        listTeachers: data,
    });
})

router.post('/teachersManage/add', async (req, res) => {
    result = await teachersModule.addTeacher(req.body);
    res.redirect('/admin/teachersManage');
})

router.post('/teachersManage/edit', async (req, res) => {
    result = await teachersModule.editTeacher(req.body);
    res.redirect('/admin/teachersManage');
})

router.post('/teachersManage/delete', async (req, res) => {
    result = await teachersModule.delTeacher(req.body);
    res.redirect('/admin/teachersManage');
})

router.get('/classesManage', async (req, res) => {
    const data = await classesModule.getAll();
    const courses = await coursesModule.getAll();
    const teachers = await teachersModule.getAll();
    res.render('admin/classesManage', {
        listClasses: data,
        listCourses: courses,
        listTeachers: teachers,
    });
})

router.post('/classesManage/add', async (req, res) => {
    result = await classesModule.addClass(req.body);
    res.redirect('/admin/classesManage');
})

router.post('/classesManage/edit', async (req, res) => {
    result = await classesModule.editClass(req.body);
    res.redirect('/admin/classesManage');
})

router.post('/classesManage/delete', async (req, res) => {
    result = await classesModule.deleteClass(req.body);
    res.redirect('/admin/classesManage');
})

router.get('/coursesManage', async (req, res) => {
    const courses = await coursesModule.getAll();
    res.render('admin/coursesManage', {
        listCourses: courses,
    });
})

router.post('/coursesManage/add', async (req, res) => {
    result = await coursesModule.addCourse(req.body);
    res.redirect('/admin/coursesManage');
})

router.post('/coursesManage/delete', async (req, res) => {
    result = await coursesModule.deleteCourse(req.body);
    res.redirect('/admin/coursesManage');
})

router.post('/coursesManage/edit', async (req, res) => {
    result = await coursesModule.editCourse(req.body);
    res.redirect('/admin/coursesManage');
})

router.get('/statistic/student', async (req, res) => {
    const studentFailed = await studentsModule.adminGetStudentsFailed();
    const studentSuccess = await studentsModule.adminGetStudentsSuccess();
    const studentPro = await studentsModule.adminGetStudentsPro();

    res.render('admin/statistic', {
        failed: studentFailed.length,
        success: studentSuccess.length - studentPro.length,
        pro: studentPro.length,
    });
})

router.get('/statistic/student/gender', async (req, res) => {
    const male = await studentsModule.getMale();
    const female = await studentsModule.getFemale();
    console.log(male.length, female.length);
    res.render('admin/statistic_std_gender', {
        _male: male.length,
        _female: female.length,
    });
})

router.get('/statistic/teacher', async (req, res) => {
    const teacherMale = await teachersModule.adminGetteachersMale();
    const teacherFemale = await teachersModule.adminGetteachersFemale();
    const percentMale = (teacherMale.length / (teacherFemale.length + teacherMale.length)) * 100;
    const percentFemale = 100 - percentMale;
    res.render('admin/teacher_statistic', {
        _male: percentMale,
        _female: percentFemale,
    });
})

module.exports = router;