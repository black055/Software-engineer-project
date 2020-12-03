const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const middlewares = require('./middlewares/login.mdw');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Config view engine
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main.hbs',
}));

// Session 
app.use(session({
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*60*24,
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
app.use('/public', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/login.route.js'));
app.use('/admin', middlewares.mdwLogin, middlewares.mdwAdmin, require('./routes/admin.route.js'));
app.use('/students', middlewares.mdwLogin, middlewares.mdwStudent, require('./routes/students.route.js'));
app.use('/teachers', middlewares.mdwLogin, middlewares.mdwTeacher, require('./routes/teachers.route.js'));
app.use('/login', require('./routes/login.route.js'));
app.use('/logout', require('./routes/logout.route.js'));


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`); 
});