const app = require('./webserver');
const PORT = 8080;
const sequelize = require('./database');

async function connectDatabase() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function synchronizeDatabase() {
    console.log(`Creating tables on database...`);
    try {
        await sequelize.sync({ force: true });
        console.log("All models were synchronized successfully.");

    } catch (error) {
        console.log('Unable to create tables:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await connectDatabase();
    await synchronizeDatabase();
    console.log(`Starting Sequelize + Express on port ${PORT}...`);
    app.listen(PORT, () => {
        console.log(`Express server started on port ${PORT}.`);
    });
}

init();