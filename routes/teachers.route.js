const express = require('express');
const router = express.Router();
const teachersModel = require('../models/teachers.module');

router.get('/', async (req, res) => {
    const data = await teachersModel.getAllAccounts();
    // data.forEach((account) => {
    //     bcrypt.hash('123456789', 10, (e, hash) => {
    //         db.query(`UPDATE ACCOUNT_GIAO_VIEN SET MAT_KHAU = '${hash}' WHERE ID_GIAO_VIEN = '${account['ID_GIAO_VIEN']}'`);
    //         console.log(`insert into ACCOUNT_GIAO_VIEN (ID_GIAO_VIEN,MAT_KHAU) values ('${account['ID_GIAO_VIEN']}','${hash}');`);
    //     })
    // })
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