// ./models/department.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Department = sequelize.define('Department', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    
        IdCostCenter: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    Department.associate = (models) => {
        Department.belongsTo(models.CostCenter, { foreignKey: 'IdCostCenter', as: 'costCenter' });
        Department.hasMany(models.User, { foreignKey: 'IdDepartment', as: "Users" });
    }

    return Department;
}


