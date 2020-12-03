const express = require('express');
const router = express.Router();
const teachersModel = require('../models/teachers.module');

router.get('/', async (req, res) => {
    res.render('teachers/teachers');
})

module.exports = router;