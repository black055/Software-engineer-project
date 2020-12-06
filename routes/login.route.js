const express = require('express');
const router = express.Router();
const database = require('../utils/db');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (typeof req.cookies.username != 'undefined') {
        if (req.cookies.isTeacher == 'true') res.redirect('/teachers');
        else if (req.cookies.isStudent == 'true') res.redirect('/students');
        else res.redirect('/admin');
    } else res.render('login', {layout: false});
});

router.post('/', (req, res) => {
    const {username, password} = req.body;
    const TABLE_ACCOUNT_TEACHER = 'ACCOUNT_GIAO_VIEN';
    const TABLE_ACCOUNT_STUDENT = 'ACCOUNT_HOC_SINH';

    if (username && password && username != 'admin' && password != 'admin') {
        database.query(`SELECT * FROM ${TABLE_ACCOUNT_TEACHER} WHERE ID_GIAO_VIEN = ?`
        , [username], (error, results, fields) => {
            if (error){
                console.log(error);
            }
            
            if (results.length > 0) {
                bcrypt.compare(password, results[0]['MAT_KHAU'], (e, r) => {
                    if (r == true) {
                        req.session.isTeacher = true;
                        req.session.isStudent = false;
                        req.session.username = username;
                        req.session.message = null;
                        res.cookie('username', username);
                        res.cookie('isTeacher', true);
                        res.cookie('isStudent', false);
                        res.redirect(`/teachers`);
                    } else {
                        req.session.message = "Mật khẩu hoặc tên đăng nhập không chính xác!";
                        res.redirect('/login');
                    }
                });
            } else {
                database.query(`SELECT * FROM ${TABLE_ACCOUNT_STUDENT} WHERE ID_HOC_SINH = ?`
                , [username], (error, results, fields) => {
                    if (results.length > 0) {
                        bcrypt.compare(password, results[0]['MAT_KHAU'], (e, r) => {
                            if (r == true) {
                                req.session.isStudent = true;
                                req.session.isTeacher = false;
                                req.session.username = username;
                                req.session.message = null;
                                res.cookie('username', username);
                                res.cookie('isTeacher', false);
                                res.cookie('isStudent', true);
                                res.redirect(`/students`);
                            } else {
                                req.session.username = null;
                                req.session.isStudent = false;
                                req.session.isTeacher = false;
                                res.cookie('isTeacher', false);
                                res.cookie('isStudent', false);
                                req.session.message = "Mật khẩu hoặc tên đăng nhập không chính xác!";
                                res.redirect('/login');
                                res.end();
                            }
                        })
                    } else {
                        req.session.username = null;
                        req.session.isStudent = false;
                        req.session.isTeacher = false;
                        res.cookie('isTeacher', false);
                        res.cookie('isStudent', false);
                        req.session.message = "Mật khẩu hoặc tên đăng nhập không chính xác!";
                        res.redirect('/login');
                        res.end();
                    }
                });
            };
        });
    } else {
        if (username == 'admin' && password == 'admin') {
            req.session.username = username;
            req.session.isStudent = false;
            req.session.isTeacher = false;
            req.session.message = null;
            res.cookie('username', username);
            res.cookie('isTeacher', false);
            res.cookie('isStudent', false);
            res.redirect('/admin');
            res.end();
        } else {
            req.session.username = null;
            req.session.isStudent = false;
            req.session.isTeacher = false;
            res.cookie('isTeacher', false);
            res.cookie('isStudent', false);
            req.session.message = "Mật khẩu hoặc tên đăng nhập không chính xác!";
            res.redirect('/login');
            res.end();
        }
    }
});

module.exports = router;