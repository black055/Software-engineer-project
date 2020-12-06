const express = require('express');
const studentsModule = require('../models/students.module');
const teachersModule = require('../models/teachers.module');
const classesModule = require('../models/classes.module');
const coursesModule = require('../models/courses.module');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/admin');
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

module.exports = router;