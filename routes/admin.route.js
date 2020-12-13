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

router.get('/statistic', async (req, res) => {
    const statistic = [
        {content: 'Thống kê về Học sinh', id: 'student'},
        {content: 'Thống kê về Giáo viên', id: 'teacher'},
        {content: 'Thống kê về Lớp học', id: 'classes'},
    ]
    res.render('admin/statistic', {title: statistic,});
})

router.get('/statistic/student', async (req, res) => {
    const statistic = [
        {content: 'Thống kê về Học sinh', id: 'student'},
        {content: 'Thống kê về Giáo viên', id: 'teacher'},
        {content: 'Thống kê về Lớp học', id: 'classes'},
    ];

    const studentFailed = await studentsModule.adminGetStudentsFailed();
    const studentSuccess = await studentsModule.adminGetStudentsSuccess();
    const percentFailed = (studentFailed.length / (studentSuccess.length + studentFailed.length)) * 100;
    const percentSuccess = 100 - percentFailed;
    res.render('admin/statistic', {
        title: statistic,
        itemSelected: 'student',
        failed: percentFailed,
        success: percentSuccess,
    });
})

module.exports = router;