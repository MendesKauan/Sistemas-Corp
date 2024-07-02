// ./models/deposit.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Deposit = sequelize.define('Deposit', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allownull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allownull: false
        }
    });

    Deposit.associate = (models) => {
        Deposit.hasMany(models.ProductMovement, { foreignKey: 'IdDeposit' });
    }

    return Deposit;
}