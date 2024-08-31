const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const Client = require('./server/config/db')
const userRoutes = require('./server/routes/userRoutes')
const {client} = require('pg')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { promisify } = require('util')
const { application } = require('express')
const {createTables} = require('./server/config/createTable');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const passport1 = require('./server/config/passport');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5002


// Use middleware to parse cookies and request bodies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Call createTables to ensure tables are created
createTables();


// Set up session middleware

app.use(session({
    store: new pgSession({
        pool: Client,                // Connection pool
        tableName: 'user_sessions' // Optional: custom table name
    }),
    secret: 'your-secret-key',     // Replace with a strong secret
    resave: false,                 // Don't save session if unmodified
    saveUninitialized: false,      // Don't create session until something stored
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
        secure: false,             // Set true if using https
        httpOnly: true,            // Prevents client-side JavaScript from accessing the cookie
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use(require('./routes/userRoutes'));
app.use(express.json());
app.use('/api', userRoutes);


app.listen (PORT, () => console.log(`Listening to port: ${PORT}`));
