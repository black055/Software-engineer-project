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

router.get('/changePassword', async (req, res) => {
    res.render('students/changePassword', {
        isChangingPass: true,
    });
});

router.post('/newPass', async (req, res) => {
    db.query(`SELECT * FROM ACCOUNT_HOC_SINH WHERE ID_HOC_SINH = ?`
        , [req.session.username], (error, results, fields) => {
            if (error) {
                console.log(error);
            }

            if (results.length) {
                //So sánh mk hiện tại với mk hash trong database
                bcrypt.compare(req.body.currentPass, results[0]['MAT_KHAU'], async (e, r) => {
                    if (r == true) {
                        await studentsModel.changePass(req.session.username, req.body.newPass);
                        res.redirect('/');
                    } else {
                        req.session.message = "Mật khẩu hiện tại không chính xác!";
                        res.redirect('/students/changePassword');
                    }
                });
            }
            else {
                res.redirect(`/students`);
            }
        })
});

module.exports = router;