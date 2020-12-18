const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const middlewares = require('./middlewares/login.mdw');
require('express-async-errors');
const hbs_sections = require('express-handlebars-sections');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Config view engine
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main.hbs',
    helpers: {
        section: hbs_sections(),
        // Tính toán cơ bản
        inc: function (number) {
            return number + 1;
        },
    }
}));

const handlebars = hbs.create({});
handlebars.handlebars.registerHelper({
    eq: (v1, v2) => v1 == v2,
    male: (v1) => v1 == "Nam",
});

// Session 
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24,
    },
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// View engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Static resources
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', require('./routes/login.route.js'));
app.use('/admin', middlewares.mdwLogin, middlewares.mdwAdmin, require('./routes/admin.route.js'));
app.use('/students', middlewares.mdwLogin, middlewares.mdwStudent, require('./routes/students.route.js'));
app.use('/teachers', middlewares.mdwLogin, middlewares.mdwTeacher, require('./routes/teachers.route.js'));
app.use('/login', require('./routes/login.route.js'));
app.use('/logout', require('./routes/logout.route.js'));

app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Not Found',
    });
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        return res.status(404).render('404', {
            layout: false,
        });
    }

    if (err.status === 500) {
        return res.status(500).render('500', {
            layout: false
        });
    }
    next();
});


// Start server
app.listen(process.env.PORT || 3000)