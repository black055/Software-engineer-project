const express = require('express');
const router = express.Router();
const teachersModel = require('../models/teachers.module');
const bcrypt = require('bcrypt');
const db = require('../utils/db');

router.get('/', async (req, res) => {
    const data = await teachersModel.getAllAccounts();
    // data.forEach((account) => {
    //     bcrypt.hash('123456789', 10, (e, hash) => {
    //         db.query(`UPDATE ACCOUNT_GIAO_VIEN SET MAT_KHAU = '${hash}' WHERE ID_GIAO_VIEN = '${account['ID_GIAO_VIEN']}'`);
    //         console.log(`insert into ACCOUNT_GIAO_VIEN (ID_GIAO_VIEN,MAT_KHAU) values ('${account['ID_GIAO_VIEN']}','${hash}');`);
    //     })
    // })
    res.render('teachers/teachers');
});

router.get('/schedule', async (req, res) => {
    const data = await teachersModel.getSchedule(req.session.username);
    res.render('teachers/schedule', {
        isSchedule: true,
        schedule: data,
    });
});

router.get('/list_class', async (req, res) => {
    const data = await teachersModel.getListClass(req.session.username);
    res.render('teachers/listClass', {
        isListClass: true,
        listClass: data,
    })
});

router.get('/manage_score', async (req, res) => {
    const data = await teachersModel.getAllClasses(req.session.username);
    res.render('teachers/manageScore', {
        isCheckMark: true,
        mark: data,
    });
});

router.get('/manage_score/:id', async (req, res) => {
    const data = await teachersModel.getAllClasses(req.session.username);
    const details = await teachersModel.getMarkByClass(req.session.username, req.params.id);
    const id = req.params.id;
    res.render('teachers/manageScore', {
        isCheckMark: true,
        mark: data,
        details: details,
        itemSelected: id,
    });
});

router.post('/update_score', async (req, res) => {
    const {lp, id, ht, dgk, dck, dtk} = req.body;
    await teachersModel.updateScoreForStudent(id, lp, dgk, dck, dtk);
    res.redirect(`/teachers/manage_score/${lp}`);
})

module.exports = router;