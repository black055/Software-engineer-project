const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.message = null;
    req.username = null;
    req.isStudent = false;
    req.isTeacher = false;
    res.clearCookie('isStudent');
    res.clearCookie('isTeacher');
    res.clearCookie('username');
    res.redirect('/login');
})

module.exports = router;