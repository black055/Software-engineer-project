const express = require('express');
const studentsModule = require('../models/students.module');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/admin');
})

router.get('/studentsManagement', async (req, res) => {
    const data = await studentsModule.getAll();
    res.render('admin/studentsManagement', {
        listStudents: data,
    });
})

router.post('/studentsManagement/add', async (req, res) => {
    result = await studentsModule.addStudent(req.body);
    if (!result) {
        req.session.message = "Mã số sinh viên đã tồn tại!";
    }
    res.redirect('/admin/studentsManagement');
})

router.post('/studentsManagement/edit', async (req, res) => {
    result = await studentsModule.editStudent(req.body);
    res.redirect('/admin/studentsManagement');
})

router.post('/studentsManagement/delete', async (req, res) => {
    result = await studentsModule.delStudent(req.body);
    res.redirect('/admin/studentsManagement');
})

module.exports = router;