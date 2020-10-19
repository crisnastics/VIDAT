const { DataTypes } = require('sequelize');

function applyRelations(sequelize) {
    const {
        demandant,
        offeror
    } = sequelize.models;

    const serviceRequest = sequelize.define('serviceRequest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        service_date: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        service_cost: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        location: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        service_status: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        payment_status: {
            allowNull: true,
            type: DataTypes.INTEGER,
        }
    });
    demandant.belongsToMany(offeror, { through: serviceRequest, foreignKey: 'id_offeror'});
    offeror.belongsToMany(demandant, { through: serviceRequest, foreignKey: 'id_demandant' });

}

module.exports = { applyRelations };