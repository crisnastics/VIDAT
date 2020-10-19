const app = require('./webserver');
const PORT = 8081;
const db = require('./database');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

async function makeSession() {
    console.log(`Checking database connection...`);
    try {
        app.use(session({
            secret: 'work hard',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({
                mongooseConnection: db
            })
        }));
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await makeSession();
    console.log(`Starting Mongoose + Express on port ${PORT}...`);
    app.listen(PORT, () => {
        console.log(`Express server started on port ${PORT}.`);
    });
}

init();