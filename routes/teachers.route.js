const express = require('express');
const router = express.Router();
const teachersModel = require('../models/teachers.module');

router.get('/', async (req, res) => {
    const data = await teachersModel.getAllAccounts();

    res.render('teachers/teachers');
})

router.get('/scheduler', async (req, res) => {
    const data = await teachersModel.getSchedule(req.session.username);
    console.log(data);
    res.render('teachers/schedule', {
        isSchedule: true,
        schedule: data,
    });
})

router.get('/list_class', async (req, res) => {
    const data = await teachersModel.getListClass(req.session.username);
    console.log(data);
    res.render('teachers/listClass', {
        isListClass: true,
        listClass: data,
    })
})

module.exports = router;