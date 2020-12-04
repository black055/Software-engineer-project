const express = require('express');
const router = express.Router();
const studentsModel = require('../models/students.module');

router.get('/',async (req, res) => {
    const data = await studentsModel.getAllAccounts();

    res.render('students/students');
});

module.exports = router;