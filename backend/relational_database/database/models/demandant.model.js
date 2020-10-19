const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('demandant', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phone: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        rut: {
            allowNull: true,
            type: DataTypes.STRING,
        }
    });
};