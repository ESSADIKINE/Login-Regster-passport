const express = require('express');
const { port, database } = require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const defaultRouter = require('./routes/defaultRoutes');
const dashboardRouter = require('./routes/authRoutes');
const guthubRouter = require('./routes/GithubRoute')
const googleRouter = require('./routes/GoogleRoutes'); // Include Google authentication routes
const FacebookRouter = require('./routes/FacebookRoute');
const LogoutRouter = require('./routes/logoutRouter')
require('./config/passport');
require('./config/passportGithubConf');
require('./config/passportGoogleConf');
require('./config/passportFacebookConf')


const app = express();

// Database connection
mongoose.connect(database.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Set up view engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static('public'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// Cookie parser middleware
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set user global variable
app.use('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Flash middleware
app.use(flash());

// Express messages middleware
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express validator middleware
app.use(expressValidator());

// Router middleware
app.use('/', defaultRouter);
app.use('/auth', guthubRouter);
app.use('/auth', googleRouter); // Use googleRouter for Google authentication
app.use('/auth', FacebookRouter);
app.use('/logout', LogoutRouter);
app.use('/dashboard', dashboardRouter);



// 404 middleware
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
