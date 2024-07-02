// models/supplier.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Supplier = sequelize.define('Supplier', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        company: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Supplier.associate = (models) => {
        Supplier.hasMany(models.Proposals, { foreignKey: 'IdSupplier', as: 'Supplier' });
        Supplier.hasMany(models.Purchases, { foreignKey: 'IdSupplier' });
    }

    return Supplier;
}


