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

router.get('/information', async (req, res) => {
    const data = await teachersModel.getInfoTeacher(req.session.username);
    res.render('teachers/info', {data: data[0]});
});

router.post('/updateInformation', async (req, res) => {
    const {idGV, name, sex, bthday, sdt} = req.body;
    await teachersModel.updateInfoTeacher(idGV, name, sex, bthday, sdt);
    res.redirect('/teachers/information');
});

router.get('/updatePassword', async (req, res) => {
    res.render('teachers/password');
});

router.post('/changePassword', async (req, res) => {
    const passwords = await teachersModel.getTeacherAccount(req.session.username);
    const password = passwords[0];
    console.log(req.body.oldPass, password);
    bcrypt.compare(req.body.oldPass, password['MAT_KHAU'], function (err, result) {
        if (result == true) {
            console.log("Mat khau dung");
            bcrypt.hash(req.body.newPass, 10, async function (e, hash) {
                await teachersModel.updateTeacherPassword(req.session.username, hash);
            })
            res.redirect('/teachers/information');
        } else {
            console.log("Mat khau sai");
            res.render('teachers/password', {message: "Mật khẩu cũ không đúng."});
        }
    })
})

router.get('/schedule', async (req, res) => {
    const data = await teachersModel.getSchedule(req.session.username);
    res.render('teachers/schedule', {
        isSchedule: true,
        schedule: data,
    });
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

router.get('/list_students', async (req, res) => {
    const data = await teachersModel.getAllClasses(req.session.username);
    res.render('teachers/listStudent', {
        classes: data,
    })
});

router.get('/list_students/:id', async (req, res) => {
    const data = await teachersModel.getAllClasses(req.session.username);
    const list = await teachersModel.getStudentsByClass(req.params.id, req.session.username);
    const id = req.params.id;
    res.render('teachers/listStudent', {
        classes: data,
        list: list,
        itemSelected: id,
    })
});

router.get('/statistic', async (req, res) => {
    const title = [
        {content: 'Học sinh trượt', id: 'failed'},
        {content: 'Học sinh qua môn', id: 'success'},
        {content: 'Học sinh TB > 8', id: 'pro'},
    ];
    res.render('teachers/statistic', {title: title,});
});

router.get('/statistic/:id', async (req, res) => {
    const title = [
        {content: 'Học sinh trượt', id: 'failed'},
        {content: 'Học sinh qua môn', id: 'success'},
        {content: 'Học sinh TB > 8', id: 'pro'},
    ];
    const itemSelected = req.params.id;
    let data;
    if (itemSelected == 'failed') {
        data = await teachersModel.getStudentsFailed(req.session.username);
    } else if (itemSelected == 'success') {
        data = await teachersModel.getStudentsSuccess(req.session.username);
    } else data = await teachersModel.getStudentsPro(req.session.username);

    res.render('teachers/statistic', {
        title: title,
        data: data,
    })
})

module.exports = router;