const express = require('express');
const router = express.Router();
const studentsModel = require('../models/students.module');
const db = require('../utils/db');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    const data = await studentsModel.getAllAccounts();
    // data.forEach((account) => {
    //     bcrypt.hash('12345678',10, (e, hash) => {
    //         db.query(`UPDATE ACCOUNT_HOC_SINH SET MAT_KHAU = '${hash}' WHERE ID_HOC_SINH = '${account['ID_HOC_SINH']}'`);
    //         console.log(`insert into ACCOUNT_HOC_SINH (ID_HOC_SINH,MAT_KHAU) values ('${account['ID_HOC_SINH']}','${hash}');`)
    //     })
    // })
    res.render('students/students');
});

router.get('/timetable', async (req, res) => {
    const data = await studentsModel.getTimetable(req.session.username);
    res.render('students/timetable', {
        isTimetable: true,
        timetable: data
    });
});

router.get('/scoreTable', async (req, res) => {
    const data = await studentsModel.getScoreTable(req.session.username);
    res.render('students/scoreTable', {
        isScoreTable: true,
        scoreTable: data
    });
});

router.get('/enroll', async (req, res) => {
    const data = await studentsModel.getEnrollableSubject(req.session.username);
    res.render('students/enroll', {
        isEnrolling: true,
        subjectEnroll: data
    });
});

router.post('/enroll_classes', async (req, res) => {
    await studentsModel.enrollSubject(req.session.username, req.body.classes);
    res.redirect(`/students`);
})

router.get('/unenroll', async (req, res) => {
    const data = await studentsModel.getSubjectEnrolled(req.session.username);
    res.render('students/unenroll', {
        isDeletingSubject: true,
        subjects: data
    });
});

router.post('/unenroll_class', async (req, res) => {
    await studentsModel.unenrollSubject(req.session.username, req.body.classEnrolled);
    res.redirect(`/students`);
})

router.get('/password', async (req, res) => {
    res.render('students/changePassword');
});

router.post('/newPass', async (req, res) => {
    const passwords = await studentsModel.getPassword(req.session.username);
    const password = passwords[0];
    bcrypt.compare(req.body.oldPass, password['MAT_KHAU'], function (err, result) {
        if (result == true) {
            bcrypt.hash(req.body.newPass, 10, async function (e, hash) {
                await studentsModel.changePass(req.session.username, hash);
            })
            res.redirect('/students');
        } else {
            res.render('students/changePassword', {message: "Mật khẩu cũ không đúng."});
        }
    })
});

module.exports = router;