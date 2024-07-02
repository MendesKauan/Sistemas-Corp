// models/proposals.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Proposals = sequelize.define('Proposals', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        IdProduct: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        IdSupplier: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proposedPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        dateProposals: {
            type: Sequelize.DATE,
            allowNull: false
        },
        buyer: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        expirationDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    Proposals.associate = (models) => {
        Proposals.belongsTo(models.Supplier, { foreignKey: 'IdSupplier', as: 'Supplier' });
        Proposals.belongsTo(models.Product, { foreignKey: 'IdProduct', as: 'Product' });
        Proposals.belongsTo(models.User, { foreignKey: 'buyer' });
        Proposals.hasMany(models.Purchases, { foreignKey: 'IdProposal', as: 'Proposals' });

    }

    return Proposals;
}


