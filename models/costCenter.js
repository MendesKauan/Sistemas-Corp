// models/costCenter.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const CostCenter = sequelize.define('CostCenter', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        balance: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    CostCenter.associate = (models) => {
        CostCenter.hasOne(models.Department, { foreignKey: 'IdCostCenter', as: 'department' });
    }

    return CostCenter;
}


