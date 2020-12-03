module.exports = {
    mdwLogin: function (req, res, next) {
        if (typeof req.cookies.username == 'undefined') res.redirect('/login');
        else next();
    },

    mdwStudent: function (req, res, next) {
        if (req.cookies.isStudent == 'true') {
            req.session.isTeacher = false;
            req.session.isStudent = true;
            req.session.username = req.cookies.username;
            next();
        }
        else res.redirect('/login');
    },

    mdwTeacher: function (req, res, next) {
        if (req.cookies.isTeacher == 'true') {
            req.session.isTeacher = true;
            req.session.isStudent = false;
            req.session.username = req.cookies.username;
            next();
        }
        else res.redirect('/login');
    },

    mdwAdmin: function (req, res, next) {
        if (req.cookies.isTeacher != 'true' && req.cookies.isStudent != 'true') {
            req.session.isTeacher = false;
            req.session.isStudent = false;
            req.session.username = req.cookies.username;
            next();
        }
        else res.redirect('/login');
    },
}