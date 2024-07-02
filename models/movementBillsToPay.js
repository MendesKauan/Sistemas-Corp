// models/movementBillsToPay.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const movementBillsToPay = sequelize.define('movementBillsToPay', {
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

    movementBillsToPay.associate = (models) => {
        movementBillsToPay.belongsTo(models.BillsToPay, { foreignKey: 'idTitle', as: 'BillsToPay' });
    }

    return movementBillsToPay;
}


