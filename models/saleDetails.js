// models/saleDetails.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const SaleDetails = sequelize.define('SaleDetails', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idSale: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idProduct: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        soldAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        installment: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        NF: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    });

    SaleDetails.associate = (models) => {
        SaleDetails.belongsTo(models.Sales, { foreignKey: 'idSale' });
        SaleDetails.belongsTo(models.Product, { foreignKey: 'idProduct' });
    }

    return SaleDetails;
}


