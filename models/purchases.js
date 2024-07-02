// models/purchases.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Purchases = sequelize.define('Purchases', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        IdSupplier: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        IdProposal: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Idbuyer: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        IdProduct: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        totalAmount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        purchaseStatus: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Purchases.associate = (models) => {
        Purchases.hasMany(models.BillsToPay, { foreignKey: 'IdPurchase', as: 'BillsToPays' });
        Purchases.belongsTo(models.Supplier, { foreignKey: 'IdSupplier' });
        Purchases.belongsTo(models.Proposals, { foreignKey: 'IdProposal' });
        Purchases.belongsTo(models.User, { foreignKey: 'Idbuyer' });
        Purchases.belongsTo(models.Product, { foreignKey: 'IdProduct' });
    }

    return Purchases;
}


