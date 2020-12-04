const express = require('express');
const studentsModule = require('../models/students.module');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/admin');
})

router.get('/studentsManagement', async (req, res) => {
    const data = await studentsModule.getAll();
    console.log(data);
    res.render('admin/studentsManagement', {
        listStudents: data,
    })
})

module.exports = router;