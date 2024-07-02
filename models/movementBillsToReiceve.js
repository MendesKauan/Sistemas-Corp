// models/movementBillsToReiceve.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const movementBillsToReceive = sequelize.define('movementBillsToReceive', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idTitle: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        dateMovement: {
            type: Sequelize.DATE,
            allowNull: false
        },
        typeMovement: {
            type: Sequelize.ENUM('abertura', 'pago', 'cancelado'),
            allowNull: false
        },
        movementValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        valueFine: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        valueInterest: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    movementBillsToReceive.associate = (models) => {
        movementBillsToReceive.belongsTo(models.BillsToReceive, { foreignKey: 'idTitle' });
    }

    return movementBillsToReceive;
}


