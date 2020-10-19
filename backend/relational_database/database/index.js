const { Sequelize } = require('sequelize');
const { applyRelations } = require('./relations');

const sequelize = new Sequelize('vidat_relational_db', 'vidat', 'password', {
    logging: false,
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT0',
    },
});


const modelDefiners = [
    require('./models/demandant.model'),
    require('./models/offeror.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyRelations(sequelize);

module.exports = sequelize;