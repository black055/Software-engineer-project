const express = require('express');
const router = express.Router();
const studentsModel = require('../models/students.module');
const db = require('../utils/db');
const bcrypt = require('bcrypt');

const studentExist = async (id) => {
    const data = await studentsModel.getOne(id);
    return data.length;
}

router.get('/', async (req, res) => {
    const data = await studentsModel.getAllAccounts();
    res.redirect('/students/info');
});

router.get('/info', async (req, res) => {
    const data = await studentsModel.getInfoStudent(req.session.username);
    if (!(await studentExist(req.session.username))) res.redirect('/logout');
    else res.render('students/info', {
        info: data[0],
    })
})

router.get('/timetable', async (req, res) => {
    if (!(await studentExist(req.session.username))) res.redirect('/logout');
    else {
        const data = await studentsModel.getTimetable(req.session.username);
        res.render('students/timetable', {
        isTimetable: true,
        timetable: data
        });
    }
});

router.get('/scoreTable', async (req, res) => {
    if (!(await studentExist(req.session.username))) res.redirect('/logout');
    else {
        const data = await studentsModel.getScoreTable(req.session.username);
        res.render('students/scoreTable', {
            isScoreTable: true,
            scoreTable: data
        });
    }
});

//Học sinh đăng ký học phần
router.get('/enroll', async (req, res) => {
    if (!(await studentExist(req.session.username))) res.redirect('/logout');
    else {
        const data = await studentsModel.getEnrollableSubject(req.session.username);
        res.render('students/enroll', {
            isEnrolling: true,
            subjectEnroll: data
        });
    }
});

router.post('/enroll_classes', async (req, res) => {
    await studentsModel.enrollSubject(req.session.username, req.body.classes);
    res.redirect(`/students/enroll`);
})

//Học sinh hủy đăng ký học phần
router.get('/unenroll', async (req, res) => {
    if (!(await studentExist(req.session.username))) res.redirect('/logout');
    else {
        const data = await studentsModel.getSubjectEnrolled(req.session.username);
        res.render('students/unenroll', {
            isDeletingSubject: true,
            subjects: data
        });
    }
});

router.post('/unenroll_class', async (req, res) => {
    await studentsModel.unenrollSubject(req.session.username, req.body.classEnrolled);
    res.redirect(`/students/unenroll`);
})

router.get('/password', async (req, res) => {
    if (!(await studentExist(req.session.username))) res.redirect('/logout');
    else res.render('students/changePassword');
});

router.post('/newPass', async (req, res) => {
    if (!(await studentExist(req.session.username))) res.redirect('/logout');
    else {
        const passwords = await studentsModel.getPassword(req.session.username);
        const password = passwords[0];
        bcrypt.compare(req.body.oldPass, password['MAT_KHAU'], function (err, result) {
            if (result == true) {
                bcrypt.hash(req.body.newPass, 10, async function (e, hash) {
                    await studentsModel.changePass(req.session.username, hash);
                })
                res.redirect('/students/info');
            } else {
                res.render('students/changePassword', { message: "Mật khẩu cũ không đúng." });
            }
        })
    }
});

module.exports = router;