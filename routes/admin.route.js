const express = require('express');
const studentsModule = require('../models/students.module');
const teachersModule = require('../models/teachers.module');
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
    if (!result) {
        req.session.message = "Mã số sinh viên đã tồn tại!";
    }
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
    if (!result) {
        req.session.message = "Mã giáo viên đã tồn tại!";
    }
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

module.exports = router;