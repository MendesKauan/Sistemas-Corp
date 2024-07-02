// models/billsToPay.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const BillsToPay = sequelize.define('BillsToPay', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        totalPurchaseValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        installment: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        NF: {
            type: Sequelize.STRING,
            allowNull: false
        },
        IdPurchase: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            references: {
                model: 'Purchases', 
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expirationDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    BillsToPay.associate = (models) => {
        BillsToPay.belongsTo(models.Purchases, { foreignKey: 'IdPurchase', as: 'Purchases' });
        BillsToPay.hasMany(models.movementBillsToPay, { foreignKey: 'idTitle', as: 'movementBillsToPay' });
    }

    return BillsToPay;
}


